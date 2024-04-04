import { Prisma } from '@prisma/client'

export const MINT_USDC: Prisma.CurrencyCreateInput = {
  name: 'USDC',
  symbol: 'USDC',
  mint: '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU',
  decimals: 6,
}
