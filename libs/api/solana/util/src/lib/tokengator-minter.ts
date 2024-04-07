import { Program, Provider } from '@coral-xyz/anchor'
import { PublicKey } from '@solana/web3.js'
import {
  WEN_NEW_STANDARD_PROGRAM_ID,
  WenNewStandard,
  WenNewStandardIDL,
} from './tokengator-minter-sdk/wen-new-standard-exports'

export const PREFIX = encodeToBuffer('tokengator_minter')
export const MINTER = encodeToBuffer('minter')
export const ACTIVITY = encodeToBuffer('activity')

export enum IdentityProvider {
  Discord = 'discord',
  GitHub = 'github',
  Google = 'google',
  Twitter = 'twitter',
}

export enum IdentityProviderValue {
  discord = 'discord',
  github = 'github',
  google = 'google',
  twitter = 'twitter',
}
export type IdentityProviderRecord = Record<keyof typeof IdentityProviderValue, never>

export function getIdentityProviders(providers: IdentityProvider[]) {
  return providers.map((provider) => getIdentityProvider(provider))
}

export function getIdentityProvider(provider: IdentityProvider): IdentityProviderRecord {
  switch (provider) {
    case IdentityProvider.Discord:
      return { discord: {} } as IdentityProviderRecord
    case IdentityProvider.GitHub:
      return { github: {} } as IdentityProviderRecord
    case IdentityProvider.Google:
      return { google: {} } as IdentityProviderRecord
    case IdentityProvider.Twitter:
      return { twitter: {} } as IdentityProviderRecord
    default:
      throw new Error('Invalid identity provider')
  }
}

export function getMinterPda({ programId, mint, name }: { name: string; mint: PublicKey; programId: PublicKey }) {
  return PublicKey.findProgramAddressSync([PREFIX, MINTER, mint.toBuffer(), encodeToBuffer(name)], programId)
}

export function getCommunityPda(name: string, programId: PublicKey) {
  return PublicKey.findProgramAddressSync([PREFIX, encodeToBuffer(name)], programId)
}

export function getWNSGroupPda(mint: PublicKey, programId: PublicKey) {
  return PublicKey.findProgramAddressSync([encodeToBuffer('group'), mint.toBuffer()], programId)
}

export function getWNSMemberPda(mint: PublicKey, programId: PublicKey) {
  return PublicKey.findProgramAddressSync([encodeToBuffer('member'), mint.toBuffer()], programId)
}

export function getWNSManagerPda(programId: PublicKey) {
  return PublicKey.findProgramAddressSync([encodeToBuffer('manager')], programId)
}

function encodeToBuffer(input: string) {
  return new TextEncoder().encode(input)
}

export function getActivityPda({ programId, mint, label }: { label: string; mint: PublicKey; programId: PublicKey }) {
  return PublicKey.findProgramAddressSync([PREFIX, ACTIVITY, mint.toBuffer(), encodeToBuffer(label)], programId)
}

export function getMetadataProgram(provider: Provider, programId: PublicKey = WEN_NEW_STANDARD_PROGRAM_ID) {
  return new Program(WenNewStandardIDL, programId, provider) as unknown as Program<WenNewStandard>
}
