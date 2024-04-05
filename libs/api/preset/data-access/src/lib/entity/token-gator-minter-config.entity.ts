import { Field, ObjectType } from '@nestjs/graphql'
import { TokenGatorMinterApplicationConfig } from './token-gator-minter-application-config.entity'
import { TokenGatorMinterMetadataConfig } from './token-gator-minter-metadata-config.entity'

@ObjectType()
export class TokenGatorMinterConfig {
  @Field()
  mint!: string
  @Field(() => TokenGatorMinterApplicationConfig)
  applicationConfig!: TokenGatorMinterApplicationConfig
  @Field(() => TokenGatorMinterMetadataConfig)
  metadataConfig!: TokenGatorMinterMetadataConfig
}
