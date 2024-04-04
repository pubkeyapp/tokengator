import { Injectable, Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { Prisma } from '@prisma/client'
import { ApiCoreService, CORE_APP_STARTED, slugifyId } from '@tokengator-mint/api-core-data-access'
import { provisionPresets } from './api-preset-provision-data'
import { PRESET_PROVISIONED } from './api-preset.events'

@Injectable()
export class ApiPresetProvisionService {
  private readonly logger = new Logger(ApiPresetProvisionService.name)

  constructor(private readonly core: ApiCoreService) {}

  @OnEvent(CORE_APP_STARTED)
  async onApplicationStarted() {
    if (this.core.config.databaseProvision) {
      await this.provisionPresets()
      this.logger.verbose(`Provisioned database`)
      this.core.eventEmitter.emit(PRESET_PROVISIONED)
    }
  }

  private async provisionPresets() {
    await Promise.all(provisionPresets.map((preset) => this.provisionPreset(preset)))
  }

  private async provisionPreset(input: Prisma.PresetCreateInput) {
    const id = input.id ?? slugifyId(input.name)
    const existing = await this.core.data.preset.count({ where: { id } })
    if (existing < 1) {
      await this.core.data.preset.create({ data: { ...input, id } })
      this.logger.verbose(`Provisioned Preset ${input.name}`)
      return
    }
  }
}