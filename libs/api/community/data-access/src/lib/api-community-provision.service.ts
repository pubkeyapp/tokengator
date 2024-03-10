import { Injectable, Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { CommunityMemberRole, Prisma } from '@prisma/client'
import { ApiCoreService, slugifyId } from '@tokengator-mint/api-core-data-access'
import { USER_PROVISIONED } from '@tokengator-mint/api-user-data-access'
import { ApiCommunityDataService } from './api-community-data.service'

export type ProvisionCommunityInput = Omit<Prisma.CommunityCreateInput, 'slug'>
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
