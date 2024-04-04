import { LAMPORTS_PER_SOL } from '@solana/web3.js'

export function formatSol(amount: string) {
  return formatPrice((parseInt(amount) / LAMPORTS_PER_SOL).toString(), 6) + ' SOL'
}

export function formatPrice(amount: string, decimals = 2) {
  return Intl.NumberFormat('en-US', { maximumFractionDigits: decimals }).format(parseFloat(amount))
}
