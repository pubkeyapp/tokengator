import { Module } from '@nestjs/common'
import { ApiCoreFeatureModule } from '@tokengator-mint/api-core-feature'

@Module({
  imports: [ApiCoreFeatureModule],
})
export class AppModule {}
