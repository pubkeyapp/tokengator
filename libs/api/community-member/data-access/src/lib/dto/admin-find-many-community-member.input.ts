import { Field, InputType } from '@nestjs/graphql'
import { PagingInput } from '@tokengator/api-core-data-access'
import { CommunityMemberRole } from '../entity/community-member-role.enum'

@InputType()
export class AdminFindManyCommunityMemberInput extends PagingInput() {
  @Field()
  communityId!: string
  @Field(() => CommunityMemberRole, { nullable: true })
  role?: CommunityMemberRole
  @Field({ nullable: true })
  search?: string
}
