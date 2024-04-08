import { Field, ObjectType } from '@nestjs/graphql'
import { PresetActivity } from '@tokengator/api-preset-data-access'

@ObjectType()
export class Asset {
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
