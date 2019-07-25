import { validateModel } from 'models/validate'
import alcoholNegativeImpact from '../alcoholNegativeImpact'

describe('The alcoholNegativeImpact model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'Occurred.presence.REQUIRED',
      'Circumstances.presence.REQUIRED',
      'NegativeImpact.presence.REQUIRED',
      'Used.presence.REQUIRED',
    ]

    expect(validateModel(testData, alcoholNegativeImpact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Occurred must be a valid month/year', () => {
    const testData = {
      Occurred: 'invalid',
    }
    const expectedErrors = [
      'Occurred.date.month.presence.REQUIRED',
      'Occurred.date.year.presence.REQUIRED',
    ]

    expect(validateModel(testData, alcoholNegativeImpact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Occurred must be after the Used from date', () => {
    const testData = {
      Occurred: { month: 1, year: 2013 },
      Used: {
        from: { month: 5, day: 10, year: 2015 },
        present: true,
      },
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
      'Circumstances.hasValue.MISSING_VALUE',
    ]

    expect(validateModel(testData, alcoholNegativeImpact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('NegativeImpact must have a value', () => {
    const testData = { NegativeImpact: 'testing' }
    const expectedErrors = [
      'NegativeImpact.hasValue.MISSING_VALUE',
    ]

    expect(validateModel(testData, alcoholNegativeImpact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Used must be a valid date range', () => {
    const testData = {
      Used: false,
    }
    const expectedErrors = [
      'Used.daterange.from.presence.REQUIRED',
      'Used.daterange.to.presence.REQUIRED',
    ]

    expect(validateModel(testData, alcoholNegativeImpact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a valid alcoholNegativeImpact', () => {
    const testData = {
      Occurred: { month: 5, year: 2011 },
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
