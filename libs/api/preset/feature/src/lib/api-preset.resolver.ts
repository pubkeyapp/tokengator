import { Resolver } from '@nestjs/graphql'
import { ApiPresetService } from '@tokengator-mint/api-preset-data-access'
import { Preset } from '@tokengator-mint/api-preset-data-access'

@Resolver(() => Preset)
export class ApiPresetResolver {
  constructor(private readonly service: ApiPresetService) {}
}
