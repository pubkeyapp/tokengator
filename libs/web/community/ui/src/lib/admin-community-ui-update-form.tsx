import { Button, Group } from '@mantine/core'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'
import { AdminUpdateCommunityInput, Community } from '@tokengator/sdk'

export function AdminCommunityUiUpdateForm({
  submit,
  community,
}: {
  submit: (res: AdminUpdateCommunityInput) => Promise<boolean>
  community: Community
}) {
  const model: AdminUpdateCommunityInput = {
    name: community.name ?? '',
    description: community.description ?? '',
    iconUrl: community.iconUrl ?? '',
    logoUrl: community.logoUrl ?? '',
  }

  const fields: UiFormField<AdminUpdateCommunityInput>[] = [
    formFieldText('name', { label: 'name' }),
    formFieldText('description', { label: 'description' }),
    formFieldText('iconUrl', { label: 'iconUrl' }),
    formFieldText('logoUrl', { label: 'logoUrl' }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminUpdateCommunityInput)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
