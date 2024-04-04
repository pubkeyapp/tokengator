import { Prisma } from '@prisma/client'
import { PresetUserFindManyInput } from '../dto/preset-user-find-many.input'

export function getPresetWhereUserInput(input: PresetUserFindManyInput): Prisma.PresetWhereInput {
  const where: Prisma.PresetWhereInput = {}

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { name: { contains: input.search, mode: 'insensitive' } },
      { description: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
