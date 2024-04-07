import { Injectable } from '@nestjs/common'
import { ApiMetadataService } from '@tokengator/api-metadata-data-access'
import { AssetActivity, AssetActivityType } from './entity/asset-activity.entity'
import { Asset } from './entity/asset.entity'

@Injectable()
export class ApiAssetService {
  constructor(private readonly metadata: ApiMetadataService) {}

  async getAsset(account: string): Promise<Asset> {
    const { json } = await this.metadata.getAll(account)

    if (!json) {
      throw new Error('Asset metadata not found')
    }

    return {
      account,
      name: json.name,
      description: json.description,
      image: json.image,
      lists: this.getLists('business-visa'),
      attributes: json.attributes.map((attr) => [attr.trait_type, attr.value]),
    }
  }

  async getAssetActivity(account: string, type: AssetActivityType): Promise<AssetActivity> {
    const listAccount = `pda-${account}-${type}`
    const found = {
      label: `${type}`,
      startDate: new Date(),
      endDate: new Date().getTime() + 30 * 24 * 60 * 60 * 1000,
      entries:
        type === AssetActivityType.Payouts
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
    const pointsLabel = type === AssetActivityType.Payouts ? 'USD' : 'Points'

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

  private getLists(preset: string): AssetActivityType[] {
    // TODO: Specify per preset what activity lists are available
    if (preset === 'business-visa') {
      return [AssetActivityType.Payouts, AssetActivityType.Points]
    }
    return [AssetActivityType.Points]
  }
}
