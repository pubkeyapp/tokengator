import { AdminCreateMintInput, AdminFindManyMintInput, AdminUpdateMintInput, Mint } from '@tokengator/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

describe('api-mint-feature', () => {
  describe('api-mint-admin-resolver', () => {
    const mintName = uniqueId('acme-mint')
    let mintId: string
    let cookie: string

    beforeAll(async () => {
      cookie = await getAliceCookie()
      const created = await sdk.adminCreateMint({ input: { name: mintName } }, { cookie })
      mintId = created.data.created.id
    })

    describe('authorized', () => {
      beforeAll(async () => {
        cookie = await getAliceCookie()
      })

      it('should create a mint', async () => {
        const input: AdminCreateMintInput = {
          name: uniqueId('mint'),
        }

        const res = await sdk.adminCreateMint({ input }, { cookie })

        const item: Mint = res.data.created
        expect(item.name).toBe(input.name)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a mint', async () => {
        const createInput: AdminCreateMintInput = {
          name: uniqueId('mint'),
        }
        const createdRes = await sdk.adminCreateMint({ input: createInput }, { cookie })
        const mintId = createdRes.data.created.id
        const input: AdminUpdateMintInput = {
          name: uniqueId('mint'),
        }

        const res = await sdk.adminUpdateMint({ mintId, input }, { cookie })

        const item: Mint = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a list of mints (find all)', async () => {
        const createInput: AdminCreateMintInput = {
          name: uniqueId('mint'),
        }
        const createdRes = await sdk.adminCreateMint({ input: createInput }, { cookie })
        const mintId = createdRes.data.created.id

        const input: AdminFindManyMintInput = {}

        const res = await sdk.adminFindManyMint({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data[0].id).toBe(mintId)
      })

      it('should find a list of mints (find new one)', async () => {
        const createInput: AdminCreateMintInput = {
          name: uniqueId('mint'),
        }
        const createdRes = await sdk.adminCreateMint({ input: createInput }, { cookie })
        const mintId = createdRes.data.created.id

        const input: AdminFindManyMintInput = {
          search: mintId,
        }

        const res = await sdk.adminFindManyMint({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(mintId)
      })

      it('should find a mint by id', async () => {
        const createInput: AdminCreateMintInput = {
          name: uniqueId('mint'),
        }
        const createdRes = await sdk.adminCreateMint({ input: createInput }, { cookie })
        const mintId = createdRes.data.created.id

        const res = await sdk.adminFindOneMint({ mintId }, { cookie })

        expect(res.data.item.id).toBe(mintId)
      })

      it('should delete a mint', async () => {
        const createInput: AdminCreateMintInput = {
          name: uniqueId('mint'),
        }
        const createdRes = await sdk.adminCreateMint({ input: createInput }, { cookie })
        const mintId = createdRes.data.created.id

        const res = await sdk.adminDeleteMint({ mintId }, { cookie })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.adminFindManyMint({ input: { search: mintId } }, { cookie })
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      let cookie: string
      beforeAll(async () => {
        cookie = await getBobCookie()
      })

      it('should not create a mint', async () => {
        expect.assertions(1)
        const input: AdminCreateMintInput = {
          name: uniqueId('mint'),
        }

        try {
          await sdk.adminCreateMint({ input }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not update a mint', async () => {
        expect.assertions(1)
        try {
          await sdk.adminUpdateMint({ mintId, input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a list of mints (find all)', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindManyMint({ input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a mint by id', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindOneMint({ mintId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not delete a mint', async () => {
        expect.assertions(1)
        try {
          await sdk.adminDeleteMint({ mintId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })
    })
  })
})
