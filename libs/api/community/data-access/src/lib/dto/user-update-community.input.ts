import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserUpdateCommunityInput {
  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  imageUrl?: string
}
