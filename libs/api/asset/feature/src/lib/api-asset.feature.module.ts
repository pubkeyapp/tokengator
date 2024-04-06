import { Module } from '@nestjs/common'
import { ApiAssetDataAccessModule } from '@tokengator/api-asset-data-access'
import { ApiAssetResolver } from './api-asset.resolver'

@Module({
  imports: [ApiAssetDataAccessModule],
  providers: [ApiAssetResolver],
})
export class ApiAssetFeatureModule {}
