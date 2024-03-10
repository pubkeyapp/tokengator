import { Injectable } from '@nestjs/common'
import { ApiMintDataAdminService } from './api-mint-data-admin.service'
import { ApiMintDataUserService } from './api-mint-data-user.service'
import { ApiMintDataService } from './api-mint-data.service'

@Injectable()
export class ApiMintService {
  constructor(
    readonly data: ApiMintDataService,
    readonly user: ApiMintDataUserService,
    readonly admin: ApiMintDataAdminService,
  ) {}
}
