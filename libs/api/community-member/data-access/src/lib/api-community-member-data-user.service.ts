import { Injectable } from '@nestjs/common'
import { ApiCommunityMemberDataService } from './api-community-member-data.service'
import { UserCreateCommunityMemberInput } from './dto/user-create-community-member.input'
import { UserFindManyCommunityMemberInput } from './dto/user-find-many-community-member.input'
import { UserUpdateCommunityMemberInput } from './dto/user-update-community-member.input'
import { CommunityMemberPaging } from './entity/community-member.entity'
import { getCommunityMemberWhereUserInput } from './helpers/get-community-member-where-user.input'

@Injectable()
export class ApiCommunityMemberDataUserService {
  constructor(private readonly data: ApiCommunityMemberDataService) {}

  async createCommunityMember(input: UserCreateCommunityMemberInput) {
    return this.data.create(input)
  }

  async deleteCommunityMember(communityMemberId: string) {
    return this.data.delete(communityMemberId)
  }

  async findManyCommunityMember(input: UserFindManyCommunityMemberInput): Promise<CommunityMemberPaging> {
    return this.data.findMany({
      where: getCommunityMemberWhereUserInput(input),
      orderBy: { createdAt: 'desc' },
      limit: input.limit,
      page: input.page,
    })
  }

  async findOneCommunityMember(communityMemberId: string) {
    return this.data.findOne(communityMemberId)
  }

  async updateCommunityMember(communityMemberId: string, input: UserUpdateCommunityMemberInput) {
    return this.data.update(communityMemberId, input)
  }
}
