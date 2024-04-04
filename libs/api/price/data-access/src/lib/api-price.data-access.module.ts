import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@tokengator-mint/api-core-data-access'
import { ApiPriceService } from './api-price.service'
import { ApiPriceDataService } from './api-price-data.service'
import { ApiPriceDataAdminService } from './api-price-data-admin.service'
import { ApiPriceDataUserService } from './api-price-data-user.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiPriceService, ApiPriceDataService, ApiPriceDataAdminService, ApiPriceDataUserService],
  exports: [ApiPriceService],
})
export class ApiPriceDataAccessModule {}
