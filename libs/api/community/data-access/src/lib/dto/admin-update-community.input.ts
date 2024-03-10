import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminUpdateCommunityInput {
  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  imageUrl?: string
}
