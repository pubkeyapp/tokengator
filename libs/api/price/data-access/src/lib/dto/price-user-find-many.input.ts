import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class PriceUserFindManyInput {
  @Field()
  presetId!: string
}
