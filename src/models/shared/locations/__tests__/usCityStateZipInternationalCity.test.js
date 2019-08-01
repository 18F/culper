import { validateModel } from 'models/validate'
import usCityStateZipInternationalCity from '../usCityStateZipInternationalCity'

describe('The location/usCityStateZipInternationalCity model', () => {
  it('city is required', () => {
    const testData = { city: '' }
    const expectedErrors = ['city.presence.REQUIRED']

    expect(validateModel(testData, usCityStateZipInternationalCity))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('country is required', () => {
    const testData = { country: '' }
    const expectedErrors = ['country.presence.REQUIRED']

    expect(validateModel(testData, usCityStateZipInternationalCity))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('for a domestic address', () => {
    it('state must be a valid US state', () => {
      const testData = { state: 'XY', country: 'United States' }
      const expectedErrors = ['state.inclusion.INCLUSION']

      expect(validateModel(testData, usCityStateZipInternationalCity))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('zipcode is required', () => {
      const testData = { state: 'NY', country: 'United States' }
      const expectedErrors = ['zipcode.presence.REQUIRED']

      expect(validateModel(testData, usCityStateZipInternationalCity))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('zipcode must match the state', () => {
      const testData = { state: 'NY', country: 'United States', zipcode: '99999' }
      const expectedErrors = ['zipcode.zipcode.ZIPCODE_STATE_MISMATCH']

      expect(validateModel(testData, usCityStateZipInternationalCity))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid domestic address', () => {
      const testData = {
        city: 'New York',
        state: 'NY',
        zipcode: '10002',
        country: 'United States',
      }

      expect(validateModel(testData, usCityStateZipInternationalCity)).toEqual(true)
    })
  })

  describe('for an international address', () => {
    it('state must be empty', () => {
      const testData = { state: 'MA', country: 'Canada' }
      const expectedErrors = ['state.requireEmpty.VALUE_NOT_EMPTY']

      expect(validateModel(testData, usCityStateZipInternationalCity))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid international address', () => {
      const testData = {
        city: 'Toronto',
        country: 'Canada',
      }

      expect(validateModel(testData, usCityStateZipInternationalCity)).toEqual(true)
    })
  })
})
