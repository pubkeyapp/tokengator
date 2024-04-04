import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Preset } from '@tokengator-mint/api-preset-data-access'
import { Currency } from './currency.entity'

@ObjectType()
export class Price {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field()
  name!: string
  @Field()
  price!: string
  @Field(() => Currency, { nullable: true })
  currency?: Currency
  @Field({ nullable: true })
  currencyId!: string | null
  @Field()
  active!: boolean
  @Field(() => Int)
  days!: number
  @Field(() => Int)
  assets!: number
  @Field()
  presetId!: string
  @Field(() => Preset, { nullable: true })
  preset?: Preset
}
