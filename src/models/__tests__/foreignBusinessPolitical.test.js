import { validateModel } from 'models/validate'
import foreignBusinessPolitical from '../foreignBusinessPolitical'

describe('The foreignBusinessPolitical model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'Position.presence.REQUIRED',
      'Dates.presence.REQUIRED',
      'Country.presence.REQUIRED',
      'Reason.presence.REQUIRED',
      'Eligibility.presence.REQUIRED',
    ]
    expect(validateModel(testData, foreignBusinessPolitical))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Position must have a value', () => {
    const testData = {
      Position: { values: 'test' },
    }
    const expectedErrors = ['Position.hasValue.MISSING_VALUE']
    expect(validateModel(testData, foreignBusinessPolitical))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Dates must be a valid date range', () => {
    const testData = {
      Dates: 'invalid date',
    }
    const expectedErrors = [
      'Dates.daterange.from.presence.REQUIRED',
      'Dates.daterange.to.presence.REQUIRED',
    ]
    expect(validateModel(testData, foreignBusinessPolitical))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Country must have a valid value', () => {
    const testData = {
      Country: { value: 'test' },
    }
    const expectedErrors = ['Country.country.INVALID_COUNTRY']
    expect(validateModel(testData, foreignBusinessPolitical))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Reason must have a value', () => {
    const testData = {
      Reason: { values: 'test' },
    }
    const expectedErrors = ['Reason.hasValue.MISSING_VALUE']
    expect(validateModel(testData, foreignBusinessPolitical))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Eligibility must have a value', () => {
    const testData = {
      Eligibility: { values: 'test' },
    }
    const expectedErrors = ['Eligibility.hasValue.MISSING_VALUE']
    expect(validateModel(testData, foreignBusinessPolitical))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a valid foreign business contact', () => {
    const testData = {
      Position: { value: 'Some office' },
      Dates: {
        from: { year: 2000, month: 8, day: 2 },
        to: { year: 2002, month: 8, day: 5 },
      },
      Country: { value: 'Germany' },
      Reason: { value: 'I won the vote' },
      Eligibility: { value: 'None' },
    }
    expect(validateModel(testData, foreignBusinessPolitical)).toEqual(true)
  })
})
