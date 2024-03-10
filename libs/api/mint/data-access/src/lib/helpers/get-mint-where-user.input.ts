import { Prisma } from '@prisma/client'
import { UserFindManyMintInput } from '../dto/user-find-many-mint.input'

export function getMintWhereUserInput(input: UserFindManyMintInput): Prisma.MintWhereInput {
  const where: Prisma.MintWhereInput = {
    communityId: input.communityId,
  }

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { name: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
