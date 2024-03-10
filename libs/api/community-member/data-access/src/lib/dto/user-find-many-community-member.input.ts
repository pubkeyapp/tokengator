import { Field, InputType } from '@nestjs/graphql'
import { PagingInput } from '@tokengator-mint/api-core-data-access'
import { CommunityMemberRole } from '../entity/community-member-role.enum'

@InputType()
export class UserFindManyCommunityMemberInput extends PagingInput() {
  @Field()
  communityId!: string
  @Field(() => CommunityMemberRole, { nullable: true })
  role?: CommunityMemberRole
  @Field({ nullable: true })
  search?: string
}
