import { Prisma } from '@prisma/client'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'

export const MINT_USDC: Prisma.CurrencyCreateInput = {
  name: 'USDC',
  symbol: 'USDC',
  address: '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU',
  programId: TOKEN_PROGRAM_ID.toString(),
  decimals: 6,
}
export const MINT_EURC: Prisma.CurrencyCreateInput = {
  name: 'EURC',
  symbol: 'EURC',
  address: 'HzwqbKZw8HxMN6bF2yFZNrht3c2iXXzpKcFu7uBEDKtr',
  programId: TOKEN_PROGRAM_ID.toString(),
  decimals: 6,
}
