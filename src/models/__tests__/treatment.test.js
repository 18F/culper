import { validateModel } from 'models/validate'
import treatment from 'models/treatment'

describe('The treatment model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'Name.required',
      'Phone.required',
      'Address.required',
    ]

    expect(validateModel(testData, treatment))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Name must have a value', () => {
    const testData = {
      Name: { value: '' },
    }
    const expectedErrors = [
      'Name.hasValue',
    ]

    expect(validateModel(testData, treatment))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Phone must be a valid phone', () => {
    const testData = {
      Phone: { value: '123456789' },
    }
    const expectedErrors = [
      'Phone.model',
    ]

    expect(validateModel(testData, treatment))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Address must be a valid location', () => {
    const testData = {
      Address: { value: 'Test' },
    }
    const expectedErrors = [
      'Address.location',
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

    const expectedErrors = ['Address.location']

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
