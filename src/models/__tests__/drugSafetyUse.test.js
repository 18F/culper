import { validateModel } from 'models/validate'
import drugSafetyUse from '../drugSafetyUse'

describe('The drugSafetyUse model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'Description.presence.REQUIRED',
      'InvolvementDates.presence.REQUIRED',
      'EstimatedUse.presence.REQUIRED',
    ]

    expect(validateModel(testData, drugSafetyUse))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Description must have a value', () => {
    const testData = {
      Description: 'testing',
    }
    const expectedErrors = [
      'Description.hasValue.MISSING_VALUE',
    ]

    expect(validateModel(testData, drugSafetyUse))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('InvolvementDates must be a valid date range', () => {
    const testData = {
      InvolvementDates: { day: 5, month: 10 },
    }
    const expectedErrors = [
      'InvolvementDates.daterange.from.presence.REQUIRED',
      'InvolvementDates.daterange.to.presence.REQUIRED',
    ]

    expect(validateModel(testData, drugSafetyUse))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('InvolvementDates from date cannot be before applicant birthdate', () => {
    const applicantBirthdate = { month: 1, day: 2, year: 1980 }
    const testData = {
      InvolvementDates: {
        from: { month: 1, year: 1970, day: 2 },
      },
    }
    const expectedErrors = [
      'InvolvementDates.daterange.from.date.date.datetime.DATE_TOO_EARLY',
    ]

    expect(validateModel(testData, drugSafetyUse, { applicantBirthdate }))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('InvolvementDates to date cannot be in the future', () => {
    const testData = {
      InvolvementDates: {
        to: { month: 1, year: 2050, day: 2 },
      },
    }
    const expectedErrors = [
      'InvolvementDates.daterange.to.date.date.datetime.DATE_TOO_LATE',
    ]

    expect(validateModel(testData, drugSafetyUse))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('EstimatedUse must have a value', () => {
    const testData = {
      EstimatedUse: 'testing',
    }
    const expectedErrors = [
      'EstimatedUse.hasValue.MISSING_VALUE',
    ]

    expect(validateModel(testData, drugSafetyUse))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a valid drugSafetyUse', () => {
    const testData = {
      InvolvementDates: {
        from: { day: 2, month: 2, year: 1999 },
        to: { day: 5, month: 5, year: 2001 },
      },
      Description: { value: 'Testing' },
      EstimatedUse: { value: 'testing' },
    }

    expect(validateModel(testData, drugSafetyUse)).toEqual(true)
  })
})
