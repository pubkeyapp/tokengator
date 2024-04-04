import { Button, Group, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { UiStack } from '@pubkey-ui/core'
import { PriceAdminCreateInput } from '@tokengator-mint/sdk'

export function AdminPriceUiCreateForm({ submit }: { submit: (res: PriceAdminCreateInput) => Promise<boolean> }) {
  const form = useForm<PriceAdminCreateInput>({
    initialValues: {
      name: '',
      mint: '',
      price: '49.00',
      currency: '',
      presetId: '',
      days: 30,
      assets: 100,
    },
  })

  return (
    <form onSubmit={form.onSubmit((values) => submit(values))}>
      <UiStack>
        <TextInput required name="name" label="Name" {...form.getInputProps('name')} />
        <TextInput required name="mint" label="Mint" {...form.getInputProps('mint')} />
        <TextInput required name="price" label="Price" {...form.getInputProps('price')} />
        <TextInput required name="currency" label="Currency" {...form.getInputProps('currency')} />
        <Group justify="right">
          <Button type="submit">Save</Button>
        </Group>
      </UiStack>
    </form>
  )
}
