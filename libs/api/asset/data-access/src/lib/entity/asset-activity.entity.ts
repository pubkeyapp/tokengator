import { Field, ObjectType } from '@nestjs/graphql'
import { PresetActivity } from '@tokengator/api-preset-data-access'

@ObjectType()
export class AssetActivity {
  @Field()
  account!: string
  @Field(() => PresetActivity)
  type!: PresetActivity
  @Field()
  label!: string
  @Field()
  startDate!: Date
  @Field()
  endDate!: Date
  @Field()
  pointsLabel!: string
  @Field()
  pointsTotal!: number
  @Field(() => [AssetActivityEntry], { nullable: true })
  entries?: AssetActivityEntry[]
}

@ObjectType()
export class AssetActivityEntry {
  @Field()
  timestamp!: Date
  @Field()
  message!: string
  @Field({ nullable: true })
  url?: string
  @Field({ nullable: true })
  points?: number
}
