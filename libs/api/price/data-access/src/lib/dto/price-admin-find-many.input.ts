import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class PriceAdminFindManyInput {
  @Field()
  presetId!: string
}
