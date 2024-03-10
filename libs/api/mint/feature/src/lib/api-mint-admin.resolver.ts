import { Resolver } from '@nestjs/graphql'
import { ApiMintService } from '@tokengator-mint/api-mint-data-access'
import { ApiAuthGraphQLAdminGuard } from '@tokengator-mint/api-auth-data-access'
import { Mutation, Query, Args } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateMintInput,
  AdminFindManyMintInput,
  Mint,
  MintPaging,
  AdminUpdateMintInput,
} from '@tokengator-mint/api-mint-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiMintAdminResolver {
  constructor(private readonly service: ApiMintService) {}

  @Mutation(() => Mint, { nullable: true })
  adminCreateMint(@Args('input') input: AdminCreateMintInput) {
    return this.service.admin.createMint(input)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteMint(@Args('mintId') mintId: string) {
    return this.service.admin.deleteMint(mintId)
  }

  @Query(() => MintPaging)
  adminFindManyMint(@Args('input') input: AdminFindManyMintInput) {
    return this.service.admin.findManyMint(input)
  }

  @Query(() => Mint, { nullable: true })
  adminFindOneMint(@Args('mintId') mintId: string) {
    return this.service.admin.findOneMint(mintId)
  }

  @Mutation(() => Mint, { nullable: true })
  adminUpdateMint(@Args('mintId') mintId: string, @Args('input') input: AdminUpdateMintInput) {
    return this.service.admin.updateMint(mintId, input)
  }
}
