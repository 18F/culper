import { validateModel } from 'models/validate'
import treatment from 'models/treatment'

describe('The treatment model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'Name.presence.REQUIRED',
      'Phone.presence.REQUIRED',
      'Address.presence.REQUIRED',
    ]

    expect(validateModel(testData, treatment))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Name must have a value', () => {
    const testData = {
      Name: { value: '' },
    }
    const expectedErrors = [
      'Name.hasValue.MISSING_VALUE',
    ]

    expect(validateModel(testData, treatment))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Phone must be a valid phone', () => {
    const testData = {
      Phone: { value: '123456789' },
    }
    const expectedErrors = [
      'Phone.model.timeOfDay.presence.REQUIRED',
      'Phone.model.number.presence.REQUIRED',
    ]

    expect(validateModel(testData, treatment))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Phone number must exist', () => {
    const testData = {
      Phone: { noNumber: true },
    }

    const expectedErrors = [
      'Phone.model.noNumber.inclusion.INCLUSION',
      'Phone.model.timeOfDay.presence.REQUIRED',
      'Phone.model.number.presence.REQUIRED',
    ]

    expect(validateModel(testData, treatment))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Address must be a valid location', () => {
    const testData = {
      Address: { value: 'Test' },
    }
    const expectedErrors = [
      'Address.location.street.presence.REQUIRED',
      'Address.location.city.presence.REQUIRED',
      'Address.location.country.presence.REQUIRED',
    ]

    expect(validateModel(testData, treatment))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Address cannot be a PO box', () => {
    const testData = {
      Address: {
        street: 'PO Box 123',
        city: 'New York',
        state: 'NY',
        zipcode: '10002',
        country: 'United States',
      },
    }

    const expectedErrors = ['Address.location.street.format.INVALID_FORMAT']

    expect(validateModel(testData, treatment))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a valid treatment', () => {
    const testData = {
      Name: { value: 'Test name' },
      Phone: {
        number: '1234567890',
        timeOfDay: 'Both',
        type: 'Domestic',
      },
      Address: {
        street: '39 Facility St',
        city: 'New York',
        state: 'NY',
        zipcode: '10025',
        country: 'United States',
      },
    }

    expect(validateModel(testData, treatment)).toEqual(true)
  })
})
