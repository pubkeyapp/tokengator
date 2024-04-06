import { Field, InputType } from '@nestjs/graphql'
import { PagingInput } from '@tokengator/api-core-data-access'

@InputType()
export class WalletAdminFindManyInput extends PagingInput() {
  @Field()
  communityId!: string
  @Field({ nullable: true })
  search?: string
}
