import { Injectable } from '@nestjs/common'
import { ApiMintDataUserService } from './api-mint-data-user.service'
import { ApiMintDataAdminService } from './api-mint-data-admin.service'

@Injectable()
export class ApiMintService {
  constructor(readonly user: ApiMintDataUserService, readonly admin: ApiMintDataAdminService) {}
}
