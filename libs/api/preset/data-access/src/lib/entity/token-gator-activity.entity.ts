import { Field, ObjectType } from '@nestjs/graphql'

import { PresetActivity } from './preset-activity.enum'
import { TokenGatorActivityEntry } from './token-gator-activity-entry.entity'

@ObjectType()
export class TokenGatorActivity {
  @Field(() => String)
  account!: string
  @Field(() => PresetActivity)
  type!: PresetActivity
  @Field()
  label!: string
  @Field({ nullable: true })
  startDate!: string | null
  @Field({ nullable: true })
  endDate!: string | null
  @Field()
  pointsLabel!: string
  @Field()
  pointsTotal!: number
  @Field(() => [TokenGatorActivityEntry], { nullable: true })
  entries?: TokenGatorActivityEntry[]
}
