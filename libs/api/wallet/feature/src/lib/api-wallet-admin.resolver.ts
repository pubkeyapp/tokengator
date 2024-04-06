import { Resolver } from '@nestjs/graphql'
import { ApiWalletService } from '@tokengator/api-wallet-data-access'
import { ApiAuthGraphQLAdminGuard } from '@tokengator/api-auth-data-access'
import { Mutation, Query, Args } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  WalletAdminCreateInput,
  WalletAdminFindManyInput,
  Wallet,
  WalletPaging,
  WalletAdminUpdateInput,
} from '@tokengator/api-wallet-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiWalletAdminResolver {
  constructor(private readonly service: ApiWalletService) {}

  @Mutation(() => Wallet, { nullable: true })
  adminCreateWallet(@Args('input') input: WalletAdminCreateInput) {
    return this.service.admin.createWallet(input)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteWallet(@Args('walletId') walletId: string) {
    return this.service.admin.deleteWallet(walletId)
  }

  @Query(() => WalletPaging)
  adminFindManyWallet(@Args('input') input: WalletAdminFindManyInput) {
    return this.service.admin.findManyWallet(input)
  }

  @Query(() => Wallet, { nullable: true })
  adminFindOneWallet(@Args('walletId') walletId: string) {
    return this.service.admin.findOneWallet(walletId)
  }

  @Mutation(() => Wallet, { nullable: true })
  adminUpdateWallet(@Args('walletId') walletId: string, @Args('input') input: WalletAdminUpdateInput) {
    return this.service.admin.updateWallet(walletId, input)
  }
}
