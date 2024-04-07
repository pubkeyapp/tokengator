import { Field, ObjectType } from '@nestjs/graphql'
import { PagingResponse } from '@tokengator/api-core-data-access'

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
  iconUrl?: string | null
  @Field({ nullable: true })
  logoUrl?: string | null
}

@ObjectType()
export class CommunityPaging extends PagingResponse<Community>(Community) {}
