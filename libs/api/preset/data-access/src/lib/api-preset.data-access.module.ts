import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@tokengator-mint/api-core-data-access'
import { ApiSolanaDataAccessModule } from '@tokengator-mint/api-solana-data-access'
import { ApiPresetDataAdminService } from './api-preset-data-admin.service'
import { ApiPresetDataUserService } from './api-preset-data-user.service'
import { ApiPresetDataService } from './api-preset-data.service'
import { ApiPresetMinterService } from './api-preset-minter.service'
import { ApiPresetProvisionService } from './api-preset-provision.service'
import { ApiPresetService } from './api-preset.service'

@Module({
  imports: [ApiCoreDataAccessModule, ApiSolanaDataAccessModule],
  providers: [
    ApiPresetService,
    ApiPresetDataService,
    ApiPresetDataAdminService,
    ApiPresetDataUserService,
    ApiPresetMinterService,
    ApiPresetProvisionService,
  ],
  exports: [ApiPresetService],
})
export class ApiPresetDataAccessModule {}
