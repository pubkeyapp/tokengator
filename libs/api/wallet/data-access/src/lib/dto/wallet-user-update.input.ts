import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class WalletUserUpdateInput {
  @Field({ nullable: true })
  name?: string
}
