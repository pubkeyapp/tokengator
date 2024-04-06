import { PublicKey } from '@solana/web3.js'
import { IdentityProvider } from '@tokengator/api-identity-data-access'
import { TokenGatorMinter } from '../entity/token-gator-minter.entity'

export interface FormatTokenGatorMinterInput {
  account: {
    bump: number
    communityId: PublicKey | string
    name: string
    description: string
    imageUrl: string
    feePayer: PublicKey | string
    authorities: (PublicKey | string)[]
  }
  publicKey: PublicKey | string
  paymentConfig: {
    amount: number
    price: number
    mint: PublicKey | string
    days: number
    expiresAt: string
  }
  minterConfig: {
    mint: PublicKey | string
    metadataConfig: {
      uri: string
      name: string
      symbol: string
      metadata: string[][] | null
    }
    applicationConfig: {
      identities: {
        discord?: Record<string, never>
        google?: Record<string, never>
        twitter?: Record<string, never>
        gitHub?: Record<string, never>
      }[]
      paymentConfig: {
        amount: number
        price: number
        mint: PublicKey | string
        days: number
        expiresAt: string
      }
    }
  }
}

export function formatTokenGatorMinter({
  account,
  paymentConfig,
  minterConfig: { mint, metadataConfig, applicationConfig },
  publicKey,
}: FormatTokenGatorMinterInput): TokenGatorMinter {
  return {
    publicKey: publicKey.toString(),
    bump: account.bump,
    communityId: account.communityId.toString(),
    name: account.name,
    description: account.description,
    imageUrl: account.imageUrl,
    feePayer: account.feePayer.toString(),
    authorities: account.authorities.map((authority) => authority.toString()),
    paymentConfig: {
      amount: paymentConfig.amount,
      price: paymentConfig.price.toString(),
      mint: paymentConfig.mint.toString(),
      days: paymentConfig.days,
      expiresAt: paymentConfig.expiresAt.toString(),
    },
    minterConfig: {
      mint: mint.toString(),
      applicationConfig: {
        identities: formatIdentityProviders(applicationConfig.identities),
        paymentConfig: {
          amount: applicationConfig.paymentConfig.amount,
          price: applicationConfig.paymentConfig.price.toString(),
          mint: applicationConfig.paymentConfig.mint.toString(),
          days: applicationConfig.paymentConfig.days,
          expiresAt: applicationConfig.paymentConfig.expiresAt.toString(),
        },
      },
      metadataConfig: {
        uri: metadataConfig.uri,
        name: metadataConfig.name,
        symbol: metadataConfig.symbol,
        metadata: metadataConfig.metadata as [string, string][],
      },
    },
  }
}

function formatIdentityProviders(
  identities: {
    discord?: Record<string, never>
    google?: Record<string, never>
    twitter?: Record<string, never>
    gitHub?: Record<string, never>
  }[],
): IdentityProvider[] {
  const providerMap: Record<string, IdentityProvider> = {
    discord: IdentityProvider.Discord,
    google: IdentityProvider.Google,
    twitter: IdentityProvider.Twitter,
    gitHub: IdentityProvider.GitHub,
  }

  return Object.entries(providerMap)
    .filter(([key]) => identities.some((identity) => identity[key as keyof typeof identity]))
    .map(([, value]) => value)
}
