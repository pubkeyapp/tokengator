import { Prisma } from '@prisma/client'
import { MINT_USDC } from '@tokengator-mint/api-solana-util'

export const provisionPresets: Prisma.PresetCreateInput[] = [
  {
    name: 'Business Visa',
    description: 'Temporary access, can earn in the community',
    prices: {
      create: [
        //
        monthlyUsd('50', 100),
        yearlyUsd('500', 100),
      ],
    },
  },
  {
    name: 'Visitor Pass',
    description: 'Temporary access, no earning in the community',
    prices: {
      create: [
        //
        monthlyUsd('100', 100),
        yearlyUsd('1000', 100),
      ],
    },
  },
  {
    name: 'Citizenship',
    description: 'Permanent access, no need for renewal',
    prices: {
      create: [
        //
        monthlyUsd('39', 100),
        yearlyUsd('390', 100),
      ],
    },
  },
  {
    name: 'Residence',
    description: 'Permanent access, renewal required',
    prices: {
      create: [
        //
        monthlyUsd('39', 100),
        yearlyUsd('390', 100),
      ],
    },
  },
]

function monthlyUsd(price: string, assets: number): Prisma.PriceCreateWithoutPresetInput {
  return {
    name: 'Monthly',
    days: 30,
    mint: MINT_USDC.address,
    currency: MINT_USDC.name,
    price,
    assets,
  }
}

function yearlyUsd(price: string, assets: number): Prisma.PriceCreateWithoutPresetInput {
  return {
    name: 'Yearly',
    days: 365,
    mint: MINT_USDC.address,
    currency: MINT_USDC.name,
    price,
    assets,
  }
}
