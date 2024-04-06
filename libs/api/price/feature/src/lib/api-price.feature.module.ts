import { Module } from '@nestjs/common'
import { ApiPriceDataAccessModule } from '@tokengator/api-price-data-access'
import { ApiPriceResolver } from './api-price.resolver'
import { ApiPriceAdminResolver } from './api-price-admin.resolver'
import { ApiPriceUserResolver } from './api-price-user.resolver'

@Module({
  imports: [ApiPriceDataAccessModule],
  providers: [ApiPriceResolver, ApiPriceAdminResolver, ApiPriceUserResolver],
})
export class ApiPriceFeatureModule {}
