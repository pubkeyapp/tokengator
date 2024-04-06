import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'

export enum AssetActivityType {
  Payouts = 'Payouts',
  Points = 'Points',
}

registerEnumType(AssetActivityType, { name: 'AssetActivityType' })

@ObjectType()
export class AssetActivity {
  @Field()
  account!: string
  @Field(() => AssetActivityType)
  type!: AssetActivityType
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
