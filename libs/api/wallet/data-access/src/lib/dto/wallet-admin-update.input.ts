import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class WalletAdminUpdateInput {
  @Field({ nullable: true })
  name?: string
}
