import { Prisma } from '@prisma/client'
import { WalletUserFindManyInput } from '../dto/wallet-user-find-many.input'

export function getWalletWhereUserInput(input: WalletUserFindManyInput): Prisma.WalletWhereInput {
  const where: Prisma.WalletWhereInput = {
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
