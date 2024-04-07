import { Field, ObjectType } from '@nestjs/graphql'
import { Community } from '@tokengator/api-community-data-access'
import { PagingResponse } from '@tokengator/api-core-data-access'
import { Identity, IdentityProvider } from '@tokengator/api-identity-data-access'
import { TokenGatorMinter } from '@tokengator/api-preset-data-access'
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
  account!: string
  @Field({ nullable: true })
  avatarUrl?: string | null
  @Field({ nullable: true })
  signature?: string | null
  @Field(() => IdentityProvider)
  provider!: IdentityProvider
  @Field()
  providerId!: string
  @Field(() => ClaimStatus)
  status!: ClaimStatus
  @Field(() => Community, { nullable: true })
  community?: Community
  @Field(() => TokenGatorMinter, { nullable: true })
  minter?: TokenGatorMinter
  @Field(() => Identity, { nullable: true })
  identity?: Identity
}

@ObjectType()
export class ClaimPaging extends PagingResponse<Claim>(Claim) {}
