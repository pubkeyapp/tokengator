import { Button, Group, Select, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { getEnumOptions, UiStack } from '@pubkey-ui/core'
import { Claim, ClaimStatus, ClaimUserUpdateInput } from '@tokengator-mint/sdk'

export function UserClaimUiUpdateForm({
  submit,
  claim,
}: {
  submit: (res: ClaimUserUpdateInput) => Promise<boolean>
  claim: Claim
}) {
  const form = useForm<ClaimUserUpdateInput>({
    initialValues: {
      amount: claim.amount ?? '',
      signature: claim.signature ?? '',
      status: claim.status ?? ClaimStatus.Pending,
    },
  })

  return (
    <form onSubmit={form.onSubmit((values) => submit(values))}>
      <UiStack>
        <TextInput name="amount" label="Amount" {...form.getInputProps('amount')} />
        <TextInput name="signature" label="Signature" {...form.getInputProps('signature')} />
        <Select data={getEnumOptions(ClaimStatus)} name="status" label="Status" {...form.getInputProps('status')} />
        <Group justify="right">
          <Button type="submit">Save</Button>
        </Group>
      </UiStack>
    </form>
  )
}
