import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class PresetAdminUpdateInput {
  @Field({ nullable: true })
  name?: string
  @Field({ nullable: true })
  description?: string
}
