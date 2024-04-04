import { Module } from '@nestjs/common'
import { ApiAuthFeatureModule } from '@tokengator-mint/api-auth-feature'
import { ApiCoreDataAccessModule } from '@tokengator-mint/api-core-data-access'
import { ApiIdentityFeatureModule } from '@tokengator-mint/api-identity-feature'
import { ApiUserFeatureModule } from '@tokengator-mint/api-user-feature'
import { ApiCoreController } from './api-core.controller'
import { ApiCoreResolver } from './api-core.resolver'
import { ApiMintFeatureModule } from '@tokengator-mint/api-mint-feature'
import { ApiCommunityFeatureModule } from '@tokengator-mint/api-community-feature'
import { ApiCommunityMemberFeatureModule } from '@tokengator-mint/api-community-member-feature'
import { ApiSolanaFeatureModule } from '@tokengator-mint/api-solana-feature'
import { ApiMetadataFeatureModule } from '@tokengator-mint/api-metadata-feature'
import { ApiPresetFeatureModule } from '@tokengator-mint/api-preset-feature'

const imports = [
  // The api-feature generator will add the imports here
  ApiAuthFeatureModule,
  ApiCoreDataAccessModule,
  ApiIdentityFeatureModule,
  ApiUserFeatureModule,
  ApiMintFeatureModule,
  ApiCommunityFeatureModule,
  ApiCommunityMemberFeatureModule,
  ApiSolanaFeatureModule,
  ApiMetadataFeatureModule,
  ApiPresetFeatureModule,
]

@Module({
  controllers: [ApiCoreController],
  imports: [...imports],
  providers: [ApiCoreResolver],
})
export class ApiCoreFeatureModule {}
