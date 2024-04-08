import * as anchor from '@coral-xyz/anchor'
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Injectable, Logger } from '@nestjs/common'
import { Preset, PresetActivity } from '@prisma/client'
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
  NATIVE_MINT,
  NATIVE_MINT_2022,
  TOKEN_2022_PROGRAM_ID,
  createWrappedNativeAccount,
  TOKEN_PROGRAM_ID,
  getMint,
  createSyncNativeInstruction,
} from '@solana/spl-token'

import {
  AddressLookupTableAccount,
  AddressLookupTableProgram,
  BlockhashWithExpiryBlockHeight,
  Commitment,
  ComputeBudgetProgram,
  Keypair,
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js'
import { ApiCoreService } from '@tokengator/api-core-data-access'
import { ApiSolanaService } from '@tokengator/api-solana-data-access'
import {
  getActivityPda,
  getCommunityPda,
  getIdentityProviders,
  getMinterPda,
  getReceiptPda,
  getTokengatorMinterProgramId,
  getWNSGroupPda,
  getWNSManagerPda,
  getWNSMemberPda,
  IdentityProvider,
  TokengatorMinterIDL,
  WEN_NEW_STANDARD_PROGRAM_ID,
  WenNewStandardIDL,
} from '@tokengator/api-solana-util'
import { Buffer } from 'buffer'
import { LRUCache } from 'lru-cache'
import { ApiPresetDataService } from './api-preset-data.service'
import { PresetUserMintFromMinter } from './dto/preset-user-mint-from-minter'
import { PresetUserMintFromPreset } from './dto/preset-user-mint-from-preset'
import { TokenGatorActivity } from './entity/token-gator-activity.entity'
import { TokenGatorMinter } from './entity/token-gator-minter.entity'
import { formatTokenGatorMinter } from './helpers/format-token-gator-minter'

@Injectable()
export class ApiPresetMinterService {
  private readonly logger = new Logger(ApiPresetMinterService.name)
  private readonly cacheLatestBlockhash = new LRUCache<string, BlockhashWithExpiryBlockHeight>({
    max: 1000,
    ttl: 30_000,
    fetchMethod: async (commitment = 'confirmed') => {
      this.logger.verbose(`Caching latest blockhash`)
      return this.solana.connection.getLatestBlockhash(commitment as Commitment)
    },
  })
  private readonly cacheSlot = new LRUCache<string, number>({
    max: 1000,
    ttl: 30_000,
    fetchMethod: async (commitment = 'confirmed') => {
      this.logger.verbose(`Caching slot`)
      return this.solana.connection.getSlot(commitment as Commitment)
    },
  })
  private readonly cacheActivity = new LRUCache<string, TokenGatorActivity | boolean>({
    max: 1000,
    ttl: 30_000,
    fetchMethod: async (account: string) => {
      this.logger.verbose(`Caching slot`)
      return this.getProgramTokenMinter()
        .account.activity.fetch(account)
        .then((res) => {
          console.log(`Activity: ${account}`, res)
          return res ? (res as unknown as TokenGatorActivity) : false
        })
        .catch(() => false)
    },
  })

  private readonly feePayer: Keypair
  private readonly programId = getTokengatorMinterProgramId('devnet')

  constructor(readonly data: ApiPresetDataService, readonly core: ApiCoreService, readonly solana: ApiSolanaService) {
    this.feePayer = this.core.config.solanaFeePayer
    this.logger.debug(`Program ID: ${this.programId.toString()}`)
  }

  async getCachedSlot() {
    const slot = await this.cacheSlot.fetch('confirmed')
    if (!slot) {
      throw new Error('Slot not found')
    }
    return slot
  }

  async getCachedBlockhash(): Promise<BlockhashWithExpiryBlockHeight> {
    const blockhash = await this.cacheLatestBlockhash.fetch('confirmed')
    if (!blockhash) {
      throw new Error('Blockhash not found')
    }
    return blockhash
  }

  getMetadataUrl(account: string) {
    return `${this.core.config.apiUrl}/metadata/json/${account}`
  }

  getProgramTokenMinter(provider: AnchorProvider = this.solana.getAnchorProvider()) {
    return new Program(TokengatorMinterIDL, this.programId, provider)
  }

  getProgramWns(provider: AnchorProvider = this.solana.getAnchorProvider()) {
    return new Program(WenNewStandardIDL, WEN_NEW_STANDARD_PROGRAM_ID, provider)
  }

  async topUpWSOL(mint: PublicKey, paymentAmount: anchor.BN, wsolTokenAccount: PublicKey, owner: Keypair) {
    const tokenProgramId = mint.equals(NATIVE_MINT_2022) ? TOKEN_2022_PROGRAM_ID : TOKEN_PROGRAM_ID

    const accountInfo = await this.solana.connection.getAccountInfo(wsolTokenAccount)

    if (!accountInfo) {
      await createWrappedNativeAccount(
        this.solana.connection,
        this.feePayer,
        owner.publicKey,
        paymentAmount,
        undefined,
        { commitment: 'confirmed' },
        tokenProgramId,
        mint,
      )
    } else {
      const { blockhash, lastValidBlockHeight } = await this.solana.connection.getLatestBlockhash('confirmed')

      const transferIx = SystemProgram.transfer({
        fromPubkey: owner.publicKey,
        toPubkey: wsolTokenAccount,
        lamports: paymentAmount,
      })

      const syncNativeIx = createSyncNativeInstruction(wsolTokenAccount, TOKEN_2022_PROGRAM_ID)

      const transaction = new VersionedTransaction(
        new TransactionMessage({
          instructions: [transferIx, syncNativeIx],
          payerKey: this.feePayer.publicKey,
          recentBlockhash: blockhash,
        }).compileToV0Message(),
      )

      transaction.sign([owner, this.feePayer])
      this.sendAndConfirmTransaction({ transaction, blockhash, lastValidBlockHeight })
    }
  }

  async mintFromPreset({ communitySlug, presetId }: PresetUserMintFromPreset) {
    const preset = await this.data.findOne(presetId)

    const authority = await this.getKeypairFromCommunity(communitySlug)
    const programTokenMinter = this.getProgramTokenMinter(this.solana.getAnchorProvider(authority))
    const remoteFeePayer = this.feePayer

    this.logger.debug(
      `Minting from preset: ${presetId} for community: ${communitySlug}, fee payer: ${remoteFeePayer.publicKey.toString()}`,
    )

    const mintKeypair = Keypair.generate()

    const {
      name,
      description,
      imageUrl,
      paymentConfig,
      minterConfig: {
        applicationConfig: { paymentConfig: appPaymentConfig },
        metadataConfig,
      },
    } = getPresetConfig({ communitySlug, url: this.getMetadataUrl(mintKeypair.publicKey.toString()), preset })

    // BELOW HERE WILL MOVE TO THE SDK AT SOME POINT
    const [minter] = getMinterPda({ name, mint: mintKeypair.publicKey, programId: this.programId })

    const [receipt] = getReceiptPda({
      paymentMint: paymentConfig.mint,
      sender: authority.publicKey,
      receiver: authority.publicKey,
      programId: this.programId,
    })

    const [group] = getWNSGroupPda(mintKeypair.publicKey, WEN_NEW_STANDARD_PROGRAM_ID)
    const [manager] = getWNSManagerPda(WEN_NEW_STANDARD_PROGRAM_ID)

    const minterTokenAccount = getAssociatedTokenAddressSync(
      mintKeypair.publicKey,
      minter,
      true,
      TOKEN_2022_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID,
    )

    // TODO: Change funder as per needed
    const funder = authority
    const funderPaymentTokenAccount = getAssociatedTokenAddressSync(
      paymentConfig.mint,
      funder.publicKey,
      false,
      TOKEN_2022_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID,
    )

    const { decimals: paymentConfigDecimals } = await getMint(
      this.solana.connection,
      paymentConfig.mint,
      'confirmed',
      TOKEN_2022_PROGRAM_ID,
    )

    const { decimals: appPaymentConfigDecimals } = await getMint(
      this.solana.connection,
      appPaymentConfig.mint,
      'confirmed',
      TOKEN_2022_PROGRAM_ID,
    )

    const paymentAmount = new anchor.BN(paymentConfig.price * 10 ** paymentConfigDecimals)
    const appPaymentAmount = new anchor.BN(appPaymentConfig.price * 10 ** appPaymentConfigDecimals)

    const authorityPaymentTokenAccount = getAssociatedTokenAddressSync(
      paymentConfig.mint,
      authority.publicKey,
      false,
      TOKEN_2022_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID,
    )

    const feePayerPaymentTokenAccount = getAssociatedTokenAddressSync(
      paymentConfig.mint,
      this.feePayer.publicKey,
      false,
      TOKEN_2022_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID,
    )

    if (paymentConfig.mint.equals(NATIVE_MINT_2022) || paymentConfig.mint.equals(NATIVE_MINT)) {
      this.topUpWSOL(paymentConfig.mint, paymentAmount, funderPaymentTokenAccount, funder)
    }

    const identities = getIdentityProviders([IdentityProvider.Discord])

    const [slot, { blockhash, lastValidBlockHeight }] = await Promise.all([
      this.getCachedSlot(),
      this.getCachedBlockhash(),
    ])

    const [createLookupTableIx, lookupTableAccount] = AddressLookupTableProgram.createLookupTable({
      authority: remoteFeePayer.publicKey,
      payer: remoteFeePayer.publicKey,
      recentSlot: slot - 1,
    })

    const extendLookupTableIx = AddressLookupTableProgram.extendLookupTable({
      addresses: [
        minter,
        group,
        manager,
        receipt,
        minterTokenAccount,
        // funderPaymentTokenAccount,
        authorityPaymentTokenAccount,
        feePayerPaymentTokenAccount,
        authority.publicKey,
        remoteFeePayer.publicKey,
        mintKeypair.publicKey,
        SYSVAR_RENT_PUBKEY,
        WEN_NEW_STANDARD_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID,
        TOKEN_2022_PROGRAM_ID,
        SystemProgram.programId,
      ],
      authority: remoteFeePayer.publicKey,
      lookupTable: lookupTableAccount,
      payer: remoteFeePayer.publicKey,
    })

    const txMessage = new TransactionMessage({
      instructions: [createLookupTableIx, extendLookupTableIx],
      payerKey: remoteFeePayer.publicKey,
      recentBlockhash: blockhash,
    }).compileToV0Message()

    const tx = new VersionedTransaction(txMessage)
    tx.sign([remoteFeePayer])

    await this.sendAndConfirmTransaction({ transaction: tx, blockhash, lastValidBlockHeight })

    const prepareForPaymentIx = await programTokenMinter.methods
      .prepareForPayment({
        paymentAmount,
        paymentType: { community: {} },
      })
      .accounts({
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenProgram: TOKEN_2022_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
        receiver: authority.publicKey,
        sender: funder.publicKey,
        mint: paymentConfig.mint,
        senderTokenAccount: funderPaymentTokenAccount,
        receiverTokenAccount: authorityPaymentTokenAccount,
        feePayer: remoteFeePayer.publicKey,
        receipt,
      })
      .signers([authority])
      .instruction()

    const createMinterWnsIx = await programTokenMinter.methods
      .createMinterWns({
        community: communitySlug,
        name,
        imageUrl,
        description,
        metadataConfig,
        interestConfig: null,
        transferFeeConfig: null,
        applicationConfig: {
          identities,
          paymentConfig: {
            amount: appPaymentConfig.amount,
            days: appPaymentConfig.days,
            expiresAt: new anchor.BN(appPaymentConfig.expiresAt),
            mint: appPaymentConfig.mint,
            price: appPaymentAmount,
          },
        },
        paymentConfig: {
          amount: paymentConfig.amount,
          days: paymentConfig.days,
          mint: paymentConfig.mint,
          price: paymentAmount,
        },
      })
      .accounts({
        minter,
        group,
        manager,
        receipt,
        authorityTokenAccount: authorityPaymentTokenAccount,
        paymentMint: paymentConfig.mint,
        feePayerTokenAccount: feePayerPaymentTokenAccount,
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
      .instruction()

    const { value } = await this.solana.connection.getAddressLookupTable(lookupTableAccount)

    if (!value) {
      throw new Error('Lookup table not found')
    }

    return this.createSendAndConfirmTransaction({
      addressLookupTableAccounts: [value],
      authority,
      feePayer: remoteFeePayer,
      mintKeypair,
      instructions: [
        ComputeBudgetProgram.setComputeUnitLimit({ units: 350_000 }),
        prepareForPaymentIx,
        createMinterWnsIx,
      ],
    })
  }

  async mintFromMinter({ account: minterAccount, communitySlug, username }: PresetUserMintFromMinter) {
    const user = await this.core.ensureUserByUsername({ username })
    const minter = new PublicKey(minterAccount)
    const authority = await this.getKeypairFromCommunity(communitySlug)
    const programTokenMinter = this.getProgramTokenMinter(this.solana.getAnchorProvider(authority))

    const found = await programTokenMinter.account.minter.fetch(minter)
    if (!found) {
      throw new Error(`Minter not found: ${minterAccount}`)
    }

    if (!found?.minterConfig?.metadataConfig) {
      throw new Error(`Minter has no metadata config: ${minterAccount}`)
    }

    const paymentConfig = found.minterConfig.applicationConfig.paymentConfig
    console.log(paymentConfig.price.toString())
    const metadataConfig = found.minterConfig.metadataConfig
    const collectionMetadata = (metadataConfig?.metadata ?? []) as [string, string][]
    const metadataMint: [string, string][] = [['username', user.username]]
    const metadata: [string, string][] = [...collectionMetadata, ...metadataMint] as [string, string][]
    const feePayer = this.feePayer

    // TODO: This should be the user invoking the operation.
    const buyer = this.feePayer

    const mintPublicKey = found.minterConfig.mint
    const memberMintKeypair = Keypair.generate()
    const { name, symbol, uri } = {
      uri: this.getMetadataUrl(memberMintKeypair.publicKey.toString()),
      name: metadataConfig.name,
      symbol: metadataConfig.symbol,
    }

    this.logger.debug(
      `Minting ${
        metadataConfig.name
      } for ${username} in community: ${communitySlug}, fee payer: ${feePayer.publicKey.toString()}`,
    )
    // ---- THIS WILL BE MOVED TO THE SDK AT SOME POINT ----

    const [group] = getWNSGroupPda(mintPublicKey, WEN_NEW_STANDARD_PROGRAM_ID)
    const [member] = getWNSMemberPda(memberMintKeypair.publicKey, WEN_NEW_STANDARD_PROGRAM_ID)
    const [manager] = getWNSManagerPda(WEN_NEW_STANDARD_PROGRAM_ID)

    const [receipt] = getReceiptPda({
      paymentMint: paymentConfig.mint,
      sender: buyer.publicKey,
      receiver: authority.publicKey,
      programId: this.programId,
    })

    const buyerTokenAccount = getAssociatedTokenAddressSync(
      memberMintKeypair.publicKey,
      buyer.publicKey,
      false,
      TOKEN_2022_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID,
    )

    const buyerPaymentTokenAccount = getAssociatedTokenAddressSync(
      paymentConfig.mint,
      buyer.publicKey,
      false,
      TOKEN_2022_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID,
    )

    const authorityPaymentTokenAccount = getAssociatedTokenAddressSync(
      paymentConfig.mint,
      authority.publicKey,
      false,
      TOKEN_2022_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID,
    )

    const paymentAmount = paymentConfig.price
    if (paymentConfig.mint.equals(NATIVE_MINT_2022) || paymentConfig.mint.equals(NATIVE_MINT)) {
      this.topUpWSOL(paymentConfig.mint, paymentAmount, buyerPaymentTokenAccount, buyer)
    }

    const prepareForPaymentIx = await programTokenMinter.methods
      .prepareForPayment({
        paymentAmount,
        paymentType: { user: {} },
      })
      .accounts({
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenProgram: TOKEN_2022_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
        sender: buyer.publicKey,
        receiver: authority.publicKey,
        senderTokenAccount: buyerPaymentTokenAccount,
        receiverTokenAccount: authorityPaymentTokenAccount,
        mint: paymentConfig.mint,
        feePayer: this.feePayer.publicKey,
        receipt,
      })
      .signers([authority])
      .instruction()

    const createMintIx = await programTokenMinter.methods
      .mintMinterWns({ name, symbol, uri, metadata })
      .accounts({
        minter,
        group,
        manager,
        member,
        receipt,
        receiver: buyer.publicKey,
        receiverTokenAccount: buyerTokenAccount,
        authority: authority.publicKey,
        feePayer: feePayer.publicKey,
        mint: memberMintKeypair.publicKey,
        rent: SYSVAR_RENT_PUBKEY,
        wnsProgram: WEN_NEW_STANDARD_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenProgram: TOKEN_2022_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .signers([feePayer, authority, memberMintKeypair])
      .instruction()

    return this.createSendAndConfirmTransaction({
      authority,
      feePayer,
      mintKeypair: memberMintKeypair,
      instructions: [ComputeBudgetProgram.setComputeUnitLimit({ units: 350_000 }), prepareForPaymentIx, createMintIx],
    })
  }

  async addAuthority({
    authority,
    communitySlug,
    minter,
  }: {
    authority: string
    communitySlug: string
    minter: TokenGatorMinter
  }) {
    if (minter.authorities.includes(authority)) {
      throw new Error('Authority already exists.')
    }
    this.logger.verbose(`Adding authority: ${authority} to minter: ${minter.publicKey} in community: ${communitySlug}`)
    const newAuthority = new PublicKey(authority)
    const communityAuthority = await this.getKeypairFromCommunity(communitySlug)
    const feePayer = this.feePayer
    const minterProgram = this.getProgramTokenMinter(this.solana.getAnchorProvider(feePayer))

    const signature = await minterProgram.methods
      .addMinterAuthority({ newAuthority })
      .accounts({
        authority: communityAuthority.publicKey,
        feePayer: feePayer.publicKey,
        minter: new PublicKey(minter.publicKey),
        systemProgram: SystemProgram.programId,
      })
      .signers([feePayer, communityAuthority])
      .rpc({ commitment: 'confirmed', skipPreflight: true })

    this.logger.verbose(`Signature: ${signature}`)

    return signature
  }

  async removeAuthority({
    authority,
    communitySlug,
    minter,
  }: {
    authority: string
    communitySlug: string
    minter: TokenGatorMinter
  }) {
    if (!minter.authorities.includes(authority)) {
      throw new Error('Authority does not exist.')
    }
    this.logger.verbose(
      `Removing authority: ${authority} to minter: ${minter.publicKey} in community: ${communitySlug}`,
    )
    const authorityToRemove = new PublicKey(authority)
    const communityAuthority = await this.getKeypairFromCommunity(communitySlug)
    const feePayer = this.feePayer
    const minterProgram = this.getProgramTokenMinter(this.solana.getAnchorProvider(feePayer))

    const signature = await minterProgram.methods
      .removeMinterAuthority({ authorityToRemove })
      .accounts({
        authority: communityAuthority.publicKey,
        feePayer: feePayer.publicKey,
        minter: new PublicKey(minter.publicKey),
      })
      .signers([feePayer, communityAuthority])
      .rpc({ commitment: 'confirmed', skipPreflight: true })

    this.logger.verbose(`Signature: ${signature}`)

    return signature
  }

  async createActivity({
    minter,
    asset,
    activity,
  }: {
    minter: TokenGatorMinter
    asset: string
    activity: PresetActivity
  }) {
    // const memberPublicKey = new PublicKey(member)
    const [activityPda] = getActivityPda({
      mint: new PublicKey(asset),
      label: activity.toLowerCase(),
      programId: this.programId,
    })

    const mintPublicKey = new PublicKey(minter.minterConfig.mint)
    const [group] = getWNSGroupPda(mintPublicKey, WEN_NEW_STANDARD_PROGRAM_ID)

    const assetPublicKey = new PublicKey(asset)
    const [member] = getWNSMemberPda(new PublicKey(asset), WEN_NEW_STANDARD_PROGRAM_ID)

    const [slot, { blockhash, lastValidBlockHeight }] = await Promise.all([
      this.getCachedSlot(),
      this.getCachedBlockhash(),
    ])

    const [createLookupTableIx, lookupTableAccount] = AddressLookupTableProgram.createLookupTable({
      authority: this.feePayer.publicKey,
      payer: this.feePayer.publicKey,
      recentSlot: slot - 1,
    })

    const extendLookupTableIx = AddressLookupTableProgram.extendLookupTable({
      addresses: [
        group,
        activityPda,
        new PublicKey(minter.publicKey),
        member,
        this.feePayer.publicKey,
        SYSVAR_RENT_PUBKEY,
        WEN_NEW_STANDARD_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID,
        TOKEN_2022_PROGRAM_ID,
        SystemProgram.programId,
      ],
      authority: this.feePayer.publicKey,
      lookupTable: lookupTableAccount,
      payer: this.feePayer.publicKey,
    })

    const txMessage = new TransactionMessage({
      instructions: [createLookupTableIx, extendLookupTableIx],
      payerKey: this.feePayer.publicKey,
      recentBlockhash: blockhash,
    }).compileToV0Message()

    const tx = new VersionedTransaction(txMessage)
    tx.sign([this.feePayer])

    await this.sendAndConfirmTransaction({ transaction: tx, blockhash, lastValidBlockHeight })

    // Wait for 500 ms
    await new Promise((resolve) => setTimeout(resolve, 750))

    this.logger.debug(`Creating activity: ${activity} for minter: ${minter.publicKey}`)
    const createActivityIx = await this.getProgramTokenMinter(this.solana.getAnchorProvider(this.feePayer))
      .methods.createActivity({
        label: activity.toLowerCase(),
        endDate: null,
        startDate: null,
      })
      .accounts({
        activity: activityPda,
        minter: minter.publicKey,
        mint: assetPublicKey,
        group,
        member,
        systemProgram: SystemProgram.programId,
      })
      .instruction()

    const { value: lookupTableStore } = await this.solana.connection.getAddressLookupTable(lookupTableAccount)

    if (!lookupTableStore) {
      throw new Error('Lookup table not found')
    }
    this.logger.debug(`Lookup table: ${lookupTableStore}`)
    const transactionMessage = new TransactionMessage({
      instructions: [ComputeBudgetProgram.setComputeUnitLimit({ units: 30_000 }), createActivityIx],
      payerKey: this.feePayer.publicKey,
      recentBlockhash: blockhash,
    }).compileToV0Message([lookupTableStore])

    const transaction = new VersionedTransaction(transactionMessage)
    transaction.sign([this.feePayer])

    this.logger.debug(`Sending Transaction: ${transactionMessage}`)

    await this.sendAndConfirmTransaction({ transaction, blockhash, lastValidBlockHeight })

    this.logger.verbose(`Activity created: ${activity} for minter: ${minter.publicKey}`)

    return
  }

  async getMinters(): Promise<TokenGatorMinter[]> {
    return this.getProgramTokenMinter()
      .account.minter.all()
      .then((res) =>
        res
          .map(({ account: { minterConfig, paymentConfig, ...account }, publicKey }) =>
            formatTokenGatorMinter({
              account,
              publicKey,
              paymentConfig,
              minterConfig,
            }),
          )
          .sort((a, b) => a.name.localeCompare(b.name)),
      )
  }

  getActivityPda({ asset, label }: { asset: PublicKey; label: string }) {
    const [account] = getActivityPda({
      mint: asset,
      label: label.toLowerCase(),
      programId: this.programId,
    })
    return account
  }

  async getActivity({ asset, label }: { asset: PublicKey; label: string }) {
    const pda = this.getActivityPda({ asset, label })
    const activity = await this.cacheActivity.fetch(pda.toBase58())

    return { pda, activity }
  }

  getCommunityPda(communitySlug: string): PublicKey {
    const [account] = getCommunityPda(communitySlug, this.programId)
    return account
  }

  async getMintersByCommunity(communitySlug: string): Promise<TokenGatorMinter[]> {
    const account = this.getCommunityPda(communitySlug)

    return this.getProgramTokenMinter()
      .account.minter.all([{ memcmp: { offset: 8 + 1, bytes: account.toBase58() } }])
      .then((res) =>
        res
          .map(({ account: { minterConfig, paymentConfig, ...account }, publicKey }) =>
            formatTokenGatorMinter({
              account,
              publicKey,
              paymentConfig,
              minterConfig,
            }),
          )
          .sort((a, b) => a.name.localeCompare(b.name)),
      )
  }

  async getMinterAssets(account: string) {
    const found = await this.getMinter(account)
    const [group] = getWNSGroupPda(new PublicKey(found.minterConfig.mint), WEN_NEW_STANDARD_PROGRAM_ID)

    return this.getGroupMembers({ account: group })
      .then((res) => res.map((member) => member.account.mint))
      .then((accounts) => this.solana.connection.getMultipleParsedAccounts(accounts))
      .then((res) => res.value ?? [])
  }

  async getMinter(publicKey: string): Promise<TokenGatorMinter> {
    return this.getProgramTokenMinter()
      .account.minter.fetch(new PublicKey(publicKey))
      .then(({ minterConfig, paymentConfig, ...account }) =>
        formatTokenGatorMinter({
          account,
          publicKey,
          paymentConfig,
          minterConfig,
        }),
      )
  }

  private async createSendAndConfirmTransaction({
    addressLookupTableAccounts,
    instructions,
    feePayer,
    authority,
    mintKeypair,
  }: {
    addressLookupTableAccounts?: AddressLookupTableAccount[]
    authority: Keypair
    feePayer: Keypair
    mintKeypair: Keypair
    instructions: TransactionInstruction[]
  }): Promise<string> {
    const { blockhash, lastValidBlockHeight } = await this.getCachedBlockhash()
    const transactionMessage = new TransactionMessage({
      instructions,
      payerKey: feePayer.publicKey,
      recentBlockhash: blockhash,
    }).compileToV0Message(addressLookupTableAccounts)

    const transaction = new VersionedTransaction(transactionMessage)
    transaction.sign([feePayer, authority, mintKeypair])

    return this.sendAndConfirmTransaction({ transaction, blockhash, lastValidBlockHeight })
  }

  private async sendAndConfirmTransaction({
    transaction,
    blockhash,
    lastValidBlockHeight,
  }: {
    transaction: VersionedTransaction
    blockhash: string
    lastValidBlockHeight: number
  }): Promise<string> {
    console.log(Buffer.from(transaction.serialize()).toString('base64'))
    const signature = await this.solana.connection.sendTransaction(transaction, { skipPreflight: true })
    this.logger.debug(`Signature: ${signature}`)
    await this.solana.connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature }, 'confirmed')
    this.logger.debug(`Confirmed: ${signature}`)
    return signature
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
    return this.getProgramWns()
      .account.tokenGroupMember.all([{ memcmp: { offset: 32 + 8, bytes: account.toBase58() } }])
      .then((res) => res.sort((a, b) => a.account.memberNumber - b.account.memberNumber))
  }
}

function getPresetConfig({ communitySlug, url, preset }: { communitySlug: string; url: string; preset: Preset }) {
  return {
    name: preset.name,
    description: preset.description ?? '',
    imageUrl: preset.imageUrl ?? '',
    paymentConfig: getPaymentConfig({
      amount: 1,
      price: 0.5,
      days: 30,
    }),
    minterConfig: {
      metadataConfig: {
        uri: url,
        name: preset.name,
        symbol: 'TGC',
        metadata: [
          ['preset', preset.id],
          ['community', communitySlug],
        ],
      },
      // NEW: We add an application_config field to the minter_config
      applicationConfig: {
        // In this case, the user needs to link their Discord and Twitter accounts before they can apply
        identities: [IdentityProvider.Discord, IdentityProvider.Twitter],
        // We set the price to 0.01 SOL and the payment is valid for 30 days
        // The expires_at field is calculated based on the current timestamp and the days field at time of minting
        paymentConfig: getPaymentConfig({
          amount: 1,
          price: 0.1,
          days: 30,
        }),
      },
    },
  }
}

function daysFromNow(n: number) {
  return new Date().getTime() + 24 * 60 * 60 * n
}

function getPaymentConfig({
  days,
  price,
  amount,
  mint = NATIVE_MINT_2022,
}: {
  days: number
  price: number
  amount: number
  mint?: PublicKey
}) {
  return {
    amount,
    price,
    mint,
    days,
    expiresAt: daysFromNow(days),
  }
}
