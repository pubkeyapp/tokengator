// Here we export some useful types and functions for interacting with the Anchor program.
import { Cluster, PublicKey } from '@solana/web3.js'
import type { WenNewStandard } from './types/wen_new_standard'
import { IDL as WenNewStandardIDL } from './types/wen_new_standard'

// Re-export the generated IDL and type
export { WenNewStandard, WenNewStandardIDL }

// After updating your program ID (e.g. after running `anchor keys sync`) update the value below.
export const WEN_NEW_STANDARD_PROGRAM_ID = new PublicKey('wns1gDLt8fgLcGhWi5MqAqgXpwEP1JftKE9eZnXS1HM')

// This is a helper function to get the program ID for the WenNewStandard program depending on the cluster.
export function getWenNewStandardProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
    case 'mainnet-beta':
    default:
      return WEN_NEW_STANDARD_PROGRAM_ID
  }
}
