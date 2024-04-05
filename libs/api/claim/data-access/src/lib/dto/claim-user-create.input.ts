import { Field, InputType } from '@nestjs/graphql'
import { IdentityProvider } from '@tokengator-mint/api-identity-data-access'

@InputType()
export class ClaimUserCreateInput {
  @Field()
  communityId!: string
  @Field({ nullable: true })
  amount?: string
  @Field()
  minter!: string
  @Field(() => IdentityProvider)
  provider!: IdentityProvider
  @Field()
  providerId!: string
}
