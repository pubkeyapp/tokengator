import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class TokenGatorMinterMetadataConfig {
  @Field()
  name!: string
  @Field()
  symbol!: string
  @Field(() => [[String]])
  metadata!: [string, string][]
  @Field()
  uri!: string
}
