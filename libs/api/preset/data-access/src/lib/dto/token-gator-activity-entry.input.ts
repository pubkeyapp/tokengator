import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class TokenGatorActivityEntryInput {
  @Field({ nullable: true })
  timestamp?: Date
  @Field()
  message!: string
  @Field({ nullable: true })
  url?: string
  @Field(() => Int, { nullable: true })
  points?: number
}
