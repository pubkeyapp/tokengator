import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLUserGuard, CtxUserId } from '@tokengator/api-auth-data-access'
import {
  ApiCommunityService,
  Community,
  CommunityPaging,
  UserCreateCommunityInput,
  UserFindManyCommunityInput,
  UserUpdateCommunityInput,
} from '@tokengator/api-community-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiCommunityUserResolver {
  constructor(private readonly service: ApiCommunityService) {}

  @Mutation(() => Community, { nullable: true })
  userCreateCommunity(@CtxUserId() userId: string, @Args('input') input: UserCreateCommunityInput) {
    return this.service.user.createCommunity(userId, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  userDeleteCommunity(@Args('communityId') communityId: string) {
    return this.service.user.deleteCommunity(communityId)
  }

  @Query(() => CommunityPaging)
  userFindManyCommunity(@Args('input') input: UserFindManyCommunityInput) {
    return this.service.user.findManyCommunity(input)
  }

  @Query(() => Community, { nullable: true })
  userFindOneCommunity(@Args('slug') slug: string) {
    return this.service.user.findOneCommunity(slug)
  }

  @Mutation(() => Community, { nullable: true })
  userUpdateCommunity(@Args('communityId') communityId: string, @Args('input') input: UserUpdateCommunityInput) {
    return this.service.user.updateCommunity(communityId, input)
  }
}
