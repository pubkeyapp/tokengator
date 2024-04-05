import { Field, ObjectType } from '@nestjs/graphql'
import { PagingResponse } from '@tokengator-mint/api-core-data-access'
import { IdentityProvider } from '@tokengator-mint/api-identity-data-access'
import { ClaimStatus } from './claim-status.enum'

@ObjectType()
export class Claim {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field()
  amount!: string
  @Field()
  communityId!: string
  @Field()
  minter!: string
  @Field({ nullable: true })
  signature?: string | null
  @Field(() => IdentityProvider)
  provider!: IdentityProvider
  @Field()
  providerId!: string
  @Field(() => ClaimStatus)
  status!: ClaimStatus
}

@ObjectType()
export class ClaimPaging extends PagingResponse<Claim>(Claim) {}
