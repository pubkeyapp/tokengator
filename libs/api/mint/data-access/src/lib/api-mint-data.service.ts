import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { Keypair } from '@solana/web3.js'
import { ApiCoreService } from '@tokengator-mint/api-core-data-access'

function getMintKeypair(secretKey?: string) {
  const kp = secretKey ? Keypair.fromSecretKey(Uint8Array.from(JSON.parse(secretKey))) : Keypair.generate()

  return {
    publicKey: kp.publicKey.toString(),
    secretKey: `[${kp.secretKey.join(',')}]`,
  }
}

@Injectable()
export class ApiMintDataService {
  constructor(private readonly core: ApiCoreService) {}

  async createMint(input: Omit<Prisma.MintCreateInput, 'publicKey' | 'secretKey'> & { secretKey?: string }) {
    const { publicKey, secretKey } = getMintKeypair(input.secretKey)

    return this.core.data.mint.create({ data: { ...input, publicKey, secretKey } })
  }

  async deleteMint(mintId: string) {
    const deleted = await this.core.data.mint.delete({ where: { id: mintId } })
    return !!deleted
  }

  async findOneMint(mintId: string) {
    return this.core.data.mint.findUnique({ where: { id: mintId } })
  }

  async updateMint(mintId: string, input: Prisma.MintUpdateInput) {
    return this.core.data.mint.update({ where: { id: mintId }, data: input })
  }
}
