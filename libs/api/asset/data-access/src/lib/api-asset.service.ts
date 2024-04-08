import { Injectable } from '@nestjs/common'
import { PublicKey } from '@solana/web3.js'
import { ApiMetadataService } from '@tokengator/api-metadata-data-access'
import {
  ApiPresetService,
  PresetActivity,
  TokenGatorActivity,
  TokenGatorAsset,
} from '@tokengator/api-preset-data-access'

@Injectable()
export class ApiAssetService {
  constructor(private readonly metadata: ApiMetadataService, private readonly preset: ApiPresetService) {}

  async getAsset(account: string): Promise<TokenGatorAsset> {
    const { json, accountMetadata } = await this.metadata.getAll(account)

    if (!json) {
      throw new Error('Asset metadata not found')
    }

    const mint = accountMetadata?.state.updateAuthority
    if (!mint) {
      throw new Error('Asset minter not found')
    }

    const presetId = json.attributes.find((attr) => attr.trait_type === 'preset' && attr.value)?.value
    if (!presetId) {
      throw new Error('Asset preset not found')
    }

    const preset = await this.preset.data.findOne(presetId)

    return {
      account,
      name: json.name,
      description: json.description,
      image: json.image,
      activities: preset.activities ?? [],
      attributes: json.attributes.map((attr) => [attr.trait_type, attr.value]),
    }
  }

  async getAssetActivity(account: string, type: PresetActivity): Promise<TokenGatorActivity | null> {
    const { accountMetadata } = await this.metadata.getAll(account)

    const mint = accountMetadata?.state.updateAuthority
    if (!mint) {
      throw new Error('Asset minter not found')
    }

    const { pda, activity } = await this.preset.minter.getActivity({
      asset: new PublicKey(account),
      label: type.toLowerCase(),
    })

    if (typeof activity === 'boolean') {
      return null
    }
    if (!activity) {
      throw new Error('Activity not found')
    }

    // this.preset.minter.getCommunityPda()
    console.log(`Account, type: ${account}, ${type}`, activity)

    const found = {
      label: `${type}`,
      startDate: new Date(),
      endDate: new Date().getTime() + 30 * 24 * 60 * 60 * 1000,
      entries:
        type === PresetActivity.Payouts
          ? [
              { timestamp: new Date(2024, 0, 1), message: 'Payout for December 2023', points: 100 },
              { timestamp: new Date(2024, 1, 1), message: 'Payout for January 2024', points: 100 },
              { timestamp: new Date(2024, 2, 1), message: 'Payout for February 2024', points: 100 },
              { timestamp: new Date(2024, 3, 1), message: 'Payout for March 2024', points: 100 },
            ]
          : [
              { timestamp: new Date(2024, 0, 1), message: 'Points for January 1st 2023', points: 5 },
              { timestamp: new Date(2024, 0, 2), message: 'Points for January 2nd 2023', points: 5 },
              { timestamp: new Date(2024, 0, 3), message: 'Points for January 3rd 2023', points: 5 },
              { timestamp: new Date(2024, 0, 4), message: 'Points for January 4th 2023', points: 5 },
              { timestamp: new Date(2024, 0, 5), message: 'Points for January 5th 2023', points: 5 },
              { timestamp: new Date(2024, 0, 6), message: 'Points for January 6th 2023', points: 5 },
              { timestamp: new Date(2024, 0, 7), message: 'Points for January 7th 2023', points: 5 },
            ],
    }

    const pointsTotal = found.entries.reduce((acc, entry) => acc + (entry.points ?? 0), 0)
    const pointsLabel = type === PresetActivity.Payouts ? 'USD' : 'Points'

    return {
      account: pda.toString(),
      type,
      label: activity.label,
      endDate: null,
      startDate: null,
      // startDate: activity.startDate ? new Date(activity.startDate) : null,
      // endDate: activity.endDate ? new Date(activity.endDate) : null,
      pointsLabel,
      pointsTotal,
      entries: activity.entries ?? [],
    }
  }

  async createAssetActivity(account: string, activity: PresetActivity) {
    const { accountMetadata } = await this.metadata.getAll(account)

    const mint = accountMetadata?.state.updateAuthority
    if (!mint) {
      throw new Error('Asset minter not found')
    }
    const minter = await this.preset.minter.getMinter(mint.toString())

    return this.preset.minter.createActivity({ minter, asset: account, activity })
  }

  async createAssetActivityEvent(account: string, activity: PresetActivity, message: string) {
    const { accountMetadata } = await this.metadata.getAll(account)

    const mint = accountMetadata?.state.updateAuthority
    if (!mint) {
      throw new Error('Asset minter not found')
    }
    const minter = await this.preset.minter.getMinter(mint.toString())

    return this.preset.minter.createActivityEvent({ minter, asset: account, activity, message })
  }
}
