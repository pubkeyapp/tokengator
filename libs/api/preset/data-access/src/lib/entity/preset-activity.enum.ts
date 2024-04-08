import { registerEnumType } from '@nestjs/graphql'
import { PresetActivity } from '@prisma/client'
export { PresetActivity }

registerEnumType(PresetActivity, { name: 'PresetActivity' })