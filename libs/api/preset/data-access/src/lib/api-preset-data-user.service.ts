import { Injectable } from '@nestjs/common'
import { ApiPresetDataService } from './api-preset-data.service'
import { ApiPresetMinterService } from './api-preset-minter.service'
import { PresetUserFindManyInput } from './dto/preset-user-find-many.input'
import { PresetUserMintFromMinter } from './dto/preset-user-mint-from-minter'
import { PresetUserMintFromPreset } from './dto/preset-user-mint-from-preset'
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

  async createMinterFromPreset(userId: string, input: PresetUserMintFromPreset) {
    await this.data.core.ensureCommunityAdminBySlug({ communitySlug: input.communitySlug, userId })
    return this.minter.mintFromPreset(input)
  }

  async createMintFromMinter(userId: string, input: PresetUserMintFromMinter) {
    await this.data.core.ensureCommunityAdminBySlug({ communitySlug: input.communitySlug, userId })
    return this.minter.mintFromMinter(input)
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

  async deleteMinter(userId: string, account: string, communitySlug: string) {
    const minter = await this.minter.getMinter(account)
    const communityPda = this.minter.getCommunityPda(communitySlug)
    if (communityPda.toString() !== minter.communityId) {
      throw new Error('Minter does not belong to this community')
    }

    // TODO: delete minter
    return false
  }

  async addMinterAuthority(userId: string, account: string, authority: string, communitySlug: string): Promise<string> {
    const minter = await this.minter.getMinter(account)
    const communityPda = this.minter.getCommunityPda(communitySlug)
    if (communityPda.toString() !== minter.communityId) {
      throw new Error('Minter does not belong to this community')
    }
    await this.data.core.ensureCommunityAdminBySlug({ communitySlug, userId })

    return this.minter.addAuthority({ authority, communitySlug, minter })
  }

  async removeMinterAuthority(
    userId: string,
    account: string,
    authority: string,
    communitySlug: string,
  ): Promise<string> {
    const minter = await this.minter.getMinter(account)
    const communityPda = this.minter.getCommunityPda(communitySlug)
    if (communityPda.toString() !== minter.communityId) {
      throw new Error('Minter does not belong to this community')
    }
    await this.data.core.ensureCommunityAdminBySlug({ communitySlug, userId })

    return this.minter.removeAuthority({ authority, communitySlug, minter })
  }
}
