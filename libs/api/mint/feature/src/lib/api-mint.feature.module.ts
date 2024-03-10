import { Module } from '@nestjs/common'
import { ApiMintDataAccessModule } from '@tokengator-mint/api-mint-data-access'
import { ApiMintResolver } from './api-mint.resolver'
import { ApiMintUserResolver } from './api-mint-user.resolver'
import { ApiMintAdminResolver } from './api-mint-admin.resolver'

@Module({
  imports: [ApiMintDataAccessModule],
  providers: [ApiMintResolver, ApiMintUserResolver, ApiMintAdminResolver],
})
export class ApiMintFeatureModule {}
