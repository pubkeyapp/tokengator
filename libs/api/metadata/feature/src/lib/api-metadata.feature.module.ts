import { Module } from '@nestjs/common'
import { ApiMetadataDataAccessModule } from '@tokengator/api-metadata-data-access'
import { ApiMetadataController } from './api-metadata.controller'
import { ApiMetadataResolver } from './api-metadata.resolver'

@Module({
  controllers: [ApiMetadataController],
  imports: [ApiMetadataDataAccessModule],
  providers: [ApiMetadataResolver],
})
export class ApiMetadataFeatureModule {}
