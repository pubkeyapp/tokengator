import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@tokengator/api-core-data-access'
import { ApiMetadataDataAccessModule } from '@tokengator/api-metadata-data-access'
import { ApiPresetDataAccessModule } from '@tokengator/api-preset-data-access'
import { ApiAssetService } from './api-asset.service'

@Module({
  imports: [ApiCoreDataAccessModule, ApiMetadataDataAccessModule, ApiPresetDataAccessModule],
  providers: [ApiAssetService],
  exports: [ApiAssetService],
})
export class ApiAssetDataAccessModule {}
