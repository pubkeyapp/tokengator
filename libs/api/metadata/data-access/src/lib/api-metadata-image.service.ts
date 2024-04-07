import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { Community, Identity, Preset, User } from '@prisma/client'
import { ApiCoreService, ONE_MINUTE } from '@tokengator/api-core-data-access'
import { IdentityProvider } from '@tokengator/api-identity-data-access'
import { Buffer } from 'buffer'
import { Font } from 'canvacord'
import { LRUCache } from 'lru-cache'
import * as fs from 'node:fs/promises'
import { join } from 'node:path'
import { ExtensionTokenMetadata } from './api-metadata.service'
import { BusinessVisaSocials, GenerateBusinessVisaImage } from './generators/generate-business-visa-image'

type IdentityWithProfile = Omit<Identity, 'profile'> & { profile: { username: string } }
type UserWithIdentities = User & { identities: IdentityWithProfile[] }

@Injectable()
export class ApiMetadataImageService implements OnModuleInit {
  private readonly logger = new Logger(ApiMetadataImageService.name)
  private readonly assetPath = join(__dirname, 'assets')
  private readonly imagePath = join(this.assetPath, 'images')
  private readonly fontPath = join(this.assetPath, 'fonts')
  private readonly brandPath = join(this.imagePath, 'brand')
  private readonly brandMap = new Map<string, Buffer>()
  private readonly templatePath = join(this.imagePath, 'templates')
  private readonly templateMap = new Map<string, Buffer>()

  private readonly communityCache = new LRUCache<string, Community>({
    max: 1000,
    ttl: ONE_MINUTE,
    fetchMethod: async (slug: string) => {
      const found = await this.core.data.community.findUnique({ where: { slug } })
      if (found) {
        this.logger.verbose(`Caching community info for ${slug}`)
        return found
      }
      throw new Error(`Failed to fetch community info for ${slug}`)
    },
  })

  private readonly presetCache = new LRUCache<string, Preset>({
    max: 1000,
    ttl: ONE_MINUTE,
    fetchMethod: async (id: string) => {
      const found = await this.core.data.preset.findUnique({ where: { id } })
      if (found) {
        this.logger.verbose(`Caching preset info for ${id}`)
        return found
      }
      throw new Error(`Failed to fetch preset info for ${id}`)
    },
  })

  private readonly userCache = new LRUCache<string, UserWithIdentities>({
    max: 1000,
    ttl: ONE_MINUTE,
    fetchMethod: async (username: string) => {
      const found = (await this.core.data.user.findUnique({
        where: { username },
        include: { identities: true },
      })) as UserWithIdentities
      if (found) {
        this.logger.verbose(`Caching user info for ${username}`)
        return found
      }
      throw new Error(`Failed to fetch user info for ${username}`)
    },
  })

  constructor(private readonly core: ApiCoreService) {}

  async onModuleInit(): Promise<void> {
    await this.loadFonts()
    await this.loadTemplates()
    await this.loadBrands()
  }

  async loadFonts() {
    Font.loadDefault()
    const families = await fs.readdir(this.fontPath)
    this.logger.verbose(`Found ${families.length} fonts in ${this.fontPath}`)

    for (const family of families) {
      const fonts = await fs.readdir(join(this.fontPath, family))
      this.logger.verbose(`Found ${fonts.length} fonts in ${family}`)
      for (const font of fonts) {
        Font.fromFileSync(join(this.fontPath, family, font), font.replace('.ttf', ''))
        this.logger.verbose(` -> Loaded font: ${family}/${font} -> ${font.replace('.ttf', '')}`)
      }
    }
  }
  async loadTemplates() {
    const files = await fs.readdir(this.templatePath)
    this.logger.verbose(`Found ${files.length} templates in ${this.templatePath}`)

    for (const file of files) {
      const buffer = await fs.readFile(join(this.templatePath, file))
      this.templateMap.set(file, buffer)
      this.logger.verbose(` -> Loaded template: ${file}`)
    }
  }

  async loadBrands() {
    const files = await fs.readdir(this.brandPath)
    this.logger.verbose(`Found ${files.length} brands in ${this.brandPath}`)

    for (const file of files) {
      const buffer = await fs.readFile(join(this.brandPath, file))
      this.brandMap.set(file, buffer)
      this.logger.verbose(` -> Loaded brand: ${file}`)
    }
    // Make sure we have a default icon and logo
    if (!this.brandMap.has('default-icon.png')) {
      throw new Error(`Missing default-icon.png. Expected in brand folder: ${this.brandPath}`)
    }
    if (!this.brandMap.has('default-logo.png')) {
      throw new Error(`Missing default-logo.png. Expected in brand folder: ${this.brandPath}`)
    }
  }

