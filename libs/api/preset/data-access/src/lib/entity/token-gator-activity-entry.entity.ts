import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class TokenGatorActivityEntry {
  @Field()
  timestamp!: Date
  @Field()
  message!: string
  @Field({ nullable: true })
  url?: string
  @Field({ nullable: true })
  points?: number
}
