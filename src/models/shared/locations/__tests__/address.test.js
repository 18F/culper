import { validateModel } from 'models/validate'
import address from '../address'

// Note: most of the address test cases are covered by the location model tests

describe('The location/address model', () => {
  it('street is required', () => {
    const testData = { street: '' }
    const expectedErrors = ['street.required']

    expect(validateModel(testData, address))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('street2 is not required', () => {
    const testData = { street: '123 Main Street' }
    const expectedErrors = ['street2.required']

    expect(validateModel(testData, address))
      .not.toEqual(expect.arrayContaining(expectedErrors))
  })

  it('city is required', () => {
    const testData = { city: '' }
    const expectedErrors = ['city.required']

    expect(validateModel(testData, address))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('country is required', () => {
    const testData = { country: '' }
    const expectedErrors = ['country.required']

    expect(validateModel(testData, address))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('for a PO or domestic address', () => {
    it('state is required', () => {
      const testData = { state: '', country: 'United States' }
      const expectedErrors = ['state.required']

      expect(validateModel(testData, address))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('zipcode is required', () => {
      const testData = { zipcode: '', country: 'POSTOFFICE' }
      const expectedErrors = ['zipcode.required']

      expect(validateModel(testData, address))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid PO address', () => {
      const testData = {
        street: 'PO Street',
        city: 'APO',
        state: 'AA',
        country: 'POSTOFFICE',
        county: 'test',
        zipcode: '34052',
      }

      expect(validateModel(testData, address)).toEqual(true)
    })

    it('passes a valid domestic address', () => {
      const testData = {
        street: '123 Main St',
        street2: 'Apt 2B',
        city: 'New York',
        state: 'NY',
        zipcode: '10001',
        country: 'United States',
        county: 'Manhattan',
      }

      expect(validateModel(testData, address)).toEqual(true)
    })
  })

  describe('for an international address', () => {
    it('passes a valid international address', () => {
      const testData = {
        street: '1 Main St',
        city: 'Toronto',
        country: 'Canada',
      }

      expect(validateModel(testData, address)).toEqual(true)
    })
  })
})
