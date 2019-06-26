import { validateModel } from 'models/validate'
import domesticViolence from '../domesticViolence'

describe('The domesticViolence model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'CourtAddress.required',
      'CourtName.required',
      'Explanation.required',
      'Issued.required',
    ]

    expect(validateModel(testData, domesticViolence))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('CourtAddress must be a valid location', () => {
    const testData = {
      CourtAddress: 'Test address',
    }
    const expectedErrors = [
      'CourtAddress.location',
    ]

    expect(validateModel(testData, domesticViolence))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('CourtName must have a value', () => {
    const testData = {
      CourtName: 'test',
    }
    const expectedErrors = [
      'CourtName.hasValue',
    ]

    expect(validateModel(testData, domesticViolence))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Explanation must have a value', () => {
    const testData = {
      Explanation: true,
    }
    const expectedErrors = [
      'Explanation.hasValue',
    ]

    expect(validateModel(testData, domesticViolence))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Issued must be a valid date', () => {
    const testData = {
      Issued: { month: 2, day: 100 },
    }
    const expectedErrors = [
      'Issued.date',
    ]

    expect(validateModel(testData, domesticViolence))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a valid domestic violence', () => {
    const testData = {
      CourtAddress: {
        city: 'New York',
        state: 'NY',
        zipcode: '10001',
        country: 'United States',
      },
      CourtName: { value: 'Test Court' },
      Explanation: { value: 'I did a thing' },
      Issued: { month: 2, year: 1999 },
    }

    expect(validateModel(testData, domesticViolence)).toEqual(true)
  })
})
