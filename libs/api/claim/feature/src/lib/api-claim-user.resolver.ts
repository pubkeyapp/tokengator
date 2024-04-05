import { Resolver } from '@nestjs/graphql'
import { ApiClaimService } from '@tokengator-mint/api-claim-data-access'
import { ApiAuthGraphQLUserGuard } from '@tokengator-mint/api-auth-data-access'
import { Mutation, Query, Args } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  ClaimUserCreateInput,
  ClaimUserFindManyInput,
  Claim,
  ClaimPaging,
  ClaimUserUpdateInput,
} from '@tokengator-mint/api-claim-data-access'

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
