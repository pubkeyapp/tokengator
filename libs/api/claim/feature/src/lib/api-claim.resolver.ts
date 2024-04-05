import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { ApiClaimService, Claim } from '@tokengator-mint/api-claim-data-access'
import { ellipsify } from '@tokengator-mint/api-core-data-access'

@Resolver(() => Claim)
export class ApiClaimResolver {
  constructor(private readonly service: ApiClaimService) {}

  @ResolveField(() => String)
  name(@Parent() claim: Claim) {
    return `${claim.provider}: ${ellipsify(claim.providerId)} `
  }
}
