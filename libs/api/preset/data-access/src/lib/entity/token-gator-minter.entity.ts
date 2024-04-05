import { Field, ObjectType } from '@nestjs/graphql'
import { TokenGatorMinterConfig } from './token-gator-minter-config.entity'
import { TokenGatorMinterPaymentConfig } from './token-gator-minter-payment-config.entity'

@ObjectType()
export class TokenGatorMinter {
  @Field()
  publicKey!: string
  @Field()
  bump!: number
  @Field()
  communityId!: string
  @Field()
  name!: string
  @Field()
  description!: string
  @Field()
  imageUrl!: string
  @Field()
  feePayer!: string
  @Field(() => [String])
  authorities!: string[]
  @Field(() => TokenGatorMinterPaymentConfig)
  paymentConfig!: TokenGatorMinterPaymentConfig
  @Field(() => TokenGatorMinterConfig)
  minterConfig!: TokenGatorMinterConfig
}
