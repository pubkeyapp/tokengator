import { Module } from '@nestjs/common'
import { ApiAuthFeatureModule } from '@tokengator/api-auth-feature'
import { ApiCommunityFeatureModule } from '@tokengator/api-community-feature'
import { ApiCommunityMemberFeatureModule } from '@tokengator/api-community-member-feature'
import { ApiCoreDataAccessModule } from '@tokengator/api-core-data-access'
import { ApiIdentityFeatureModule } from '@tokengator/api-identity-feature'
import { ApiMetadataFeatureModule } from '@tokengator/api-metadata-feature'
import { ApiPresetFeatureModule } from '@tokengator/api-preset-feature'
import { ApiPriceFeatureModule } from '@tokengator/api-price-feature'
import { ApiSolanaFeatureModule } from '@tokengator/api-solana-feature'
import { ApiUserFeatureModule } from '@tokengator/api-user-feature'
import { ApiWalletFeatureModule } from '@tokengator/api-wallet-feature'
import { ApiCoreController } from './api-core.controller'
import { ApiCoreResolver } from './api-core.resolver'
import { ApiClaimFeatureModule } from '@tokengator/api-claim-feature'

const imports = [
  // The api-feature generator will add the imports here
  ApiAuthFeatureModule,
  ApiCommunityFeatureModule,
  ApiCommunityMemberFeatureModule,
  ApiCoreDataAccessModule,
  ApiIdentityFeatureModule,
  ApiMetadataFeatureModule,
  ApiPresetFeatureModule,
  ApiPriceFeatureModule,
  ApiSolanaFeatureModule,
  ApiUserFeatureModule,
  ApiWalletFeatureModule,
  ApiClaimFeatureModule,
]

@Module({
  controllers: [ApiCoreController],
  imports: [...imports],
  providers: [ApiCoreResolver],
})
export class ApiCoreFeatureModule {}
