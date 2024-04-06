import { Resolver } from '@nestjs/graphql'
import { ApiClaimService } from '@tokengator/api-claim-data-access'
import { ApiAuthGraphQLAdminGuard } from '@tokengator/api-auth-data-access'
import { Mutation, Query, Args } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  ClaimAdminCreateInput,
  ClaimAdminFindManyInput,
  Claim,
  ClaimPaging,
  ClaimAdminUpdateInput,
} from '@tokengator/api-claim-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiClaimAdminResolver {
  constructor(private readonly service: ApiClaimService) {}

  @Mutation(() => Claim, { nullable: true })
  adminCreateClaim(@Args('input') input: ClaimAdminCreateInput) {
    return this.service.admin.createClaim(input)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteClaim(@Args('claimId') claimId: string) {
    return this.service.admin.deleteClaim(claimId)
  }

  @Query(() => ClaimPaging)
  adminFindManyClaim(@Args('input') input: ClaimAdminFindManyInput) {
    return this.service.admin.findManyClaim(input)
  }

  @Query(() => Claim, { nullable: true })
  adminFindOneClaim(@Args('claimId') claimId: string) {
    return this.service.admin.findOneClaim(claimId)
  }

  @Mutation(() => Claim, { nullable: true })
  adminUpdateClaim(@Args('claimId') claimId: string, @Args('input') input: ClaimAdminUpdateInput) {
    return this.service.admin.updateClaim(claimId, input)
  }
}
