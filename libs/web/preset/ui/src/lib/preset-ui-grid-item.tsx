import { Group, Paper, Stack, Text } from '@mantine/core'
import { UiAnchor } from '@pubkey-ui/core'
import { Preset } from '@tokengator-mint/sdk'
import { PresetUiAvatar } from './preset-ui-avatar'

export function PresetUiGridItem({ preset, to }: { preset: Preset; to?: string }) {
  return (
    <Paper withBorder p="md">
      <UiAnchor to={to ?? undefined} underline="never">
        <Group gap="sm">
          <PresetUiAvatar size="lg" color={preset.color} preset={preset} />
          <Stack gap={1}>
            <Text size="xl" fw={500}>
              {preset?.name}
            </Text>
            <Text size="sm" c="dimmed">
              {preset?.description}
            </Text>
          </Stack>
        </Group>
      </UiAnchor>
    </Paper>
  )
}
