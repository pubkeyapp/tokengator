import { Group, Stack, Text } from '@mantine/core'
import { UiDebug, UiDebugModal, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { ellipsify } from '@tokengator-mint/sdk'
import { useUserGetClaims } from '@tokengator-mint/web-claim-data-access'
import { IdentityUiAvatar, IdentityUiIcon } from '@tokengator-mint/web-identity-ui'

export default function UserClaimListFeature() {
  const { items, query } = useUserGetClaims()

  return (
    <UiStack>
      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <UiStack>
          {items.map((item) => (
            <UiStack key={item.id}>
              <UiInfo
                variant="outline"
                title={item?.name ?? ''}
                message={
                  <UiStack>
                    {item.identity ? <IdentityUiAvatar item={item.identity} /> : null}
                    <Group gap="xs">
                      <IdentityUiIcon size={48} provider={item.provider} />
                      <Stack gap={0}>
                        <Text size="xl">{item.identity?.name}</Text>
                        <Text size="xs" c="dimmed">
                          {ellipsify(item.identity?.providerId)}
                        </Text>
                      </Stack>
                    </Group>
                    <UiDebugModal data={item} />
                  </UiStack>
                }
              />
            </UiStack>
          ))}
          <UiDebug data={items} open />{' '}
        </UiStack>
      ) : (
        <UiInfo message="No claims found" />
      )}
    </UiStack>
  )
}
