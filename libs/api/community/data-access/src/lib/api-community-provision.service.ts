import { Injectable, Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { CommunityMemberRole, Prisma } from '@prisma/client'
import { ApiCoreService, slugifyId } from '@tokengator-mint/api-core-data-access'
import { getKeypairFromSecretKey, keypairToStrings } from '@tokengator-mint/api-solana-util'
import { USER_PROVISIONED } from '@tokengator-mint/api-user-data-access'
import { ApiCommunityDataService } from './api-community-data.service'

export type ProvisionCommunityInput = Omit<Prisma.CommunityCreateInput, 'slug'>
export interface ProvisionCommunityMintInput {
  name: string
  secretKey: string
  symbol: string
  uri: string
  metadata: Prisma.InputJsonValue
}

function getCommunityMint({
  name,
  symbol,
  secretKey,
  uri,
  metadata,
}: ProvisionCommunityMintInput): Prisma.MintCreateWithoutCommunityInput {
  const keypair = keypairToStrings(getKeypairFromSecretKey(secretKey))

  return {
    name,
    symbol,
    uri,
    metadata,
    ...keypair,
  }
}

const items: ProvisionCommunityMintInput[] = [
  {
    name: 'Citizenship',
    symbol: 'DLCI',
    metadata: [
      ['Community', "Dean's List"],
      ['Type', 'Citizenship'],
      ['Earning', 'Enabled'],
      ['Points', '0'],
    ],
    secretKey:
      '[223,16,201,135,106,128,212,126,209,40,124,48,215,215,108,244,13,254,201,49,46,177,6,170,207,103,234,246,133,76,198,78,183,55,136,230,159,97,226,22,253,212,69,142,232,204,172,84,253,18,83,249,99,221,20,92,244,242,237,218,44,242,228,172]',
    uri: 'https://raw.githubusercontent.com/pubkeyapp/tokengator-assets/main/developer-portal/metadata.json',
  },
  {
    name: 'Residency',
    symbol: 'DLRE',
    metadata: [
      ['Community', "Dean's List"],
      ['Type', 'Residency'],
      ['Earning', 'Enabled'],
      ['Points', '0'],
    ],
    secretKey:
      '[194,72,233,190,125,17,21,39,240,15,74,189,36,90,140,39,158,54,167,170,42,88,55,64,233,22,67,27,210,212,211,175,183,69,172,168,251,103,147,166,49,131,254,175,130,125,18,4,61,235,207,135,194,250,220,89,79,181,18,254,166,231,13,116]',
    uri: 'https://raw.githubusercontent.com/pubkeyapp/tokengator-assets/main/developer-portal/metadata.json',
  },
  {
    name: 'Business Visa',
    symbol: 'DLBV',
    metadata: [
      ['Community', "Dean's List"],
      ['Type', 'Business Visa'],
      ['Earning', 'Enabled'],
      ['Points', '0'],
    ],
    secretKey:
      '[251,99,202,208,235,140,66,30,219,147,254,32,131,161,130,142,138,180,229,243,228,56,180,141,35,111,228,150,245,12,166,61,183,54,36,184,223,62,183,150,122,101,131,235,57,190,167,93,100,98,117,74,201,161,179,235,103,91,61,17,220,248,188,136]',
    uri: 'https://raw.githubusercontent.com/pubkeyapp/tokengator-assets/main/developer-portal/metadata.json',
  },
  {
    name: 'Personal Visa',
    symbol: 'DLPV',
    metadata: [
      ['Community', "Dean's List"],
      ['Type', 'Personal Visa'],
      ['Earning', 'Disabled'],
      ['Points', '0'],
    ],
    secretKey:
      '[28,21,193,241,18,110,246,190,232,73,241,167,206,60,118,11,70,21,198,200,137,151,37,79,150,38,149,24,224,235,26,38,183,67,180,1,36,98,178,52,245,238,1,102,7,33,176,250,97,84,13,5,14,72,122,74,248,187,225,76,180,70,152,123]',
    uri: 'https://raw.githubusercontent.com/pubkeyapp/tokengator-assets/main/developer-portal/metadata.json',
  },
]

export const provisionCommunities: ProvisionCommunityInput[] = [
  {
    name: "Dean's List",
    description: 'A DAO turned Network State',
    imageUrl: 'https://avatars.githubusercontent.com/u/137821488?v=4',
    members: {
      create: [
        { userId: 'beeman', role: CommunityMemberRole.Admin },
        { userId: 'deanmachine', role: CommunityMemberRole.Admin },
      ],
    },
    mints: { create: items.map(getCommunityMint) },
  },
]

@Injectable()
export class ApiCommunityProvisionService {
  private readonly logger = new Logger(ApiCommunityProvisionService.name)

  constructor(private readonly core: ApiCoreService, private readonly data: ApiCommunityDataService) {}

  @OnEvent(USER_PROVISIONED)
  async onUserProvisioned() {
    if (this.core.config.databaseProvision) {
      await this.provisionCommunities()
      this.logger.verbose(`Provisioned database`)
    }
  }

  private async provisionCommunities() {
    await Promise.all(provisionCommunities.map((user) => this.provisionCommunity(user)))
  }

  private async provisionCommunity(input: ProvisionCommunityInput) {
    const slug = slugifyId(input.name).toLowerCase()
    const found = await this.data.findOneBySlug(slug)
    if (!found) {
      await this.data.create(input)
      this.logger.verbose(`Provisioned community ${input.name} with slug ${slug}`)
      return
    }
  }
}
