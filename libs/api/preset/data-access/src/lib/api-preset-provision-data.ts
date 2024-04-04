import { Prisma } from '@prisma/client'

export const provisionPresets: Prisma.PresetCreateInput[] = [
  {
    name: 'Business Visa',
    description: 'Temporary access, can earn in the community',
  },
  {
    name: 'Visitor Pass',
    description: 'Temporary access, no earning in the community',
  },
  {
    name: 'Citizenship',
    description: 'Permanent access, no need for renewal',
  },
  {
    name: 'Residence',
    description: 'Permanent access, renewal required',
  },
]
