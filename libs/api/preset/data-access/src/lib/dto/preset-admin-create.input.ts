import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class PresetAdminCreateInput {
  @Field()
  name!: string
  @Field({ nullable: true })
  description?: string
}
