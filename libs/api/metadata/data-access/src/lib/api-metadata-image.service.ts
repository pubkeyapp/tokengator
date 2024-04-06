import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { ApiCoreService } from '@tokengator/api-core-data-access'
import * as fs from 'node:fs/promises'
import { join } from 'node:path'
import { CantFindTheRightTypeScrewItHackathonMode } from './api-metadata.service'

@Injectable()
export class ApiMetadataImageService implements OnModuleInit {
  private readonly logger = new Logger(ApiMetadataImageService.name)
  private readonly assetPath = join(__dirname, 'assets')
  private readonly imagePath = join(this.assetPath, 'images')
  private readonly fontPath = join(this.assetPath, 'fonts')
  private readonly templatePath = join(this.imagePath, 'templates')

  private readonly templateMap = new Map<string, Buffer>()

  constructor(private readonly core: ApiCoreService) {}

  async onModuleInit(): Promise<void> {
    await this.listTemplates()
  }

  async listTemplates() {
    const files = await fs.readdir(this.templatePath)
    this.logger.verbose(`Found ${files.length} templates in ${this.templatePath}`)

    for (const file of files) {
      const buffer = await fs.readFile(join(this.templatePath, file))
      this.templateMap.set(file, buffer)
      this.logger.verbose(` -> Loaded template: ${file}`)
    }
  }

  generate(accountMetadata: CantFindTheRightTypeScrewItHackathonMode) {
    const rand = Math.floor(Math.random() * this.templateMap.size)
    const template = Array.from(this.templateMap.values())[rand]
    // Do something with the template

    return template
  }
}
