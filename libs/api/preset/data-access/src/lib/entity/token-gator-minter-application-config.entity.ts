import { Field, ObjectType } from '@nestjs/graphql'
import { IdentityProvider } from '@tokengator/api-identity-data-access'
import { TokenGatorMinterPaymentConfig } from './token-gator-minter-payment-config.entity'

@ObjectType()
export class TokenGatorMinterApplicationConfig {
  @Field(() => [IdentityProvider])
  identities!: IdentityProvider[]
  @Field(() => TokenGatorMinterPaymentConfig)
  paymentConfig!: TokenGatorMinterPaymentConfig
}
