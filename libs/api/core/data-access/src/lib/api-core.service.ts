import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { CommunityMemberRole, IdentityProvider } from '@prisma/client'
import { ApiCorePrismaClient, prismaClient } from './api-core-prisma-client'
import { ApiCoreConfigService } from './config/api-core-config.service'
import { slugifyId } from './helpers/slugify-id'
import { getEnvEnvTemplate } from './templates/get-env-env-template'

@Injectable()
export class ApiCoreService {
  readonly data: ApiCorePrismaClient = prismaClient
  constructor(readonly config: ApiCoreConfigService, readonly eventEmitter: EventEmitter2) {}

  async ensureCommunityAdmin({ communityId, userId }: { communityId: string; userId: string }) {
    const found = await this.data.communityMember.findFirst({
      where: { communityId, userId, role: CommunityMemberRole.Admin },
      include: { community: true, user: true },
    })
    if (!found) {
      throw new Error('You must be a community admin to perform this action')
    }
    return found
  }

  async ensureCommunityAdminBySlug({ communitySlug, userId }: { communitySlug: string; userId: string }) {
    const found = await this.data.communityMember.findFirst({
      where: { community: { slug: communitySlug }, user: { id: userId }, role: CommunityMemberRole.Admin },
      include: { community: true, user: true },
    })
    if (!found) {
      throw new Error('You must be a community admin to perform this action')
    }
    return found
  }

  async findUserByIdentity({ provider, providerId }: { provider: IdentityProvider; providerId: string }) {
    return this.data.identity.findUnique({
      where: { provider_providerId: { provider, providerId } },
      include: { owner: true },
    })
  }

  async findUsername(username: string): Promise<string> {
    username = slugifyId(username)
    const exists = await this.data.user.findUnique({ where: { username } })
    if (!exists) {
      return username
    }
    const newUsername = `${username}-${Math.floor(Math.random() * 1000)}`
    return this.findUsername(newUsername)
  }

  async getCurrencies() {
    return this.data.currency.findMany({ orderBy: { name: 'asc' } })
  }

  uptime() {
    return process.uptime()
  }

  envJs() {
    return getEnvEnvTemplate(this.envJson())
  }
  envJson() {
    return this.config.appConfig
  }
}
