import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLUserGuard } from '@tokengator/api-auth-data-access'
import { ApiPriceService, Price, PriceUserFindManyInput } from '@tokengator/api-price-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiPriceUserResolver {
  constructor(private readonly service: ApiPriceService) {}

  @Query(() => [Price])
  userFindManyPrice(@Args('input') input: PriceUserFindManyInput) {
    return this.service.user.findManyPrice(input)
  }
}
