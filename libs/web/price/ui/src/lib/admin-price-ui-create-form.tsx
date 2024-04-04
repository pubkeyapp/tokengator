import { Button, Group, NumberInput, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { UiStack } from '@pubkey-ui/core'
import { PriceAdminCreateInput } from '@tokengator-mint/sdk'

export function AdminPriceUiCreateForm({ submit }: { submit: (res: PriceAdminCreateInput) => Promise<boolean> }) {
  const form = useForm<PriceAdminCreateInput>({
    initialValues: {
      name: 'Default',
      price: '49.00',
      presetId: '',
      days: 30,
      assets: 100,
    },
  })

  return (
    <form onSubmit={form.onSubmit((values) => submit(values))}>
      <UiStack>
        <TextInput required name="name" label="Name" {...form.getInputProps('name')} />
        <TextInput required name="price" label="Price" {...form.getInputProps('price')} />
        <NumberInput required name="days" label="Days" {...form.getInputProps('days')} />
        <NumberInput required name="assets" label="Assets" {...form.getInputProps('assets')} />
        <Group justify="right">
          <Button type="submit">Save</Button>
        </Group>
      </UiStack>
    </form>
  )
}
