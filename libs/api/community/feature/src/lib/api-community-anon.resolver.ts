import { Args, Query, Resolver } from '@nestjs/graphql'
import {
  AnonFindManyCommunityInput,
  ApiCommunityService,
  Community,
  CommunityPaging,
} from '@tokengator/api-community-data-access'

@Resolver()
export class ApiCommunityAnonResolver {
  constructor(private readonly service: ApiCommunityService) {}

  @Query(() => CommunityPaging)
  anonFindManyCommunity(@Args('input') input: AnonFindManyCommunityInput) {
    return this.service.anon.findManyCommunity(input)
  }

  @Query(() => Community, { nullable: true })
  anonFindOneCommunity(@Args('slug') slug: string) {
    return this.service.anon.findOneCommunity(slug)
  }
}
