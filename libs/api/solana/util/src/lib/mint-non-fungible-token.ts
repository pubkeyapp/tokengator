// Import necessary functions and constants from the Solana web3.js and SPL Token packages
import {
  AuthorityType,
  createAssociatedTokenAccountIdempotent,
  createInitializeMetadataPointerInstruction,
  createInitializeMintInstruction,
  createSetAuthorityInstruction,
  ExtensionType,
  getMetadataPointerState,
  getMint,
  getMintLen,
  getTokenMetadata,
  LENGTH_SIZE,
  mintTo,
  TOKEN_2022_PROGRAM_ID,
  TYPE_SIZE,
} from '@solana/spl-token'
import {
  createInitializeInstruction,
  createRemoveKeyInstruction,
  createUpdateFieldInstruction,
  pack,
  TokenMetadata,
} from '@solana/spl-token-metadata'
import { Connection, Keypair, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from '@solana/web3.js'

function generateExplorerUrl(identifier: string, isAddress: boolean = false): string {
  if (!identifier) return ''
  const baseUrl = 'https://solana.fm'
  const localSuffix = '?cluster=devnet-solana'
  const slug = isAddress ? 'address' : 'tx'
  return `${baseUrl}/${slug}/${identifier}${localSuffix}`
}

export async function mintNonFungibleToken({
  connection,
  payer,
  owner,
  mintKeypair,
  tokenMetadata,
}: {
  connection: Connection
  payer: Keypair
  owner: PublicKey
  mintKeypair: Keypair
  tokenMetadata: TokenMetadata
}) {
  const mint = mintKeypair.publicKey
  const authority = payer

  const decimals = 0
  const mintAmount = 1

  try {
    // 1. Create Token and Mint
    const [initSig, mintSig] = await createTokenAndMint({
      connection,
      payer,
      authority,
      mintKeypair,
      mint,
      tokenMetadata,
      decimals,
      owner,
      mintAmount,
    })
    console.log(`Token created and minted:`)
    console.log(`   ${generateExplorerUrl(initSig)}`)
    console.log(`   ${generateExplorerUrl(mintSig)}`)

    // 2. Remove Metadata Field
    const cleanMetaTxId = await removeMetadataField({
      connection,
      payer,
      authority,
      mint,
    })
    console.log(`Metadata field removed:`)
    console.log(`   ${generateExplorerUrl(cleanMetaTxId)}`)

    // 3. Remove Authority
    const removeAuthTxId = await removeTokenAuthority({
      connection,
      payer,
      authority,
      mint,
    })
    console.log(`Authority removed:`)
    console.log(`   ${generateExplorerUrl(removeAuthTxId)}`)

    // 4. Increment Points
    const incrementPointsTxId = await incrementPoints({
      connection,
      payer,
      authority,
      mint,
      pointsToAdd: 10,
    })
    console.log(`Points incremented:`)
    console.log(`   ${generateExplorerUrl(incrementPointsTxId)}`)

    // Log New NFT
    console.log(`New NFT:`)
    console.log(`   ${generateExplorerUrl(mint.toBase58(), true)}`)

    return {
      mint,
      tokenMetadata,
      initSig,
      mintSig,
      cleanMetaTxId,
      removeAuthTxId,
      incrementPointsTxId,
    }
  } catch (err) {
    console.error(err)
    return null
  }
}

async function createTokenAndMint({
  connection,
  payer,
  authority,
  mintKeypair,
  mint,
  tokenMetadata,
  decimals,
  mintAmount,
  owner,
}: {
  connection: Connection
  payer: Keypair
  authority: Keypair
  mintKeypair: Keypair
  mint: PublicKey
  tokenMetadata: TokenMetadata
  decimals: number
  mintAmount: number
  owner: PublicKey
}): Promise<[string, string]> {
  // Calculate the minimum balance for the mint account
  const mintLen = getMintLen([ExtensionType.MetadataPointer])
  const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(tokenMetadata).length
  const mintLamports = await connection.getMinimumBalanceForRentExemption(mintLen + metadataLen)

  // Prepare transaction
  const transaction = new Transaction().add(
    SystemProgram.createAccount({
      fromPubkey: payer.publicKey,
      newAccountPubkey: mint,
      space: mintLen,
      lamports: mintLamports,
      programId: TOKEN_2022_PROGRAM_ID,
    }),
    createInitializeMetadataPointerInstruction(mint, authority.publicKey, mint, TOKEN_2022_PROGRAM_ID),
    createInitializeMintInstruction(mint, decimals, authority.publicKey, null, TOKEN_2022_PROGRAM_ID),
    createInitializeInstruction({
      programId: TOKEN_2022_PROGRAM_ID,
      metadata: mint,
      updateAuthority: authority.publicKey,
      mint: mint,
      mintAuthority: authority.publicKey,
      name: tokenMetadata.name,
      symbol: tokenMetadata.symbol,
      uri: tokenMetadata.uri,
    }),
    createUpdateFieldInstruction({
      programId: TOKEN_2022_PROGRAM_ID,
      metadata: mint,
      updateAuthority: authority.publicKey,
      field: tokenMetadata.additionalMetadata[0][0],
      value: tokenMetadata.additionalMetadata[0][1],
    }),
    createUpdateFieldInstruction({
      programId: TOKEN_2022_PROGRAM_ID,
      metadata: mint,
      updateAuthority: authority.publicKey,
      field: tokenMetadata.additionalMetadata[1][0],
      value: tokenMetadata.additionalMetadata[1][1],
    }),
    createUpdateFieldInstruction({
      programId: TOKEN_2022_PROGRAM_ID,
      metadata: mint,
      updateAuthority: authority.publicKey,
      field: tokenMetadata.additionalMetadata[2][0],
      value: tokenMetadata.additionalMetadata[2][1],
    }),
  )
  // Initialize NFT with metadata
  const initSig = await sendAndConfirmTransaction(connection, transaction, [payer, mintKeypair, authority])
  // Create associated token account
  const sourceAccount = await createAssociatedTokenAccountIdempotent(
    connection,
    payer,
    mint,
    owner,
    {},
    TOKEN_2022_PROGRAM_ID,
  )
  // Mint NFT to associated token account
  const mintSig = await mintTo(
    connection,
    payer,
    mint,
    sourceAccount,
    authority,
    mintAmount,
    [],
    undefined,
    TOKEN_2022_PROGRAM_ID,
  )

  return [initSig, mintSig]
}

async function removeMetadataField({
  connection,
  payer,
  authority,
  mint,
}: {
  connection: Connection
  payer: Keypair
  authority: Keypair
  mint: PublicKey
}): Promise<string> {
  const transaction = new Transaction().add(
    createRemoveKeyInstruction({
      programId: TOKEN_2022_PROGRAM_ID,
      metadata: mint,
      updateAuthority: authority.publicKey,
      key: 'WrongData',
      idempotent: true,
    }),
  )

  return sendAndConfirmTransaction(connection, transaction, [payer, authority])
}

async function removeTokenAuthority({
  connection,
  payer,
  authority,
  mint,
}: {
  connection: Connection
  payer: Keypair
  authority: Keypair
  mint: PublicKey
}): Promise<string> {
  const transaction = new Transaction().add(
    createSetAuthorityInstruction(mint, authority.publicKey, AuthorityType.MintTokens, null, [], TOKEN_2022_PROGRAM_ID),
  )
  return await sendAndConfirmTransaction(connection, transaction, [payer, authority])
}

async function incrementPoints({
  connection,
  payer,
  authority,
  mint,
  pointsToAdd = 1,
}: {
  connection: Connection
  payer: Keypair
  authority: Keypair
  mint: PublicKey
  pointsToAdd?: number
}) {
  // Retrieve mint information
  const mintInfo = await getMint(connection, mint, 'confirmed', TOKEN_2022_PROGRAM_ID)

  const metadataPointer = getMetadataPointerState(mintInfo)

  if (!metadataPointer || !metadataPointer.metadataAddress) {
    throw new Error('No metadata pointer found')
  }

  const metadata = await getTokenMetadata(connection, metadataPointer?.metadataAddress)

  if (!metadata) {
    throw new Error('No metadata found')
  }
  if (metadata.mint.toBase58() !== mint.toBase58()) {
    throw new Error('Metadata does not match mint')
  }

  const currentPoints = metadata.additionalMetadata
    .find(([key]) => key === 'Points')
    ?.map(([, value]) => value)
    .find((value) => value !== undefined)

  let pointsAsNumber = parseInt(currentPoints ?? '0')
  pointsAsNumber += pointsToAdd
  const transaction = new Transaction().add(
    createUpdateFieldInstruction({
      programId: TOKEN_2022_PROGRAM_ID,
      metadata: mint,
      updateAuthority: authority.publicKey,
      field: 'Points',
      value: pointsAsNumber.toString(),
    }),
  )
  return await sendAndConfirmTransaction(connection, transaction, [payer, authority])
}
