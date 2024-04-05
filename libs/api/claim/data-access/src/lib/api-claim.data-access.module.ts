import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@tokengator-mint/api-core-data-access'
import { ApiClaimService } from './api-claim.service'
import { ApiClaimDataService } from './api-claim-data.service'
import { ApiClaimDataAdminService } from './api-claim-data-admin.service'
import { ApiClaimDataUserService } from './api-claim-data-user.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiClaimService, ApiClaimDataService, ApiClaimDataAdminService, ApiClaimDataUserService],
  exports: [ApiClaimService],
})
export class ApiClaimDataAccessModule {}
