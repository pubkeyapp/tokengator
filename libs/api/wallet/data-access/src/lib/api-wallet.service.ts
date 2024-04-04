import { Injectable } from '@nestjs/common'
import { ApiWalletDataService } from './api-wallet-data.service'
import { ApiWalletDataAdminService } from './api-wallet-data-admin.service'
import { ApiWalletDataUserService } from './api-wallet-data-user.service'

@Injectable()
export class ApiWalletService {
  constructor(
    readonly data: ApiWalletDataService,
    readonly admin: ApiWalletDataAdminService,
    readonly user: ApiWalletDataUserService,
  ) {}
}
