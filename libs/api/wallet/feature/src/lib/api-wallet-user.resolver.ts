import { Resolver } from '@nestjs/graphql'
import { ApiWalletService } from '@tokengator-mint/api-wallet-data-access'
import { ApiAuthGraphQLUserGuard } from '@tokengator-mint/api-auth-data-access'
import { Mutation, Query, Args } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  WalletUserCreateInput,
  WalletUserFindManyInput,
  Wallet,
  WalletPaging,
  WalletUserUpdateInput,
} from '@tokengator-mint/api-wallet-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiWalletUserResolver {
  constructor(private readonly service: ApiWalletService) {}

  @Mutation(() => Wallet, { nullable: true })
  userCreateWallet(@Args('input') input: WalletUserCreateInput) {
    return this.service.user.createWallet(input)
  }

  @Mutation(() => Boolean, { nullable: true })
  userDeleteWallet(@Args('walletId') walletId: string) {
    return this.service.user.deleteWallet(walletId)
  }

  @Query(() => WalletPaging)
  userFindManyWallet(@Args('input') input: WalletUserFindManyInput) {
    return this.service.user.findManyWallet(input)
  }

  @Query(() => Wallet, { nullable: true })
  userFindOneWallet(@Args('walletId') walletId: string) {
    return this.service.user.findOneWallet(walletId)
  }

  @Mutation(() => Wallet, { nullable: true })
  userUpdateWallet(@Args('walletId') walletId: string, @Args('input') input: WalletUserUpdateInput) {
    return this.service.user.updateWallet(walletId, input)
  }
}
