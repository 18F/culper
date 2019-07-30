import { validateModel } from 'models/validate'
import foreignPassportTravel from '../foreignPassportTravel'

describe('The foreignPassportTravel model', () => {
  it('Country is required', () => {
    const testData = {}
    const expectedErrors = ['Country.presence.REQUIRED']

    expect(validateModel(testData, foreignPassportTravel))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Country must have a valid value', () => {
    const testData = { Country: 'Canda' }
    const expectedErrors = ['Country.country.INVALID_COUNTRY']

    expect(validateModel(testData, foreignPassportTravel))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Dates are required', () => {
    const testData = {}
    const expectedErrors = ['Dates.presence.REQUIRED']

    expect(validateModel(testData, foreignPassportTravel))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Dates must be a valid date range', () => {
    const testData = {
      Dates: {
        from: { year: 2010, day: 2, month: 5 },
        to: { year: 2010, day: 1, month: 3 },
      },
    }
    const expectedErrors = ['Dates.daterange.INVALID_DATE_RANGE']

    expect(validateModel(testData, foreignPassportTravel))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a valid foreign passport travel', () => {
    const testData = {
      Country: { value: 'Germany' },
      Dates: {
        from: { year: 2010, day: 2, month: 5 },
        to: { year: 2010, day: 1, month: 6 },
      },
    }

    expect(validateModel(testData, foreignPassportTravel)).toEqual(true)
  })
})
