import { Button, Group, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { PresetAdminCreateInput } from '@tokengator/sdk'
import { UiStack } from '@pubkey-ui/core'

export function AdminPresetUiCreateForm({ submit }: { submit: (res: PresetAdminCreateInput) => Promise<boolean> }) {
  const form = useForm<PresetAdminCreateInput>({
    initialValues: {
      name: '',

      description: '',
    },
  })

  return (
    <form onSubmit={form.onSubmit((values) => submit(values))}>
      <UiStack>
        <TextInput required name="name" label="name" {...form.getInputProps('name')} />

        <TextInput required name="description" label="description" {...form.getInputProps('description')} />

        <Group justify="right">
          <Button type="submit">Save</Button>
        </Group>
      </UiStack>
    </form>
  )
}
