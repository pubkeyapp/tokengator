import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@tokengator-mint/api-core-data-access'
import { ApiMintDataService } from './api-mint-data.service'
import { AdminCreateMintInput } from './dto/admin-create-mint.input'
import { AdminFindManyMintInput } from './dto/admin-find-many-mint.input'
import { AdminUpdateMintInput } from './dto/admin-update-mint.input'
import { MintPaging } from './entity/mint.entity'
import { getMintWhereAdminInput } from './helpers/get-mint-where-admin.input'

@Injectable()
export class ApiMintDataAdminService {
  constructor(private readonly core: ApiCoreService, private readonly data: ApiMintDataService) {}

  async createMint(input: AdminCreateMintInput) {
    return this.data.createMint(input)
  }

  async deleteMint(mintId: string) {
    return this.data.deleteMint(mintId)
  }

  async findManyMint(input: AdminFindManyMintInput): Promise<MintPaging> {
    return this.core.data.mint
      .paginate({
        orderBy: { createdAt: 'desc' },
        where: getMintWhereAdminInput(input),
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOneMint(mintId: string) {
    return this.data.findOneMint(mintId)
  }

  async updateMint(mintId: string, input: AdminUpdateMintInput) {
    return this.data.updateMint(mintId, input)
  }
}
