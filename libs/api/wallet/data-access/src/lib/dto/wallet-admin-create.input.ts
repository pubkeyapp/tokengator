import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class WalletAdminCreateInput {
  @Field({ nullable: true })
  secretKey!: string
  @Field()
  communityId!: string
}
