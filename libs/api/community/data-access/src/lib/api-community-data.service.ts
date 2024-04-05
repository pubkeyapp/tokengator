import { Injectable } from '@nestjs/common'
import { CommunityMemberRole, Prisma } from '@prisma/client'
import { Keypair } from '@solana/web3.js'
import { ApiCoreService, PagingInputFields, slugifyId } from '@tokengator-mint/api-core-data-access'
import { CommunityPaging } from './entity/community.entity'

@Injectable()
export class ApiCommunityDataService {
  constructor(private readonly core: ApiCoreService) {}
  async create(data: Omit<Prisma.CommunityUncheckedCreateInput, 'slug'>, userId?: string) {
    const kp = Keypair.generate()
    return this.core.data.community.create({
      data: {
        ...data,
        slug: slugifyId(data.name).toLowerCase(),
        members: userId ? { create: [{ userId, role: CommunityMemberRole.Admin }] } : data.members,
        wallets: data.wallets
          ? data.wallets
          : {
              create: {
                name: 'Fee Payer',
                feePayer: true,
                publicKey: kp.publicKey.toBase58(),
                secretKey: JSON.stringify(Array.from(kp.secretKey)),
              },
            },
      },
    })
  }

  async delete(communityId: string) {
    const deleted = await this.core.data.community.delete({ where: { id: communityId } })
    return !!deleted
  }

  async findMany({
    limit = 10,
    page = 1,
    ...input
  }: Prisma.CommunityFindManyArgs & PagingInputFields): Promise<CommunityPaging> {
    return this.core.data.community
      .paginate(input)
      .withPages({ limit, page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOne(communityId: string) {
    return this.core.data.community.findUnique({ where: { id: communityId } })
  }

  async findOneBySlug(slug: string) {
    return this.core.data.community.findUnique({ where: { slug: slug.toLowerCase() } })
  }

  async update(communityId: string, data: Prisma.CommunityUpdateInput) {
    return this.core.data.community.update({ where: { id: communityId }, data })
  }
}
