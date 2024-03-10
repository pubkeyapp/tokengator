import { useAuth } from '@tokengator-mint/web-auth-data-access'
import { useUserFindManyIdentity } from '@tokengator-mint/web-identity-data-access'
import { IdentityUiGroupList } from '@tokengator-mint/web-identity-ui'
import { UiLoader, UiStack } from '@pubkey-ui/core'

export function SettingsIdentityFeature() {
  const { user } = useAuth()
  const { deleteIdentity, grouped, query } = useUserFindManyIdentity({ username: user?.username as string })

  return (
    <UiStack>
      {query.isLoading ? (
        <UiLoader />
      ) : (
        <IdentityUiGroupList grouped={grouped} deleteIdentity={deleteIdentity} refresh={() => query.refetch()} />
      )}
    </UiStack>
  )
}
