import { Field, InputType } from '@nestjs/graphql'
import { IdentityProvider } from '@tokengator-mint/api-identity-data-access'

@InputType()
export class ClaimAdminCreateInput {
  @Field({ nullable: true })
  amount?: string
  @Field()
  communityId!: string
  @Field()
  minter!: string
  @Field(() => IdentityProvider)
  provider!: IdentityProvider
  @Field()
  providerId!: string
}
