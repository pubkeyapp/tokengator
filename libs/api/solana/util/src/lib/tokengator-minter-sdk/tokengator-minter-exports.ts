// Here we export some useful types and functions for interacting with the Anchor program.
import { Cluster, PublicKey } from '@solana/web3.js'
import type { TokengatorMinter } from './types/tokengator_minter'
import { IDL as TokengatorMinterIDL } from './types/tokengator_minter'

// Re-export the generated IDL and type
export { TokengatorMinter, TokengatorMinterIDL }

// After updating your program ID (e.g. after running `anchor keys sync`) update the value below.
export const TOKENGATOR_MINTER_PROGRAM_ID = new PublicKey('TPLx9nrMKbk3uQoHHL2pxepyYx4A4RH58EAPqsYE9ir')

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
