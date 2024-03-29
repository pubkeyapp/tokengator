import { Connection } from '@solana/web3.js'
import { Minter, updateTokenMinterMetadata } from '@tokengator/minter'
import { daysFromNow } from './preset-business-visa'

export function setBusinessVisaExpired({ connection, minter }: { connection: Connection; minter: Minter }) {
  return updateTokenMinterMetadata({
    connection,
    minter,
    metadata: [
      ['status', 'expired'],
      ['expiresAt', new Date(daysFromNow(-1)).toISOString()],
    ],
  })
}
