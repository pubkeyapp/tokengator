import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@tokengator-mint/api-core-data-access'
import { ApiCommunityDataAdminService } from './api-community-data-admin.service'
import { ApiCommunityDataAnonService } from './api-community-data-anon.service'
import { ApiCommunityDataUserService } from './api-community-data-user.service'
import { ApiCommunityDataService } from './api-community-data.service'
import { ApiCommunityProvisionService } from './api-community-provision.service'
import { ApiCommunityService } from './api-community.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [
    ApiCommunityDataAdminService,
    ApiCommunityDataAnonService,
    ApiCommunityDataService,
    ApiCommunityDataUserService,
    ApiCommunityProvisionService,
    ApiCommunityService,
  ],
  exports: [ApiCommunityService],
})
export class ApiCommunityDataAccessModule {}
