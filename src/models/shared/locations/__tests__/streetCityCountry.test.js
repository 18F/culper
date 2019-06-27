import { validateModel } from 'models/validate'
import streetCityCountry from '../streetCityCountry'

describe('The location/streetCityCountry model', () => {
  it('street is required', () => {
    const testData = { street: '' }
    const expectedErrors = ['street.required']

    expect(validateModel(testData, streetCityCountry))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('city is required', () => {
    const testData = { city: '' }
    const expectedErrors = ['city.required']

    expect(validateModel(testData, streetCityCountry))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('country is required', () => {
    const testData = { country: '' }
    const expectedErrors = ['country.required']

    expect(validateModel(testData, streetCityCountry))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('for a domestic address', () => {
    it('passes a valid domestic address', () => {
      const testData = {
        street: '123 Main St',
        city: 'New York',
        country: 'United States',
      }

      expect(validateModel(testData, streetCityCountry)).toEqual(true)
    })
  })

  describe('for an international address', () => {
    it('passes a valid international address', () => {
      const testData = {
        street: '123 Main St',
        city: 'Toronto',
        country: 'Canada',
      }

      expect(validateModel(testData, streetCityCountry)).toEqual(true)
    })
  })
})
