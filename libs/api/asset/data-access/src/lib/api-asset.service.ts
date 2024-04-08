import { Injectable } from '@nestjs/common'
import { PublicKey } from '@solana/web3.js'
import { ApiMetadataService } from '@tokengator/api-metadata-data-access'
import {
  ApiPresetService,
  PresetActivity,
  TokenGatorActivity,
  TokenGatorActivityEntryInput,
  TokenGatorAsset,
} from '@tokengator/api-preset-data-access'
import { formatAnchorDate } from '@tokengator/api-solana-util'

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

    const entries = (activity.entries ?? [])
      .map((entry) => ({
        ...entry,
        timestamp: formatAnchorDate(entry.timestamp),
      }))
      .sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))
    const pointsTotal = entries.reduce((acc, entry) => acc + (entry.points ?? 0), 0)
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
      entries,
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

  async createAssetActivityEvent(
    account: string,
    activity: PresetActivity,
    input: TokenGatorActivityEntryInput,
  ): Promise<string> {
    const { accountMetadata } = await this.metadata.getAll(account)

    const mint = accountMetadata?.state.updateAuthority
    if (!mint) {
      throw new Error('Asset minter not found')
    }
    const minter = await this.preset.minter.getMinter(mint.toString())

    return this.preset.minter.createActivityEvent({ minter, asset: account, activity, input })
  }
}
