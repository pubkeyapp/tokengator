import { Field, InputType } from '@nestjs/graphql'
import { PagingInput } from '@tokengator/api-core-data-access'
import { IdentityProvider } from '@tokengator/api-identity-data-access'
import { ClaimStatus } from '../entity/claim-status.enum'

@InputType()
export class ClaimUserFindManyInput extends PagingInput() {
  @Field()
  communityId!: string
  @Field({ nullable: true })
  search?: string
  @Field({ nullable: true })
  account?: string
  @Field(() => IdentityProvider, { nullable: true })
  provider?: IdentityProvider
  @Field({ nullable: true })
  providerId?: string
  @Field(() => ClaimStatus, { nullable: true })
  status?: ClaimStatus
}
