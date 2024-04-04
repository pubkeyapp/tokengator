import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLUserGuard, CtxUserId } from '@tokengator-mint/api-auth-data-access'
import {
  ApiPresetService,
  Preset,
  PresetPaging,
  PresetUserFindManyInput,
} from '@tokengator-mint/api-preset-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiPresetUserResolver {
  constructor(private readonly service: ApiPresetService) {}

  @Mutation(() => String, { nullable: true })
  userCreateMintFromPreset(
    @CtxUserId() userId: string,
    @Args('presetId') presetId: string,
    @Args('communityId') communityId: string,
  ) {
    return this.service.user.createMinterFromPreset(userId, presetId, communityId)
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
