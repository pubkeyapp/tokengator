import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class TokenGatorMinterPaymentConfig {
  @Field()
  amount!: number
  @Field()
  price!: string
  @Field()
  mint!: string
  @Field()
  days!: number
  @Field()
  expiresAt!: string
}
