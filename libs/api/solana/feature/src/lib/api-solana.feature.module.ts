import { Module } from '@nestjs/common'
import { ApiSolanaDataAccessModule } from '@tokengator-mint/api-solana-data-access'
import { ApiSolanaResolver } from './api-solana.resolver'

@Module({
  imports: [ApiSolanaDataAccessModule],
  providers: [ApiSolanaResolver],
})
export class ApiSolanaFeatureModule {}
