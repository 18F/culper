import { validateModel } from 'models/validate'
import location from '../location'

describe('The location model', () => {
  it('street is required', () => {
    const testData = { street: '' }
    const expectedErrors = ['street.required']

    expect(validateModel(testData, location))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('street can be a PO box', () => {
    const testData = { street: 'PO Box 123' }
    const expectedErrors = ['street.format']

    expect(validateModel(testData, location))
      .not.toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if PO box is not allowed', () => {
    it('street cannot be a PO box', () => {
      const testData = { street: 'PO Box 123' }
      const expectedErrors = ['street.format']

      expect(validateModel(testData, location, { allowPOBox: false }))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  it('city is required', () => {
    const testData = { city: '' }
    const expectedErrors = ['city.required']

    expect(validateModel(testData, location))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('country is required', () => {
    const testData = { country: '' }
    const expectedErrors = ['country.required']

    expect(validateModel(testData, location))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('for a PO address', () => {
    it('zipcode is required', () => {
      const testData = { zipcode: '', country: 'POSTOFFICE' }
      const expectedErrors = ['zipcode.required']

      expect(validateModel(testData, location))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('zipcode must be a valid format', () => {
      const testData = { zipcode: 'abcd', country: 'POSTOFFICE' }
      const expectedErrors = ['zipcode.format']

      expect(validateModel(testData, location))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('zipcode and state must match', () => {
      const testData = { zipcode: '10002', state: 'AA', country: 'POSTOFFICE' }
      const expectedErrors = ['zipcode.zipcode']

      expect(validateModel(testData, location))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('city must be a valid PO city', () => {
      const testData = { city: 'New York', country: 'POSTOFFICE' }
      const expectedErrors = ['city.inclusion']

      expect(validateModel(testData, location))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('state must be a valid PO state', () => {
      const testData = { state: 'MA', country: 'POSTOFFICE' }
      const expectedErrors = ['state.inclusion']

      expect(validateModel(testData, location))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('county is required', () => {
      const testData = { county: '', country: 'POSTOFFICE' }
      const expectedErrors = ['county.required']

      expect(validateModel(testData, location))
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

      expect(validateModel(testData, location)).toEqual(true)
    })
  })

  describe('for a domestic address', () => {
    it('zipcode is required', () => {
      const testData = { zipcode: '', country: 'United States' }
      const expectedErrors = ['zipcode.required']

      expect(validateModel(testData, location))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('zipcode must be a valid format', () => {
      const testData = { zipcode: 'abcd', country: 'United States' }
      const expectedErrors = ['zipcode.format']

      expect(validateModel(testData, location))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('zipcode and state must match', () => {
      const testData = { zipcode: '10002', state: 'MA', country: 'United States' }
      const expectedErrors = ['zipcode.zipcode']

      expect(validateModel(testData, location))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('state must be a valid US state', () => {
      const testData = { state: 'XY', country: 'United States' }
      const expectedErrors = ['state.inclusion']

      expect(validateModel(testData, location))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('county is required', () => {
      const testData = { county: '', country: 'United States' }
      const expectedErrors = ['county.required']

      expect(validateModel(testData, location))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid domestic address', () => {
      const testData = {
        street: '1 Main Street',
        city: 'New York',
        state: 'NY',
        country: 'United States',
        county: 'Manhattan',
        zipcode: '10002',
      }

      expect(validateModel(testData, location)).toEqual(true)
    })
  })

  describe('for an international address', () => {
    it('passes a valid international address', () => {
      const testData = {
        street: '1 Main Street',
        city: 'London',
        country: 'United Kingdom',
      }

      expect(validateModel(testData, location)).toEqual(true)
    })
  })
})
