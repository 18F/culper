import { validateModel } from 'models/validate'
import address from '../address'

// Note: most of the address test cases are covered by the location model tests

describe('The location/address model', () => {
  it('street is required', () => {
    const testData = { street: '' }
    const expectedErrors = ['street.presence.REQUIRED']

    expect(validateModel(testData, address))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('street2 is not required', () => {
    const testData = { street: '123 Main Street' }
    const expectedErrors = ['street2.presence.REQUIRED']

    expect(validateModel(testData, address))
      .not.toEqual(expect.arrayContaining(expectedErrors))
  })

  it('city is required', () => {
    const testData = { city: '' }
    const expectedErrors = ['city.presence.REQUIRED']

    expect(validateModel(testData, address))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('country is required', () => {
    const testData = { country: '' }
    const expectedErrors = ['country.presence.REQUIRED']

    expect(validateModel(testData, address))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('for a PO or domestic address', () => {
    it('state is required', () => {
      const testData = { state: '', country: 'United States' }
      const expectedErrors = ['state.presence.REQUIRED']

      expect(validateModel(testData, address))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('zipcode is required', () => {
      const testData = { zipcode: '', country: 'POSTOFFICE' }
      const expectedErrors = ['zipcode.presence.REQUIRED']

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

  describe('with the "militaryAddress" option set to true', () => {
    it('must be a military address', () => {
      const testData = {
        street: '123 Main ST',
        city: 'New York',
        state: 'NY',
        zipcode: '10003',
        country: 'United States',
      }

      const expectedErrors = ['country.inclusion.INCLUSION']

      expect(validateModel(testData, address, { militaryAddress: true }))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid military address', () => {
      const testData = {
        street: '123 Main ST',
        city: 'FPO',
        state: 'AA',
        zipcode: '34035',
        country: 'POSTOFFICE',
      }

      expect(validateModel(testData, address, { militaryAddress: true }))
        .toEqual(true)
    })
  })

  describe('with the "militaryAddress" option set to false', () => {
    it('must not be a military address', () => {
      const testData = {
        street: '123 Main ST',
        city: 'FPO',
        state: 'AA',
        zipcode: '34035',
        country: 'POSTOFFICE',
      }

      const expectedErrors = ['country.exclusion.EXCLUSION']

      expect(validateModel(testData, address, { militaryAddress: false }))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid non-military address', () => {
      const testData = {
        street: '123 Main ST',
        city: 'New York',
        state: 'NY',
        zipcode: '10003',
        country: 'United States',
      }

      expect(validateModel(testData, address, { militaryAddress: false }))
        .toEqual(true)
    })
  })
})
