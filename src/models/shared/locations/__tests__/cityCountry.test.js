import { validateModel } from 'models/validate'
import cityCountry from '../cityCountry'

describe('The location/cityCountry model', () => {
  it('city is required', () => {
    const testData = { city: '' }
    const expectedErrors = ['city.presence.REQUIRED']

    expect(validateModel(testData, cityCountry))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('country is required', () => {
    const testData = { country: '' }
    const expectedErrors = ['country.presence.REQUIRED']

    expect(validateModel(testData, cityCountry))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('for a domestic address', () => {
    it('passes a valid domestic address', () => {
      const testData = {
        city: 'New York',
        country: 'United States',
      }

      expect(validateModel(testData, cityCountry)).toEqual(true)
    })
  })

  describe('for an international address', () => {
    it('passes a valid international address', () => {
      const testData = {
        city: 'Toronto',
        country: 'Canada',
      }

      expect(validateModel(testData, cityCountry)).toEqual(true)
    })
  })
})
