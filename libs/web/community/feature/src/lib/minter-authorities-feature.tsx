import { Button, Stack, Text } from '@mantine/core'
import { toastError, toastSuccess, UiCard, UiCardTitle, UiGroup, UiInfo, UiStack } from '@pubkey-ui/core'
import { useMutation } from '@tanstack/react-query'
import { Community, TokenGatorMinter } from '@tokengator/sdk'
import { useSdk } from '@tokengator/web-core-data-access'
import { useUserFindManyWallet } from '@tokengator/web-wallet-data-access'

function useUserAddMinterAuthority({ account, communitySlug }: { account: string; communitySlug: string }) {
  const sdk = useSdk()

  return useMutation({
    mutationFn: (authority: string) =>
      sdk
        .userAddMinterAuthority({ account, authority, communitySlug })
        .then(() => {
          toastSuccess('Authority added')
        })
        .catch((err) => {
          toastError(`Error adding authority: ${err.message}`)
        }),
  })
}
function useUserRemoveMinterAuthority({ account, communitySlug }: { account: string; communitySlug: string }) {
  const sdk = useSdk()

  return useMutation({
    mutationFn: (authority: string) =>
      sdk
        .userRemoveMinterAuthority({ account, authority, communitySlug })
        .then(() => {
          toastSuccess('Authority added')
        })
        .catch((err) => {
          toastError(`Error adding authority: ${err.message}`)
        }),
  })
}

export function MinterAuthoritiesFeature({
  community,
  minter,
  refresh,
}: {
  community: Community
  minter: TokenGatorMinter
  refresh: () => Promise<void>
}) {
  const { items } = useUserFindManyWallet({ communityId: community.id })
  const available = items.filter((item) => !minter.authorities.includes(item.publicKey))

  const mutationAdd = useUserAddMinterAuthority({ account: minter.publicKey, communitySlug: community.slug })
  const mutationRemove = useUserRemoveMinterAuthority({ account: minter.publicKey, communitySlug: community.slug })

  return (
    <UiCard>
      <UiStack>
        <UiCardTitle>Configured Authorities</UiCardTitle>
        <Text c="dimmed" size="sm">
          These are the authorities that can manage this Collection Minter.
        </Text>

        {minter.authorities.map((authority) => {
          const found = items.find((item) => item.publicKey === authority)
          return (
            <UiCard key={authority}>
              <UiGroup>
                <Stack gap="xs">
                  <Text size="lg">{found?.name ?? authority}</Text>
                  <Text ff="mono" c="dimmed" size="xs">
                    {found?.publicKey}
                  </Text>
                </Stack>
                <Button
                  loading={mutationRemove.isPending}
                  disabled={found?.feePayer}
                  variant="light"
                  onClick={() => mutationRemove.mutateAsync(authority).then(refresh)}
                >
                  Remove
                </Button>
              </UiGroup>
            </UiCard>
          )
        })}

        {available.length ? (
          <UiStack>
            <UiCardTitle>Available Authorities</UiCardTitle>
            {available.map((item) => (
              <UiCard key={item.publicKey}>
                <UiGroup>
                  <Stack gap="xs">
                    <Text size="lg">{item.name}</Text>
                    <Text ff="mono" c="dimmed" size="xs">
                      {item.publicKey}
                    </Text>
                  </Stack>
                  <Button
                    loading={mutationAdd.isPending}
                    variant="light"
                    onClick={() => mutationAdd.mutateAsync(item.publicKey).then(refresh)}
                  >
                    Add
                  </Button>
                </UiGroup>
              </UiCard>
            ))}
          </UiStack>
        ) : (
          <UiInfo message="All wallets have been added as authorities." />
        )}
      </UiStack>
    </UiCard>
  )
}
