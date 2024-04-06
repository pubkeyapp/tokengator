import { Resolver } from '@nestjs/graphql'
import { ApiPresetService } from '@tokengator/api-preset-data-access'
import { Preset } from '@tokengator/api-preset-data-access'

@Resolver(() => Preset)
export class ApiPresetResolver {
  constructor(private readonly service: ApiPresetService) {}
}
