import { Button, Group } from '@mantine/core'
import { formFieldSelect, getEnumOptions, UiForm, UiFormField } from '@pubkey-ui/core'
import { AdminUpdateCommunityMemberInput, CommunityMember, CommunityMemberRole } from '@tokengator-mint/sdk'

export function AdminCommunityMemberUiUpdateForm({
  submit,
  communityMember,
}: {
  submit: (res: AdminUpdateCommunityMemberInput) => Promise<boolean>
  communityMember: CommunityMember
}) {
  const model: AdminUpdateCommunityMemberInput = {
    role: communityMember.role,
  }

  const fields: UiFormField<AdminUpdateCommunityMemberInput>[] = [
    formFieldSelect('role', {
      label: 'Role',
      description: 'The role of the user in the community.',
      options: getEnumOptions(CommunityMemberRole),
    }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminUpdateCommunityMemberInput)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
