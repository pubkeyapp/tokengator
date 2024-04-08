import { Field, ObjectType } from '@nestjs/graphql'
import { PresetActivity } from './preset-activity.enum'

@ObjectType()
export class TokenGatorAsset {
  @Field()
  account!: string
  @Field()
  name!: string
  @Field()
  description!: string
  @Field()
  image!: string
  @Field(() => [PresetActivity])
  activities!: PresetActivity[]
  @Field(() => [[String]])
  attributes!: [string, string][]
}
