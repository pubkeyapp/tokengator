import { Resolver } from '@nestjs/graphql'
import { ApiWalletService } from '@tokengator/api-wallet-data-access'
import { Wallet } from '@tokengator/api-wallet-data-access'

@Resolver(() => Wallet)
export class ApiWalletResolver {
  constructor(private readonly service: ApiWalletService) {}
}
