import { Prisma } from '@prisma/client'
import { PresetAdminFindManyInput } from '../dto/preset-admin-find-many.input'

export function getPresetWhereAdminInput(input: PresetAdminFindManyInput): Prisma.PresetWhereInput {
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
