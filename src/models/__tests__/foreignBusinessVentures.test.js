import { validateModel } from 'models/validate'
import foreignBusinessVentures from '../foreignBusinessVentures'

describe('The foreignBusinessVentures model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'Name.required',
      'Address.required',
      'Citizenship.required',
      'Description.required',
      'Relationship.required',
      'Dates.required',
      'Association.required',
      'Position.required',
      'Service.required',
      'Support.required',
      'Compensation.required',
    ]
    expect(validateModel(testData, foreignBusinessVentures))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Name must be a valid name', () => {
    const testData = {
      Name: { last: 'invalid' },
    }
    const expectedErrors = ['Name.model']
    expect(validateModel(testData, foreignBusinessVentures))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Address must be a valid address', () => {
    const testData = {
      Address: '15 Broadway Ave, New York NY 10002',
    }
    const expectedErrors = ['Address.location']
    expect(validateModel(testData, foreignBusinessVentures))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Citizenship must have at least one value', () => {
    const testData = {
      Citizenship: { value: [] },
    }
    const expectedErrors = ['Citizenship.hasValue']
    expect(validateModel(testData, foreignBusinessVentures))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Description must have a value', () => {
    const testData = {
      Description: { values: 'test' },
    }
    const expectedErrors = ['Description.hasValue']
    expect(validateModel(testData, foreignBusinessVentures))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Relationship must have a value', () => {
    const testData = {
      Relationship: { values: 'test' },
    }
    const expectedErrors = ['Relationship.hasValue']
    expect(validateModel(testData, foreignBusinessVentures))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Dates must be a valid date range', () => {
    const testData = {
      Dates: { year: 500, month: 3, day: 32 },
    }
    const expectedErrors = ['Dates.daterange']
    expect(validateModel(testData, foreignBusinessVentures))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Association must have a value', () => {
    const testData = {
      Association: { values: 'test' },
    }
    const expectedErrors = ['Association.hasValue']
    expect(validateModel(testData, foreignBusinessVentures))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Position must have a value', () => {
    const testData = {
      Position: { values: 'test' },
    }
    const expectedErrors = ['Position.hasValue']
    expect(validateModel(testData, foreignBusinessVentures))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Service must have a value', () => {
    const testData = {
      Service: { values: 'test' },
    }
    const expectedErrors = ['Service.hasValue']
    expect(validateModel(testData, foreignBusinessVentures))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Support must have a value', () => {
    const testData = {
      Support: { values: 'test' },
    }
    const expectedErrors = ['Support.hasValue']
    expect(validateModel(testData, foreignBusinessVentures))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Compensation must have a value', () => {
    const testData = {
      Compensation: { values: 'test' },
    }
    const expectedErrors = ['Compensation.hasValue']
    expect(validateModel(testData, foreignBusinessVentures))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a valid foreign business employment', () => {
    const testData = {
      Name: { first: 'Test', noMiddleName: true, last: 'Person' },
      Address: {
        street: '12 Test St',
        city: 'Paris',
        country: { value: 'France' },
      },
      Citizenship: { value: ['France'] },
      Description: { value: 'A test job' },
      Relationship: { value: 'Friends' },
      Dates: {
        from: { year: 2015, month: '05', day: '16' },
        present: true,
      },
      Association: { value: 'Test' },
      Position: { value: 'I wanted a job' },
      Service: { value: 'test' },
      Support: { value: '$500' },
      Compensation: { value: '$2000' },
    }
    expect(validateModel(testData, foreignBusinessVentures)).toEqual(true)
  })
})
