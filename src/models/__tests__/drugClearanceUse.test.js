import { validateModel } from 'models/validate'
import drugClearanceUse from '../drugClearanceUse'

describe('The drugClearanceUse model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'Description.required',
      'InvolvementDates.required',
      'EstimatedUse.required',
    ]

    expect(validateModel(testData, drugClearanceUse))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Description must have a value', () => {
    const testData = {
      Description: 'testing',
    }
    const expectedErrors = [
      'Description.hasValue',
    ]

    expect(validateModel(testData, drugClearanceUse))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('InvolvementDates must be a valid date range', () => {
    const testData = {
      InvolvementDates: { day: 5, month: 10 },
    }
    const expectedErrors = [
      'InvolvementDates.daterange',
    ]

    expect(validateModel(testData, drugClearanceUse))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('EstimatedUse must have a value', () => {
    const testData = {
      EstimatedUse: 'testing',
    }
    const expectedErrors = [
      'EstimatedUse.hasValue',
    ]

    expect(validateModel(testData, drugClearanceUse))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a valid drugClearanceUse', () => {
    const testData = {
      InvolvementDates: {
        from: { day: 2, month: 2, year: 1999 },
        to: { day: 5, month: 5, year: 2001 },
      },
      Description: { value: 'Testing' },
      EstimatedUse: { value: 'testing' },
    }

    expect(validateModel(testData, drugClearanceUse)).toEqual(true)
  })
})
