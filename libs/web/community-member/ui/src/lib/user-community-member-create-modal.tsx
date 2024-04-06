import { Button } from '@mantine/core'
import { modals } from '@mantine/modals'
import { UserCreateCommunityMemberInput } from '@tokengator/sdk'

import { UserCommunityMemberCreateForm } from './user-community-member-create-form'

export function UserCommunityMemberCreateModal({
  create,
}: {
  create: (input: UserCreateCommunityMemberInput) => Promise<boolean>
}) {
  return (
    <Button
      onClick={() => {
        modals.open({
          centered: true,
          title: 'Add Member',
          children: <UserCommunityMemberCreateForm create={(input) => create(input).then(() => modals.closeAll())} />,
        })
      }}
    >
      Add Member
    </Button>
  )
}
