import {
  UserCreateCommunityInput,
  UserFindManyCommunityInput,
  UserUpdateCommunityInput,
  Community,
} from '@tokengator-mint/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

describe('api-community-feature', () => {
  describe('api-community-user-resolver', () => {
    const communityName = uniqueId('acme-community')
    let communityId: string
    let cookie: string

    beforeAll(async () => {
      cookie = await getAliceCookie()
      const created = await sdk.userCreateCommunity({ input: { name: communityName } }, { cookie })
      communityId = created.data.created.id
    })

    describe('authorized', () => {
      beforeAll(async () => {
        cookie = await getAliceCookie()
      })

      it('should create a community', async () => {
        const input: UserCreateCommunityInput = {
          name: uniqueId('community'),
        }

        const res = await sdk.userCreateCommunity({ input }, { cookie })

        const item: Community = res.data.created
        expect(item.name).toBe(input.name)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a community', async () => {
        const createInput: UserCreateCommunityInput = {
          name: uniqueId('community'),
        }
        const createdRes = await sdk.userCreateCommunity({ input: createInput }, { cookie })
        const communityId = createdRes.data.created.id
        const input: UserUpdateCommunityInput = {
          name: uniqueId('community'),
        }

        const res = await sdk.userUpdateCommunity({ communityId, input }, { cookie })

        const item: Community = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a list of communities (find all)', async () => {
        const createInput: UserCreateCommunityInput = {
          name: uniqueId('community'),
        }
        const createdRes = await sdk.userCreateCommunity({ input: createInput }, { cookie })
        const communityId = createdRes.data.created.id

        const input: UserFindManyCommunityInput = {}

        const res = await sdk.userFindManyCommunity({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data[0].id).toBe(communityId)
      })

      it('should find a list of communities (find new one)', async () => {
        const createInput: UserCreateCommunityInput = {
          name: uniqueId('community'),
        }
        const createdRes = await sdk.userCreateCommunity({ input: createInput }, { cookie })
        const communityId = createdRes.data.created.id

        const input: UserFindManyCommunityInput = {
          search: communityId,
        }

        const res = await sdk.userFindManyCommunity({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(communityId)
      })

      it('should find a community by id', async () => {
        const createInput: UserCreateCommunityInput = {
          name: uniqueId('community'),
        }
        const createdRes = await sdk.userCreateCommunity({ input: createInput }, { cookie })
        const communityId = createdRes.data.created.id

        const res = await sdk.userFindOneCommunity({ communityId }, { cookie })

        expect(res.data.item.id).toBe(communityId)
      })

      it('should delete a community', async () => {
        const createInput: UserCreateCommunityInput = {
          name: uniqueId('community'),
        }
        const createdRes = await sdk.userCreateCommunity({ input: createInput }, { cookie })
        const communityId = createdRes.data.created.id

        const res = await sdk.userDeleteCommunity({ communityId }, { cookie })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.userFindManyCommunity({ input: { search: communityId } }, { cookie })
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      let cookie: string
      beforeAll(async () => {
        cookie = await getBobCookie()
      })

      it('should not create a community', async () => {
        expect.assertions(1)
        const input: UserCreateCommunityInput = {
          name: uniqueId('community'),
        }

        try {
          await sdk.userCreateCommunity({ input }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not User')
        }
      })

      it('should not update a community', async () => {
        expect.assertions(1)
        try {
          await sdk.userUpdateCommunity({ communityId, input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not User')
        }
      })

      it('should not find a list of communities (find all)', async () => {
        expect.assertions(1)
        try {
          await sdk.userFindManyCommunity({ input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not User')
        }
      })

      it('should not find a community by id', async () => {
        expect.assertions(1)
        try {
          await sdk.userFindOneCommunity({ communityId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not User')
        }
      })

      it('should not delete a community', async () => {
        expect.assertions(1)
        try {
          await sdk.userDeleteCommunity({ communityId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not User')
        }
      })
    })
  })
})
