import { Field, ObjectType } from '@nestjs/graphql'
import { PagingResponse } from '@tokengator-mint/api-core-data-access'

@ObjectType()
export class Community {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field()
  name!: string
  @Field()
  slug!: string
  @Field()
  description!: string
  @Field({ nullable: true })
  imageUrl?: string | null
}

@ObjectType()
export class CommunityPaging extends PagingResponse<Community>(Community) {}
