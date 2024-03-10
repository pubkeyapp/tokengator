import { Injectable } from '@nestjs/common'
import { ApiCommunityMemberDataService } from './api-community-member-data.service'
import { AdminCreateCommunityMemberInput } from './dto/admin-create-community-member.input'
import { AdminFindManyCommunityMemberInput } from './dto/admin-find-many-community-member.input'
import { AdminUpdateCommunityMemberInput } from './dto/admin-update-community-member.input'
import { CommunityMemberPaging } from './entity/community-member.entity'
import { getCommunityMemberWhereAdminInput } from './helpers/get-community-member-where-admin.input'

@Injectable()
export class ApiCommunityMemberDataAdminService {
  constructor(private readonly data: ApiCommunityMemberDataService) {}

  async createCommunityMember(input: AdminCreateCommunityMemberInput) {
    return this.data.create(input)
  }

  async deleteCommunityMember(communityMemberId: string) {
    return this.data.delete(communityMemberId)
  }

  async findManyCommunityMember(input: AdminFindManyCommunityMemberInput): Promise<CommunityMemberPaging> {
    return this.data.findMany({
      where: getCommunityMemberWhereAdminInput(input),
      orderBy: { createdAt: 'desc' },
      limit: input.limit,
      page: input.page,
    })
  }

  async findOneCommunityMember(communityMemberId: string) {
    return this.data.findOne(communityMemberId)
  }

  async updateCommunityMember(communityMemberId: string, input: AdminUpdateCommunityMemberInput) {
    return this.data.update(communityMemberId, input)
  }
}
