import { Resolver } from '@nestjs/graphql'
import { ApiPresetService } from '@tokengator-mint/api-preset-data-access'
import { ApiAuthGraphQLAdminGuard } from '@tokengator-mint/api-auth-data-access'
import { Mutation, Query, Args } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  PresetAdminCreateInput,
  PresetAdminFindManyInput,
  Preset,
  PresetPaging,
  PresetAdminUpdateInput,
} from '@tokengator-mint/api-preset-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiPresetAdminResolver {
  constructor(private readonly service: ApiPresetService) {}

  @Mutation(() => Preset, { nullable: true })
  adminCreatePreset(@Args('input') input: PresetAdminCreateInput) {
    return this.service.admin.createPreset(input)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminDeletePreset(@Args('presetId') presetId: string) {
    return this.service.admin.deletePreset(presetId)
  }

  @Query(() => PresetPaging)
  adminFindManyPreset(@Args('input') input: PresetAdminFindManyInput) {
    return this.service.admin.findManyPreset(input)
  }

  @Query(() => Preset, { nullable: true })
  adminFindOnePreset(@Args('presetId') presetId: string) {
    return this.service.admin.findOnePreset(presetId)
  }

  @Mutation(() => Preset, { nullable: true })
  adminUpdatePreset(@Args('presetId') presetId: string, @Args('input') input: PresetAdminUpdateInput) {
    return this.service.admin.updatePreset(presetId, input)
  }
}
