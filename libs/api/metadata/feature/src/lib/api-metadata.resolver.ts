import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLUserGuard } from '@tokengator/api-auth-data-access'
import { ApiMetadataService } from '@tokengator/api-metadata-data-access'
import { GraphQLJSON } from 'graphql-scalars'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiMetadataResolver {
  constructor(private readonly service: ApiMetadataService) {}

  @Query(() => GraphQLJSON, { nullable: true })
  async metadataAll(@Args('account') account: string) {
    return this.service.getAll(account)
  }
}
