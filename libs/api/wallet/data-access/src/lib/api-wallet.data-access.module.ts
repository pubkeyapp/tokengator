import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@tokengator-mint/api-core-data-access'
import { ApiWalletService } from './api-wallet.service'
import { ApiWalletDataService } from './api-wallet-data.service'
import { ApiWalletDataAdminService } from './api-wallet-data-admin.service'
import { ApiWalletDataUserService } from './api-wallet-data-user.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiWalletService, ApiWalletDataService, ApiWalletDataAdminService, ApiWalletDataUserService],
  exports: [ApiWalletService],
})
export class ApiWalletDataAccessModule {}
