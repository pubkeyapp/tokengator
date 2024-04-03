import { Module } from '@nestjs/common'
import { ApiMetadataDataAccessModule } from '@tokengator-mint/api-metadata-data-access'
import { ApiMetadataController } from './api-metadata.controller'

@Module({
  controllers: [ApiMetadataController],
  imports: [ApiMetadataDataAccessModule],
})
export class ApiMetadataFeatureModule {}
