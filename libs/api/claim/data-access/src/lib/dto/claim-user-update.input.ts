import { Field, InputType } from '@nestjs/graphql'
import { ClaimStatus } from '../entity/claim-status.enum'

@InputType()
export class ClaimUserUpdateInput {
  @Field({ nullable: true })
  amount?: string

  @Field({ nullable: true })
  signature?: string

  @Field(() => ClaimStatus, { nullable: true })
  status?: ClaimStatus
}
