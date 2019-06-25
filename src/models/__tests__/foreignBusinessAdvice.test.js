import { validateModel } from 'models/validate'
import foreignBusinessAdvice from '../foreignBusinessAdvice'

describe('The foreignBusinessAdvice model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'Name.required',
      'Description.required',
      'Organization.required',
      'Country.required',
      'Dates.required',
    ]
    expect(validateModel(testData, foreignBusinessAdvice))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Name must be a valid name', () => {
    const testData = {
      Name: { last: 'invalid' },
    }
    const expectedErrors = ['Name.model']
    expect(validateModel(testData, foreignBusinessAdvice))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Description must have a value', () => {
    const testData = {
      Description: { values: 'test' },
    }
    const expectedErrors = ['Description.hasValue']
    expect(validateModel(testData, foreignBusinessAdvice))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Organization must have a value', () => {
    const testData = {
      Organization: { values: 'test' },
    }
    const expectedErrors = ['Organization.hasValue']
    expect(validateModel(testData, foreignBusinessAdvice))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Country must have a value', () => {
    const testData = {
      Country: { values: 'test' },
    }
    const expectedErrors = ['Country.hasValue']
    expect(validateModel(testData, foreignBusinessAdvice))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Dates must be a valid date range', () => {
    const testData = {
      Dates: {
        to: { year: 500, month: 3, day: 32 },
        from: { year: 2000, day: 12 },
        present: true,
      },
    }
    const expectedErrors = ['Dates.daterange']
    expect(validateModel(testData, foreignBusinessAdvice))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a valid foreign business advice', () => {
    const testData = {
      Name: { first: 'Test', noMiddleName: true, last: 'Person' },
      Description: { value: 'Some advice' },
      Organization: { value: 'Test org' },
      Country: { value: 'France' },
      Dates: {
        from: { year: 2015, month: '05', day: '16' },
        present: true,
      },
    }
    expect(validateModel(testData, foreignBusinessAdvice)).toEqual(true)
  })
})
