import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { TokenMetadata } from '@solana/spl-token-metadata'
import { Keypair, PublicKey } from '@solana/web3.js'
import { ApiCoreService } from '@tokengator-mint/api-core-data-access'
import { ApiSolanaService } from '@tokengator-mint/api-solana-data-access'
import { getKeypairFromSecretKey, keypairToStrings, mintNonFungibleToken } from '@tokengator-mint/api-solana-util'

function getMintKeypair(secretKey?: string) {
  const keypair = secretKey ? getKeypairFromSecretKey(secretKey) : Keypair.generate()

  return keypairToStrings(keypair)
}

@Injectable()
export class ApiMintDataService {
  constructor(private readonly core: ApiCoreService, private readonly solana: ApiSolanaService) {}

  async createMint(input: Omit<Prisma.MintUncheckedCreateInput, 'publicKey' | 'secretKey'> & { secretKey?: string }) {
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

  async getMintAccount(mintId: string) {
    const found = await this.findOneMint(mintId)
    if (!found) {
      return null
    }

    try {
      const account = await this.solana.getAccount(found.publicKey)
      if (!account) {
        return null
      }
      return account
    } catch (error) {
      return null
    }
  }

  async mintToIdentity(mintId: string, identityId: string) {
    const [mint, identity] = await Promise.all([
      this.findOneMint(mintId),
      this.core.data.identity.findUnique({ where: { id: identityId } }),
    ])
    if (!mint || !identity) {
      throw new Error('Mint or Identity not found')
    }
    const account = await this.solana.getAccount(mint.publicKey)
    if (account) {
      throw new Error('Mint account already exists on Solana')
    }
    const mintKeypair = getKeypairFromSecretKey(mint.secretKey)

    if (!mintKeypair) {
      throw new Error('Invalid mint secret key')
    }

    const owner = new PublicKey(identity.providerId)
    const payer = this.core.config.solanaFeePayer
    const additionalMetadata: TokenMetadata['additionalMetadata'] = mint.metadata
      ? (mint.metadata as TokenMetadata['additionalMetadata'])
      : []
    const tokenMetadata: TokenMetadata = {
      updateAuthority: payer.publicKey,
      mint: mintKeypair.publicKey,
      name: mint.name,
      symbol: mint.symbol,
      uri: mint.uri ?? `http://localhost:3000/api/mint/uri/${mint.id}`,
      additionalMetadata,
    }

    console.log({
      mint,
      identity,
      account,
    })
    const mintIt = await mintNonFungibleToken({
      payer,
      owner,
      connection: this.solana.connection,
      mintKeypair,
      tokenMetadata,
    })

    if (!mintIt) {
      throw new Error('Minting failed')
    }
    console.log('mintIt', mintIt)
    return mintIt
  }

  async getMintUri(publicKey: string) {
    const mint = await this.ensureMintByPublicKey(publicKey)

    const account = await this.solana.getAccount(mint.publicKey)
    if (!account) {
      throw new Error('Mint account not found on Solana')
    }
  }

  async getMintImage(publicKey: string) {
    const mint = await this.ensureMintByPublicKey(publicKey)
    const metadata = await this.solana.getAccountTokenMetadata(mint.publicKey)
    if (!metadata) {
      throw new Error('Mint metadata not found')
    }
    console.log('CREATE IMAGE', {
      metadata,
    })

    return metadata
  }

  async getMintMetadata(publicKey: string) {
    const mint = await this.ensureMintByPublicKey(publicKey)
    const metadata = await this.solana.getAccountTokenMetadata(mint.publicKey)

    console.log({
      metadata,
    })
    return metadata
  }

  private async ensureMintByPublicKey(publicKey: string) {
    if (!publicKey) {
      throw new Error('Public key is required')
    }
    const found = await this.core.data.mint.findUnique({ where: { publicKey } })
    if (!found) {
      throw new Error(`Mint ${publicKey} not found`)
    }
    return found
  }
}
