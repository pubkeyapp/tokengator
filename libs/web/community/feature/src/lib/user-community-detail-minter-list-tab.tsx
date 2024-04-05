import { UiLoader, UiStack } from '@pubkey-ui/core'
import { AccountInfo, ParsedAccountData } from '@solana/web3.js'
import { Community } from '@tokengator-mint/sdk'
import { useUserGetMinters } from '@tokengator-mint/web-community-data-access'
import { MinterUiList } from '@tokengator-mint/web-community-ui'

export function UserCommunityDetailMinterListTab({ community }: { community: Community }) {
  const query = useUserGetMinters()

  const items: AccountInfo<ParsedAccountData>[] = query.data ?? []

  return query.isLoading ? (
    <UiLoader />
  ) : (
    <UiStack>
      <MinterUiList items={items ?? []} />
    </UiStack>
  )
}
