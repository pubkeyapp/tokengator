import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLAdminGuard } from '@tokengator-mint/api-auth-data-access'
import {
  AdminFindManyMintInput,
  AdminUpdateMintInput,
  ApiMintService,
  Mint,
  MintPaging,
} from '@tokengator-mint/api-mint-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiMintAdminResolver {
  constructor(private readonly service: ApiMintService) {}

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
