import { Module } from '@nestjs/common'
import { ApiClaimDataAccessModule } from '@tokengator-mint/api-claim-data-access'
import { ApiClaimResolver } from './api-claim.resolver'
import { ApiClaimAdminResolver } from './api-claim-admin.resolver'
import { ApiClaimUserResolver } from './api-claim-user.resolver'

@Module({
  imports: [ApiClaimDataAccessModule],
  providers: [ApiClaimResolver, ApiClaimAdminResolver, ApiClaimUserResolver],
})
export class ApiClaimFeatureModule {}
