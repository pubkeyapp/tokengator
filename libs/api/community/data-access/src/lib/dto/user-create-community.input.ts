import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserCreateCommunityInput {
  @Field()
  name!: string
  @Field()
  description!: string
  @Field({ nullable: true })
  iconUrl?: string
  @Field({ nullable: true })
  logoUrl?: string
}