  async generate(account: string, accountMetadata: ExtensionTokenMetadata): Promise<Buffer> {
    const community = accountMetadata.state.additionalMetadata.find(([key]) => key === 'community')?.[1]
    const username = accountMetadata.state.additionalMetadata.find(([key]) => key === 'username')?.[1]
    const preset = accountMetadata.state.additionalMetadata.find(([key]) => key === 'preset')?.[1]

    if (!community || !username || !preset) {
      throw new Error('Missing metadata. Required: community, username, preset')
    }

    const [foundCommunity, foundUser, foundPreset] = await Promise.all([
      this.communityCache.fetch(community),
      this.userCache.fetch(username),
      this.presetCache.fetch(preset),
    ])

    if (!foundCommunity) {
      throw new Error(`Community not found: ${community}`)
    }
    if (!foundUser) {
      throw new Error(`User not found: ${username}`)
    }
    if (!foundPreset) {
      throw new Error(`Preset not found: ${preset}`)
    }

    switch (foundPreset.id) {
      case 'business-visa':
        return this.renderBusinessVisa({
          user: foundUser,
          community: foundCommunity,
          preset: foundPreset,
          account,
          metadata: accountMetadata,
        })
      default:
        return this.renderNotFound()
    }
  }

  renderNotFound() {
    return fs.readFile(join(this.imagePath, 'not-found.png'))
  }

  renderPoweredBy() {
    return fs.readFile(join(this.imagePath, 'powered-by-md.png'))
  }

  private async renderIcon(community: Community) {
    const icon = this.brandMap.get(`${community.slug}-icon.png`)

    return icon ? icon : this.brandMap.get('default-icon.png')
  }

  private async renderLogo(community: Community) {
    const logo = this.brandMap.get(`${community.slug}-logo.png`)

    return logo ? logo : this.brandMap.get('default-logo.png')
  }

  async renderBusinessVisa({
    user,
    community,
    preset,
    account,
    metadata,
  }: {
    user: User & { identities: IdentityWithProfile[] }
    community: Community
    preset: Preset
    account: string
    metadata: ExtensionTokenMetadata
  }): Promise<Buffer> {
    const templateName = `${preset.id}.png`
    const template = this.templateMap.get(templateName)

    if (!template) {
      throw new Error(`Template not found: ${templateName}`)
    }

    const poweredBy = await this.renderPoweredBy()
    const icon = await this.renderIcon(community)
    const logo = await this.renderLogo(community)
    const brands = await this.getBrands()
    if (!icon || !logo || !brands) {
      throw new Error('Missing brands, icon or logo. Expected in brand folder')
    }

    const discordIdentity = user.identities.find((i) => i.provider === IdentityProvider.Discord)
    const githubIdentity = user.identities.find((i) => i.provider === IdentityProvider.GitHub)
    const googleIdentity = user.identities.find((i) => i.provider === IdentityProvider.Google)
    const twitterIdentity = user.identities.find((i) => i.provider === IdentityProvider.Twitter)

    const socials: BusinessVisaSocials = {
      discord: discordIdentity ? discordIdentity?.profile?.username : '',
      github: githubIdentity ? githubIdentity?.profile?.username : '',
      google: googleIdentity ? googleIdentity?.profile?.username : '',
      x: twitterIdentity ? twitterIdentity?.profile?.username : '',
    }

    const templateData = {
      left: {
        username: user.username,
        community: community.name,
        twitter: twitterIdentity?.profile?.username ? `x.com/${twitterIdentity.profile?.username}` : '',
        github: githubIdentity?.profile?.username ? `x.com/${githubIdentity.profile?.username}` : '',
      },
      right: {
        status: 'Active',
        points: '1000',
        issuedAt: '2024-01-01',
        expiresAt: '2025-01-01',
      },
    }

    const imageBuilder = new GenerateBusinessVisaImage({
      width: 1024,
      height: 1024,
      earnings: '1000',
      status: 'Active',
      community: community.name,
      name: user.username,
      avatar: user.avatarUrl ?? '',
      background: template,
      poweredBy,
      icon,
      logo,
      brands,
      socials,
    })

    const image: Buffer = (await imageBuilder.build({ format: 'png' })) as Buffer

    return image
  }

  private async getBrands() {
    return {
      discord: this.brandMap.get('brand-discord.png') as Buffer,
      github: this.brandMap.get('brand-github.png') as Buffer,
      google: this.brandMap.get('brand-google.png') as Buffer,
      x: this.brandMap.get('brand-x.png') as Buffer,
    }
  }
}
