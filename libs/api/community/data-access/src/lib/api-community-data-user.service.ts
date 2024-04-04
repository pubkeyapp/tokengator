import { Injectable } from '@nestjs/common'
import { ApiCommunityDataService } from './api-community-data.service'
import { UserCreateCommunityInput } from './dto/user-create-community.input'
import { UserFindManyCommunityInput } from './dto/user-find-many-community.input'
import { UserUpdateCommunityInput } from './dto/user-update-community.input'
import { CommunityPaging } from './entity/community.entity'
import { getCommunityWhereUserInput } from './helpers/get-community-where-user.input'

@Injectable()
export class ApiCommunityDataUserService {
  constructor(private readonly data: ApiCommunityDataService) {}

  async createCommunity(userId: string, input: UserCreateCommunityInput) {
    return this.data.create(input, userId)
  }

  async deleteCommunity(communityId: string) {
    return this.data.delete(communityId)
  }

  async findManyCommunity(input: UserFindManyCommunityInput): Promise<CommunityPaging> {
    return this.data.findMany({
      orderBy: { name: 'asc' },
      where: getCommunityWhereUserInput(input),
      limit: input.limit,
      page: input.page,
    })
  }

  async findOneCommunity(slug: string) {
    return this.data.findOneBySlug(slug)
  }

  async updateCommunity(communityId: string, input: UserUpdateCommunityInput) {
    return this.data.update(communityId, input)
  }
}
