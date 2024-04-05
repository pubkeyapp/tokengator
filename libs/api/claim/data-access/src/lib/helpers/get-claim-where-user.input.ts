import { Prisma } from '@prisma/client'
import { ClaimUserFindManyInput } from '../dto/claim-user-find-many.input'

export function getClaimWhereUserInput(input: ClaimUserFindManyInput): Prisma.ClaimWhereInput {
  const where: Prisma.ClaimWhereInput = {
    communityId: input.communityId,
    minter: input.minter ?? undefined,
    provider: input.provider ?? undefined,
    providerId: input.providerId ?? undefined,
    status: input.status ?? undefined,
  }

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { providerId: { contains: input.search, mode: 'insensitive' } },
      { signature: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
