import { validateModel } from 'models/validate'
import foreignBusinessContact from '../foreignBusinessContact'

describe('The foreignBusinessContact model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'Name.required',
      'Location.required',
      'Date.required',
      'Governments.required',
      'Establishment.required',
      'Representatives.required',
      'Purpose.required',
      'SubsequentContacts.required',
    ]
    expect(validateModel(testData, foreignBusinessContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Name must be a valid name', () => {
    const testData = {
      Name: 'Persons Name',
    }
    const expectedErrors = ['Name.model']
    expect(validateModel(testData, foreignBusinessContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Location must be a valid location', () => {
    const testData = {
      Location: 'Place',
    }
    const expectedErrors = ['Location.location']
    expect(validateModel(testData, foreignBusinessContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Date must be a valid date', () => {
    const testData = {
      Date: 'invalid date',
    }
    const expectedErrors = ['Date.date']
    expect(validateModel(testData, foreignBusinessContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Governments must have at least one value', () => {
    const testData = {
      Governments: { value: [] },
    }
    const expectedErrors = ['Governments.country']
    expect(validateModel(testData, foreignBusinessContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Governments must have valid values', () => {
    const testData = {
      Governments: { value: ['United Kingdom', 'Germany', 'test'] },
    }
    const expectedErrors = ['Governments.country']
    expect(validateModel(testData, foreignBusinessContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Establishment must have a value', () => {
    const testData = {
      Establishment: { values: 'test' },
    }
    const expectedErrors = ['Establishment.hasValue']
    expect(validateModel(testData, foreignBusinessContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Representatives must have a value', () => {
    const testData = {
      Representatives: { values: 'test' },
    }
    const expectedErrors = ['Representatives.hasValue']
    expect(validateModel(testData, foreignBusinessContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Purpose must have a value', () => {
    const testData = {
      Purpose: { values: 'test' },
    }
    const expectedErrors = ['Purpose.hasValue']
    expect(validateModel(testData, foreignBusinessContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('SubsequentContacts must be a valid branch collection', () => {
    const testData = {
      SubsequentContacts: {
        items: [
          {
            Item: { Has: { value: 'Yes' }, Subsequent: '', Recent: true },
          },
          {
            Item: { Has: { value: 'No' } },
          },
        ],
      },
    }
    const expectedErrors = ['SubsequentContacts.branchCollection']
    expect(validateModel(testData, foreignBusinessContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a valid foreign business contact', () => {
    const testData = {
      Name: { first: 'My', middle: 'Foreign', last: 'Friend' },
      Location: { city: 'Paris', country: 'France' },
      Date: { year: 2010, month: 2, day: 4 },
      Governments: { value: ['France'] },
      Establishment: { value: 'Test' },
      Representatives: { value: 'Testing' },
      Purpose: { value: 'Because' },
      SubsequentContacts: {
        items: [
          {
            Item: {
              Has: { value: 'Yes' },
              Subsequent: { value: 'Friendship' },
              Recent: { year: 2015, month: 2, day: 10 },
              Future: { value: 'Hanging out' },
            },
          },
          {
            Item: { Has: { value: 'No' } },
          },
        ],
      },
    }
    expect(validateModel(testData, foreignBusinessContact)).toEqual(true)
  })
})
