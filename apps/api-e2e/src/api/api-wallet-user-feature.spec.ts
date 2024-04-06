import { WalletUserCreateInput, WalletUserFindManyInput, WalletUserUpdateInput, Wallet } from '@tokengator/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

describe('api-wallet-feature', () => {
  describe('api-wallet-user-resolver', () => {
    const walletName = uniqueId('acme-wallet')

    let walletId: string
    let cookie: string

    beforeAll(async () => {
      cookie = await getAliceCookie()
      const created = await sdk.userCreateWallet({ input: { name: walletName } }, { cookie })
      walletId = created.data.created.id
    })

    describe('authorized', () => {
      beforeAll(async () => {
        cookie = await getAliceCookie()
      })

      it('should create a wallet', async () => {
        const input: WalletUserCreateInput = {
          name: uniqueId('wallet'),
        }

        const res = await sdk.userCreateWallet({ input }, { cookie })

        const item: Wallet = res.data.created
        expect(item.name).toBe(input.name)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a wallet', async () => {
        const createInput: WalletUserCreateInput = {
          name: uniqueId('wallet'),
        }
        const createdRes = await sdk.userCreateWallet({ input: createInput }, { cookie })
        const walletId = createdRes.data.created.id
        const input: WalletUserUpdateInput = {
          name: uniqueId('wallet'),
        }

        const res = await sdk.userUpdateWallet({ walletId, input }, { cookie })

        const item: Wallet = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a list of wallets (find all)', async () => {
        const createInput: WalletUserCreateInput = {
          name: uniqueId('wallet'),
        }
        const createdRes = await sdk.userCreateWallet({ input: createInput }, { cookie })
        const walletId = createdRes.data.created.id

        const input: WalletUserFindManyInput = {}

        const res = await sdk.userFindManyWallet({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data[0].id).toBe(walletId)
      })

      it('should find a list of wallets (find new one)', async () => {
        const createInput: WalletUserCreateInput = {
          name: uniqueId('wallet'),
        }
        const createdRes = await sdk.userCreateWallet({ input: createInput }, { cookie })
        const walletId = createdRes.data.created.id

        const input: WalletUserFindManyInput = {
          search: walletId,
        }

        const res = await sdk.userFindManyWallet({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(walletId)
      })

      it('should find a wallet by id', async () => {
        const createInput: WalletUserCreateInput = {
          name: uniqueId('wallet'),
        }
        const createdRes = await sdk.userCreateWallet({ input: createInput }, { cookie })
        const walletId = createdRes.data.created.id

        const res = await sdk.userFindOneWallet({ walletId }, { cookie })

        expect(res.data.item.id).toBe(walletId)
      })

      it('should delete a wallet', async () => {
        const createInput: WalletUserCreateInput = {
          name: uniqueId('wallet'),
        }
        const createdRes = await sdk.userCreateWallet({ input: createInput }, { cookie })
        const walletId = createdRes.data.created.id

        const res = await sdk.userDeleteWallet({ walletId }, { cookie })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.userFindManyWallet({ input: { search: walletId } }, { cookie })
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      let cookie: string
      beforeAll(async () => {
        cookie = await getBobCookie()
      })

      it('should not update a wallet', async () => {
        expect.assertions(1)
        try {
          await sdk.userUpdateWallet({ walletId, input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('You are not authorized to update this Wallet')
        }
      })

      it('should not find a wallet by id', async () => {
        expect.assertions(1)
        try {
          await sdk.userFindOneWallet({ walletId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('You are not authorized to view this Wallet')
        }
      })

      it('should not delete a wallet', async () => {
        expect.assertions(1)
        try {
          await sdk.userDeleteWallet({ walletId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('You are not authorized to delete this Wallet')
        }
      })
    })
  })
})
