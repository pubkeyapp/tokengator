import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLUserGuard, CtxUserId } from '@tokengator-mint/api-auth-data-access'
import {
  ApiMintService,
  Mint,
  MintPaging,
  UserCreateMintInput,
  UserFindManyMintInput,
  UserUpdateMintInput,
} from '@tokengator-mint/api-mint-data-access'
import { GraphQLJSON } from 'graphql-scalars'

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

  @Mutation(() => GraphQLJSON, { nullable: true })
  userMintToIdentity(
    @CtxUserId() userId: string,
    @Args('mintId') mintId: string,
    @Args('identityId') identityId: string,
  ) {
    return this.service.user.mintToIdentity(userId, mintId, identityId)
  }

  @Query(() => GraphQLJSON, { nullable: true })
  userGetMintAccount(@Args('mintId') mintId: string) {
    return this.service.user.getMintAccount(mintId)
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
