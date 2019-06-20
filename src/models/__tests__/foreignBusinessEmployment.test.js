import { validateModel } from 'models/validate'
import foreignBusinessEmployment from '../foreignBusinessEmployment'

describe('The foreignBusinessEmployment model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'Name.required',
      'Description.required',
      'Date.required',
      'Address.required',
      'Accepted.required',
      'Explanation.required',
    ]
    expect(validateModel(testData, foreignBusinessEmployment))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Name must be a valid name', () => {
    const testData = {
      Name: { last: 'invalid' },
    }
    const expectedErrors = ['Name.model']
    expect(validateModel(testData, foreignBusinessEmployment))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Description must have a value', () => {
    const testData = {
      Description: { values: 'test' },
    }
    const expectedErrors = ['Description.hasValue']
    expect(validateModel(testData, foreignBusinessEmployment))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Date must be a valid date', () => {
    const testData = {
      Date: { year: 500, month: 3, day: 32 },
    }
    const expectedErrors = ['Date.date']
    expect(validateModel(testData, foreignBusinessEmployment))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Address must be a valid address', () => {
    const testData = {
      Address: '15 Broadway Ave, New York NY 10002',
    }
    const expectedErrors = ['Address.location']
    expect(validateModel(testData, foreignBusinessEmployment))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Accepted must have a valid value', () => {
    const testData = {
      Accepted: { value: 'test' },
    }
    const expectedErrors = ['Accepted.hasValue']
    expect(validateModel(testData, foreignBusinessEmployment))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Explanation must have a value', () => {
    const testData = {
      Explanation: { values: 'test' },
    }
    const expectedErrors = ['Explanation.hasValue']
    expect(validateModel(testData, foreignBusinessEmployment))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a valid foreign business employment', () => {
    const testData = {
      Name: { first: 'Test', noMiddleName: true, last: 'Person' },
      Description: { value: 'A test job' },
      Date: { year: 2015, month: '05', day: '16' },
      Address: {
        city: 'Paris',
        country: { value: 'France' },
      },
      Accepted: { value: 'Yes' },
      Explanation: { value: 'I wanted a job' },
    }
    expect(validateModel(testData, foreignBusinessEmployment)).toEqual(true)
  })
})
