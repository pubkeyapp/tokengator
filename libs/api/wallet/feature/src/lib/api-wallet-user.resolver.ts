import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLUserGuard, CtxUserId } from '@tokengator/api-auth-data-access'
import {
  ApiWalletService,
  Wallet,
  WalletPaging,
  WalletUserCreateInput,
  WalletUserFindManyInput,
  WalletUserUpdateInput,
} from '@tokengator/api-wallet-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiWalletUserResolver {
  constructor(private readonly service: ApiWalletService) {}

  @Mutation(() => Wallet, { nullable: true })
  userCreateWallet(@CtxUserId() userId: string, @Args('input') input: WalletUserCreateInput) {
    return this.service.user.createWallet(userId, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  userDeleteWallet(@CtxUserId() userId: string, @Args('publicKey') publicKey: string) {
    return this.service.user.deleteWallet(userId, publicKey)
  }

  @Query(() => WalletPaging)
  userFindManyWallet(@CtxUserId() userId: string, @Args('input') input: WalletUserFindManyInput) {
    return this.service.user.findManyWallet(userId, input)
  }

  @Query(() => Wallet, { nullable: true })
  userFindOneWallet(@CtxUserId() userId: string, @Args('publicKey') publicKey: string) {
    return this.service.user.findOneWallet(userId, publicKey)
  }

  @Mutation(() => Wallet, { nullable: true })
  userUpdateWallet(
    @CtxUserId() userId: string,
    @Args('publicKey') publicKey: string,
    @Args('input') input: WalletUserUpdateInput,
  ) {
    return this.service.user.updateWallet(userId, publicKey, input)
  }

  @Mutation(() => Wallet, { nullable: true })
  userSetWalletFeepayer(@CtxUserId() userId: string, @Args('publicKey') publicKey: string) {
    return this.service.user.setWalletFeepayer(userId, publicKey)
  }
}
