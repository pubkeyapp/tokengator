import { toastError, UiBack, UiCard, UiPage } from '@pubkey-ui/core'
import { WalletAdminCreateInput } from '@tokengator-mint/sdk'
import { useAdminFindManyWallet } from '@tokengator-mint/web-wallet-data-access'
import { AdminWalletUiCreateForm } from '@tokengator-mint/web-wallet-ui'
import { useNavigate } from 'react-router-dom'

export default function AdminWalletCreateFeature({ communityId }: { communityId: string }) {
  const navigate = useNavigate()
  const { createWallet } = useAdminFindManyWallet({ communityId })

  async function submit(input: WalletAdminCreateInput) {
    return createWallet(input)
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
    <UiPage leftAction={<UiBack />} title="Create Wallet">
      <UiCard>
        <AdminWalletUiCreateForm submit={submit} />
      </UiCard>
    </UiPage>
  )
}
