import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class TokenGatorActivity {
  @Field(() => String)
  account!: string
}
