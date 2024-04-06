import { Field, InputType } from '@nestjs/graphql'
import { IdentityProvider } from '@tokengator/api-identity-data-access'

@InputType()
export class ClaimAdminCreateInput {
  @Field({ nullable: true })
  amount?: string
  @Field()
  communityId!: string
  @Field()
  account!: string
  @Field(() => IdentityProvider)
  provider!: IdentityProvider
  @Field()
  providerId!: string
}
