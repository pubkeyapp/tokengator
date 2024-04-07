import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLUserGuard, CtxUserId } from '@tokengator/api-auth-data-access'
import {
  ApiPresetService,
  Preset,
  PresetPaging,
  PresetUserFindManyInput,
  PresetUserMintFromMinter,
  PresetUserMintFromPreset,
  TokenGatorMinter,
} from '@tokengator/api-preset-data-access'
import { GraphQLJSON } from 'graphql-scalars'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiPresetUserResolver {
  constructor(private readonly service: ApiPresetService) {}

  @Mutation(() => String, { nullable: true })
  userCreateMintFromPreset(@CtxUserId() userId: string, @Args('input') input: PresetUserMintFromPreset) {
    return this.service.user.createMinterFromPreset(userId, input)
  }

  @Mutation(() => String, { nullable: true })
  userCreateMintFromMinter(@CtxUserId() userId: string, @Args('input') input: PresetUserMintFromMinter) {
    return this.service.user.createMintFromMinter(userId, input)
  }

  @Mutation(() => String, { nullable: true })
  userAddMinterAuthority(
    @CtxUserId() userId: string,
    @Args('account') account: string,
    @Args('authority') authority: string,
    @Args('communitySlug') communitySlug: string,
  ) {
    return this.service.user.addMinterAuthority(userId, account, authority, communitySlug)
  }

  @Mutation(() => String, { nullable: true })
  userRemoveMinterAuthority(
    @CtxUserId() userId: string,
    @Args('account') account: string,
    @Args('authority') authority: string,
    @Args('communitySlug') communitySlug: string,
  ) {
    return this.service.user.removeMinterAuthority(userId, account, authority, communitySlug)
  }

  @Mutation(() => Boolean, { nullable: true })
  userDeleteMinter(
    @CtxUserId() userId: string,
    @Args('account') account: string,
    @Args('communitySlug') communitySlug: string,
  ) {
    return this.service.user.deleteMinter(userId, account, communitySlug)
  }

  @Query(() => TokenGatorMinter)
  userGetMinters() {
    return this.service.user.getMinters()
  }

  @Query(() => [TokenGatorMinter])
  userGetMintersByCommunity(@CtxUserId() userId: string, @Args('communitySlug') communitySlug: string) {
    return this.service.user.getMintersByCommunity(userId, communitySlug)
  }

  @Query(() => TokenGatorMinter)
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
