import { validateModel } from 'models/validate'
import foreignBusinessFamily from '../foreignBusinessFamily'

describe('The foreignBusinessFamily model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'Name.required',
      'Agency.required',
      'Country.required',
      'Date.required',
      'Circumstances.required',
    ]
    expect(validateModel(testData, foreignBusinessFamily))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Name must be a valid name', () => {
    const testData = {
      Name: { last: 'invalid' },
    }
    const expectedErrors = ['Name.model']
    expect(validateModel(testData, foreignBusinessFamily))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Agency must have a value', () => {
    const testData = {
      Agency: { values: 'test' },
    }
    const expectedErrors = ['Agency.hasValue']
    expect(validateModel(testData, foreignBusinessFamily))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Country must have a valid value', () => {
    const testData = {
      Country: { value: 'test' },
    }
    const expectedErrors = ['Country.country']
    expect(validateModel(testData, foreignBusinessFamily))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Date must be a valid date', () => {
    const testData = {
      Date: { year: 500, month: 3, day: 32 },
    }
    const expectedErrors = ['Date.date']
    expect(validateModel(testData, foreignBusinessFamily))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Circumstances must have a value', () => {
    const testData = {
      Circumstances: { values: 'test' },
    }
    const expectedErrors = ['Circumstances.hasValue']
    expect(validateModel(testData, foreignBusinessFamily))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a valid foreign business family', () => {
    const testData = {
      Name: { first: 'Test', noMiddleName: true, last: 'Person' },
      Agency: { value: 'Some agency' },
      Country: { value: 'France' },
      Date: { year: 2015, month: '05', day: '16' },
      Circumstances: { value: 'Test circumstances' },
    }
    expect(validateModel(testData, foreignBusinessFamily)).toEqual(true)
  })
})
