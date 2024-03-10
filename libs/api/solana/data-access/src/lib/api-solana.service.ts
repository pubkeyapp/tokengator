import { Injectable, Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { Cron, CronExpression } from '@nestjs/schedule'
import { getMint, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token'
import { TokenMetadata } from '@solana/spl-token-metadata'
import { AccountInfo, Connection, LAMPORTS_PER_SOL, ParsedAccountData, PublicKey } from '@solana/web3.js'
import { ApiCoreService, CORE_APP_STARTED } from '@tokengator-mint/api-core-data-access'

@Injectable()
export class ApiSolanaService {
  private readonly logger = new Logger(ApiSolanaService.name)
  readonly connection = new Connection(this.core.config.solanaEndpoint, 'confirmed')

  constructor(private readonly core: ApiCoreService) {}

  @OnEvent(CORE_APP_STARTED)
  async onApplicationStarted() {
    const balance = await this.ensureFeePayerBalance()
    this.logger.verbose(`Solana Fee Payer: ${this.core.config.solanaFeePayer.publicKey}`)
    this.logger.verbose(`Fee Payer Balance: ${balance / LAMPORTS_PER_SOL} SOL`)
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async ensureFeePayerBalance() {
    const feePayer = this.core.config.solanaFeePayer.publicKey
    const minimal = this.core.config.solanaFeePayerMinimalBalance
    const balance = await this.connection.getBalance(feePayer)
    if (balance < LAMPORTS_PER_SOL * minimal) {
      this.logger.warn(`FEE PAYER WARNING: "${feePayer}"`)
      this.logger.warn(`Balance is low: ${balance / LAMPORTS_PER_SOL} SOL, recommended: ${minimal} SOL`)
    }
    return balance
  }

  async getAccount(publicKey: PublicKey | string): Promise<AccountInfo<ParsedAccountData> | null> {
    return this.connection
      .getParsedAccountInfo(new PublicKey(publicKey))
      .then((res) => (res.value ? (res.value as AccountInfo<ParsedAccountData>) : null))
  }
  async getMint(publicKey: PublicKey | string, programId: PublicKey = TOKEN_2022_PROGRAM_ID) {
    return getMint(this.connection, new PublicKey(publicKey), 'confirmed', programId)
  }

  async getAccountTokenMetadata(mint: PublicKey | string) {
    const account = await this.getAccount(mint)
    if (!account) {
      throw new Error('Mint account not found on Solana')
    }
    if (!account.data?.parsed?.info?.extensions) {
      throw new Error('Mint account has no extensions')
    }
    const extensions: { extension: string; state: TokenMetadata }[] = account.data.parsed.info.extensions
    const metadata = extensions.find((e) => e.extension === 'tokenMetadata')
    if (!metadata?.state) {
      throw new Error('Mint account has no tokenMetadata')
    }

    return metadata.state
  }
}
