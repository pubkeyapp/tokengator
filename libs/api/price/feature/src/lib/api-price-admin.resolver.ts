import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLAdminGuard } from '@tokengator-mint/api-auth-data-access'
import {
  ApiPriceService,
  Price,
  PriceAdminCreateInput,
  PriceAdminFindManyInput,
  PriceAdminUpdateInput,
} from '@tokengator-mint/api-price-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiPriceAdminResolver {
  constructor(private readonly service: ApiPriceService) {}

  @Mutation(() => Price, { nullable: true })
  adminCreatePrice(@Args('input') input: PriceAdminCreateInput) {
    return this.service.admin.createPrice(input)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminDeletePrice(@Args('priceId') priceId: string) {
    return this.service.admin.deletePrice(priceId)
  }

  @Query(() => [Price])
  adminFindManyPrice(@Args('input') input: PriceAdminFindManyInput) {
    return this.service.admin.findManyPrice(input)
  }

  @Mutation(() => Price, { nullable: true })
  adminUpdatePrice(@Args('priceId') priceId: string, @Args('input') input: PriceAdminUpdateInput) {
    return this.service.admin.updatePrice(priceId, input)
  }
}
