import { validateModel } from 'models/validate'
import foreignSupport from '../foreignSupport'

describe('The foreignSupport model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'Name.required',
      'Address.required',
      'Relationship.required',
      'Amount.required',
      'Frequency.required',
      'Citizenship.required',
    ]
    expect(validateModel(testData, foreignSupport))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Name must be a valid name', () => {
    const testData = {
      Name: 'My name',
    }
    const expectedErrors = ['Name.model']
    expect(validateModel(testData, foreignSupport))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Address must be a valid location', () => {
    const testData = {
      Address: 'invalid date',
    }
    const expectedErrors = ['Address.location']
    expect(validateModel(testData, foreignSupport))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Relationship must have a value', () => {
    const testData = {
      Relationship: { value: '' },
    }
    const expectedErrors = ['Relationship.hasValue']
    expect(validateModel(testData, foreignSupport))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Amount must have a value', () => {
    const testData = {
      Amount: 500,
    }
    const expectedErrors = ['Amount.hasValue']
    expect(validateModel(testData, foreignSupport))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Frequency must have a value', () => {
    const testData = {
      Frequency: { value: '' },
    }
    const expectedErrors = ['Frequency.hasValue']
    expect(validateModel(testData, foreignSupport))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Citizenship must have at least one value', () => {
    const testData = {
      Citizenship: { value: [] },
    }
    const expectedErrors = ['Citizenship.hasValue']
    expect(validateModel(testData, foreignSupport))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a valid foreign support', () => {
    const testData = {
      Name: { first: 'Person', middle: 'Foreign', last: 'Contact' },
      Address: {
        street: '50 Main St',
        city: 'London',
        country: { value: 'United Kingdom' },
      },
      Relationship: { value: 'Personal' },
      Amount: { value: '500' },
      Frequency: { value: 'Daily' },
      Citizenship: { value: ['test'] },
    }

    expect(validateModel(testData, foreignSupport)).toEqual(true)
  })
})
