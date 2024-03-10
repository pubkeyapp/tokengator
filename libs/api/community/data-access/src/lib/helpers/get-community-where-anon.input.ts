import { Prisma } from '@prisma/client'
import { AnonFindManyCommunityInput } from '../dto/anon-find-many-community.input'

export function getCommunityWhereAnonInput(input: AnonFindManyCommunityInput): Prisma.CommunityWhereInput {
  const where: Prisma.CommunityWhereInput = {}

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { name: { contains: input.search, mode: 'insensitive' } },
      { slug: { contains: input.search.toLowerCase(), mode: 'insensitive' } },
    ]
  }

  return where
}
