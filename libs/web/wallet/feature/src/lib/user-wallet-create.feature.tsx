import { toastError, UiBack, UiCard, UiPage } from '@pubkey-ui/core'
import { WalletUserCreateInput } from '@tokengator-mint/sdk'
import { useUserFindManyWallet } from '@tokengator-mint/web-wallet-data-access'
import { UserWalletUiCreateForm } from '@tokengator-mint/web-wallet-ui'
import { useNavigate } from 'react-router-dom'

export default function UserWalletCreateFeature({ communityId }: { communityId: string }) {
  const navigate = useNavigate()
  const { createWallet } = useUserFindManyWallet({ communityId })

  async function submit(input: WalletUserCreateInput) {
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
        <UserWalletUiCreateForm submit={submit} />
      </UiCard>
    </UiPage>
  )
}
