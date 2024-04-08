import { Field, ObjectType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { PagingResponse } from '@tokengator/api-core-data-access'
import { GraphQLJSON } from 'graphql-scalars'
import { PresetActivity } from './preset-activity.enum'

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
  @Field()
  color!: string
  @Field({ nullable: true })
  imageUrl?: string | null
  @Field(() => GraphQLJSON, { nullable: true })
  config!: Prisma.JsonValue | null
  @Field(() => [PresetActivity], { nullable: true })
  activities?: PresetActivity[]
}

@ObjectType()
export class PresetPaging extends PagingResponse<Preset>(Preset) {}
