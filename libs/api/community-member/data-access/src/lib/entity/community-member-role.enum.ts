import { registerEnumType } from '@nestjs/graphql'
import { CommunityMemberRole } from '@prisma/client'
export { CommunityMemberRole }

registerEnumType(CommunityMemberRole, { name: 'CommunityMemberRole' })