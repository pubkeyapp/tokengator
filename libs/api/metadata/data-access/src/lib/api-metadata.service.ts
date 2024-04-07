import { Injectable, Logger } from '@nestjs/common'
import { PublicKey } from '@solana/web3.js'
import { ApiCoreService, TEN_MINUTES } from '@tokengator/api-core-data-access'
import { ApiSolanaService, SolanaAccountInfo } from '@tokengator/api-solana-data-access'
import { LRUCache } from 'lru-cache'
import { ApiMetadataImageService } from './api-metadata-image.service'

export interface ExtensionTokenMetadata {
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
  description: string
  attributes: { trait_type: string; value: string }[]
}

export interface LocalMetadata {
  name: string
  symbol: string
  description: string
  external_url: string
  image: string
  attributes: { trait_type: string; value: string }[]
}

@Injectable()
export class ApiMetadataService {
  private readonly logger = new Logger(ApiMetadataService.name)

  constructor(
    private readonly core: ApiCoreService,
    private readonly image: ApiMetadataImageService,
    private readonly solana: ApiSolanaService,
  ) {}

  private readonly externalMetadataCache = new LRUCache<string, ExternalMetadata>({
    max: 1000,
    ttl: TEN_MINUTES,
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
    ttl: TEN_MINUTES,
    fetchMethod: async (account: string) => {
      const found = await this.solana.getAccount(account)
      if (found) {
        this.logger.verbose(`Caching account info for ${account}`)
        return found
      }
      throw new Error(`Failed to fetch account info for ${account}`)
    },
  })

  private readonly accountMetadataCache = new LRUCache<string, ExtensionTokenMetadata>({
    max: 1000,
    ttl: TEN_MINUTES,
    fetchMethod: async (account: string) => {
      const found = await this.accountCache.fetch(account)
      const extensions = found?.data?.parsed?.info?.extensions as ExtensionTokenMetadata[]
      const metadata = extensions.find((e) => e.extension === 'tokenMetadata')

      if (!metadata) {
        throw new Error(`Failed to fetch metadata for ${account}`)
      }

      const additionalMetadata = metadata.state.additionalMetadata?.length
        ? metadata.state.additionalMetadata
        : ([
            // TODO: These fields should come from the on-chain metadata
            ['community', 'deans-list'],
            ['username', 'beeman'],
            ['preset', 'business-visa'],
          ] as [string, string][])

      return {
        ...metadata,
        state: {
          ...metadata.state,
          additionalMetadata,
        },
      }
    },
  })

  private readonly jsonCache = new LRUCache<string, LocalMetadata>({
    max: 1000,
    ttl: TEN_MINUTES,
    fetchMethod: async (account: string) => {
      const image = `${this.core.config.apiUrl}/metadata/image/${account}`
      const metadata = await this.accountMetadataCache.fetch(account)
      const external_url = `${this.core.config.apiUrl}/metadata/redirect/${account}`

      if (metadata) {
        // The metadata is external, fetch it and return
        if (!metadata.state.uri.includes('/api/metadata/')) {
          // We have external metadata
          const externalMetadata = await this.externalMetadataCache.fetch(metadata.state.uri)

          if (!externalMetadata) {
            throw new Error(`Failed to fetch external metadata for ${metadata.state.uri}`)
          }

          if (externalMetadata.image) {
            return {
              name: metadata.state.name,
              symbol: metadata.state.symbol,
              image: externalMetadata.image,
              description: externalMetadata.description,
              attributes: externalMetadata.attributes,
              external_url,
            }
          }
        }

        const attributes = metadata.state.additionalMetadata?.map(([trait_type, value]) => ({
          trait_type,
          value,
        }))

        // The metadata is on the account, return it
        return {
          name: metadata.state.name,
          symbol: metadata.state.symbol,
          description: metadata.state.name,
          image,
          external_url,
          attributes,
        }
      }
      throw new Error(`Failed to fetch metadata for ${account}`)
    },
  })

  private readonly imageCache = new LRUCache<string, Buffer | string>({
    max: 1000,
    ttl: TEN_MINUTES,
    fetchMethod: async (account: string) => {
      const accountMetadata = await this.accountMetadataCache.fetch(account)
      if (!accountMetadata) {
        throw new Error(`Failed to fetch metadata for ${account}`)
      }

      if (!accountMetadata.state.uri?.includes('/api/metadata/')) {
        const externalMetadata = await this.externalMetadataCache.fetch(accountMetadata.state.uri)
        if (!externalMetadata) {
          throw new Error(`Failed to fetch external metadata for ${accountMetadata.state.uri}`)
        }

        return externalMetadata.image
      }

      return this.image.generate(account, accountMetadata)
    },
  })

  async getImage(account: string): Promise<Buffer | string | undefined> {
    this.logger.verbose(`Fetching metadata image for ${account}`)
    return this.imageCache.fetch(account)
  }

  async getJson(account: string) {
    this.logger.verbose(`Fetching metadata json for ${account}`)
    return this.jsonCache.fetch(account)
  }

  async getRedirect(account: string) {
    return `${this.core.config.webUrl}/assets/${account}`
  }

  async getAll(account: string) {
    const [json, accountMetadata, accountInfo] = await Promise.all([
      this.getJson(account),
      this.accountMetadataCache.fetch(account),
      this.accountCache.fetch(account),
    ])

    return {
      json,
      accountMetadata,
      accountInfo,
    }
  }
}
