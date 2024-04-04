import { Float, Query, Resolver } from '@nestjs/graphql'
import { ApiCoreService, AppConfig, Currency } from '@tokengator-mint/api-core-data-access'

@Resolver()
export class ApiCoreResolver {
  constructor(private readonly service: ApiCoreService) {}

  @Query(() => AppConfig)
  appConfig(): AppConfig {
    return this.service.config.appConfig
  }

  @Query(() => [Currency])
  async currencies(): Promise<Currency[]> {
    return this.service.data.currency.findMany({ orderBy: { name: 'asc' } })
  }

  @Query(() => Float)
  uptime() {
    return this.service.uptime()
  }
}
