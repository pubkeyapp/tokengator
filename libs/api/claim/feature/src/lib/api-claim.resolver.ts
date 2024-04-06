import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
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
    return `${claim.provider}: ${ellipsify(claim.providerId)} `
  }
}
