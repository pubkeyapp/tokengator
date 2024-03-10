import { Prisma } from '@prisma/client'
import { UserFindManyCommunityMemberInput } from '../dto/user-find-many-community-member.input'

export function getCommunityMemberWhereUserInput(
  input: UserFindManyCommunityMemberInput,
): Prisma.CommunityMemberWhereInput {
  const where: Prisma.CommunityMemberWhereInput = {
    communityId: input.communityId,
    role: input.role ?? undefined,
  }

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { user: { username: { contains: input.search, mode: 'insensitive' } } },
      { user: { name: { contains: input.search, mode: 'insensitive' } } },
      { user: { identities: { some: { providerId: { contains: input.search, mode: 'insensitive' } } } } },
    ]
  }

  return where
}
