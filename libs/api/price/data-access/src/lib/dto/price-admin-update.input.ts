import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class PriceAdminUpdateInput {
  @Field({ nullable: true })
  name?: string
  @Field({ nullable: true })
  mint?: string
  @Field({ nullable: true })
  price?: string
  @Field({ nullable: true })
  currency?: string
  @Field({ nullable: true })
  active?: boolean
  @Field(() => Int)
  days?: number
  @Field(() => Int)
  assets?: number
}
