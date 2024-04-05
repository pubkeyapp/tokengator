import { Prisma } from '@prisma/client'
import { ClaimAdminFindManyInput } from '../dto/claim-admin-find-many.input'

export function getClaimWhereAdminInput(input: ClaimAdminFindManyInput): Prisma.ClaimWhereInput {
  const where: Prisma.ClaimWhereInput = {
    communityId: input.communityId,
  }

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { providerId: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
