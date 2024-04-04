import { Injectable } from '@nestjs/common'
import { ApiPriceDataService } from './api-price-data.service'
import { PriceUserFindManyInput } from './dto/price-user-find-many.input'
import { Price } from './entity/price.entity'

@Injectable()
export class ApiPriceDataUserService {
  constructor(private readonly data: ApiPriceDataService) {}

  async findManyPrice(input: PriceUserFindManyInput): Promise<Price[]> {
    return this.data.findMany({
      orderBy: { price: 'asc' },
      where: { presetId: input.presetId },
    })
  }
}
