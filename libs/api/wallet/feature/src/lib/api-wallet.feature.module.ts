import { Module } from '@nestjs/common'
import { ApiWalletDataAccessModule } from '@tokengator-mint/api-wallet-data-access'
import { ApiWalletResolver } from './api-wallet.resolver'
import { ApiWalletAdminResolver } from './api-wallet-admin.resolver'
import { ApiWalletUserResolver } from './api-wallet-user.resolver'

@Module({
  imports: [ApiWalletDataAccessModule],
  providers: [ApiWalletResolver, ApiWalletAdminResolver, ApiWalletUserResolver],
})
export class ApiWalletFeatureModule {}
