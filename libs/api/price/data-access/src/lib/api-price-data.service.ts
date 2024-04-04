import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { ApiCoreService, PagingInputFields } from '@tokengator-mint/api-core-data-access'
import { Price } from './entity/price.entity'

@Injectable()
export class ApiPriceDataService {
  constructor(private readonly core: ApiCoreService) {}

  async create(input: Omit<Prisma.PriceUncheckedCreateInput, 'currencyId'>) {
    return this.core.data.price.create({ data: { ...input, currencyId: 'USDC' } })
  }

  async delete(priceId: string) {
    await this.findOne(priceId)
    const deleted = await this.core.data.price.delete({ where: { id: priceId } })
    return !!deleted
  }

  async findMany({ ...input }: Prisma.PriceFindManyArgs & PagingInputFields): Promise<Price[]> {
    return this.core.data.price.findMany({ ...input, include: { currency: true } })
  }

  async findOne(priceId: string) {
    const found = await this.core.data.price.findUnique({ where: { id: priceId } })
    if (!found) {
      throw new Error('Price not found')
    }
    return found
  }

  async update(priceId: string, input: Prisma.PriceUpdateInput) {
    return this.core.data.price.update({ where: { id: priceId }, data: input })
  }
}
