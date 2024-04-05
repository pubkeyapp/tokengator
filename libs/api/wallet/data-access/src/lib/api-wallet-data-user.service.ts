import { Injectable } from '@nestjs/common'
import { ApiWalletDataService } from './api-wallet-data.service'
import { WalletUserCreateInput } from './dto/wallet-user-create.input'
import { WalletUserFindManyInput } from './dto/wallet-user-find-many.input'
import { WalletUserUpdateInput } from './dto/wallet-user-update.input'
import { WalletPaging } from './entity/wallet.entity'
import { getWalletWhereUserInput } from './helpers/get-wallet-where-user.input'

@Injectable()
export class ApiWalletDataUserService {
  constructor(private readonly data: ApiWalletDataService) {}

  async createWallet(userId: string, input: WalletUserCreateInput) {
    await this.data.ensureCommunityAdmin({ userId, communityId: input.communityId })
    return this.data.create(input)
  }

  async deleteWallet(userId: string, publicKey: string) {
    const wallet = await this.findOneWallet(userId, publicKey)
    if (wallet.feePayer) {
      throw new Error('Cannot delete a wallet that is a fee payer')
    }
    return this.data.deleteByPublicKey(publicKey)
  }

  async findManyWallet(userId: string, input: WalletUserFindManyInput): Promise<WalletPaging> {
    await this.data.ensureCommunityAdmin({ userId, communityId: input.communityId })
    return this.data.findMany({
      where: getWalletWhereUserInput(input),
      limit: input.limit,
      page: input.page,
    })
  }

  async findOneWallet(userId: string, publicKey: string) {
    const wallet = await this.data.findOneByPublicKey(publicKey)
    if (!wallet.communityId) {
      throw new Error('Cannot find a wallet that is not associated with a community')
    }
    await this.data.ensureCommunityAdmin({ userId, communityId: wallet.communityId })
    return wallet
  }

  async updateWallet(userId: string, publicKey: string, input: WalletUserUpdateInput) {
    await this.findOneWallet(userId, publicKey)
    return this.data.updateByPublicKey(publicKey, input)
  }

  async setWalletFeepayer(userId: string, publicKey: string) {
    await this.findOneWallet(userId, publicKey)
    return this.data.setFeepayer(publicKey)
  }
}
