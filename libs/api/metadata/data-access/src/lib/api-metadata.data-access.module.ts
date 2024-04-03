import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@tokengator-mint/api-core-data-access'
import { ApiSolanaDataAccessModule } from '@tokengator-mint/api-solana-data-access'
import { ApiMetadataService } from './api-metadata.service'

@Module({
  imports: [ApiCoreDataAccessModule, ApiSolanaDataAccessModule],
  providers: [ApiMetadataService],
  exports: [ApiMetadataService],
})
export class ApiMetadataDataAccessModule {}
