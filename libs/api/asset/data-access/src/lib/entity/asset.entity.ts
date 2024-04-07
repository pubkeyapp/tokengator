import { Field, ObjectType } from '@nestjs/graphql'
import { AssetActivityType } from './asset-activity.entity'

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
  @Field(() => [AssetActivityType])
  lists!: AssetActivityType[]
  @Field(() => [[String]])
  attributes!: [string, string][]
}
