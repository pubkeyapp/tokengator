import { PresetUserCreateInput, PresetUserFindManyInput, PresetUserUpdateInput, Preset } from '@tokengator/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

describe('api-preset-feature', () => {
  describe('api-preset-user-resolver', () => {
    const presetName = uniqueId('acme-preset')

    let presetId: string
    let cookie: string

    beforeAll(async () => {
      cookie = await getAliceCookie()
      const created = await sdk.userCreatePreset({ input: { name: presetName } }, { cookie })
      presetId = created.data.created.id
    })

    describe('authorized', () => {
      beforeAll(async () => {
        cookie = await getAliceCookie()
      })

      it('should create a preset', async () => {
        const input: PresetUserCreateInput = {
          name: uniqueId('preset'),
        }

        const res = await sdk.userCreatePreset({ input }, { cookie })

        const item: Preset = res.data.created
        expect(item.name).toBe(input.name)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a preset', async () => {
        const createInput: PresetUserCreateInput = {
          name: uniqueId('preset'),
        }
        const createdRes = await sdk.userCreatePreset({ input: createInput }, { cookie })
        const presetId = createdRes.data.created.id
        const input: PresetUserUpdateInput = {
          name: uniqueId('preset'),
        }

        const res = await sdk.userUpdatePreset({ presetId, input }, { cookie })

        const item: Preset = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a list of presets (find all)', async () => {
        const createInput: PresetUserCreateInput = {
          name: uniqueId('preset'),
        }
        const createdRes = await sdk.userCreatePreset({ input: createInput }, { cookie })
        const presetId = createdRes.data.created.id

        const input: PresetUserFindManyInput = {}

        const res = await sdk.userFindManyPreset({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data[0].id).toBe(presetId)
      })

      it('should find a list of presets (find new one)', async () => {
        const createInput: PresetUserCreateInput = {
          name: uniqueId('preset'),
        }
        const createdRes = await sdk.userCreatePreset({ input: createInput }, { cookie })
        const presetId = createdRes.data.created.id

        const input: PresetUserFindManyInput = {
          search: presetId,
        }

        const res = await sdk.userFindManyPreset({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(presetId)
      })

      it('should find a preset by id', async () => {
        const createInput: PresetUserCreateInput = {
          name: uniqueId('preset'),
        }
        const createdRes = await sdk.userCreatePreset({ input: createInput }, { cookie })
        const presetId = createdRes.data.created.id

        const res = await sdk.userFindOnePreset({ presetId }, { cookie })

        expect(res.data.item.id).toBe(presetId)
      })

      it('should delete a preset', async () => {
        const createInput: PresetUserCreateInput = {
          name: uniqueId('preset'),
        }
        const createdRes = await sdk.userCreatePreset({ input: createInput }, { cookie })
        const presetId = createdRes.data.created.id

        const res = await sdk.userDeletePreset({ presetId }, { cookie })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.userFindManyPreset({ input: { search: presetId } }, { cookie })
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      let cookie: string
      beforeAll(async () => {
        cookie = await getBobCookie()
      })

      it('should not update a preset', async () => {
        expect.assertions(1)
        try {
          await sdk.userUpdatePreset({ presetId, input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('You are not authorized to update this Preset')
        }
      })

      it('should not find a preset by id', async () => {
        expect.assertions(1)
        try {
          await sdk.userFindOnePreset({ presetId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('You are not authorized to view this Preset')
        }
      })

      it('should not delete a preset', async () => {
        expect.assertions(1)
        try {
          await sdk.userDeletePreset({ presetId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('You are not authorized to delete this Preset')
        }
      })
    })
  })
})
