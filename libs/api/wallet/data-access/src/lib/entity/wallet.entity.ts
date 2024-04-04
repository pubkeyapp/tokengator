import { Field, ObjectType } from '@nestjs/graphql'
import { PagingResponse } from '@tokengator-mint/api-core-data-access'

@ObjectType()
export class Wallet {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field()
  name!: string
  @Field()
  publicKey!: string
}

@ObjectType()
export class WalletPaging extends PagingResponse<Wallet>(Wallet) {}
