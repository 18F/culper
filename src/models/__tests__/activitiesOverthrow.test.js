import { validateModel } from 'models/validate'
import activitiesOverthrow from '../activitiesOverthrow'

describe('The activitiesOverthrow model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'Dates.required',
      'Reasons.required',
    ]

    expect(validateModel(testData, activitiesOverthrow))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Dates must be a valid date range', () => {
    const testData = {
      Dates: 12345,
    }
    const expectedErrors = ['Dates.daterange']

    expect(validateModel(testData, activitiesOverthrow))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Reasons must have a value', () => {
    const testData = {
      Reasons: 'test',
    }
    const expectedErrors = ['Reasons.hasValue']

    expect(validateModel(testData, activitiesOverthrow))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a valid activitiesOverthrow', () => {
    const testData = {
      Dates: {
        from: { month: 9, day: 10, year: 1990 },
        to: { month: 10, day: 12, year: 1995 },
      },
      Reasons: { value: 'Because' },
    }

    expect(validateModel(testData, activitiesOverthrow)).toEqual(true)
  })
})
