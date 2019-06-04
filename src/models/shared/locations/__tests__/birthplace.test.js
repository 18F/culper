import { validateModel } from 'models/validate'
import birthplace from '../birthplace'

describe('The location/birthplace model', () => {
  it('city is required', () => {
    const testData = { city: '' }
    const expectedErrors = ['city.required']

    expect(validateModel(testData, birthplace))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('country is required', () => {
    const testData = { country: '' }
    const expectedErrors = ['country.required']

    expect(validateModel(testData, birthplace))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('for a domestic address', () => {
    it('state must be a valid US state', () => {
      const testData = { state: 'XY', country: 'United States' }
      const expectedErrors = ['state.inclusion']

      expect(validateModel(testData, birthplace))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('county is required', () => {
      const testData = { state: 'NY', country: 'United States' }
      const expectedErrors = ['county.required']

      expect(validateModel(testData, birthplace))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid domestic address', () => {
      const testData = {
        city: 'New York',
        state: 'NY',
        country: 'United States',
        county: 'Manhattan',
      }

      expect(validateModel(testData, birthplace)).toEqual(true)
    })
  })

  describe('for an international address', () => {
    it('state must be empty', () => {
      const testData = { state: 'MA', country: 'Canada' }
      const expectedErrors = ['state.requireEmpty']

      expect(validateModel(testData, birthplace))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid international address', () => {
      const testData = {
        city: 'Toronto',
        country: 'Canada',
      }

      expect(validateModel(testData, birthplace)).toEqual(true)
    })
  })
})
