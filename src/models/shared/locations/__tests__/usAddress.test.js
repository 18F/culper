import { validateModel } from 'models/validate'
import usAddress from '../usAddress'

describe('The location/usAddress model', () => {
  it('street is required', () => {
    const testData = { street: '' }
    const expectedErrors = ['street.presence.REQUIRED']

    expect(validateModel(testData, usAddress))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('street2 is not required', () => {
    const testData = { street: '123 Main Street' }
    const expectedErrors = ['street2.presence.REQUIRED']

    expect(validateModel(testData, usAddress))
      .not.toEqual(expect.arrayContaining(expectedErrors))
  })

  it('city is required', () => {
    const testData = { city: '' }
    const expectedErrors = ['city.presence.REQUIRED']

    expect(validateModel(testData, usAddress))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('country is required', () => {
    const testData = { country: '' }
    const expectedErrors = ['country.presence.REQUIRED']

    expect(validateModel(testData, usAddress))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('state is required', () => {
    const testData = { state: '', country: 'United States' }
    const expectedErrors = ['state.presence.REQUIRED']

    expect(validateModel(testData, usAddress))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('zipcode is required', () => {
    const testData = { zipcode: '', country: 'POSTOFFICE' }
    const expectedErrors = ['zipcode.presence.REQUIRED']

    expect(validateModel(testData, usAddress))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('does not allow PO addresses', () => {
    const testData = {
      street: 'PO Street',
      city: 'APO',
      state: 'AA',
      country: 'POSTOFFICE',
      county: 'test',
      zipcode: '34052',
    }

    const expectedErrors = ['country.inclusion.INCLUSION']

    expect(validateModel(testData, usAddress))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('does not allow international addresses', () => {
    const testData = {
      street: '1 Main St',
      city: 'Toronto',
      country: 'Canada',
    }

    const expectedErrors = ['country.inclusion.INCLUSION']

    expect(validateModel(testData, usAddress))
      .toEqual(expect.arrayContaining(expectedErrors))
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

    expect(validateModel(testData, usAddress)).toEqual(true)
  })
})
