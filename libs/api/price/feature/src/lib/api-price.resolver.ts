import { Resolver } from '@nestjs/graphql'
import { ApiPriceService } from '@tokengator-mint/api-price-data-access'
import { Price } from '@tokengator-mint/api-price-data-access'

@Resolver(() => Price)
export class ApiPriceResolver {
  constructor(private readonly service: ApiPriceService) {}
}
