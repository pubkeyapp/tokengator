import { Injectable, Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { CommunityMemberRole, IdentityProvider, Prisma } from '@prisma/client'
import { ApiCoreService, slugifyId } from '@tokengator/api-core-data-access'
import { USER_PROVISIONED } from '@tokengator/api-user-data-access'
import { ApiCommunityDataService } from './api-community-data.service'

export type ProvisionCommunityInput = Omit<Prisma.CommunityCreateInput, 'slug'>

export const provisionCommunities: ProvisionCommunityInput[] = [
  {
    name: "Dean's List",
    description: 'A DAO turned Network State',
    iconUrl:
      'https://raw.githubusercontent.com/pubkeyapp/tokengator/main/apps/api/src/assets/images/brand/deans-list-icon.png',
    logoUrl:
      'https://raw.githubusercontent.com/pubkeyapp/tokengator/main/apps/api/src/assets/images/brand/deans-list-logo.png',
    members: {
      create: [
        { userId: 'beeman', role: CommunityMemberRole.Admin },
        { userId: 'deanmachine', role: CommunityMemberRole.Admin },
        { userId: 'sundeep', role: CommunityMemberRole.Member },
      ],
    },
    wallets: {
      create: [
        {
          name: 'Fee Payer',
          feePayer: true,
          publicKey: 'DLDxrkwTR3EvmZGWZ4DobcnQ8RANT8KvcpnLxdQnRVF9',
          secretKey:
            '[208,91,162,44,42,142,129,176,159,210,93,219,116,198,243,41,198,62,79,229,11,214,156,146,183,65,37,112,91,156,104,166,183,56,239,149,134,14,20,234,100,138,46,38,75,50,172,37,167,239,15,246,249,31,123,155,158,208,166,17,188,35,111,148]',
        },
      ],
    },
  },
  {
    name: 'PubKey',
    description: 'The PubKey 🅿️ Community',
    iconUrl:
      'https://raw.githubusercontent.com/pubkeyapp/tokengator/main/apps/api/src/assets/images/brand/pubkey-icon.png',
    logoUrl:
      'https://raw.githubusercontent.com/pubkeyapp/tokengator/main/apps/api/src/assets/images/brand/pubkey-logo.png',
    members: {
      create: [
        { userId: 'beeman', role: CommunityMemberRole.Admin },
        { userId: 'sundeep', role: CommunityMemberRole.Admin },
      ],
    },
    wallets: {
      create: [
        {
          name: 'Fee Payer',
          feePayer: true,
          publicKey: 'PUBKX8Sv9tnQ9aJ85HqJUdmYJuy7VKoukYeNhXd7jYc',
          secretKey:
            '[166,235,136,99,90,201,134,87,79,70,57,226,248,4,209,10,59,173,53,196,41,37,191,187,220,103,97,142,154,137,244,235,5,193,130,10,92,178,160,158,239,84,253,48,150,59,48,130,37,177,165,83,131,175,247,42,156,20,230,138,188,229,120,129]',
        },
      ],
    },
    claims: {
      create: [
        twitterUser('fordudesake', 'https://pbs.twimg.com/profile_images/1745476026610970624/VnruqazA_400x400.jpg'),
        twitterUser('HeyAndyS', 'https://pbs.twimg.com/profile_images/1691941118903021568/RoMA6RdT_400x400.jpg'),
        twitterUser('voshy', 'https://pbs.twimg.com/profile_images/1654231381248032771/DKN6Tdtl_400x400.jpg'),
        twitterUser('therealchaseeb', 'https://pbs.twimg.com/profile_images/1776995441345011712/xj05U0zO_400x400.jpg'),
        twitterUser('aeyakovenko', 'https://pbs.twimg.com/profile_images/1776610025252986882/5Qatptcx_400x400.jpg'),
        twitterUser('a_milz', 'https://pbs.twimg.com/profile_images/1775603724863565824/h8napIbl_400x400.jpg'),
        twitterUser('tamarincrypto', 'https://pbs.twimg.com/profile_images/1601771870952587265/9hsvSiC-_400x400.jpg'),
        twitterUser('_Dean_Machine', 'https://pbs.twimg.com/profile_images/1776690984824213504/3WsNQfMC_400x400.png'),
        twitterUser('Milimalism', 'https://pbs.twimg.com/profile_images/1649448251739852801/x-vNsMJf_400x400.jpg'),
        twitterUser('derlys_paola', 'https://pbs.twimg.com/profile_images/1705589278686707712/FCAVjkWZ_400x400.jpg'),
        twitterUser('SundeepCharan', 'https://pbs.twimg.com/profile_images/1765429691023032320/xs1tR2-7_400x400.jpg'),
        twitterUser('beeman_nl', 'https://avatars.githubusercontent.com/u/36491'),
        {
          provider: IdentityProvider.Discord,
          providerId: 'sundeepcharan',
          avatarUrl: 'https://pbs.twimg.com/profile_images/1765429691023032320/xs1tR2-7_400x400.jpg',
        },
        {
          provider: IdentityProvider.Discord,
          providerId: 'beeman.dev',
          avatarUrl: 'https://avatars.githubusercontent.com/u/36491',
        },
        { provider: IdentityProvider.GitHub, providerId: 'sunguru98' },
        {
          provider: IdentityProvider.GitHub,
          providerId: 'beeman',
          avatarUrl: 'https://avatars.githubusercontent.com/u/36491',
        },
        { provider: IdentityProvider.Solana, providerId: '81sWMLg1EgYps3nMwyeSW1JfjKgFqkGYPP85vTnkFzRn' },
        { provider: IdentityProvider.Solana, providerId: 'BEEMANPx2jdmfR7jpn1hRdMuM2Vj4E3azBLb6RUBrCDY' },
      ].map((i) => ({ ...i, account: '3zhnymzhgJVckkCgzowEWDQhDWrNbALzDWvVKuH72Gow' })),
    },
  },
  {
    name: 'COLOSSEUM',
    description: `Powering online Solana hackathons. 🏟️`,
    iconUrl: 'https://pbs.twimg.com/profile_images/1684566200662233092/BZzDPr5q_400x400.jpg',
    members: {
      create: [
        { userId: 'beeman', role: CommunityMemberRole.Admin },
        { userId: 'sundeep', role: CommunityMemberRole.Admin },
      ],
    },
    wallets: {
      create: [
        {
          name: 'Fee Payer',
          feePayer: true,
          publicKey: 'CLSMpWGGvmjh9qFoLtANu2gts3frcrNr2J4XEPoFvQi2',
          secretKey:
            '[172,236,240,133,3,153,43,108,116,65,138,10,92,241,146,193,31,113,94,213,116,167,89,137,204,233,119,92,232,8,216,9,168,107,67,216,45,228,124,94,213,148,190,81,30,168,9,180,158,112,154,224,189,227,6,7,19,25,18,103,56,132,85,111]',
        },
      ],
    },
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
    await Promise.all(provisionCommunities.map((item) => this.provisionCommunity(item)))
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

function twitterUser(providerId: string, avatarUrl?: string) {
  return {
    provider: IdentityProvider.Twitter,
    providerId,
    avatarUrl,
  }
}
