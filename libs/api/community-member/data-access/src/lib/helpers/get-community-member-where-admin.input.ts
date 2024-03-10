import { Prisma } from '@prisma/client'
import { AdminFindManyCommunityMemberInput } from '../dto/admin-find-many-community-member.input'

export function getCommunityMemberWhereAdminInput(
  input: AdminFindManyCommunityMemberInput,
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
