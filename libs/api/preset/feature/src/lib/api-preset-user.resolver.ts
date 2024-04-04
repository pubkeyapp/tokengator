import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLUserGuard } from '@tokengator-mint/api-auth-data-access'
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

  @Query(() => PresetPaging)
  userFindManyPreset(@Args('input') input: PresetUserFindManyInput) {
    return this.service.user.findManyPreset(input)
  }

  @Query(() => Preset, { nullable: true })
  userFindOnePreset(@Args('presetId') presetId: string) {
    return this.service.user.findOnePreset(presetId)
  }
}
