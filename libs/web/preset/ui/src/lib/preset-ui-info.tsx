import { UiInfoItems, UiInfoTable, UiTime } from '@pubkey-ui/core'
import { Preset } from '@tokengator/sdk'

export function PresetUiInfo({ preset }: { preset?: Preset }) {
  if (!preset) return null

  const items: UiInfoItems = [
    ['Name', preset.name],
    ['Description', preset.description],
    ['Enabled', `This preset is ${preset.enabled ? 'enabled' : 'disabled'}.`],
    ['Created At', <UiTime size="xs" c="dimmed" date={new Date(preset.createdAt ?? '0')} />],
    ['Updated At', <UiTime size="xs" c="dimmed" date={new Date(preset.updatedAt ?? '0')} />],
  ]

  return <UiInfoTable items={items} />
}
