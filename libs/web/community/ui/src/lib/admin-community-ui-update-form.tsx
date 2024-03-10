import { Button, Group } from '@mantine/core'
import { AdminUpdateCommunityInput, Community } from '@tokengator-mint/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

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

    imageUrl: community.imageUrl ?? '',
  }

  const fields: UiFormField<AdminUpdateCommunityInput>[] = [
    formFieldText('name', { label: 'name' }),

    formFieldText('description', { label: 'description' }),

    formFieldText('imageUrl', { label: 'imageUrl' }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminUpdateCommunityInput)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
