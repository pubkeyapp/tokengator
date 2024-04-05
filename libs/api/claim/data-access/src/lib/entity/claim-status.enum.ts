import { registerEnumType } from '@nestjs/graphql'
import { ClaimStatus } from '@prisma/client'
export { ClaimStatus }

registerEnumType(ClaimStatus, { name: 'ClaimStatus' })