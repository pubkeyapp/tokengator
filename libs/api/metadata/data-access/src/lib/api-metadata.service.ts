import { Injectable, Logger } from '@nestjs/common'
import { PublicKey } from '@solana/web3.js'
import { ApiCoreService } from '@tokengator-mint/api-core-data-access'
import { ApiSolanaService, SolanaAccountInfo } from '@tokengator-mint/api-solana-data-access'
import { LRUCache } from 'lru-cache'

export interface CantFindTheRightTypeScrewItHackathonMode {
  extension: 'tokenMetadata'
  state: {
    additionalMetadata: [string, string][]
    mint: PublicKey
    name: string
    symbol: string
    updateAuthority?: PublicKey
    uri: string
  }
}

export interface ExternalMetadata {
  image: string
  [key: string]: string
}

export interface LocalMetadata {
  name: string
  symbol: string
  description: string
  external_url: string
  image: string
}

const ONE_HOUR = 1000 * 60 * 60
const TEN_MINUTES = 1000 * 60 * 10

@Injectable()
export class ApiMetadataService {
  private readonly logger = new Logger(ApiMetadataService.name)

  private readonly externalMetadataCache = new LRUCache<string, ExternalMetadata>({
    max: 1000,
    ttl: ONE_HOUR,
    fetchMethod: async (url) => {
      const fetched = await fetch(url).then((r) => r.json())
      if (fetched.image) {
        this.logger.verbose(`Caching external metadata for ${url}`)
        return fetched
      }
      throw new Error(`No image found in external metadata for ${url}`)
    },
  })

  private readonly accountCache = new LRUCache<string, SolanaAccountInfo>({
    max: 1000,
    ttl: ONE_HOUR,
    fetchMethod: async (account: string) => {
      const found = await this.solana.getAccount(account)
      if (found) {
        this.logger.verbose(`Caching account info for ${account}`)
        return found
      }
      throw new Error(`Failed to fetch account info for ${account}`)
    },
  })

  private readonly accountMetadataCache = new LRUCache<string, CantFindTheRightTypeScrewItHackathonMode>({
    max: 1000,
    ttl: TEN_MINUTES,
    fetchMethod: async (account: string) => {
      const found = await this.accountCache.fetch(account)
      const extensions = found?.data?.parsed?.info?.extensions as CantFindTheRightTypeScrewItHackathonMode[]
      const metadata = extensions.find((e) => e.extension === 'tokenMetadata')

      if (!metadata) {
        throw new Error(`Failed to fetch metadata for ${account}`)
      }
      return metadata
    },
  })

  private readonly jsonCache = new LRUCache<string, LocalMetadata>({
    max: 1000,
    ttl: ONE_HOUR,
    fetchMethod: async (account: string) => {
      const image = `${this.core.config.apiUrl}/metadata/image/${account}`
      const metadata = await this.accountMetadataCache.fetch(account)

      const { name, symbol, description, external_url } = defaults()

      if (metadata) {
        if (!metadata.state.uri.startsWith(this.core.config.apiUrl)) {
          // We have external metadata
          const externalMetadata = await this.externalMetadataCache.fetch(metadata.state.uri)

          if (!externalMetadata) {
            throw new Error(`Failed to fetch external metadata for ${metadata.state.uri}`)
          }
          if (externalMetadata.image) {
            return {
              name: metadata.state.name ?? name,
              symbol: metadata.state.symbol ?? symbol,
              description: metadata.state.uri ?? description,
              external_url: metadata.state.uri ?? external_url,
              image: externalMetadata.image,
            }
          }
        }

        return {
          name: metadata.state.name ?? name,
          symbol: metadata.state.symbol ?? symbol,
          description: metadata.state.uri ?? description,
          external_url: metadata.state.uri ?? external_url,
          image,
        }
      }

      return {
        name,
        symbol,
        description,
        external_url,
        image,
      }
    },
  })

  constructor(private readonly core: ApiCoreService, private readonly solana: ApiSolanaService) {}

  async getImage(account: string): Promise<string> {
    const accountMetadata = await this.accountMetadataCache.fetch(account)
    if (!accountMetadata) {
      throw new Error(`Failed to fetch metadata for ${account}`)
    }
    const externalMetadata = await this.externalMetadataCache.fetch(accountMetadata.state.uri)
    if (!externalMetadata) {
      throw new Error(`Failed to fetch external metadata for ${accountMetadata.state.uri}`)
    }

    return externalMetadata.image
  }

  async getJson(account: string) {
    return this.jsonCache.fetch(account)
  }
}

function defaults() {
  const name = `Unknown Name`
  const symbol = `Unknown Symbol`
  const description = `Unknown Description`
  const external_url = `https://example.com`

  return { name, symbol, description, external_url }
}
