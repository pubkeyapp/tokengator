import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@tokengator/api-core-data-access'
import { ApiMetadataDataAccessModule } from '@tokengator/api-metadata-data-access'
import { ApiAssetService } from './api-asset.service'

@Module({
  imports: [ApiCoreDataAccessModule, ApiMetadataDataAccessModule],
  providers: [ApiAssetService],
  exports: [ApiAssetService],
})
export class ApiAssetDataAccessModule {}
