import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLAdminGuard } from '@tokengator/api-auth-data-access'
import {
  AdminFindManyCommunityInput,
  AdminUpdateCommunityInput,
  ApiCommunityService,
  Community,
  CommunityPaging,
} from '@tokengator/api-community-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiCommunityAdminResolver {
  constructor(private readonly service: ApiCommunityService) {}

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteCommunity(@Args('communityId') communityId: string) {
    return this.service.admin.deleteCommunity(communityId)
  }

  @Query(() => CommunityPaging)
  adminFindManyCommunity(@Args('input') input: AdminFindManyCommunityInput) {
    return this.service.admin.findManyCommunity(input)
  }

  @Query(() => Community, { nullable: true })
  adminFindOneCommunity(@Args('communityId') communityId: string) {
    return this.service.admin.findOneCommunity(communityId)
  }

  @Mutation(() => Community, { nullable: true })
  adminUpdateCommunity(@Args('communityId') communityId: string, @Args('input') input: AdminUpdateCommunityInput) {
    return this.service.admin.updateCommunity(communityId, input)
  }
}
