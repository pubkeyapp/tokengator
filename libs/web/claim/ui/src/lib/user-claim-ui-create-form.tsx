import { Button, Group, Select, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { getEnumOptions, UiStack } from '@pubkey-ui/core'
import { ClaimUserCreateInput, IdentityProvider } from '@tokengator/sdk'

export function UserClaimUiCreateForm({ submit }: { submit: (res: ClaimUserCreateInput) => Promise<boolean> }) {
  const form = useForm<ClaimUserCreateInput>({
    initialValues: {
      communityId: '',
      amount: '',
      account: '',
      provider: IdentityProvider.Solana,
      providerId: '',
    },
  })

  return (
    <form onSubmit={form.onSubmit((values) => submit(values))}>
      <UiStack>
        <Select
          data={getEnumOptions(IdentityProvider)}
          name="provider"
          label="Provider"
          {...form.getInputProps('provider')}
        />
        <TextInput required name="providerId" label="providerId" {...form.getInputProps('providerId')} />
        <TextInput name="amount" label="amount" {...form.getInputProps('amount')} />
        <Group justify="right">
          <Button type="submit">Save</Button>
        </Group>
      </UiStack>
    </form>
  )
}
