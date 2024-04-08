import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class TokenGatorActivityEntry {
  @Field({ nullable: true })
  timestamp!: string | null
  @Field()
  message!: string
  @Field({ nullable: true })
  url?: string
  @Field({ nullable: true })
  points?: number
}
