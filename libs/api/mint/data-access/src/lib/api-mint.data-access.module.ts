import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@tokengator-mint/api-core-data-access'
import { ApiSolanaDataAccessModule } from '@tokengator-mint/api-solana-data-access'
import { ApiMintDataAdminService } from './api-mint-data-admin.service'
import { ApiMintDataUserService } from './api-mint-data-user.service'
import { ApiMintDataService } from './api-mint-data.service'
import { ApiMintService } from './api-mint.service'

@Module({
  imports: [ApiCoreDataAccessModule, ApiSolanaDataAccessModule],
  providers: [ApiMintDataAdminService, ApiMintDataService, ApiMintDataUserService, ApiMintService],
  exports: [ApiMintService],
})
export class ApiMintDataAccessModule {}
