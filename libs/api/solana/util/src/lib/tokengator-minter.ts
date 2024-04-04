import * as anchor from '@coral-xyz/anchor'
import { PublicKey } from '@solana/web3.js'

export const PREFIX = new TextEncoder().encode('tokengator_minter')
export const MINTER = new TextEncoder().encode('minter')

export enum IdentityProvider {
  Discord = 'discord',
  GitHub = 'github',
  Google = 'google',
  Twitter = 'twitter',
}

export function getMinterPda({ programId, name }: { name: string; programId: PublicKey }) {
  return PublicKey.findProgramAddressSync([PREFIX, MINTER, new TextEncoder().encode(name)], programId)
}

export function getWNSGroupPda(mint: PublicKey, programId: PublicKey) {
  const GROUP_ACCOUNT_SEED = anchor.utils.bytes.utf8.encode('group')
  return PublicKey.findProgramAddressSync([GROUP_ACCOUNT_SEED, mint.toBuffer()], programId)
}

export function getWNSMemberPda(mint: PublicKey, programId: PublicKey) {
  const GROUP_ACCOUNT_SEED = anchor.utils.bytes.utf8.encode('member')
  return PublicKey.findProgramAddressSync([GROUP_ACCOUNT_SEED, mint.toBuffer()], programId)
}

export function getWNSManagerPda(programId: PublicKey) {
  const MANAGER_SEED = anchor.utils.bytes.utf8.encode('manager')
  return PublicKey.findProgramAddressSync([MANAGER_SEED], programId)
}

export const WNS_PROGRAM_ID = new PublicKey('wns1gDLt8fgLcGhWi5MqAqgXpwEP1JftKE9eZnXS1HM')
