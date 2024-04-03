import { Injectable, Logger } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { TokenMetadata } from '@solana/spl-token-metadata'
import { Keypair, PublicKey } from '@solana/web3.js'
import { ApiCoreService } from '@tokengator-mint/api-core-data-access'
import { ApiSolanaService } from '@tokengator-mint/api-solana-data-access'
import { getKeypairFromSecretKey, keypairToStrings, mintNonFungibleToken } from '@tokengator-mint/api-solana-util'
import { Response } from 'express-serve-static-core'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import satori from 'satori'
import sharp from 'sharp'
import TextToSVG, { GenerationOptions } from 'text-to-svg'

function getMintKeypair(secretKey?: string) {
  const keypair = secretKey ? getKeypairFromSecretKey(secretKey) : Keypair.generate()

  return keypairToStrings(keypair)
}

export type ImageFont = 'Bold' | 'ExtraBold' | 'Medium' | 'Regular' | 'SemiBold'
@Injectable()
export class ApiMintDataService {
  private readonly logger = new Logger(ApiMintDataService.name)
  private readonly fontMap = new Map<ImageFont, TextToSVG>()
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
      additionalMetadata: [...additionalMetadata, ['Issued at', new Date().toISOString()]],
    }

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

  async getMintImage(res: Response, publicKey: string) {
    const mint = await this.ensureMintByPublicKey(publicKey)
    const metadata = await this.solana.getAccountTokenMetadata(mint.publicKey)
    if (!metadata) {
      throw new Error('Mint metadata not found')
    }

    const path = join(__dirname, 'assets', 'images', `bg-document.png`)
    if (!existsSync(path)) {
      throw new Error('Background image not found')
    }

    const bg = readFileSync(path)
    const size = 1024
    const sizeHalf = size / 2

    const { data: overlay } = await sharp(bg)
      .resize({
        fit: sharp.fit.contain,
        height: size,
        width: size,
        position: 'center',
      })
      .toBuffer({ resolveWithObject: true })

    const defaultOptions: GenerationOptions = {
      x: 0,
      y: 0,
      anchor: 'top',
      attributes: {
        fill: '#1c1917',
        stroke: 'black',
      },
    }

    const nameBuffer = await this.getTextImage({
      font: 'Regular',
      text: metadata.name,
      options: {
        // y: 50,
      },
    })

    const symbolBuffer = await this.getTextImage({
      font: 'Regular',
      text: `$${metadata.symbol}`,
    })

    const f = join(__dirname, 'assets', 'fonts', 'BalooBhai2', 'BalooBhai2-Regular.ttf')
    console.log({ f })
    const exists = existsSync(f)
    console.log({ exists })

    const svg = await satori(
      {
        type: 'div',
        props: {
          children: 'PubKey',
          style: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'black',
            fontSize: size / 8,
            fontFamily: 'BalooBhai2 Regular',
            border: '1px solid black',
            width: sizeHalf,
            height: sizeHalf,
          },
        },
      } as any,
      {
        width: sizeHalf,
        height: sizeHalf,
        fonts: [
          {
            name: 'BalooBhai2 Regular',
            // Use `fs` (Node.js only) or `fetch` to read the font as Buffer/ArrayBuffer and provide `data` here.
            data: readFileSync(f),
            weight: 400,
            style: 'normal',
          },
        ],
      },
    )

    const overlayWithName = await sharp(overlay)
      .composite([
        { input: nameBuffer, blend: 'darken', gravity: 'north' },
        { input: symbolBuffer, blend: 'darken', gravity: 'south' },
        { input: Buffer.from(svg), blend: 'darken', gravity: 'center' },
      ])
      .toBuffer()

    const encoded = overlayWithName.toString('base64')

    res.setHeader('Content-Type', 'image/png')
    res.setHeader('Cache-Control', `max-age=${this.core.config.isDevelopment ? 0 : 60}`)
    res.send(Buffer.from(encoded, 'base64'))
  }

  async getTextImage(input: { font: ImageFont; options?: GenerationOptions; text: string }) {
    const options: GenerationOptions = {
      anchor: 'top',
      attributes: {
        fill: '#1c1917',
        stroke: 'black',
        ...input.options?.attributes,
      },
      ...input.options,
    }

    const svg = this.ensureTextToSvg(input.font).getSVG(input.text, options)

    return sharp(Buffer.from(svg)).toBuffer()
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

  private ensureTextToSvg(font: ImageFont) {
    const found = this.getTextToSvg(font)
    if (!found) {
      throw new Error(`Font ${font} not found`)
    }
    return found
  }

  private getTextToSvg(font: ImageFont) {
    if (!this.fontMap.has(font)) {
      const fontPath = join(__dirname, `assets/fonts/BalooBhai2/BalooBhai2-${font}.ttf`)
      this.logger.verbose(`Loading font ${fontPath.replace(__dirname, '')}`)
      const textToSVG = TextToSVG.loadSync(fontPath)
      this.fontMap.set(font, textToSVG)
    }
    return this.fontMap.get(font)
  }
}
