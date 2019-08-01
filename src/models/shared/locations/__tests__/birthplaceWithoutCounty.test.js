import { validateModel } from 'models/validate'
import birthplaceWithoutCounty from '../birthplaceWithoutCounty'

describe('The location/birthplaceWithoutCounty model', () => {
  it('city is required', () => {
    const testData = { city: '' }
    const expectedErrors = ['city.presence.REQUIRED']

    expect(validateModel(testData, birthplaceWithoutCounty))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('country is required', () => {
    const testData = { country: '' }
    const expectedErrors = ['country.presence.REQUIRED']

    expect(validateModel(testData, birthplaceWithoutCounty))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('for a domestic address', () => {
    it('state must be a valid US state', () => {
      const testData = { state: 'XY', country: 'United States' }
      const expectedErrors = ['state.inclusion.INCLUSION']

      expect(validateModel(testData, birthplaceWithoutCounty))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('county is not required', () => {
      const testData = { state: 'NY', country: 'United States' }
      const expectedErrors = ['county.presence.REQUIRED']

      expect(validateModel(testData, birthplaceWithoutCounty))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid domestic address', () => {
      const testData = {
        city: 'New York',
        state: 'NY',
        country: 'United States',
      }

      expect(validateModel(testData, birthplaceWithoutCounty)).toEqual(true)
    })
  })

  describe('for an international address', () => {
    it('state must be empty', () => {
      const testData = { state: 'MA', country: 'Canada' }
      const expectedErrors = ['state.requireEmpty.VALUE_NOT_EMPTY']

      expect(validateModel(testData, birthplaceWithoutCounty))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid international address', () => {
      const testData = {
        city: 'Toronto',
        country: 'Canada',
      }

      expect(validateModel(testData, birthplaceWithoutCounty)).toEqual(true)
    })
  })
})
