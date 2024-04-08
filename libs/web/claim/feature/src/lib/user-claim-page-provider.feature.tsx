import { Badge, Button, Stack, Text } from '@mantine/core'
import { UiCard, UiContainer, UiDebugModal, UiGroup, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { Claim, IdentityProvider } from '@tokengator/sdk'
import { useUserGetClaimsByProvider } from '@tokengator/web-claim-data-access'
import { ClaimUiAvatar } from '@tokengator/web-claim-ui'
import { CommunityUiItem } from '@tokengator/web-community-ui'
import { useParams } from 'react-router-dom'

export default function UserClaimPageProviderFeature() {
  const { provider, providerId } = useParams<{ provider: IdentityProvider; providerId: string }>() as {
    provider: IdentityProvider
    providerId: string
  }
  const { items, query } = useUserGetClaimsByProvider({ provider, providerId })

  return (
    <UiContainer size="sm">
      {query.isLoading ? (
        <UiLoader />
      ) : items.length ? (
        <UiStack>
          <UiInfo
            title={'Claims: Work in Progress'}
            message={
              <UiStack>
                <Text>This is the page where a user can claim an asset from a community.</Text>
              </UiStack>
            }
          />
          {items.map((item) => (
            <ClaimCard key={item.id} claim={item} />
          ))}
          <UiDebugModal data={items} />
        </UiStack>
      ) : (
        <UiInfo message={`No claims found for ${provider} ${providerId}`} />
      )}
    </UiContainer>
  )
}

function ClaimCard({ claim }: { claim: Claim }) {
  return (
    <UiCard
      miw={500}
      p="xl"
      my="xl"
      title={
        <UiGroup>
          {claim.community ? <CommunityUiItem community={claim.community} /> : <div />}
          <Badge color="brand" variant="light">
            {claim.name}
          </Badge>
        </UiGroup>
      }
    >
      <UiStack align="center">
        <ClaimUiAvatar size="xl" claim={claim} />
        <Stack gap={1} align="center">
          <Text size="xl" fw={700}>
            {claim?.providerId}
          </Text>
          <Text size="xs" c="dimmed">
            {claim?.provider}
          </Text>
        </Stack>

        <Badge size="xl" radius="md" fw={700} variant="outline" color="green">
          Allocation: {claim?.amount} asset{claim?.amount === '1' ? '' : 's'}
        </Badge>

        <Button disabled size="xl" variant="light">
          Claim your {claim.name}
        </Button>
      </UiStack>
    </UiCard>
  )
}
