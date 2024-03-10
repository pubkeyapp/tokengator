import { Group } from '@mantine/core'
import { modals } from '@mantine/modals'
import { UiBack, UiCard, UiDebugModal, UiError, UiGroup, UiLoader, UiStack } from '@pubkey-ui/core'
import { CommunityMember } from '@tokengator-mint/sdk'
import { useUserFindOneCommunityMember } from '@tokengator-mint/web-community-member-data-access'
import { CommunityMemberUiItem, UserCommunityMemberUiUpdateForm } from '@tokengator-mint/web-community-member-ui'
import { useParams } from 'react-router-dom'
import { UserCommunityMemberDetailInfoTab } from './user-community-member-detail-info.tab'

export function UserCommunityMemberDetailFeature() {
  const { communityMemberId } = useParams<{ communityMemberId: string }>() as { communityMemberId: string }
  const { item, query } = useUserFindOneCommunityMember({ communityMemberId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="CommunityMember not found." />
  }

  return (
    <UiStack>
      <UiGroup>
        <Group>
          <UiBack />
          <CommunityMemberUiItem communityMember={item} />
        </Group>
        <Group>
          <UiDebugModal data={item} />
        </Group>
      </UiGroup>
      <UserCommunityMemberDetailInfoTab communityMemberId={communityMemberId} />
      <UiCard>
        <UserCommunityMemberUiUpdateModal item={item} refresh={() => query.refetch()} />
      </UiCard>
    </UiStack>
  )
}

function UserCommunityMemberUiUpdateModal({ item, refresh }: { item: CommunityMember; refresh: () => void }) {
  const { updateCommunityMember } = useUserFindOneCommunityMember({ communityMemberId: item.id })

  return (
    <UserCommunityMemberUiUpdateForm
      communityMember={item}
      submit={(value) =>
        updateCommunityMember(value).then((res) => {
          refresh()
          modals.closeAll()
          return res
        })
      }
    />
  )
}
