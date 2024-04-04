import { Injectable } from '@nestjs/common'
import { ApiPriceDataService } from './api-price-data.service'
import { ApiPriceDataAdminService } from './api-price-data-admin.service'
import { ApiPriceDataUserService } from './api-price-data-user.service'

@Injectable()
export class ApiPriceService {
  constructor(
    readonly data: ApiPriceDataService,
    readonly admin: ApiPriceDataAdminService,
    readonly user: ApiPriceDataUserService,
  ) {}
}
