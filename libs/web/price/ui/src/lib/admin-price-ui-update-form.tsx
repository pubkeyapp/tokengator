import { Button, Group, TextInput } from '@mantine/core'
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
      name: price.name ?? '',
      mint: price.mint ?? '',
      price: price.price ?? '',
      currency: price.currency ?? '',
      active: price.active ?? false,
      assets: price.assets ?? 0,
      days: price.days ?? 0,
    },
  })

  return (
    <form onSubmit={form.onSubmit((values) => submit(values))}>
      <UiStack>
        <TextInput name="name" label="name" {...form.getInputProps('name')} />
        <TextInput name="mint" label="mint" {...form.getInputProps('mint')} />
        <TextInput name="price" label="price" {...form.getInputProps('price')} />
        <TextInput name="currency" label="currency" {...form.getInputProps('currency')} />
        <TextInput name="active" label="active" {...form.getInputProps('active')} />
        <Group justify="right">
          <Button type="submit">Save</Button>
        </Group>
      </UiStack>
    </form>
  )
}
