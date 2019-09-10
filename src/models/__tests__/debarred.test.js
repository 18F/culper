import { validateModel } from 'models/validate'
import debarred from '../debarred'

describe('The debarred model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'Agency.presence.REQUIRED',
      'Date.presence.REQUIRED',
      'Explanation.presence.REQUIRED',
    ]

    expect(validateModel(testData, debarred))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Agency must have a value', () => {
    const testData = {
      Agency: 'test agency',
    }
    const expectedErrors = ['Agency.hasValue.MISSING_VALUE']

    expect(validateModel(testData, debarred))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Date must be a valid date', () => {
    const testData = {
      Date: 12345,
    }
    const expectedErrors = [
      'Date.date.day.presence.REQUIRED',
      'Date.date.month.presence.REQUIRED',
      'Date.date.year.presence.REQUIRED',
    ]

    expect(validateModel(testData, debarred))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Date cannot be before applicant birthdate', () => {
    const applicantBirthdate = { month: 1, day: 2, year: 1980 }
    const testData = {
      Date: { month: 1, year: 1970, day: 2 },
    }

    const expectedErrors = [
      'Date.date.date.datetime.DATE_TOO_EARLY',
    ]

    expect(validateModel(testData, debarred, {
      applicantBirthdate,
    }))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Date cannot be in the future', () => {
    const testData = {
      Date: { month: 1, year: 2050, day: 2 },
    }

    const expectedErrors = [
      'Date.date.date.datetime.DATE_TOO_LATE',
    ]

    expect(validateModel(testData, debarred))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Explanation must have a value', () => {
    const testData = {
      Explanation: 'test',
    }
    const expectedErrors = ['Explanation.hasValue.MISSING_VALUE']

    expect(validateModel(testData, debarred))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a valid debarred', () => {
    const testData = {
      Agency: { value: 'Test Agency' },
      Date: { month: 9, day: 10, year: 1990 },
      Explanation: { value: 'Something something' },
    }

    expect(validateModel(testData, debarred)).toEqual(true)
  })
})
