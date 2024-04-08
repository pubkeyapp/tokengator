import { Injectable } from '@nestjs/common'
import { PublicKey } from '@solana/web3.js'
import { ApiMetadataService } from '@tokengator/api-metadata-data-access'
import { ApiPresetService, PresetActivity } from '@tokengator/api-preset-data-access'
import { AssetActivity } from './entity/asset-activity.entity'
import { Asset } from './entity/asset.entity'

@Injectable()
export class ApiAssetService {
  constructor(private readonly metadata: ApiMetadataService, private readonly preset: ApiPresetService) {}

  async getAsset(account: string): Promise<Asset & { mint: PublicKey }> {
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
      mint,
    }
  }

  async getAssetActivity(account: string, type: PresetActivity): Promise<AssetActivity | null> {
    const { accountMetadata } = await this.metadata.getAll(account)

    const mint = accountMetadata?.state.updateAuthority
    if (!mint) {
      throw new Error('Asset minter not found')
    }

    const activityPda = this.preset.minter.getActivityPda({
      mint: new PublicKey(mint),
      label: type.toLowerCase(),
    })

    const activity = await this.preset.minter.getActivity({ account: activityPda })

    if (typeof activity === 'boolean') {
      //
      // console.log('Creating activity...')
      // await this.createAssetActivity(account, type)
      // throw new Error('Activity not found')
      return null
    }
    // this.preset.minter.getCommunityPda()
    console.log(`Account, type: ${account}, ${type}`, activity)

    const listAccount = `pda-${account}-${type}`
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
      account: listAccount,
      type,
      label: found.label,
      startDate: new Date(found.startDate),
      endDate: new Date(found.endDate),
      pointsLabel,
      pointsTotal,
      entries: found.entries ?? [],
    }
  }

  async createAssetActivity(account: string, activity: PresetActivity) {
    const asset = await this.getAsset(account)
    const minter = await this.preset.minter.getMinter(asset.mint.toString())
    console.log('minter', minter)
    // const activity = await this.getAssetActivity(account, type)
    //
    // if (activity) {
    //   return activity
    // }

    return this.preset.minter.createActivity({ minter, asset: account, activity })
  }
}
