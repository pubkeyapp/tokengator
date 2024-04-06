import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLUserGuard, CtxUserId } from '@tokengator/api-auth-data-access'
import {
  ApiClaimService,
  Claim,
  ClaimPaging,
  ClaimUserCreateInput,
  ClaimUserFindManyInput,
  ClaimUserUpdateInput,
} from '@tokengator/api-claim-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiClaimUserResolver {
  constructor(private readonly service: ApiClaimService) {}

  @Mutation(() => Claim, { nullable: true })
  userCreateClaim(@Args('input') input: ClaimUserCreateInput) {
    return this.service.user.createClaim(input)
  }

  @Mutation(() => Boolean, { nullable: true })
  userDeleteClaim(@Args('claimId') claimId: string) {
    return this.service.user.deleteClaim(claimId)
  }

  @Query(() => Claim)
  userGetClaim(@CtxUserId() userId: string, @Args('claimId') claimId: string) {
    return this.service.user.userGetClaim(userId, claimId)
  }

  @Query(() => [Claim])
  userGetClaims(@CtxUserId() userId: string) {
    return this.service.user.userGetClaims(userId)
  }

  @Query(() => ClaimPaging)
  userFindManyClaim(@Args('input') input: ClaimUserFindManyInput) {
    return this.service.user.findManyClaim(input)
  }

  @Query(() => Claim, { nullable: true })
  userFindOneClaim(@Args('claimId') claimId: string) {
    return this.service.user.findOneClaim(claimId)
  }

  @Mutation(() => Claim, { nullable: true })
  userUpdateClaim(@Args('claimId') claimId: string, @Args('input') input: ClaimUserUpdateInput) {
    return this.service.user.updateClaim(claimId, input)
  }
}
