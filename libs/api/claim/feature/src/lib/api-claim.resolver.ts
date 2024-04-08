import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { IdentityProvider } from '@prisma/client'
import { ApiClaimService, Claim } from '@tokengator/api-claim-data-access'
import { ellipsify } from '@tokengator/api-core-data-access'

@Resolver(() => Claim)
export class ApiClaimResolver {
  constructor(private readonly service: ApiClaimService) {}

  @ResolveField(() => String)
  name(@Parent() claim: Claim) {
    const communityName = claim.community?.name
    const minterName = claim.minter?.name
    if (communityName && minterName) {
      return `${communityName} - ${minterName}`
    }
    return claim.provider === IdentityProvider.Solana
      ? `${claim.provider}: ${ellipsify(claim.providerId)} `
      : claim.providerId
  }

  @ResolveField(() => String)
  claimUrl(@Parent() claim: Claim) {
    return `/claims/${claim.provider}/${claim.providerId}`
  }
}
