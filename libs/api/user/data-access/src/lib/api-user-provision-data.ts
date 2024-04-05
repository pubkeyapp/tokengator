import { IdentityProvider, Prisma, UserRole, UserStatus } from '@prisma/client'

export const provisionUsers: Prisma.UserCreateInput[] = [
  {
    username: 'beeman',
    role: UserRole.Admin,
    avatarUrl: 'https://avatars.githubusercontent.com/u/36491',
    developer: true,
    identities: {
      create: [
        { provider: IdentityProvider.Discord, providerId: '386584531353862154' },
        { provider: IdentityProvider.GitHub, providerId: '36491' },
        { provider: IdentityProvider.Solana, providerId: 'BEEMANPx2jdmfR7jpn1hRdMuM2Vj4E3azBLb6RUBrCDY' },
        { provider: IdentityProvider.Twitter, providerId: '11481502' },
      ],
    },
  },
  {
    username: 'sundeep',
    role: UserRole.Admin,
    avatarUrl: 'https://avatars.githubusercontent.com/u/32637757',
    developer: true,
    identities: {
      create: [
        { provider: IdentityProvider.GitHub, providerId: '32637757' },
        { provider: IdentityProvider.Discord, providerId: '185307556032413697' },
        { provider: IdentityProvider.Solana, providerId: '81sWMLg1EgYps3nMwyeSW1JfjKgFqkGYPP85vTnkFzRn' },
      ],
    },
  },
  {
    avatarUrl: 'https://cdn.discordapp.com/avatars/454357166485143554/0e4ef1e17ac1278f06e2d2fd29393550.png?size=512',
    name: 'DeanMachine',
    username: 'deanmachine',
    role: UserRole.Admin,
    identities: {
      create: [
        { provider: IdentityProvider.Discord, providerId: '454357166485143554' },
        { provider: IdentityProvider.Solana, providerId: '3PKhzE9wuEkGPHHu2sNCvG86xNtDJduAcyBPXpE6cSNt' },
      ],
    },
  },
  {
    username: 'alice',
    password: 'password',
    role: UserRole.Admin,
    developer: true,
    identities: {
      create: [{ provider: IdentityProvider.Solana, providerId: 'ALiC98dw6j47Skrxje3zBN4jTA11w67JRjQRBeZH3BRG' }],
    },
  },
  {
    username: 'bob',
    password: 'password',
    role: UserRole.User,
  },
  // Charlie is a user with no password, so they can only log in with an external provider
  {
    username: 'charlie',
    role: UserRole.User,
  },
  // Dave is set to inactive, so they can't log in
  {
    username: 'dave',
    password: 'password',
    role: UserRole.User,
    status: UserStatus.Inactive,
  },
]
