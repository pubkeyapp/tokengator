import { PresetAdminCreateInput, PresetAdminFindManyInput, PresetAdminUpdateInput, Preset } from '@tokengator-mint/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

describe('api-preset-feature', () => {
  describe('api-preset-admin-resolver', () => {
    const presetName = uniqueId('acme-preset')

    let presetId: string
    let cookie: string

    beforeAll(async () => {
      cookie = await getAliceCookie()
      const created = await sdk.adminCreatePreset({ input: { name: presetName } }, { cookie })
      presetId = created.data.created.id
    })

    describe('authorized', () => {
      beforeAll(async () => {
        cookie = await getAliceCookie()
      })

      it('should create a preset', async () => {
        const input: PresetAdminCreateInput = {
          name: uniqueId('preset'),
        }

        const res = await sdk.adminCreatePreset({ input }, { cookie })

        const item: Preset = res.data.created
        expect(item.name).toBe(input.name)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a preset', async () => {
        const createInput: PresetAdminCreateInput = {
          name: uniqueId('preset'),
        }
        const createdRes = await sdk.adminCreatePreset({ input: createInput }, { cookie })
        const presetId = createdRes.data.created.id
        const input: PresetAdminUpdateInput = {
          name: uniqueId('preset'),
        }

        const res = await sdk.adminUpdatePreset({ presetId, input }, { cookie })

        const item: Preset = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a list of presets (find all)', async () => {
        const createInput: PresetAdminCreateInput = {
          name: uniqueId('preset'),
        }
        const createdRes = await sdk.adminCreatePreset({ input: createInput }, { cookie })
        const presetId = createdRes.data.created.id

        const input: PresetAdminFindManyInput = {}

        const res = await sdk.adminFindManyPreset({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data[0].id).toBe(presetId)
      })

      it('should find a list of presets (find new one)', async () => {
        const createInput: PresetAdminCreateInput = {
          name: uniqueId('preset'),
        }
        const createdRes = await sdk.adminCreatePreset({ input: createInput }, { cookie })
        const presetId = createdRes.data.created.id

        const input: PresetAdminFindManyInput = {
          search: presetId,
        }

        const res = await sdk.adminFindManyPreset({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(presetId)
      })

      it('should find a preset by id', async () => {
        const createInput: PresetAdminCreateInput = {
          name: uniqueId('preset'),
        }
        const createdRes = await sdk.adminCreatePreset({ input: createInput }, { cookie })
        const presetId = createdRes.data.created.id

        const res = await sdk.adminFindOnePreset({ presetId }, { cookie })

        expect(res.data.item.id).toBe(presetId)
      })

      it('should delete a preset', async () => {
        const createInput: PresetAdminCreateInput = {
          name: uniqueId('preset'),
        }
        const createdRes = await sdk.adminCreatePreset({ input: createInput }, { cookie })
        const presetId = createdRes.data.created.id

        const res = await sdk.adminDeletePreset({ presetId }, { cookie })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.adminFindManyPreset({ input: { search: presetId } }, { cookie })
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
          await sdk.adminUpdatePreset({ presetId, input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a preset by id', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindOnePreset({ presetId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not delete a preset', async () => {
        expect.assertions(1)
        try {
          await sdk.adminDeletePreset({ presetId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })
    })
  })
})
