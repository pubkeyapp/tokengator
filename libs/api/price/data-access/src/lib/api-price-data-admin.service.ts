import { Injectable } from '@nestjs/common'
import { ApiPriceDataService } from './api-price-data.service'
import { PriceAdminCreateInput } from './dto/price-admin-create.input'
import { PriceAdminFindManyInput } from './dto/price-admin-find-many.input'
import { PriceAdminUpdateInput } from './dto/price-admin-update.input'
import { Price } from './entity/price.entity'

@Injectable()
export class ApiPriceDataAdminService {
  constructor(private readonly data: ApiPriceDataService) {}

  async createPrice(input: PriceAdminCreateInput) {
    return this.data.create(input)
  }

  async deletePrice(priceId: string) {
    return this.data.delete(priceId)
  }

  async findManyPrice(input: PriceAdminFindManyInput): Promise<Price[]> {
    return this.data.findMany({
      orderBy: { price: 'asc' },
      where: {
        presetId: input.presetId,
      },
    })
  }

  async updatePrice(priceId: string, input: PriceAdminUpdateInput) {
    return this.data.update(priceId, input)
  }
}
