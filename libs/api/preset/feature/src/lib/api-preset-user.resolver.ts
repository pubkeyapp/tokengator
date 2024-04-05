import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLUserGuard, CtxUserId } from '@tokengator-mint/api-auth-data-access'
import {
  ApiPresetService,
  Preset,
  PresetPaging,
  PresetUserFindManyInput,
} from '@tokengator-mint/api-preset-data-access'
import { GraphQLJSON } from 'graphql-scalars'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiPresetUserResolver {
  constructor(private readonly service: ApiPresetService) {}

  @Mutation(() => String, { nullable: true })
  userCreateMintFromPreset(
    @CtxUserId() userId: string,
    @Args('presetId') presetId: string,
    @Args('communitySlug') communitySlug: string,
  ) {
    return this.service.user.createMinterFromPreset(userId, presetId, communitySlug)
  }

  @Mutation(() => String, { nullable: true })
  userCreateMintFromMinter(
    @CtxUserId() userId: string,
    @Args('account') account: string,
    @Args('communitySlug') communitySlug: string,
  ) {
    return this.service.user.createMintFromMinter(userId, account, communitySlug)
  }

  @Query(() => GraphQLJSON)
  userGetMinters() {
    return this.service.user.getMinters()
  }

  @Query(() => GraphQLJSON)
  userGetMintersByCommunity(@Args('communitySlug') communitySlug: string) {
    return this.service.user.getMintersByCommunity(communitySlug)
  }

  @Query(() => GraphQLJSON)
  userGetMinter(@Args('account') account: string) {
    return this.service.user.getMinter(account)
  }

  @Query(() => GraphQLJSON)
  userGetMinterAssets(@Args('account') account: string) {
    return this.service.user.getMinterAssets(account)
  }

  @Query(() => PresetPaging)
  userFindManyPreset(@Args('input') input: PresetUserFindManyInput) {
    return this.service.user.findManyPreset(input)
  }

  @Query(() => Preset, { nullable: true })
  userFindOnePreset(@Args('presetId') presetId: string) {
    return this.service.user.findOnePreset(presetId)
  }
}
