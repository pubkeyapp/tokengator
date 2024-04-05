import { Injectable } from '@nestjs/common'
import { ClaimAdminCreateInput } from './dto/claim-admin-create.input'
import { ClaimAdminFindManyInput } from './dto/claim-admin-find-many.input'
import { ClaimAdminUpdateInput } from './dto/claim-admin-update.input'
import { ClaimPaging } from './entity/claim.entity'
import { getClaimWhereAdminInput } from './helpers/get-claim-where-admin.input'
import { ApiClaimDataService } from './api-claim-data.service'

@Injectable()
export class ApiClaimDataAdminService {
  constructor(private readonly data: ApiClaimDataService) {}

  async createClaim(input: ClaimAdminCreateInput) {
    return this.data.create(input)
  }

  async deleteClaim(claimId: string) {
    return this.data.delete(claimId)
  }

  async findManyClaim(input: ClaimAdminFindManyInput): Promise<ClaimPaging> {
    return this.data.findMany({
      orderBy: { createdAt: 'desc' },
      where: getClaimWhereAdminInput(input),
      limit: input.limit,
      page: input.page,
    })
  }

  async findOneClaim(claimId: string) {
    return this.data.findOne(claimId)
  }

  async updateClaim(claimId: string, input: ClaimAdminUpdateInput) {
    return this.data.update(claimId, input)
  }
}
