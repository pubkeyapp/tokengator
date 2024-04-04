import { Injectable } from '@nestjs/common'
import { ApiCommunityDataService } from './api-community-data.service'
import { AnonFindManyCommunityInput } from './dto/anon-find-many-community.input'
import { CommunityPaging } from './entity/community.entity'
import { getCommunityWhereAnonInput } from './helpers/get-community-where-anon.input'

@Injectable()
export class ApiCommunityDataAnonService {
  constructor(private readonly data: ApiCommunityDataService) {}

  async findManyCommunity(input: AnonFindManyCommunityInput): Promise<CommunityPaging> {
    return this.data.findMany({
      orderBy: { name: 'asc' },
      where: getCommunityWhereAnonInput(input),
      limit: input.limit,
      page: input.page,
    })
  }

  async findOneCommunity(slug: string) {
    return this.data.findOneBySlug(slug)
  }
}
