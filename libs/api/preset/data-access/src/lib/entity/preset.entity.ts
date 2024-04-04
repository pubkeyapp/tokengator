import { Field, ObjectType } from '@nestjs/graphql'
import { PagingResponse } from '@tokengator-mint/api-core-data-access'

@ObjectType()
export class Preset {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field()
  name!: string
  @Field({ nullable: true })
  description?: string | null
}

@ObjectType()
export class PresetPaging extends PagingResponse<Preset>(Preset) {}
