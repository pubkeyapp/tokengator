import * as anchor from '@coral-xyz/anchor'
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Injectable, Logger } from '@nestjs/common'
import { ASSOCIATED_TOKEN_PROGRAM_ID, getAssociatedTokenAddressSync, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token'

import { Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } from '@solana/web3.js'
import { ApiCoreService } from '@tokengator-mint/api-core-data-access'
import { ApiSolanaService } from '@tokengator-mint/api-solana-data-access'
import {
  getMinterPda,
  getTokengatorMinterProgramId,
  getWNSGroupPda,
  getWNSManagerPda,
  IdentityProvider,
  TokengatorMinter,
  TokengatorMinterIDL,
  WNS_PROGRAM_ID,
} from '@tokengator-mint/api-solana-util'

@Injectable()
export class ApiPresetMinterService {
  private readonly logger = new Logger(ApiPresetMinterService.name)
  private readonly feePayer: Keypair
  private readonly provider: AnchorProvider
  private readonly program: Program<TokengatorMinter>
  private readonly programId: PublicKey

  constructor(readonly core: ApiCoreService, readonly solana: ApiSolanaService) {
    this.feePayer = this.core.config.solanaFeePayer
    this.provider = this.solana.getAnchorProvider(this.feePayer)
    this.programId = getTokengatorMinterProgramId('devnet')
    this.program = new Program(TokengatorMinterIDL, this.programId, this.provider)
    this.logger.debug(`Program ID: ${this.programId.toString()}`)
  }

  async mintFromPreset(presetId: string, communityId: string) {
    const community = await this.core.data.community.findUnique({
      where: { id: communityId },
      include: {
        wallets: {
          where: {
            // TODO: Add feePayer boolean to Wallet model
            name: 'Fee Payer',
          },
        },
      },
    })
    if (!community) {
      throw new Error(`Community not found: ${communityId}`)
    }
    if (!community.wallets.length) {
      throw new Error(
        `Community has no wallets: ${communityId}. Please add a wallet with the name 'Fee Payer' to the community.`,
      )
    }
    const wallet = community.wallets[0]
    const communityFeePayer = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(wallet.secretKey)))

    const authority = communityFeePayer

    this.logger.debug(
      `Minting from preset: ${presetId} for community: ${communityId}, fee payer: ${communityFeePayer.publicKey.toString()}`,
    )
    const remoteFeePayer = this.feePayer

    // Random id between 0 and 1000
    const randId = Math.floor(Math.random() * 1000)
    const minterName = `Business Visa #${randId}`

    // BELOW HERE WILL MOVE TO THE SDK AT SOME POINT

    const groupMintKeypair = Keypair.generate()
    const [minter] = getMinterPda({ name: minterName, programId: this.programId })
    const [group] = getWNSGroupPda(groupMintKeypair.publicKey, WNS_PROGRAM_ID)
    const [manager] = getWNSManagerPda(WNS_PROGRAM_ID)

    const minterTokenAccount = getAssociatedTokenAddressSync(
      groupMintKeypair.publicKey,
      minter,
      true,
      TOKEN_2022_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID,
    )

    const {
      name,
      description,
      imageUrl,
      paymentConfig,
      minterConfig: {
        applicationConfig: { paymentConfig: appPaymentConfig, identities },
        metadataConfig,
      },
    } = {
      name: minterName,
      description:
        'The Business Visa preset is a preset that is used for business purposes. The end user pays to obtain the document and it expires after a certain period of time.',
      imageUrl: `https://devnet.tokengator.app/api/preset/business-visa.png`,
      // NEW: We add a payment_config field to the preset
      paymentConfig: {
        // The community can mint 100 Business Visa documents
        amount: 100,
        // At a price of 0.1 SOL
        price: 0.1 * LAMPORTS_PER_SOL,
        // The mint is the SPL Token mint of the payment
        mint: new PublicKey('So11111111111111111111111111111111111111112'),
        // The community can use this preset for 30 days
        days: 30,
        // The expires_at field is calculated based on the current timestamp and the days field at time of minting
        expiresAt: new Date().getTime() + 1000 * 60 * 60 * 24 * 30, // 30 days
      },
      minterConfig: {
        metadataConfig: {
          uri: `https://devnet.tokengator.app/api/metadata/json/${groupMintKeypair.publicKey.toString()}.json`,
          name: 'Business Visa',
          symbol: 'BV',
          metadata: [
            ['preset', 'business-visa'],
            ['community', 'tokengator'],
          ],
        },
        // NEW: We add an application_config field to the minter_config
        applicationConfig: {
          // In this case, the user needs to link their Discord and Twitter accounts before they can apply
          identities: [IdentityProvider.Discord, IdentityProvider.Twitter],
          // We set the price to 0.01 SOL and the payment is valid for 30 days
          // The expires_at field is calculated based on the current timestamp and the days field at time of minting
          paymentConfig: {
            amount: 1,
            price: 0.01 * LAMPORTS_PER_SOL,
            mint: new PublicKey('So11111111111111111111111111111111111111112'),
            days: 30,
            // The expires_at field is calculated based on the current timestamp and the days field at time of minting
            expiresAt: new Date().getTime() + 1000 * 60 * 60 * 24 * 30, // 30 days
          },
        },
      },
    }

    const signature = await this.program.methods
      .createMinterWns({
        name,
        imageUrl,
        description,
        interestConfig: null,
        transferFeeConfig: null,
        applicationConfig: {
          identities: [],
          paymentConfig: {
            amount: appPaymentConfig.amount,
            days: appPaymentConfig.days,
            expiresAt: new anchor.BN(appPaymentConfig.expiresAt),
            mint: appPaymentConfig.mint,
            price: new anchor.BN(appPaymentConfig.price),
          },
        },
        metadataConfig: {
          metadata: metadataConfig.metadata,
          name: metadataConfig.name,
          symbol: metadataConfig.symbol,
          uri: metadataConfig.uri,
        },
        paymentConfig: {
          amount: paymentConfig.amount,
          days: paymentConfig.days,
          expiresAt: new anchor.BN(paymentConfig.expiresAt),
          mint: paymentConfig.mint,
          price: new anchor.BN(paymentConfig.price),
        },
      })
      .accounts({
        minter,
        group,
        manager,
        minterTokenAccount,
        authority: authority.publicKey,
        feePayer: remoteFeePayer.publicKey,
        mint: groupMintKeypair.publicKey,
        rent: SYSVAR_RENT_PUBKEY,
        wnsProgram: WNS_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenProgram: TOKEN_2022_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .signers([authority, groupMintKeypair, remoteFeePayer])
      .rpc({ commitment: 'confirmed' })

    this.logger.debug(`Signature: ${signature}`)
    return signature
  }
}
