import { Button, Group, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { PresetAdminUpdateInput, Preset } from '@tokengator/sdk'
import { UiStack } from '@pubkey-ui/core'

export function AdminPresetUiUpdateForm({
  submit,
  preset,
}: {
  submit: (res: PresetAdminUpdateInput) => Promise<boolean>
  preset: Preset
}) {
  const form = useForm<PresetAdminUpdateInput>({
    initialValues: {
      name: preset.name ?? '',

      description: preset.description ?? '',
    },
  })

  return (
    <form onSubmit={form.onSubmit((values) => submit(values))}>
      <UiStack>
        <TextInput name="name" label="name" {...form.getInputProps('name')} />

        <TextInput name="description" label="description" {...form.getInputProps('description')} />

        <Group justify="right">
          <Button type="submit">Save</Button>
        </Group>
      </UiStack>
    </form>
  )
}
