import { Module } from '@nestjs/common'
import { ApiMintDataAccessModule } from '@tokengator-mint/api-mint-data-access'
import { ApiMintAdminResolver } from './api-mint-admin.resolver'
import { ApiMintUserResolver } from './api-mint-user.resolver'
import { ApiMintController } from './api-mint.controller'
import { ApiMintResolver } from './api-mint.resolver'

@Module({
  controllers: [ApiMintController],
  imports: [ApiMintDataAccessModule],
  providers: [ApiMintResolver, ApiMintUserResolver, ApiMintAdminResolver],
})
export class ApiMintFeatureModule {}
