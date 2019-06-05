import { validateModel } from 'models/validate'
import offense from '../offense'

describe('The location/offense model', () => {
  it('city is required', () => {
    const testData = { city: '' }
    const expectedErrors = ['city.required']

    expect(validateModel(testData, offense))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('country is required', () => {
    const testData = { country: '' }
    const expectedErrors = ['country.required']

    expect(validateModel(testData, offense))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('for a domestic address', () => {
    it('state is required', () => {
      const testData = { state: '', country: 'United States' }
      const expectedErrors = ['state.required']

      expect(validateModel(testData, offense))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('zipcode is required', () => {
      const testData = { zipcode: '', country: 'POSTOFFICE' }
      const expectedErrors = ['zipcode.required']

      expect(validateModel(testData, offense))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid domestic address', () => {
      const testData = {
        city: 'New York',
        state: 'NY',
        zipcode: '10001',
        country: 'United States',
        county: 'Manhattan',
      }

      expect(validateModel(testData, offense)).toEqual(true)
    })
  })

  describe('for an international address', () => {
    it('passes a valid international address', () => {
      const testData = {
        city: 'Toronto',
        country: 'Canada',
      }

      expect(validateModel(testData, offense)).toEqual(true)
    })
  })
})
