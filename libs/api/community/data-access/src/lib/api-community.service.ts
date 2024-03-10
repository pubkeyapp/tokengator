import { Injectable } from '@nestjs/common'
import { ApiCommunityDataAdminService } from './api-community-data-admin.service'
import { ApiCommunityDataAnonService } from './api-community-data-anon.service'
import { ApiCommunityDataUserService } from './api-community-data-user.service'

@Injectable()
export class ApiCommunityService {
  constructor(
    readonly admin: ApiCommunityDataAdminService,
    readonly anon: ApiCommunityDataAnonService,
    readonly user: ApiCommunityDataUserService,
  ) {}
}
