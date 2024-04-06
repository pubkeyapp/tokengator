import { Module } from '@nestjs/common'
import { ApiCommunityDataAccessModule } from '@tokengator/api-community-data-access'
import { ApiCommunityAdminResolver } from './api-community-admin.resolver'
import { ApiCommunityAnonResolver } from './api-community-anon.resolver'
import { ApiCommunityUserResolver } from './api-community-user.resolver'
import { ApiCommunityResolver } from './api-community.resolver'

@Module({
  imports: [ApiCommunityDataAccessModule],
  providers: [ApiCommunityAdminResolver, ApiCommunityAnonResolver, ApiCommunityResolver, ApiCommunityUserResolver],
})
export class ApiCommunityFeatureModule {}
