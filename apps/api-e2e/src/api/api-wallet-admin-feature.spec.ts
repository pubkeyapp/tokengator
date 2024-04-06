import { WalletAdminCreateInput, WalletAdminFindManyInput, WalletAdminUpdateInput, Wallet } from '@tokengator/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

describe('api-wallet-feature', () => {
  describe('api-wallet-admin-resolver', () => {
    const walletName = uniqueId('acme-wallet')

    let walletId: string
    let cookie: string

    beforeAll(async () => {
      cookie = await getAliceCookie()
      const created = await sdk.adminCreateWallet({ input: { name: walletName } }, { cookie })
      walletId = created.data.created.id
    })

    describe('authorized', () => {
      beforeAll(async () => {
        cookie = await getAliceCookie()
      })

      it('should create a wallet', async () => {
        const input: WalletAdminCreateInput = {
          name: uniqueId('wallet'),
        }

        const res = await sdk.adminCreateWallet({ input }, { cookie })

        const item: Wallet = res.data.created
        expect(item.name).toBe(input.name)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a wallet', async () => {
        const createInput: WalletAdminCreateInput = {
          name: uniqueId('wallet'),
        }
        const createdRes = await sdk.adminCreateWallet({ input: createInput }, { cookie })
        const walletId = createdRes.data.created.id
        const input: WalletAdminUpdateInput = {
          name: uniqueId('wallet'),
        }

        const res = await sdk.adminUpdateWallet({ walletId, input }, { cookie })

        const item: Wallet = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a list of wallets (find all)', async () => {
        const createInput: WalletAdminCreateInput = {
          name: uniqueId('wallet'),
        }
        const createdRes = await sdk.adminCreateWallet({ input: createInput }, { cookie })
        const walletId = createdRes.data.created.id

        const input: WalletAdminFindManyInput = {}

        const res = await sdk.adminFindManyWallet({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data[0].id).toBe(walletId)
      })

      it('should find a list of wallets (find new one)', async () => {
        const createInput: WalletAdminCreateInput = {
          name: uniqueId('wallet'),
        }
        const createdRes = await sdk.adminCreateWallet({ input: createInput }, { cookie })
        const walletId = createdRes.data.created.id

        const input: WalletAdminFindManyInput = {
          search: walletId,
        }

        const res = await sdk.adminFindManyWallet({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(walletId)
      })

      it('should find a wallet by id', async () => {
        const createInput: WalletAdminCreateInput = {
          name: uniqueId('wallet'),
        }
        const createdRes = await sdk.adminCreateWallet({ input: createInput }, { cookie })
        const walletId = createdRes.data.created.id

        const res = await sdk.adminFindOneWallet({ walletId }, { cookie })

        expect(res.data.item.id).toBe(walletId)
      })

      it('should delete a wallet', async () => {
        const createInput: WalletAdminCreateInput = {
          name: uniqueId('wallet'),
        }
        const createdRes = await sdk.adminCreateWallet({ input: createInput }, { cookie })
        const walletId = createdRes.data.created.id

        const res = await sdk.adminDeleteWallet({ walletId }, { cookie })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.adminFindManyWallet({ input: { search: walletId } }, { cookie })
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
          await sdk.adminUpdateWallet({ walletId, input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a wallet by id', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindOneWallet({ walletId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not delete a wallet', async () => {
        expect.assertions(1)
        try {
          await sdk.adminDeleteWallet({ walletId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })
    })
  })
})
