import { Injectable } from '@nestjs/common'
import { ApiCommunityDataService } from './api-community-data.service'
import { AdminFindManyCommunityInput } from './dto/admin-find-many-community.input'
import { AdminUpdateCommunityInput } from './dto/admin-update-community.input'
import { CommunityPaging } from './entity/community.entity'
import { getCommunityWhereAdminInput } from './helpers/get-community-where-admin.input'

@Injectable()
export class ApiCommunityDataAdminService {
  constructor(private readonly data: ApiCommunityDataService) {}

  async deleteCommunity(communityId: string) {
    return this.data.delete(communityId)
  }

  async findManyCommunity(input: AdminFindManyCommunityInput): Promise<CommunityPaging> {
    return this.data.findMany({
      orderBy: { createdAt: 'desc' },
      where: getCommunityWhereAdminInput(input),
      limit: input.limit,
      page: input.page,
    })
  }

  async findOneCommunity(communityId: string) {
    return this.data.findOne(communityId)
  }

  async updateCommunity(communityId: string, input: AdminUpdateCommunityInput) {
    return this.data.update(communityId, input)
  }
}
