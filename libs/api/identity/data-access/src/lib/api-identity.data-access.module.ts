import { Module } from '@nestjs/common'
import { ApiAuthDataAccessModule } from '@tokengator/api-auth-data-access'
import { ApiCoreDataAccessModule } from '@tokengator/api-core-data-access'
import { ApiIdentityDataAdminService } from './api-identity-data-admin.service'
import { ApiIdentityDataAnonService } from './api-identity-data-anon.service'
import { ApiIdentityDataUserService } from './api-identity-data-user.service'
import { ApiIdentitySolanaService } from './api-identity-solana.service'
import { ApiIdentityService } from './api-identity.service'

@Module({
  imports: [ApiAuthDataAccessModule, ApiCoreDataAccessModule],
  providers: [
    ApiIdentityDataAdminService,
    ApiIdentityDataAnonService,
    ApiIdentityService,
    ApiIdentitySolanaService,
    ApiIdentityDataUserService,
  ],
  exports: [ApiIdentityService],
})
export class ApiIdentityDataAccessModule {}
