import { Resolver } from '@nestjs/graphql'
import { ApiSolanaService } from '@tokengator-mint/api-solana-data-access'

@Resolver()
export class ApiSolanaResolver {
  constructor(private readonly service: ApiSolanaService) {}
}
