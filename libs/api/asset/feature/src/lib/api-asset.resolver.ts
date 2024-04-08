import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAssetService } from '@tokengator/api-asset-data-access'
import { ApiAuthGraphQLUserGuard } from '@tokengator/api-auth-data-access'
import {
  PresetActivity,
  TokenGatorActivity,
  TokenGatorActivityEntryInput,
  TokenGatorAsset,
} from '@tokengator/api-preset-data-access'

@Resolver(() => TokenGatorAsset)
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiAssetResolver {
  constructor(private readonly service: ApiAssetService) {}

  @Query(() => TokenGatorAsset)
  getAsset(@Args('account') account: string) {
    return this.service.getAsset(account)
  }

  @Query(() => TokenGatorActivity, { nullable: true })
  getAssetActivity(
    @Args('account') account: string,
    @Args({ name: 'type', type: () => PresetActivity }) type: PresetActivity,
  ) {
    return this.service.getAssetActivity(account, type)
  }

  @Mutation(() => TokenGatorActivity, { nullable: true })
  createAssetActivity(
    @Args('account') account: string,
    @Args({ name: 'type', type: () => PresetActivity }) type: PresetActivity,
  ) {
    return this.service.createAssetActivity(account, type)
  }

  @Mutation(() => String, { nullable: true })
  createAssetActivityEvent(
    @Args('account') account: string,
    @Args({ name: 'type', type: () => PresetActivity }) type: PresetActivity,
    @Args('input') input: TokenGatorActivityEntryInput,
  ) {
    return this.service.createAssetActivityEvent(account, type, input)
  }
}
