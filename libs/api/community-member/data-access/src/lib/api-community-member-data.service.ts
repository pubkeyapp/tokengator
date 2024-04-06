import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { ApiCoreService, PagingInputFields } from '@tokengator/api-core-data-access'
import { CommunityMemberPaging } from './entity/community-member.entity'

@Injectable()
export class ApiCommunityMemberDataService {
  constructor(private readonly core: ApiCoreService) {}

  async create(input: Prisma.CommunityMemberUncheckedCreateInput) {
    return this.core.data.communityMember.create({ data: input })
  }

  async delete(communityMemberId: string) {
    const deleted = await this.core.data.communityMember.delete({ where: { id: communityMemberId } })
    return !!deleted
  }

  async findMany({
    limit = 10,
    page = 1,
    ...input
  }: Prisma.CommunityMemberFindManyArgs & PagingInputFields): Promise<CommunityMemberPaging> {
    return this.core.data.communityMember
      .paginate({ ...input, include: { user: true } })
      .withPages({ limit, page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOne(communityMemberId: string) {
    return this.core.data.communityMember.findUnique({ where: { id: communityMemberId }, include: { user: true } })
  }

  async update(communityMemberId: string, input: Prisma.CommunityMemberUpdateInput) {
    return this.core.data.communityMember.update({ where: { id: communityMemberId }, data: input })
  }
}
