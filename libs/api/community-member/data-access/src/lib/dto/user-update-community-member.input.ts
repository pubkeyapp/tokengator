import { Field, InputType } from '@nestjs/graphql'
import { CommunityMemberRole } from '@prisma/client'

@InputType()
export class UserUpdateCommunityMemberInput {
  @Field(() => CommunityMemberRole, { nullable: true })
  role?: CommunityMemberRole
}
