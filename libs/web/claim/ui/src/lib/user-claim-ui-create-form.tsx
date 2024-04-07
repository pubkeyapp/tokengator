import { Button, Group, Select, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { getEnumOptions, UiStack } from '@pubkey-ui/core'
import { ClaimUserCreateInput, IdentityProvider } from '@tokengator/sdk'

export function UserClaimUiCreateForm({ submit }: { submit: (res: ClaimUserCreateInput) => Promise<boolean> }) {
  const form = useForm<ClaimUserCreateInput>({
    initialValues: {
      communityId: '',
      account: '',
      avatarUrl: '',
      amount: '1',
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
        <TextInput
          required
          name="providerId"
          label="Provider Id"
          description={getProviderDescription(form.values.provider)}
          {...form.getInputProps('providerId')}
        />
        <TextInput
          name="amount"
          label="Amount"
          description="The amount of items a user can mint."
          {...form.getInputProps('amount')}
        />
        <TextInput
          name="avatarUrl"
          label="Avatar Url"
          description="The avatar url of the user."
          {...form.getInputProps('avatarUrl')}
        />
        <Group justify="right">
          <Button type="submit">Save</Button>
        </Group>
      </UiStack>
    </form>
  )
}

function getProviderDescription(provider: IdentityProvider) {
  switch (provider) {
    case IdentityProvider.Solana:
      return 'Solana wallet address'
    default:
      return `The ${provider} username or id.`
  }
}
