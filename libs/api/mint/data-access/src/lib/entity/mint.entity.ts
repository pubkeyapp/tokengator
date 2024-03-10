import { Field, HideField, ObjectType } from '@nestjs/graphql'
import { PagingResponse } from '@tokengator-mint/api-core-data-access'

@ObjectType()
export class Mint {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field()
  name!: string
  @Field()
  symbol!: string
  @Field()
  decimals!: number
  @Field({ nullable: true })
  imageUrl?: string | null
  @Field()
  publicKey!: string
  @HideField()
  secretKey!: string
}

@ObjectType()
export class MintPaging extends PagingResponse<Mint>(Mint) {}
