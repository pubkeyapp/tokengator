import { Prisma } from '@prisma/client'

export const provisionPresets: Prisma.PresetCreateInput[] = [
  {
    name: 'Business Visa',
    description: 'Temporary access, can earn in the community',
    prices: {
      create: [
        //
        monthlyUsd('50.00', 100),
        yearlyUsd('500.00', 100),
      ],
    },
  },
  {
    name: 'Visitor Pass',
    description: 'Temporary access, no earning in the community',
    prices: {
      create: [
        //
        monthlyUsd('100.00', 100),
        yearlyUsd('1000.00', 100),
      ],
    },
  },
  {
    name: 'Citizenship',
    description: 'Permanent access, no need for renewal',
    prices: {
      create: [
        //
        monthlyUsd('39.00', 100),
        yearlyUsd('390.00', 100),
      ],
    },
  },
  {
    name: 'Residence',
    description: 'Permanent access, renewal required',
    prices: {
      create: [
        //
        monthlyUsd('39.00', 100),
        yearlyUsd('390.00', 100),
      ],
    },
  },
]

function monthlyUsd(price: string, assets: number): Prisma.PriceCreateWithoutPresetInput {
  return {
    name: 'Monthly',
    days: 30,
    currency: { connect: { symbol: 'USDC' } },
    price,
    assets,
  }
}

function yearlyUsd(price: string, assets: number): Prisma.PriceCreateWithoutPresetInput {
  return {
    name: 'Yearly',
    days: 365,
    currency: { connect: { symbol: 'USDC' } },
    price,
    assets,
  }
}
