import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class PresetUserMintFromMinter {
  @Field()
  account!: string
  @Field()
  communitySlug!: string
  @Field()
  username!: string
}
