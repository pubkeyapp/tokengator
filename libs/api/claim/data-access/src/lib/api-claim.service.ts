import { Injectable } from '@nestjs/common'
import { ApiClaimDataService } from './api-claim-data.service'
import { ApiClaimDataAdminService } from './api-claim-data-admin.service'
import { ApiClaimDataUserService } from './api-claim-data-user.service'

@Injectable()
export class ApiClaimService {
  constructor(
    readonly data: ApiClaimDataService,
    readonly admin: ApiClaimDataAdminService,
    readonly user: ApiClaimDataUserService,
  ) {}
}
