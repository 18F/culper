import { validateModel } from 'models/validate'
import terrorismAdvocate from '../terrorismAdvocate'

describe('The terrorismAdvocate model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'Dates.presence.REQUIRED',
      'Reasons.presence.REQUIRED',
    ]

    expect(validateModel(testData, terrorismAdvocate))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Dates must be a valid date range', () => {
    const testData = {
      Dates: 12345,
    }
    const expectedErrors = [
      'Dates.daterange.from.presence.REQUIRED',
      'Dates.daterange.to.presence.REQUIRED',
    ]

    expect(validateModel(testData, terrorismAdvocate))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('From date cannot be before applicant birthdate', () => {
    const applicantBirthdate = { month: 1, day: 2, year: 1980 }
    const testData = {
      Dates: {
        from: { month: 1, year: 1970, day: 2 },
      },
    }
    const expectedErrors = [
      'Dates.daterange.from.date.date.datetime.DATE_TOO_EARLY',
    ]

    expect(validateModel(testData, terrorismAdvocate, { applicantBirthdate }))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('To date cannot be in the future', () => {
    const testData = {
      Dates: {
        to: { month: 1, year: 2050, day: 2 },
      },
    }
    const expectedErrors = [
      'Dates.daterange.to.date.date.datetime.DATE_TOO_LATE',
    ]

    expect(validateModel(testData, terrorismAdvocate))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Reasons must have a value', () => {
    const testData = {
      Reasons: 'test',
    }
    const expectedErrors = ['Reasons.hasValue.MISSING_VALUE']

    expect(validateModel(testData, terrorismAdvocate))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a valid terrorismAdvocate', () => {
    const testData = {
      Dates: {
        from: { month: 9, day: 10, year: 1990 },
        to: { month: 10, day: 12, year: 1995 },
      },
      Reasons: { value: 'Because' },
    }

    expect(validateModel(testData, terrorismAdvocate)).toEqual(true)
  })
})
