import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { ApiCoreService, PagingInputFields, slugifyId } from '@tokengator/api-core-data-access'
import { PresetPaging } from './entity/preset.entity'

@Injectable()
export class ApiPresetDataService {
  constructor(readonly core: ApiCoreService) {}

  async create(input: Omit<Prisma.PresetUncheckedCreateInput, 'color' | 'config'>) {
    const id = slugifyId(input.name).toLowerCase()
    return this.core.data.preset.create({ data: { ...input, id, color: 'brand', config: {} } })
  }

  async delete(presetId: string) {
    await this.findOne(presetId)
    const deleted = await this.core.data.preset.delete({ where: { id: presetId } })
    return !!deleted
  }

  async findMany({
    limit = 10,
    page = 1,
    ...input
  }: Prisma.PresetFindManyArgs & PagingInputFields): Promise<PresetPaging> {
    return this.core.data.preset
      .paginate(input)
      .withPages({ limit, page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOne(presetId: string) {
    const found = await this.core.data.preset.findUnique({ where: { id: presetId } })
    if (!found) {
      throw new Error('Preset not found')
    }
    return found
  }

  async update(presetId: string, input: Prisma.PresetUpdateInput) {
    return this.core.data.preset.update({ where: { id: presetId }, data: input })
  }
}
