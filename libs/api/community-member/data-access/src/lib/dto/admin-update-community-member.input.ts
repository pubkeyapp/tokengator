import { Field, InputType } from '@nestjs/graphql'
import { CommunityMemberRole } from '@prisma/client'

@InputType()
export class AdminUpdateCommunityMemberInput {
  @Field(() => CommunityMemberRole, { nullable: true })
  role?: CommunityMemberRole
}
