import { Keypair, PublicKey } from '@solana/web3.js'

enum IdentityProvider {
  Discord = 'Discord',
  GitHub = 'GitHub',
  Google = 'Google',
  Twitter = 'Twitter',
}

interface MetadataConfig {
  image_url: string
  name: string
  symbol: string
  metadata: [string, string][]
  uri: string
}

// This interface describes how the end user can apply for the document
interface ApplicationConfig {
  // The user needs to link all of these identities before they can apply
  identities: IdentityProvider[]
  // The user needs to pay this amount to apply
  payment_config: PaymentConfig
}

interface MinterConfig {
  mint: PublicKey
  metadata_config: MetadataConfig
  application_config: ApplicationConfig
  // FIELDS BELOW ARE NOT NEEDED FOR CURRENT USE CASE WITH WNS
  // decimals: number
  // interest_config: InterestConfig
  // transfer_fee_config: TransferFeeConfig
}

interface PaymentConfig {
  amount?: number // Amount of items that can be minted
  price: string // Price of the item
  days?: number // Number of days the payment is valid for
  expires_at?: number // Expiration date of the payment based on current timestamp and days
  mint: PublicKey // Mint of the payment (SPL Token)
}

interface Preset {
  bump: number
  name: string
  description: string
  image_url: string
  fee_payer: PublicKey
  authorities: Array<PublicKey>
  minter_config: MinterConfig
  payment_config?: PaymentConfig
}

const feePayer = Keypair.generate()

const preset: Preset[] = [
  {
    bump: 1,
    name: 'Business Visa',
    description:
      'The Business Visa preset is a preset that is used for business purposes. The end user pays to obtain the document and it expires after a certain period of time.',
    image_url: `https://devnet.tokengator.app/api/preset/business-visa.png`,
    fee_payer: feePayer.publicKey,
    authorities: [feePayer.publicKey],
    // NEW: We add a payment_config field to the preset
    payment_config: {
      // The community can mint 100 Business Visa documents
      amount: 100,
      // At a price of 0.1 SOL
      price: '0.1',
      // The mint is the SPL Token mint of the payment
      mint: new PublicKey('So11111111111111111111111111111111111111112'),
      // The community can use this preset for 30 days
      days: 30,
      // The expires_at field is calculated based on the current timestamp and the days field at time of minting
      expires_at: new Date().getTime() + 1000 * 60 * 60 * 24 * 30, // 30 days
    },
    minter_config: {
      mint: Keypair.generate().publicKey,
      metadata_config: {
        // This is a dynamic URL that will be replaced with the mint public key
        image_url: 'https://devnet.tokengator.app/api/metadata/[MINT_PUBKEY].png',
        uri: 'https://devnet.tokengator.app/api/metadata/[MINT_PUBKEY].json',
        name: 'Business Visa',
        symbol: 'BV',
        metadata: [
          ['preset', 'business-visa'],
          ['community', 'tokengator'],
        ],
      },
      // NEW: We add an application_config field to the minter_config
      application_config: {
        // In this case, the user needs to link their Discord and Twitter accounts before they can apply
        identities: [IdentityProvider.Discord, IdentityProvider.Twitter],
        // We set the price to 0.01 SOL and the payment is valid for 30 days
        // The expires_at field is calculated based on the current timestamp and the days field at time of minting
        payment_config: {
          amount: 1,
          price: '0.01',
          mint: new PublicKey('So11111111111111111111111111111111111111112'),
          days: 30,
        },
      },
    },
  },
  {
    bump: 1,
    name: 'Access Document',
    description:
      'The Access Document preset is a preset that is used for physical access to a location. The end user pays to obtain the document and it expires after a certain period of time. The community can scan the QR code to verify the document and track the access history.',
    image_url: `https://devnet.tokengator.app/api/preset/access-document.png`,
    fee_payer: feePayer.publicKey,
    authorities: [feePayer.publicKey],
    minter_config: {
      mint: Keypair.generate().publicKey,
      metadata_config: {
        // This is a dynamic URL that will be replaced with the mint public key
        image_url: 'https://devnet.tokengator.app/api/metadata/[MINT_PUBKEY].png',
        uri: 'https://devnet.tokengator.app/api/metadata/[MINT_PUBKEY].json',
        name: 'Access Document',
        symbol: 'BV',
        metadata: [
          ['preset', 'access-document'],
          ['community', 'tokengator'],
        ],
      },
      application_config: {
        identities: [IdentityProvider.Discord, IdentityProvider.Google],
        payment_config: {
          amount: 1,
          price: '0.01',
          mint: new PublicKey('So11111111111111111111111111111111111111112'),
          days: 30,
        },
      },
    },
    payment_config: {
      amount: 10,
      price: '0.1',
      days: 30,
      mint: new PublicKey('So11111111111111111111111111111111111111112'),
      expires_at: new Date().getTime() + 1000 * 60 * 60 * 24 * 30, // 30 days
    },
  },
]
