import { Field, InputType } from '@nestjs/graphql'
import { PagingInput } from '@tokengator/api-core-data-access'

@InputType()
export class PresetUserFindManyInput extends PagingInput() {
  @Field({ nullable: true })
  search?: string
}
