import { Injectable } from '@nestjs/common'
import { ClaimStatus, Prisma } from '@prisma/client'
import { ApiCoreService, PagingInputFields } from '@tokengator-mint/api-core-data-access'
import { ClaimPaging } from './entity/claim.entity'

@Injectable()
export class ApiClaimDataService {
  constructor(private readonly core: ApiCoreService) {}

  async create(input: Omit<Prisma.ClaimUncheckedCreateInput, 'amount' | 'status'> & { amount?: string }) {
    return this.core.data.claim.create({
      data: { ...input, amount: input.amount?.trim().length ? input.amount : '1', status: ClaimStatus.Pending },
    })
  }

  async delete(claimId: string) {
    await this.findOne(claimId)
    const deleted = await this.core.data.claim.delete({ where: { id: claimId } })
    return !!deleted
  }

  async findMany({
    limit = 10,
    page = 1,
    ...input
  }: Prisma.ClaimFindManyArgs & PagingInputFields): Promise<ClaimPaging> {
    return this.core.data.claim
      .paginate(input)
      .withPages({ limit, page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOne(claimId: string) {
    const found = await this.core.data.claim.findUnique({ where: { id: claimId } })
    if (!found) {
      throw new Error('Claim not found')
    }
    return found
  }

  async update(claimId: string, input: Prisma.ClaimUpdateInput) {
    return this.core.data.claim.update({ where: { id: claimId }, data: input })
  }
}
