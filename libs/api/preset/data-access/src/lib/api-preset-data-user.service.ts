import { Injectable } from '@nestjs/common'
import { ApiPresetDataService } from './api-preset-data.service'
import { ApiPresetMinterService } from './api-preset-minter.service'
import { PresetUserFindManyInput } from './dto/preset-user-find-many.input'
import { PresetPaging } from './entity/preset.entity'
import { getPresetWhereUserInput } from './helpers/get-preset-where-user.input'

@Injectable()
export class ApiPresetDataUserService {
  constructor(private readonly data: ApiPresetDataService, private readonly minter: ApiPresetMinterService) {}

  async findManyPreset(input: PresetUserFindManyInput): Promise<PresetPaging> {
    return this.data.findMany({
      orderBy: { name: 'asc' },
      where: getPresetWhereUserInput(input),
      limit: input.limit,
      page: input.page,
    })
  }

  async findOnePreset(presetId: string) {
    return this.data.findOne(presetId)
  }

  async createMinterFromPreset(userId: string, presetId: string, communitySlug: string) {
    await this.data.core.ensureCommunityAdminBySlug({ communitySlug, userId })
    return this.minter.mintFromPreset(presetId, communitySlug)
  }

  async createMintFromMinter(userId: string, account: string, communitySlug: string) {
    await this.data.core.ensureCommunityAdminBySlug({ communitySlug, userId })
    return this.minter.mintFromMinter(account, communitySlug)
  }

  async getMinters() {
    return this.minter.getMinters()
  }

  async getMintersByCommunity(userId: string, communitySlug: string) {
    await this.data.core.ensureCommunityAdminBySlug({ communitySlug, userId })
    return this.minter.getMintersByCommunity(communitySlug)
  }

  async getMinter(account: string) {
    return this.minter.getMinter(account)
  }

  async getMinterAssets(account: string) {
    return this.minter.getMinterAssets(account)
  }

  async deleteMinter(userId: string, account: string) {
    const find = await this.minter.getMinter(account)
    await this.data.core.ensureCommunityAdminBySlug({ communitySlug: find.communityId, userId })
    // TODO: delete minter
    return false
  }
}
