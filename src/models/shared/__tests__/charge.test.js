import { validateModel } from 'models/validate'
import charge from '../charge'

describe('The charge model', () => {
  it('the ChargeType field is required', () => {
    const testData = {}
    const expectedErrors = ['ChargeType.required']

    expect(validateModel(testData, charge))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the ChargeType field must have a valid value', () => {
    const testData = {
      ChargeType: { value: 'Test' },
    }
    const expectedErrors = ['ChargeType.hasValue']

    expect(validateModel(testData, charge))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the CourtCharge field is required', () => {
    const testData = {}
    const expectedErrors = ['CourtCharge.required']

    expect(validateModel(testData, charge))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the CourtCharge field must have a value', () => {
    const testData = {
      CourtCharge: 'invalid',
    }
    const expectedErrors = ['CourtCharge.hasValue']

    expect(validateModel(testData, charge))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the CourtOutcome field is required', () => {
    const testData = {}
    const expectedErrors = ['CourtOutcome.required']

    expect(validateModel(testData, charge))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the CourtOutcome field must have a value', () => {
    const testData = {
      CourtOutcome: [],
    }
    const expectedErrors = ['CourtOutcome.hasValue']

    expect(validateModel(testData, charge))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the CourtDate field is required', () => {
    const testData = {}
    const expectedErrors = ['CourtDate.required']

    expect(validateModel(testData, charge))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the CourtDate field must be a valid date', () => {
    const testData = {
      WasCharged: { value: 'Yes' },
      CourtDate: { year: 3000, month: 13 },
    }
    const expectedErrors = ['CourtDate.date']

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
