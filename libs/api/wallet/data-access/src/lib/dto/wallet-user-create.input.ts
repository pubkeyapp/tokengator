import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class WalletUserCreateInput {
  @Field({ nullable: true })
  secretKey?: string
  @Field()
  communityId!: string
}
