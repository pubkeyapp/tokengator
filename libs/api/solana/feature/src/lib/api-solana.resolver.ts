import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLUserGuard } from '@tokengator-mint/api-auth-data-access'
import { ApiSolanaService } from '@tokengator-mint/api-solana-data-access'
import { GraphQLJSON } from 'graphql-scalars'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiSolanaResolver {
  constructor(private readonly service: ApiSolanaService) {}

  @Query(() => String, { nullable: true })
  solanaGetBalance(@Args('account') account: string) {
    return this.service.getBalance(account)
  }

  @Query(() => GraphQLJSON, { nullable: true })
  solanaGetTokenAccounts(@Args('account') account: string) {
    return this.service.getTokenAccounts(account)
  }

  @Query(() => GraphQLJSON, { nullable: true })
  solanaGetTransactions(@Args('account') account: string) {
    return this.service.getTransactions(account)
  }
}
