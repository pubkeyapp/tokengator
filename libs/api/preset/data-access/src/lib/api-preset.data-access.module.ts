import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@tokengator-mint/api-core-data-access'
import { ApiPresetDataAdminService } from './api-preset-data-admin.service'
import { ApiPresetDataUserService } from './api-preset-data-user.service'
import { ApiPresetDataService } from './api-preset-data.service'
import { ApiPresetProvisionService } from './api-preset-provision.service'
import { ApiPresetService } from './api-preset.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [
    ApiPresetService,
    ApiPresetDataService,
    ApiPresetDataAdminService,
    ApiPresetDataUserService,
    ApiPresetProvisionService,
  ],
  exports: [ApiPresetService],
})
export class ApiPresetDataAccessModule {}
