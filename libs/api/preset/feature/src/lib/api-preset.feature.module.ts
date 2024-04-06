import { Module } from '@nestjs/common'
import { ApiPresetDataAccessModule } from '@tokengator/api-preset-data-access'
import { ApiPresetResolver } from './api-preset.resolver'
import { ApiPresetAdminResolver } from './api-preset-admin.resolver'
import { ApiPresetUserResolver } from './api-preset-user.resolver'

@Module({
  imports: [ApiPresetDataAccessModule],
  providers: [ApiPresetResolver, ApiPresetAdminResolver, ApiPresetUserResolver],
})
export class ApiPresetFeatureModule {}
