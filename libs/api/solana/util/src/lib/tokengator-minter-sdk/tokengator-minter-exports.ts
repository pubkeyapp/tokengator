// Here we export some useful types and functions for interacting with the Anchor program.
import { BN } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import type { TokengatorMinter } from './types/tokengator_minter'
import { IDL as TokengatorMinterIDL } from './types/tokengator_minter'

// Re-export the generated IDL and type
export { TokengatorMinter, TokengatorMinterIDL }

// After updating your program ID (e.g. after running `anchor keys sync`) update the value below.
export const TOKENGATOR_MINTER_PROGRAM_ID = new PublicKey('GAToRDEEZmbXSe7ECcChQ1TsZCQXDBCtVhSd1Ypas9h6')

// This is a helper function to get the program ID for the TokengatorMinter program depending on the cluster.
export function getTokengatorMinterProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
    case 'mainnet-beta':
    default:
      return TOKENGATOR_MINTER_PROGRAM_ID
  }
}

export function formatAnchorDate(date: BN) {
  return new Date(parseInt(date?.toString() ?? '') * 1000)
}
