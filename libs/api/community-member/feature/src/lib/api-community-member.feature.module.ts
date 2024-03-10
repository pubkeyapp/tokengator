import { Module } from '@nestjs/common'
import { ApiCommunityMemberDataAccessModule } from '@tokengator-mint/api-community-member-data-access'
import { ApiCommunityMemberResolver } from './api-community-member.resolver'
import { ApiCommunityMemberUserResolver } from './api-community-member-user.resolver'
import { ApiCommunityMemberAdminResolver } from './api-community-member-admin.resolver'

@Module({
  imports: [ApiCommunityMemberDataAccessModule],
  providers: [ApiCommunityMemberResolver, ApiCommunityMemberUserResolver, ApiCommunityMemberAdminResolver],
})
export class ApiCommunityMemberFeatureModule {}
