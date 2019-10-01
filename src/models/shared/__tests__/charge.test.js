import { validateModel } from 'models/validate'
import charge from '../charge'

describe('The charge model', () => {
  it('the ChargeType field is required', () => {
    const testData = {}
    const expectedErrors = ['ChargeType.presence.REQUIRED']

    expect(validateModel(testData, charge))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the ChargeType field must have a valid value', () => {
    const testData = {
      ChargeType: { value: 'Test' },
    }
    const expectedErrors = ['ChargeType.hasValue.value.inclusion.INCLUSION']

    expect(validateModel(testData, charge))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the CourtCharge field is required', () => {
    const testData = {}
    const expectedErrors = ['CourtCharge.presence.REQUIRED']

    expect(validateModel(testData, charge))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the CourtCharge field must have a value', () => {
    const testData = {
      CourtCharge: 'invalid',
    }
    const expectedErrors = ['CourtCharge.hasValue.MISSING_VALUE']

    expect(validateModel(testData, charge))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the CourtOutcome field is required', () => {
    const testData = {}
    const expectedErrors = ['CourtOutcome.presence.REQUIRED']

    expect(validateModel(testData, charge))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the CourtOutcome field must have a value', () => {
    const testData = {
      CourtOutcome: [],
    }
    const expectedErrors = ['CourtOutcome.hasValue.MISSING_VALUE']

    expect(validateModel(testData, charge))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the CourtDate field is required', () => {
    const testData = {}
    const expectedErrors = ['CourtDate.presence.REQUIRED']

    expect(validateModel(testData, charge))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the CourtDate field must be a valid date', () => {
    const testData = {
      CourtDate: { year: 3000, month: 13 },
    }
    const expectedErrors = ['CourtDate.date.date.datetime.INVALID_DATE']

    expect(validateModel(testData, charge))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('CourtDate cannot be before applicant birthdate', () => {
    const applicantBirthdate = { month: 1, day: 2, year: 1980 }
    const testData = {
      CourtDate: { month: 1, year: 1970, day: 2 },
    }

    const expectedErrors = [
      'CourtDate.date.date.datetime.DATE_TOO_EARLY',
    ]

    expect(validateModel(testData, charge, {
      applicantBirthdate,
    }))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('CourtDate cannot be in the future', () => {
    const testData = {
      CourtDate: { month: 1, year: 2050, day: 2 },
    }

    const expectedErrors = [
      'CourtDate.date.date.datetime.DATE_TOO_LATE',
    ]

    expect(validateModel(testData, charge))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a valid charge', () => {
    const testData = {
      ChargeType: { value: 'Misdemeanor' },
      CourtCharge: { value: 'Something' },
      CourtOutcome: { value: 'Testing' },
      CourtDate: { year: 2010, month: 11 },
    }

    expect(validateModel(testData, charge)).toEqual(true)
  })
})
