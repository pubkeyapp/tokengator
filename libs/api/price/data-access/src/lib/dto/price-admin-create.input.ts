import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class PriceAdminCreateInput {
  @Field()
  name!: string
  @Field()
  mint!: string
  @Field()
  price!: string
  @Field()
  currency!: string
  @Field()
  presetId!: string
  @Field(() => Int)
  days!: number
  @Field(() => Int)
  assets!: number
}
