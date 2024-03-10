import { Resolver } from '@nestjs/graphql'
import { ApiMintService } from '@tokengator-mint/api-mint-data-access'
import { ApiAuthGraphQLUserGuard } from '@tokengator-mint/api-auth-data-access'
import { Mutation, Query, Args } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateMintInput,
  UserFindManyMintInput,
  Mint,
  MintPaging,
  UserUpdateMintInput,
} from '@tokengator-mint/api-mint-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiMintUserResolver {
  constructor(private readonly service: ApiMintService) {}

  @Mutation(() => Mint, { nullable: true })
  userCreateMint(@Args('input') input: UserCreateMintInput) {
    return this.service.user.createMint(input)
  }

  @Mutation(() => Boolean, { nullable: true })
  userDeleteMint(@Args('mintId') mintId: string) {
    return this.service.user.deleteMint(mintId)
  }

  @Query(() => MintPaging)
  userFindManyMint(@Args('input') input: UserFindManyMintInput) {
    return this.service.user.findManyMint(input)
  }

  @Query(() => Mint, { nullable: true })
  userFindOneMint(@Args('mintId') mintId: string) {
    return this.service.user.findOneMint(mintId)
  }

  @Mutation(() => Mint, { nullable: true })
  userUpdateMint(@Args('mintId') mintId: string, @Args('input') input: UserUpdateMintInput) {
    return this.service.user.updateMint(mintId, input)
  }
}
