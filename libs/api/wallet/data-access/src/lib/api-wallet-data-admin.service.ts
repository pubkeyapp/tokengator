import { Injectable } from '@nestjs/common'
import { ApiWalletDataService } from './api-wallet-data.service'
import { WalletAdminCreateInput } from './dto/wallet-admin-create.input'
import { WalletAdminFindManyInput } from './dto/wallet-admin-find-many.input'
import { WalletAdminUpdateInput } from './dto/wallet-admin-update.input'
import { WalletPaging } from './entity/wallet.entity'
import { getWalletWhereAdminInput } from './helpers/get-wallet-where-admin.input'

@Injectable()
export class ApiWalletDataAdminService {
  constructor(private readonly data: ApiWalletDataService) {}

  async createWallet(input: WalletAdminCreateInput) {
    return this.data.create(input)
  }

  async deleteWallet(walletId: string) {
    return this.data.delete(walletId)
  }

  async findManyWallet(input: WalletAdminFindManyInput): Promise<WalletPaging> {
    return this.data.findMany({
      where: getWalletWhereAdminInput(input),
      limit: input.limit,
      page: input.page,
    })
  }

  async findOneWallet(walletId: string) {
    return this.data.findOne(walletId)
  }

  async updateWallet(walletId: string, input: WalletAdminUpdateInput) {
    return this.data.update(walletId, input)
  }
}
