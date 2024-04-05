import { Injectable } from '@nestjs/common'
import { ApiClaimDataService } from './api-claim-data.service'
import { ClaimUserCreateInput } from './dto/claim-user-create.input'
import { ClaimUserFindManyInput } from './dto/claim-user-find-many.input'
import { ClaimUserUpdateInput } from './dto/claim-user-update.input'
import { ClaimPaging } from './entity/claim.entity'
import { getClaimWhereUserInput } from './helpers/get-claim-where-user.input'

@Injectable()
export class ApiClaimDataUserService {
  constructor(private readonly data: ApiClaimDataService) {}

  async createClaim(input: ClaimUserCreateInput) {
    return this.data.create(input)
  }

  async deleteClaim(claimId: string) {
    return this.data.delete(claimId)
  }

  async findManyClaim(input: ClaimUserFindManyInput): Promise<ClaimPaging> {
    return this.data.findMany({
      orderBy: { createdAt: 'desc' },
      where: getClaimWhereUserInput(input),
      limit: input.limit,
      page: input.page,
    })
  }

  async findOneClaim(claimId: string) {
    return this.data.findOne(claimId)
  }

  async updateClaim(claimId: string, input: ClaimUserUpdateInput) {
    return this.data.update(claimId, input)
  }

  async userGetClaims(userId: string) {
    return this.data.getClaims(userId)
  }

  async userGetClaim(userId: string, claimId: string) {
    return this.data.getClaim(userId, claimId)
  }
}
