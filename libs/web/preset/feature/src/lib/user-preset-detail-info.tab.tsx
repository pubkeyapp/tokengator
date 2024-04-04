import { useUserFindOnePreset } from '@tokengator-mint/web-preset-data-access'
import { PresetUiInfo } from '@tokengator-mint/web-preset-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function UserPresetDetailInfoTab({ presetId }: { presetId: string }) {
  const { item, query } = useUserFindOnePreset({ presetId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Preset not found." />
  }

  return (
    <UiCard>
      <PresetUiInfo preset={item} />
    </UiCard>
  )
}
