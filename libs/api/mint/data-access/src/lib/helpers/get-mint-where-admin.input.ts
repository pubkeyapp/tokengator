import { Prisma } from '@prisma/client'
import { AdminFindManyMintInput } from '../dto/admin-find-many-mint.input'

export function getMintWhereAdminInput(input: AdminFindManyMintInput): Prisma.MintWhereInput {
  const where: Prisma.MintWhereInput = {}

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { name: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
