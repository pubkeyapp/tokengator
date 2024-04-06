import { Module } from '@nestjs/common'
import { ApiAuthDataAccessModule } from '@tokengator/api-auth-data-access'
import { ApiAuthStrategyDiscordController } from './api-auth-strategy-discord.controller'
import { ApiAuthStrategyGithubController } from './api-auth-strategy-github.controller'
import { ApiAuthStrategyGoogleController } from './api-auth-strategy-google.controller'
import { ApiAuthStrategyTwitterController } from './api-auth-strategy-twitter.controller'
import { ApiAuthController } from './api-auth.controller'
import { ApiAuthResolver } from './api-auth.resolver'

@Module({
  controllers: [
    ApiAuthController,
    ApiAuthStrategyDiscordController,
    ApiAuthStrategyGithubController,
    ApiAuthStrategyGoogleController,
    ApiAuthStrategyTwitterController,
  ],
  imports: [ApiAuthDataAccessModule],
  providers: [ApiAuthResolver],
})
export class ApiAuthFeatureModule {}
