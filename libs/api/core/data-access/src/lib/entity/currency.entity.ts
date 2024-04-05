import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Currency {
  @Field({ nullable: true })
  id!: string
  @Field()
  name!: string
  @Field()
  address!: string
  @Field()
  programId!: string
  @Field()
  symbol!: string
  @Field(() => Int)
  decimals!: number
}
