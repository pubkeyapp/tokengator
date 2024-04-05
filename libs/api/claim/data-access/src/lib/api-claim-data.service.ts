import { Injectable, Logger } from '@nestjs/common'
import { ClaimStatus, Identity, IdentityProvider, Prisma } from '@prisma/client'
import { ApiCoreService, PagingInputFields } from '@tokengator-mint/api-core-data-access'
import { ApiPresetService, TokenGatorMinter } from '@tokengator-mint/api-preset-data-access'
import { LRUCache } from 'lru-cache'
import { ClaimPaging } from './entity/claim.entity'

@Injectable()
export class ApiClaimDataService {
  private readonly logger = new Logger(ApiClaimDataService.name)
  private readonly minterCache = new LRUCache<string, TokenGatorMinter>({
    max: 1000,
    ttl: 1000 * 60 * 5, // 5 minutes
    fetchMethod: async (account) => {
      this.logger.verbose(`minterCache: Cache miss for ${account}`)
      return this.preset.minter.getMinter(account)
    },
  })

  constructor(private readonly core: ApiCoreService, private readonly preset: ApiPresetService) {}

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

  async getClaims(userId: string) {
    const ids: Map<IdentityProvider, Identity[]> = await this.core.getUserIdentityMap({ userId })
    const OR: Prisma.ClaimWhereInput[] = []

    for (const provider of ids.keys()) {
      const identities = ids.get(provider)
      for (const { profile, providerId } of identities || []) {
        OR.push({ provider, providerId })
        // This allows for adding claims to a user by their username instead of providerId
        const username = (profile as { username?: string })?.username
        if (username) {
          OR.push({ provider, providerId: username })
        }
      }
    }

    return this.core.data.claim.findMany({ where: { OR }, include: { community: true } }).then(async (claims) => {
      const uniqueMinters = Array.from(new Set(claims.map((claim) => claim.account)))
      const minters = await Promise.all([...uniqueMinters.map((minter) => this.minterCache.fetch(minter))])

      return claims.map((claim) => {
        const identity = ids
          .get(claim.provider)
          ?.find(
            ({ profile, providerId }) =>
              providerId === claim.providerId || (profile as { username?: string })?.username === claim.providerId,
          )
        const minter = minters.find((m) => m?.publicKey.toString() === claim.account)

        return {
          ...claim,
          minter,
          identity,
        }
      })
    })
  }

  async getClaim(userId: string, claimId: string) {
    const claims = await this.getClaims(userId)
    const found = claims.find((claim) => claim.id === claimId)
    if (!found) {
      throw new Error('Claim not found')
    }
    return found
  }
}
