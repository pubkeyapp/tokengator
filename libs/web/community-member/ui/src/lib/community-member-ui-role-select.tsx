import { SelectProps } from '@mantine/core'
import { getEnumOptions, UiSelectEnum } from '@pubkey-ui/core'
import { CommunityMemberRole } from '@tokengator-mint/sdk'

export function CommunityMemberUiRoleSelect({
  value,
  setValue,
  ...props
}: SelectProps & {
  value: CommunityMemberRole | undefined
  setValue: (value: CommunityMemberRole | undefined) => void
}) {
  return (
    <UiSelectEnum<CommunityMemberRole>
      value={value}
      setValue={setValue}
      options={getEnumOptions(CommunityMemberRole)}
      {...props}
    />
  )
}
