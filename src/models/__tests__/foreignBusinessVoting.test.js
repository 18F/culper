import { validateModel } from 'models/validate'
import foreignBusinessVoting from '../foreignBusinessVoting'

describe('The foreignBusinessVoting model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'Date.presence.REQUIRED',
      'Country.presence.REQUIRED',
      'Reason.presence.REQUIRED',
      'Eligibility.presence.REQUIRED',
    ]
    expect(validateModel(testData, foreignBusinessVoting))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Date must be a valid date', () => {
    const testData = {
      Date: 'invalid date',
    }
    const expectedErrors = [
      'Date.date.day.presence.REQUIRED',
      'Date.date.month.presence.REQUIRED',
      'Date.date.year.presence.REQUIRED',
    ]
    expect(validateModel(testData, foreignBusinessVoting))
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

    expect(validateModel(testData, foreignBusinessVoting, {
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

    expect(validateModel(testData, foreignBusinessVoting))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Country must have a valid value', () => {
    const testData = {
      Country: { values: 'test' },
    }
    const expectedErrors = ['Country.country.INVALID_COUNTRY']
    expect(validateModel(testData, foreignBusinessVoting))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Reason must have a value', () => {
    const testData = {
      Reason: { values: 'test' },
    }
    const expectedErrors = ['Reason.hasValue.MISSING_VALUE']
    expect(validateModel(testData, foreignBusinessVoting))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Eligibility must have a value', () => {
    const testData = {
      Eligibility: { values: 'test' },
    }
    const expectedErrors = ['Eligibility.hasValue.MISSING_VALUE']
    expect(validateModel(testData, foreignBusinessVoting))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a valid foreign business voting', () => {
    const testData = {
      Date: { year: 2002, month: 8, day: 5 },
      Country: { value: 'Germany' },
      Reason: { value: 'I won the vote' },
      Eligibility: { value: 'None' },
    }
    expect(validateModel(testData, foreignBusinessVoting)).toEqual(true)
  })
})
