import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@tokengator-mint/api-core-data-access'
import { ApiPresetDataAccessModule } from '@tokengator-mint/api-preset-data-access'
import { ApiClaimDataAdminService } from './api-claim-data-admin.service'
import { ApiClaimDataUserService } from './api-claim-data-user.service'
import { ApiClaimDataService } from './api-claim-data.service'
import { ApiClaimService } from './api-claim.service'

@Module({
  imports: [ApiCoreDataAccessModule, ApiPresetDataAccessModule],
  providers: [ApiClaimService, ApiClaimDataService, ApiClaimDataAdminService, ApiClaimDataUserService],
  exports: [ApiClaimService],
})
export class ApiClaimDataAccessModule {}
