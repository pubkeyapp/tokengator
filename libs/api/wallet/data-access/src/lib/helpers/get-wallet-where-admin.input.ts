import { Prisma } from '@prisma/client'
import { WalletAdminFindManyInput } from '../dto/wallet-admin-find-many.input'

export function getWalletWhereAdminInput(input: WalletAdminFindManyInput): Prisma.WalletWhereInput {
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
