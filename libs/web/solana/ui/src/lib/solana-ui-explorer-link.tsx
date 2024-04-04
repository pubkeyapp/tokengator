import { ActionIcon, ActionIconProps, Anchor, AnchorProps, Group, Tooltip } from '@mantine/core'
import { UiCopy } from '@pubkey-ui/core'
import { IconWorld } from '@tabler/icons-react'
import { useCluster } from '@tokengator-mint/web-solana-data-access'

export function SolanaUiExplorerLink({
  label,
  path,
  copyLabel,
  copyValue,
  ...props
}: AnchorProps & {
  label?: string
  path: string
  copyLabel?: string
  copyValue?: string
}) {
  return copyValue ? (
    <Group gap="xs">
      <UiCopy text={copyValue} tooltip={copyLabel} size={props.size} />
      <SolanaExplorerAnchor label={label} path={path} />
    </Group>
  ) : (
    <SolanaExplorerAnchor label={label} path={path} />
  )
}

export function SolanaExplorerAnchor({
  label = 'View on Solana Explorer',
  path,
  ...props
}: AnchorProps & {
  label?: string
  path: string
}) {
  const { getExplorerUrl } = useCluster()
  return (
    <Anchor c="brand" href={getExplorerUrl(path)} target="_blank" rel="noopener noreferrer" {...props}>
      {label}
    </Anchor>
  )
}

export function SolanaExplorerIcon({
  tooltip = 'View on Solana Explorer',
  path,
  ...props
}: ActionIconProps & {
  tooltip?: string
  path: string
}) {
  const { getExplorerUrl } = useCluster()
  return (
    <Tooltip label={tooltip}>
      <ActionIcon
        component="a"
        c="brand"
        size="sm"
        variant="light"
        href={getExplorerUrl(path)}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        <IconWorld size={16} />
      </ActionIcon>
    </Tooltip>
  )
}
