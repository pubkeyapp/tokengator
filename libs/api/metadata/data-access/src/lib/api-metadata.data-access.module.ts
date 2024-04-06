import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@tokengator/api-core-data-access'
import { ApiSolanaDataAccessModule } from '@tokengator/api-solana-data-access'
import { ApiMetadataImageService } from './api-metadata-image.service'
import { ApiMetadataService } from './api-metadata.service'

@Module({
  imports: [ApiCoreDataAccessModule, ApiSolanaDataAccessModule],
  providers: [ApiMetadataService, ApiMetadataImageService],
  exports: [ApiMetadataService],
})
export class ApiMetadataDataAccessModule {}
