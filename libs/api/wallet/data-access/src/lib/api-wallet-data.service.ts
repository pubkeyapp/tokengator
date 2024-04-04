import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { Keypair } from '@solana/web3.js'
import { ApiCoreService, ellipsify, PagingInputFields } from '@tokengator-mint/api-core-data-access'
import { WalletPaging } from './entity/wallet.entity'

@Injectable()
export class ApiWalletDataService {
  constructor(private readonly core: ApiCoreService) {}

  async create(
    input: Omit<Prisma.WalletUncheckedCreateInput, 'name' | 'publicKey' | 'secretKey'> & { secretKey?: string },
  ) {
    const kp = input.secretKey
      ? Keypair.fromSecretKey(Uint8Array.from(JSON.parse(input.secretKey)))
      : Keypair.generate()
    const publicKey = kp.publicKey.toBase58()
    const name = ellipsify(publicKey, 10)
    return this.core.data.wallet.create({
      data: {
        secretKey: JSON.stringify(Array.from(kp.secretKey)),
        name,
        publicKey,
      },
    })
  }

  async delete(walletId: string) {
    await this.findOne(walletId)
    const deleted = await this.core.data.wallet.delete({ where: { id: walletId } })
    return !!deleted
  }

  async findMany({
    limit = 10,
    page = 1,
    ...input
  }: Prisma.WalletFindManyArgs & PagingInputFields): Promise<WalletPaging> {
    return this.core.data.wallet
      .paginate(input)
      .withPages({ limit, page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOne(walletId: string) {
    const found = await this.core.data.wallet.findUnique({ where: { id: walletId } })
    if (!found) {
      throw new Error('Wallet not found')
    }
    return found
  }

  async update(walletId: string, input: Prisma.WalletUpdateInput) {
    const found = await this.findOne(walletId)
    if (input.publicKey) {
      throw new Error('Cannot update publicKey')
    }
    const name = input.name || ellipsify(found.publicKey, 10)
    return this.core.data.wallet.update({ where: { id: walletId }, data: { ...input, name } })
  }
}
