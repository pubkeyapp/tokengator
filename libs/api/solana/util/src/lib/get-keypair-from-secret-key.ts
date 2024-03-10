import { Keypair } from '@solana/web3.js'

export function getKeypairFromSecretKey(secretKey: string) {
  return Keypair.fromSecretKey(Uint8Array.from(JSON.parse(secretKey)))
}

export function keypairToStrings(keypair: Keypair): { publicKey: string; secretKey: string } {
  return {
    publicKey: keypair.publicKey.toString(),
    secretKey: `[${keypair.secretKey.join(',')}]`,
  }
}
