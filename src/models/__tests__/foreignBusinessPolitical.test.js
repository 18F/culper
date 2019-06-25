import { validateModel } from 'models/validate'
import foreignBusinessPolitical from '../foreignBusinessPolitical'

describe('The foreignBusinessPolitical model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'Position.required',
      'Dates.required',
      'Country.required',
      'Reason.required',
      'Eligibility.required',
    ]
    expect(validateModel(testData, foreignBusinessPolitical))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Position must have a value', () => {
    const testData = {
      Position: { values: 'test' },
    }
    const expectedErrors = ['Position.hasValue']
    expect(validateModel(testData, foreignBusinessPolitical))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Dates must be a valid date range', () => {
    const testData = {
      Dates: 'invalid date',
    }
    const expectedErrors = ['Dates.daterange']
    expect(validateModel(testData, foreignBusinessPolitical))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Country must have a value', () => {
    const testData = {
      Country: { values: 'test' },
    }
    const expectedErrors = ['Country.hasValue']
    expect(validateModel(testData, foreignBusinessPolitical))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Reason must have a value', () => {
    const testData = {
      Reason: { values: 'test' },
    }
    const expectedErrors = ['Reason.hasValue']
    expect(validateModel(testData, foreignBusinessPolitical))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Eligibility must have a value', () => {
    const testData = {
      Eligibility: { values: 'test' },
    }
    const expectedErrors = ['Eligibility.hasValue']
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
