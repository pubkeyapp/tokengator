import { Field, InputType } from '@nestjs/graphql'
import { CommunityMemberRole } from '@prisma/client'

@InputType()
export class AdminCreateCommunityMemberInput {
  @Field()
  userId!: string
  @Field()
  communityId!: string
  @Field(() => CommunityMemberRole, { nullable: true })
  role?: CommunityMemberRole
}
