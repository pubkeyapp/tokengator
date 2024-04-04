import { Paper } from '@mantine/core'
import { Preset } from '@tokengator-mint/sdk'
import { UiDebugModal, UiGroup } from '@pubkey-ui/core'
import { PresetUiItem } from './preset-ui-item'

export function PresetUiGridItem({ preset, to }: { preset: Preset; to?: string }) {
  return (
    <Paper withBorder p="md">
      <UiGroup>
        <PresetUiItem preset={preset} to={to} />
        <UiDebugModal data={preset} />
      </UiGroup>
    </Paper>
  )
}
