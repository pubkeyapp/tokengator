import { Injectable } from '@nestjs/common'
import { ApiPresetDataService } from './api-preset-data.service'
import { PresetAdminCreateInput } from './dto/preset-admin-create.input'
import { PresetAdminFindManyInput } from './dto/preset-admin-find-many.input'
import { PresetAdminUpdateInput } from './dto/preset-admin-update.input'
import { PresetPaging } from './entity/preset.entity'
import { getPresetWhereAdminInput } from './helpers/get-preset-where-admin.input'

@Injectable()
export class ApiPresetDataAdminService {
  constructor(private readonly data: ApiPresetDataService) {}

  async createPreset(input: PresetAdminCreateInput) {
    return this.data.create(input)
  }

  async deletePreset(presetId: string) {
    return this.data.delete(presetId)
  }

  async findManyPreset(input: PresetAdminFindManyInput): Promise<PresetPaging> {
    return this.data.findMany({
      orderBy: { createdAt: 'desc' },
      where: getPresetWhereAdminInput(input),
      limit: input.limit,
      page: input.page,
    })
  }

  async findOnePreset(presetId: string) {
    return this.data.findOne(presetId)
  }

  async updatePreset(presetId: string, input: PresetAdminUpdateInput) {
    return this.data.update(presetId, input)
  }
}
