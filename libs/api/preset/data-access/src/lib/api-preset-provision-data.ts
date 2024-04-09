import { Prisma } from '@prisma/client'
import { PresetActivity } from './entity/preset-activity.enum'

export const provisionPresets: Prisma.PresetCreateInput[] = [
  {
    enabled: true,
    name: 'Business Visa',
    description: 'Temporary access, can earn in the community',
    imageUrl: 'https://raw.githubusercontent.com/pubkeyapp/tokengator-assets/main/presets/preset-business-visa.png',
    color: 'indigo',
    config: {},
    activities: [PresetActivity.Payouts],
    prices: {
      create: [
        //
        monthlyUsd('50.00', 100),
        yearlyUsd('500.00', 100),
      ],
    },
  },
  {
    enabled: false,
    name: 'Visitor Pass',
    description: 'Temporary access, no earning in the community',
    imageUrl: 'https://raw.githubusercontent.com/pubkeyapp/tokengator-assets/main/presets/preset-visitor-pass.png',
    color: 'lime',
    config: {},
    activities: [PresetActivity.Points],
    prices: {
      create: [
        //
        monthlyUsd('100.00', 100),
        yearlyUsd('1000.00', 100),
      ],
    },
  },
  {
    enabled: false,
    name: 'Citizenship',
    description: 'Permanent access, no need for renewal',
    imageUrl: 'https://raw.githubusercontent.com/pubkeyapp/tokengator-assets/main/presets/preset-citizenship.png',
    color: 'grape',
    config: {},
    activities: [],
    prices: {
      create: [
        //
        monthlyUsd('39.00', 100),
        yearlyUsd('390.00', 100),
      ],
    },
  },
  {
    enabled: false,
    name: 'Residence',
    description: 'Permanent access, renewal required',
    imageUrl: 'https://raw.githubusercontent.com/pubkeyapp/tokengator-assets/main/presets/preset-residence.png',
    color: 'teal',
    config: {},
    activities: [PresetActivity.Payouts],
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
