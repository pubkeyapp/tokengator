import { PresetAdminCreateInput } from '@tokengator/sdk'
import { useAdminFindManyPreset } from '@tokengator/web-preset-data-access'
import { AdminPresetUiCreateForm } from '@tokengator/web-preset-ui'
import { toastError, UiBack, UiCard, UiPage } from '@pubkey-ui/core'
import { useNavigate } from 'react-router-dom'

export default function AdminPresetCreateFeature() {
  const navigate = useNavigate()
  const { createPreset } = useAdminFindManyPreset()

  async function submit(input: PresetAdminCreateInput) {
    return createPreset(input)
      .then((res) => {
        if (res) {
          navigate(`../${res?.id}`)
        }
      })
      .then(() => true)
      .catch((err) => {
        toastError(err.message)
        return false
      })
  }

  return (
    <UiPage leftAction={<UiBack />} title="Create Preset">
      <UiCard>
        <AdminPresetUiCreateForm submit={submit} />
      </UiCard>
    </UiPage>
  )
}
