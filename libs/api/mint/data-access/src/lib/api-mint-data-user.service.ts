import { Injectable } from '@nestjs/common'
import { IdentityProvider } from '@prisma/client'
import { ApiCoreService } from '@tokengator-mint/api-core-data-access'
import { ApiMintDataService } from './api-mint-data.service'
import { UserCreateMintInput } from './dto/user-create-mint.input'
import { UserFindManyMintInput } from './dto/user-find-many-mint.input'
import { UserUpdateMintInput } from './dto/user-update-mint.input'
import { MintPaging } from './entity/mint.entity'
import { getMintWhereUserInput } from './helpers/get-mint-where-user.input'

@Injectable()
export class ApiMintDataUserService {
  constructor(private readonly core: ApiCoreService, private readonly data: ApiMintDataService) {}

  async createMint(input: UserCreateMintInput) {
    return this.data.createMint(input)
  }

  async deleteMint(mintId: string) {
    return this.data.deleteMint(mintId)
  }

  async findManyMint(input: UserFindManyMintInput): Promise<MintPaging> {
    return this.core.data.mint
      .paginate({
        orderBy: { createdAt: 'desc' },
        where: getMintWhereUserInput(input),
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOneMint(mintId: string) {
    return this.data.findOneMint(mintId)
  }

  async updateMint(mintId: string, input: UserUpdateMintInput) {
    return this.data.updateMint(mintId, input)
  }

  async getMintAccount(mintId: string) {
    return this.data.getMintAccount(mintId)
  }

  async mintToIdentity(userId: string, mintId: string, identityId: string) {
    // Make sure user owns identity and identity is a solana identity
    const found = await this.core.data.identity.findUnique({
      where: { id: identityId, ownerId: userId, provider: IdentityProvider.Solana },
    })
    if (!found) {
      throw new Error('Identity not found')
    }
    return this.data.mintToIdentity(mintId, identityId)
  }
}
