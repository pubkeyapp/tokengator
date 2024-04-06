import { ClaimUserCreateInput, ClaimUserFindManyInput, ClaimUserUpdateInput, Claim } from '@tokengator/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

describe('api-claim-feature', () => {
  describe('api-claim-user-resolver', () => {
    const claimName = uniqueId('acme-claim')

    let claimId: string
    let cookie: string

    beforeAll(async () => {
      cookie = await getAliceCookie()
      const created = await sdk.userCreateClaim({ input: { name: claimName } }, { cookie })
      claimId = created.data.created.id
    })

    describe('authorized', () => {
      beforeAll(async () => {
        cookie = await getAliceCookie()
      })

      it('should create a claim', async () => {
        const input: ClaimUserCreateInput = {
          name: uniqueId('claim'),
        }

        const res = await sdk.userCreateClaim({ input }, { cookie })

        const item: Claim = res.data.created
        expect(item.name).toBe(input.name)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a claim', async () => {
        const createInput: ClaimUserCreateInput = {
          name: uniqueId('claim'),
        }
        const createdRes = await sdk.userCreateClaim({ input: createInput }, { cookie })
        const claimId = createdRes.data.created.id
        const input: ClaimUserUpdateInput = {
          name: uniqueId('claim'),
        }

        const res = await sdk.userUpdateClaim({ claimId, input }, { cookie })

        const item: Claim = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a list of claims (find all)', async () => {
        const createInput: ClaimUserCreateInput = {
          name: uniqueId('claim'),
        }
        const createdRes = await sdk.userCreateClaim({ input: createInput }, { cookie })
        const claimId = createdRes.data.created.id

        const input: ClaimUserFindManyInput = {}

        const res = await sdk.userFindManyClaim({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data[0].id).toBe(claimId)
      })

      it('should find a list of claims (find new one)', async () => {
        const createInput: ClaimUserCreateInput = {
          name: uniqueId('claim'),
        }
        const createdRes = await sdk.userCreateClaim({ input: createInput }, { cookie })
        const claimId = createdRes.data.created.id

        const input: ClaimUserFindManyInput = {
          search: claimId,
        }

        const res = await sdk.userFindManyClaim({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(claimId)
      })

      it('should find a claim by id', async () => {
        const createInput: ClaimUserCreateInput = {
          name: uniqueId('claim'),
        }
        const createdRes = await sdk.userCreateClaim({ input: createInput }, { cookie })
        const claimId = createdRes.data.created.id

        const res = await sdk.userFindOneClaim({ claimId }, { cookie })

        expect(res.data.item.id).toBe(claimId)
      })

      it('should delete a claim', async () => {
        const createInput: ClaimUserCreateInput = {
          name: uniqueId('claim'),
        }
        const createdRes = await sdk.userCreateClaim({ input: createInput }, { cookie })
        const claimId = createdRes.data.created.id

        const res = await sdk.userDeleteClaim({ claimId }, { cookie })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.userFindManyClaim({ input: { search: claimId } }, { cookie })
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      let cookie: string
      beforeAll(async () => {
        cookie = await getBobCookie()
      })

      it('should not update a claim', async () => {
        expect.assertions(1)
        try {
          await sdk.userUpdateClaim({ claimId, input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('You are not authorized to update this Claim')
        }
      })

      it('should not find a claim by id', async () => {
        expect.assertions(1)
        try {
          await sdk.userFindOneClaim({ claimId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('You are not authorized to view this Claim')
        }
      })

      it('should not delete a claim', async () => {
        expect.assertions(1)
        try {
          await sdk.userDeleteClaim({ claimId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('You are not authorized to delete this Claim')
        }
      })
    })
  })
})
