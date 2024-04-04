import { Button, Checkbox, Group, NumberInput, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { UiStack } from '@pubkey-ui/core'
import { Price, PriceAdminUpdateInput } from '@tokengator-mint/sdk'

export function AdminPriceUiUpdateForm({
  submit,
  price,
}: {
  submit: (res: PriceAdminUpdateInput) => Promise<boolean>
  price: Price
}) {
  const form = useForm<PriceAdminUpdateInput>({
    initialValues: {
      active: price.active,
      assets: price.assets,
      days: price.days,
      name: price.name,
      price: price.price,
    },
  })

  return (
    <form onSubmit={form.onSubmit((values) => submit(values))}>
      <UiStack>
        <TextInput name="name" label="Name" {...form.getInputProps('name')} />
        <TextInput name="price" label="Price" {...form.getInputProps('price')} />
        <NumberInput name="days" label="Days" {...form.getInputProps('days')} />
        <NumberInput name="assets" label="Assets" {...form.getInputProps('assets')} />
        <Checkbox name="active" label="Active" {...form.getInputProps('active', { type: 'checkbox' })} />
        <Group justify="right">
          <Button type="submit">Save</Button>
        </Group>
      </UiStack>
    </form>
  )
}
