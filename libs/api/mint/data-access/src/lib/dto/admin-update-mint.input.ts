import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminUpdateMintInput {
  @Field({ nullable: true })
  name?: string
  @Field({ nullable: true })
  symbol?: string
  @Field({ nullable: true })
  decimals?: number
  @Field({ nullable: true })
  imageUrl?: string
  @Field({ nullable: true })
  secretKey?: string
}
