import { Field, InputType } from '@nestjs/graphql'
import { CommunityMemberRole } from '@prisma/client'

@InputType()
export class UserCreateCommunityMemberInput {
  @Field()
  userId!: string
  @Field()
  communityId!: string
  @Field(() => CommunityMemberRole, { nullable: true })
  role?: CommunityMemberRole
}
