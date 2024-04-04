import { Injectable } from '@nestjs/common'
import { WalletUserCreateInput } from './dto/wallet-user-create.input'
import { WalletUserFindManyInput } from './dto/wallet-user-find-many.input'
import { WalletUserUpdateInput } from './dto/wallet-user-update.input'
import { WalletPaging } from './entity/wallet.entity'
import { getWalletWhereUserInput } from './helpers/get-wallet-where-user.input'
import { ApiWalletDataService } from './api-wallet-data.service'

@Injectable()
export class ApiWalletDataUserService {
  constructor(private readonly data: ApiWalletDataService) {}

  async createWallet(input: WalletUserCreateInput) {
    return this.data.create(input)
  }

  async deleteWallet(walletId: string) {
    return this.data.delete(walletId)
  }

  async findManyWallet(input: WalletUserFindManyInput): Promise<WalletPaging> {
    return this.data.findMany({
      orderBy: { createdAt: 'desc' },
      where: getWalletWhereUserInput(input),
      limit: input.limit,
      page: input.page,
    })
  }

  async findOneWallet(walletId: string) {
    return this.data.findOne(walletId)
  }

  async updateWallet(walletId: string, input: WalletUserUpdateInput) {
    return this.data.update(walletId, input)
  }
}
