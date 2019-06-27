import { validateModel } from 'models/validate'
import alcoholNegativeImpact from '../alcoholNegativeImpact'

describe('The alcoholNegativeImpact model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'Occurred.required',
      'Circumstances.required',
      'NegativeImpact.required',
      'Used.required',
    ]

    expect(validateModel(testData, alcoholNegativeImpact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Occurred must be a valid month/year', () => {
    const testData = {
      Occurred: 'invalid',
    }
    const expectedErrors = [
      'Occurred.date',
    ]

    expect(validateModel(testData, alcoholNegativeImpact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Circumstances must have a value', () => {
    const testData = { Circumstances: 'testing' }
    const expectedErrors = [
      'Circumstances.hasValue',
    ]

    expect(validateModel(testData, alcoholNegativeImpact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('NegativeImpact must have a value', () => {
    const testData = { NegativeImpact: 'testing' }
    const expectedErrors = [
      'NegativeImpact.hasValue',
    ]

    expect(validateModel(testData, alcoholNegativeImpact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Used must be a valid date range', () => {
    const testData = {
      Used: false,
    }
    const expectedErrors = [
      'Used.daterange',
    ]

    expect(validateModel(testData, alcoholNegativeImpact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a valid alcoholNegativeImpact', () => {
    const testData = {
      Occurred: { month: 5, year: 2003 },
      Circumstances: { value: 'Testing' },
      NegativeImpact: { value: 'Something bad happened' },
      Used: {
        from: { month: 8, day: 20, year: 2010 },
        to: { month: 10, day: 23, year: 2012 },
      },
    }

    expect(validateModel(testData, alcoholNegativeImpact)).toEqual(true)
  })
})
