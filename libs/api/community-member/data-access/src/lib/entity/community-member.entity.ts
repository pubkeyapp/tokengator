import { Field, ObjectType } from '@nestjs/graphql'
import { PagingResponse } from '@tokengator/api-core-data-access'
import { User } from '@tokengator/api-user-data-access'
import { CommunityMemberRole } from './community-member-role.enum'

@ObjectType()
export class CommunityMember {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field()
  userId!: string
  @Field(() => User, { nullable: true })
  user?: User
  @Field()
  communityId!: string
  @Field(() => CommunityMemberRole)
  role!: CommunityMemberRole
}

@ObjectType()
export class CommunityMemberPaging extends PagingResponse<CommunityMember>(CommunityMember) {}
