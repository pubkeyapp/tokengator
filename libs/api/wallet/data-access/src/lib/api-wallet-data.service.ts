import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { Keypair } from '@solana/web3.js'
import { ApiCoreService, ellipsify, PagingInputFields } from '@tokengator-mint/api-core-data-access'
import { WalletPaging } from './entity/wallet.entity'

@Injectable()
export class ApiWalletDataService {
  constructor(readonly core: ApiCoreService) {}

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
        communityId: input.communityId,
      },
    })
  }

  async delete(walletId: string) {
    await this.findOne(walletId)
    const deleted = await this.core.data.wallet.delete({ where: { id: walletId } })
    return !!deleted
  }

  async deleteByPublicKey(publicKey: string) {
    await this.findOneByPublicKey(publicKey)
    const deleted = await this.core.data.wallet.delete({ where: { publicKey } })
    return !!deleted
  }

  async findMany({
    limit = 10,
    page = 1,
    ...input
  }: Prisma.WalletFindManyArgs & PagingInputFields): Promise<WalletPaging> {
    return this.core.data.wallet
      .paginate({ ...input, orderBy: [{ feePayer: 'desc' }, { name: 'asc' }] })
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

  async findOneByPublicKey(publicKey: string) {
    const found = await this.core.data.wallet.findUnique({ where: { publicKey } })
    if (!found) {
      throw new Error('Wallet not found')
    }
    return found
  }

  async update(walletId: string, input: Pick<Prisma.WalletUpdateInput, 'name'>) {
    const found = await this.findOne(walletId)
    const name = input.name || ellipsify(found.publicKey, 10)
    return this.core.data.wallet.update({ where: { id: walletId }, data: { ...input, name } })
  }

  async updateByPublicKey(publicKey: string, input: Pick<Prisma.WalletUpdateInput, 'name'>) {
    const found = await this.findOneByPublicKey(publicKey)
    const name = input.name || ellipsify(found.publicKey, 10)
    return this.core.data.wallet.update({ where: { publicKey }, data: { ...input, name } })
  }

  async setFeepayer(publicKey: string) {
    const wallet = await this.findOneByPublicKey(publicKey)
    if (!wallet) {
      throw new Error('Wallet not found')
    }
    if (wallet.feePayer) {
      throw new Error('Wallet is already a fee payer')
    }
    // Update all other wallets to not be fee payers
    await this.core.data.wallet.updateMany({ where: { publicKey: { not: publicKey } }, data: { feePayer: false } })
    // Update the selected wallet to be a fee payer
    return this.core.data.wallet.update({ where: { publicKey }, data: { feePayer: true } })
  }
}
