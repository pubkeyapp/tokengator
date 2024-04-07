import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class PresetUserMintFromPreset {
  @Field()
  presetId!: string
  @Field()
  communitySlug!: string
}
