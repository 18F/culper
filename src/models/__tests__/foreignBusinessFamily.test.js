import { validateModel } from 'models/validate'
import foreignBusinessFamily from '../foreignBusinessFamily'

describe('The foreignBusinessFamily model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'Name.presence.REQUIRED',
      'Agency.presence.REQUIRED',
      'Country.presence.REQUIRED',
      'Date.presence.REQUIRED',
      'Circumstances.presence.REQUIRED',
    ]
    expect(validateModel(testData, foreignBusinessFamily))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Name must be a valid name', () => {
    const testData = {
      Name: { last: 'invalid' },
    }
    const expectedErrors = [
      'Name.model.first.presence.REQUIRED',
      'Name.model.middle.presence.REQUIRED',
    ]
    expect(validateModel(testData, foreignBusinessFamily))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Agency must have a value', () => {
    const testData = {
      Agency: { values: 'test' },
    }
    const expectedErrors = ['Agency.hasValue.MISSING_VALUE']
    expect(validateModel(testData, foreignBusinessFamily))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Country must have a valid value', () => {
    const testData = {
      Country: { value: 'test' },
    }
    const expectedErrors = ['Country.country.INVALID_COUNTRY']
    expect(validateModel(testData, foreignBusinessFamily))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Date must be a valid date', () => {
    const testData = {
      Date: { year: 500, month: 3, day: 32 },
    }
    const expectedErrors = ['Date.date.date.datetime.INVALID_DATE']
    expect(validateModel(testData, foreignBusinessFamily))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Date must not be more than 200 years ago', () => {
    const testData = {
      Date: { day: 2, month: 12, year: 1800 },
    }
    const expectedErrors = ['Date.date']

    expect(validateModel(testData, foreignBusinessFamily))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Date must not be in the future', () => {
    const testData = {
      Date: { day: 2, month: 12, year: 3000 },
    }
    const expectedErrors = ['Date.date']

    expect(validateModel(testData, foreignBusinessFamily))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Circumstances must have a value', () => {
    const testData = {
      Circumstances: { values: 'test' },
    }
    const expectedErrors = ['Circumstances.hasValue.MISSING_VALUE']
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
