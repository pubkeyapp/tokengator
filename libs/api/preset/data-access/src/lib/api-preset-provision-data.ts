import { Prisma } from '@prisma/client'

export const provisionPresets: Prisma.PresetCreateInput[] = [
  {
    name: 'Business Visa',
    description: 'Temporary access, can earn in the community',
    imageUrl: 'https://raw.githubusercontent.com/pubkeyapp/tokengator-assets/main/presets/preset-business-visa.png',
    color: 'indigo',
    config: {},
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
    imageUrl: 'https://raw.githubusercontent.com/pubkeyapp/tokengator-assets/main/presets/preset-visitor-pass.png',
    color: 'lime',
    config: {},
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
    imageUrl: 'https://raw.githubusercontent.com/pubkeyapp/tokengator-assets/main/presets/preset-citizenship.png',
    color: 'grape',
    config: {},
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
    imageUrl: 'https://raw.githubusercontent.com/pubkeyapp/tokengator-assets/main/presets/preset-residence.png',
    color: 'teal',
    config: {},
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
