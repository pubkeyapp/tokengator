import * as anchor from '@coral-xyz/anchor'
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Injectable, Logger } from '@nestjs/common'
import { ASSOCIATED_TOKEN_PROGRAM_ID, getAssociatedTokenAddressSync, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token'

import { Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } from '@solana/web3.js'
import { ApiCoreService } from '@tokengator-mint/api-core-data-access'
import { ApiSolanaService } from '@tokengator-mint/api-solana-data-access'
import {
  getCommunityPda,
  getMinterPda,
  getTokengatorMinterProgramId,
  getWNSGroupPda,
  getWNSManagerPda,
  getWNSMemberPda,
  IdentityProvider,
  TokengatorMinter,
  TokengatorMinterIDL,
  WEN_NEW_STANDARD_PROGRAM_ID,
  WenNewStandard,
  WenNewStandardIDL,
} from '@tokengator-mint/api-solana-util'

@Injectable()
export class ApiPresetMinterService {
  private readonly logger = new Logger(ApiPresetMinterService.name)
  private readonly feePayer: Keypair
  private readonly provider: AnchorProvider
  private readonly programTokenMinter: Program<TokengatorMinter>
  private readonly programWns: Program<WenNewStandard>
  private readonly programId: PublicKey

  constructor(readonly core: ApiCoreService, readonly solana: ApiSolanaService) {
    this.feePayer = this.core.config.solanaFeePayer
    this.provider = this.solana.getAnchorProvider(this.feePayer)
    this.programId = getTokengatorMinterProgramId('devnet')
    this.programTokenMinter = new Program(TokengatorMinterIDL, this.programId, this.provider)

    this.programWns = new Program(WenNewStandardIDL, WEN_NEW_STANDARD_PROGRAM_ID, this.provider)
    this.logger.debug(`Program ID: ${this.programId.toString()}`)
  }

  async mintFromPreset(presetId: string, communitySlug: string) {
    console.log({
      presetId,
      communitySlug,
    })
    const communityFeePayer = await this.getKeypairFromCommunity(communitySlug)
    const authority = communityFeePayer
    const remoteFeePayer = this.feePayer

    this.logger.debug(
      `Minting from preset: ${presetId} for community: ${communitySlug}, fee payer: ${communityFeePayer.publicKey.toString()}`,
    )

    // Random id between 0 and 1000
    const randId = Math.floor(Math.random() * 1000)
    const minterName = `Business Visa #${randId}`

    // BELOW HERE WILL MOVE TO THE SDK AT SOME POINT
    const mintKeypair = Keypair.generate()
    const [minter] = getMinterPda({ name: minterName, mint: mintKeypair.publicKey, programId: this.programId })
    const [group] = getWNSGroupPda(mintKeypair.publicKey, WEN_NEW_STANDARD_PROGRAM_ID)
    const [manager] = getWNSManagerPda(WEN_NEW_STANDARD_PROGRAM_ID)

    const minterTokenAccount = getAssociatedTokenAddressSync(
      mintKeypair.publicKey,
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
          uri: `https://devnet.tokengator.app/api/metadata/json/${mintKeypair.publicKey.toString()}.json`,
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

    const signature = await this.programTokenMinter.methods
      .createMinterWns({
        community: communitySlug,
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
        mint: mintKeypair.publicKey,
        rent: SYSVAR_RENT_PUBKEY,
        wnsProgram: WEN_NEW_STANDARD_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenProgram: TOKEN_2022_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .signers([authority, mintKeypair, remoteFeePayer])
      .rpc({ commitment: 'confirmed' })

    this.logger.debug(`Signature: ${signature}`)
    return signature
  }

  async mintFromMinter(minterAccount: string, communitySlug: string) {
    const minter = new PublicKey(minterAccount)

    const found = await this.programTokenMinter.account.minter.fetch(minter)
    if (!found) {
      throw new Error(`Minter not found: ${minterAccount}`)
    }

    const communityFeePayer = await this.getKeypairFromCommunity(communitySlug)
    const authority = communityFeePayer
    const remoteFeePayer = this.feePayer

    const groupMintPublicKey = found.minterConfig.mint
    const memberMintKeypair = Keypair.generate()

    // ---- THIS WILL BE MOVED TO THE SDK AT SOME POINT ----

    const [group] = getWNSGroupPda(groupMintPublicKey, WEN_NEW_STANDARD_PROGRAM_ID)
    const [member] = getWNSMemberPda(memberMintKeypair.publicKey, WEN_NEW_STANDARD_PROGRAM_ID)
    const [manager] = getWNSManagerPda(WEN_NEW_STANDARD_PROGRAM_ID)

    const { name, symbol, uri } = {
      uri: `https://devnet.tokengator.app/api/metadata/json/${memberMintKeypair.publicKey.toString()}`,
      name: 'test',
      symbol: 'HI',
    }

    const authorityTokenAccount = getAssociatedTokenAddressSync(
      memberMintKeypair.publicKey,
      authority.publicKey,
      false,
      TOKEN_2022_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID,
    )

    const signature = await this.programTokenMinter.methods
      .mintMinterWns({ name, symbol, uri })
      .accounts({
        minter,
        group,
        manager,
        member,
        authorityTokenAccount,
        authority: authority.publicKey,
        feePayer: remoteFeePayer.publicKey,
        mint: memberMintKeypair.publicKey,
        rent: SYSVAR_RENT_PUBKEY,
        wnsProgram: WEN_NEW_STANDARD_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenProgram: TOKEN_2022_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .signers([authority, memberMintKeypair])
      .rpc({ commitment: 'confirmed' })

    this.logger.debug(`Signature: ${signature}`)

    return signature
  }

  async getMinters() {
    return this.programTokenMinter.account.minter.all()
  }

  async getMintersByCommunity(communitySlug: string) {
    const [account] = getCommunityPda(communitySlug, this.programId)

    return this.programTokenMinter.account.minter.all([{ memcmp: { offset: 8 + 1, bytes: account.toBase58() } }])
  }

  async getMinterAssets(account: string) {
    const found = await this.getMinter(account)
    const [group] = getWNSGroupPda(found.minterConfig.mint, WEN_NEW_STANDARD_PROGRAM_ID)

    return this.getGroupMembers({ account: group })
      .then((res) => res.map((member) => member.account.mint))
      .then((accounts) => this.solana.connection.getMultipleParsedAccounts(accounts))
      .then((res) => res.value ?? [])
  }

  async getMinter(account: string) {
    return this.programTokenMinter.account.minter.fetch(new PublicKey(account))
  }

  private async getKeypairFromCommunity(communitySlug: string): Promise<Keypair> {
    const community = await this.core.data.community.findUnique({
      where: { slug: communitySlug },
      include: { wallets: { where: { feePayer: true } } },
    })
    if (!community) {
      throw new Error(`Community not found: ${communitySlug}`)
    }
    if (!community.wallets.length) {
      throw new Error(`Community has no wallets: ${communitySlug}. Please set a fee payer wallet for the community.`)
    }
    const wallet = community.wallets[0]
    return Keypair.fromSecretKey(Uint8Array.from(JSON.parse(wallet.secretKey)))
  }

  private async getGroupMembers({ account }: { account: PublicKey }) {
    return this.programWns.account.tokenGroupMember
      .all([{ memcmp: { offset: 32 + 8, bytes: account.toBase58() } }])
      .then((res) => res.sort((a, b) => a.account.memberNumber - b.account.memberNumber))
  }
}
