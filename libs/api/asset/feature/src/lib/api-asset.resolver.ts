import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { ApiAssetService, Asset, AssetActivity, AssetActivityType } from '@tokengator/api-asset-data-access'
import { ApiAuthGraphQLUserGuard } from '@tokengator/api-auth-data-access'

@Resolver(() => Asset)
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiAssetResolver {
  constructor(private readonly service: ApiAssetService) {}

  @Query(() => Asset)
  getAsset(@Args('account') account: string) {
    return this.service.getAsset(account)
  }

  @Query(() => AssetActivity)
  getAssetActivity(
    @Args('account') account: string,
    @Args({ name: 'type', type: () => AssetActivityType }) type: AssetActivityType,
  ) {
    return this.service.getAssetActivity(account, type)
  }
}
