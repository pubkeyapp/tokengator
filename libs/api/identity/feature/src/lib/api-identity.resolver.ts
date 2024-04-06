import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { IdentityProvider } from '@prisma/client'
import { getIdentityUrl, Identity } from '@tokengator/api-identity-data-access'

@Resolver(() => Identity)
export class ApiIdentityResolver {
  @ResolveField(() => Boolean, { nullable: true })
  expired(@Parent() identity: Identity) {
    if (identity.provider !== IdentityProvider.Discord) return false

    return !(identity.accessToken && identity.refreshToken)
  }

  @ResolveField(() => String, { nullable: true })
  name(@Parent() identity: Identity) {
    return identity.name ?? (identity.profile as { username?: string })?.username ?? identity?.providerId
  }

  @ResolveField(() => String, { nullable: true })
  url(@Parent() identity: Identity) {
    return getIdentityUrl(identity)
  }
}
