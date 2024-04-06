import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { ApiCommunityService, Community } from '@tokengator/api-community-data-access'

@Resolver(() => Community)
export class ApiCommunityResolver {
  constructor(private readonly service: ApiCommunityService) {}

  @ResolveField(() => String, { nullable: true })
  publicUrl(@Parent() community: Community) {
    return `/communities/${community.slug}`
  }

  @ResolveField(() => String, { nullable: true })
  viewUrl(@Parent() community: Community) {
    return `/c/${community.slug}`
  }
}
