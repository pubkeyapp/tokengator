import { Resolver } from '@nestjs/graphql'
import { ApiMintService } from '@tokengator-mint/api-mint-data-access'
import { Mint } from '@tokengator-mint/api-mint-data-access'

@Resolver(() => Mint)
export class ApiMintResolver {
  constructor(private readonly service: ApiMintService) {}
}
