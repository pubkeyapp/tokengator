import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLUserGuard, CtxUser } from '@tokengator/api-auth-data-access'
import { ApiSolanaService } from '@tokengator/api-solana-data-access'
import { UserRole } from '@tokengator/sdk'
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

  @Mutation(() => GraphQLJSON, { nullable: true })
  solanaRequestAirdrop(@CtxUser() { role }: { role: UserRole }, @Args('account') account: string) {
    return this.service.solanaRequestAirdrop(account, role)
  }
}
