import { validateModel } from 'models/validate'
import federal from 'models/federal'

describe('The federal model', () => {
  it('the Name field is required', () => {
    const testData = {}
    const expectedErrors = ['Name.presence.REQUIRED']

    expect(validateModel(testData, federal))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Name field must have a value', () => {
    const testData = {
      Name: 'invalid',
    }
    const expectedErrors = ['Name.hasValue.MISSING_VALUE']

    expect(validateModel(testData, federal))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Position field is required', () => {
    const testData = {}
    const expectedErrors = ['Position.presence.REQUIRED']

    expect(validateModel(testData, federal))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Position field must have a value', () => {
    const testData = {
      Position: 'invalid',
    }
    const expectedErrors = ['Position.hasValue.MISSING_VALUE']

    expect(validateModel(testData, federal))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Address field is required', () => {
    const testData = {}
    const expectedErrors = ['Address.presence.REQUIRED']

    expect(validateModel(testData, federal))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Address field must be a valid address', () => {
    const testData = {
      Address: ['not', 'an', 'address'],
    }
    const expectedErrors = [
      'Address.location.street.presence.REQUIRED',
      'Address.location.city.presence.REQUIRED',
      'Address.location.country.presence.REQUIRED',
    ]

    expect(validateModel(testData, federal))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Dates field is required', () => {
    const testData = {}
    const expectedErrors = ['Dates.presence.REQUIRED']

    expect(validateModel(testData, federal))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Dates field must be a valid date range', () => {
    const testData = {
      Dates: {
        to: { year: 1990, month: 5, day: 12 },
        from: { year: 2000, month: 12, day: 1 },
        present: false,
      },
    }

    const expectedErrors = ['Dates.daterange.INVALID_DATE_RANGE']

    expect(validateModel(testData, federal))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a valid federal item', () => {
    const testData = {
      Name: { value: 'Some Service' },
      Position: { value: 'Manager' },
      Address: {
        street: '40 Federal Service St',
        city: 'New York',
        state: 'NY',
        zipcode: '10001',
        country: 'United States',
      },
      Dates: {
        to: { year: 2005, month: 5, day: 12 },
        from: { year: 2000, month: 12, day: 1 },
        present: false,
      },
    }

    expect(validateModel(testData, federal)).toBe(true)
  })
})
