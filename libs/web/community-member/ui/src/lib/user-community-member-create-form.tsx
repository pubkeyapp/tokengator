import { Button, Group } from '@mantine/core'
import { UiStack } from '@pubkey-ui/core'
import { CommunityMemberRole, User, UserCreateCommunityMemberInput } from '@tokengator-mint/sdk'
import { UserUiSearch } from '@tokengator-mint/web-user-ui'
import { useState } from 'react'
import { CommunityMemberUiRoleSelect } from './community-member-ui-role-select'

export function UserCommunityMemberCreateForm({
  create,
}: {
  create: (input: UserCreateCommunityMemberInput) => Promise<void>
}) {
  const [userResult, setUserResult] = useState<User | undefined>(undefined)
  const [role, communityRole] = useState<CommunityMemberRole>(CommunityMemberRole.Member)
  return (
    <UiStack>
      <CommunityMemberUiRoleSelect
        label="Role"
        description="Select the role for the user"
        value={role}
        setValue={(role) => {
          if (role) {
            communityRole(role)
          }
        }}
      />
      <UserUiSearch description="Search for a user to add to the community" select={setUserResult} />
      <Group justify="end">
        <Button
          disabled={!userResult?.id || !role}
          onClick={() => {
            if (!userResult?.id) return
            return create({ communityId: '', userId: userResult?.id, role: role })
          }}
        >
          Add Member
        </Button>
      </Group>
    </UiStack>
  )
}
