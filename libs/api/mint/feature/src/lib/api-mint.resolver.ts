import { Resolver } from '@nestjs/graphql'
import { ApiMintService, Mint } from '@tokengator-mint/api-mint-data-access'

@Resolver(() => Mint)
export class ApiMintResolver {
  constructor(private readonly service: ApiMintService) {}
}
