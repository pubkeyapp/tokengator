import { Injectable } from '@nestjs/common'
import { ApiCommunityMemberDataUserService } from './api-community-member-data-user.service'
import { ApiCommunityMemberDataAdminService } from './api-community-member-data-admin.service'

@Injectable()
export class ApiCommunityMemberService {
  constructor(readonly user: ApiCommunityMemberDataUserService, readonly admin: ApiCommunityMemberDataAdminService) {}
}
