import { validateModel } from 'models/validate'
import foreignBusinessConferences from '../foreignBusinessConferences'

describe('The foreignBusinessConferences model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'Description.presence.REQUIRED',
      'Sponsor.presence.REQUIRED',
      'City.presence.REQUIRED',
      'Country.presence.REQUIRED',
      'Dates.presence.REQUIRED',
      'Purpose.presence.REQUIRED',
      'Contacts.presence.REQUIRED',
    ]
    expect(validateModel(testData, foreignBusinessConferences))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Description must have a value', () => {
    const testData = {
      Description: { values: 'test' },
    }
    const expectedErrors = ['Description.hasValue.MISSING_VALUE']
    expect(validateModel(testData, foreignBusinessConferences))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Sponsor must have a value', () => {
    const testData = {
      Sponsor: { values: 'test' },
    }
    const expectedErrors = ['Sponsor.hasValue.MISSING_VALUE']
    expect(validateModel(testData, foreignBusinessConferences))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('City must have a value', () => {
    const testData = {
      City: { values: 'test' },
    }
    const expectedErrors = ['City.hasValue.MISSING_VALUE']
    expect(validateModel(testData, foreignBusinessConferences))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Country must have a valid value', () => {
    const testData = {
      Country: { values: 'test' },
    }
    const expectedErrors = ['Country.country.INVALID_COUNTRY']
    expect(validateModel(testData, foreignBusinessConferences))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Dates must be a valid date range', () => {
    const testData = {
      Dates: { year: 500, month: 3, day: 32 },
    }
    const expectedErrors = [
      'Dates.daterange.from.presence.REQUIRED',
      'Dates.daterange.to.presence.REQUIRED',
    ]
    expect(validateModel(testData, foreignBusinessConferences))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Purpose must have a value', () => {
    const testData = {
      Purpose: { values: 'test' },
    }
    const expectedErrors = ['Purpose.hasValue.MISSING_VALUE']
    expect(validateModel(testData, foreignBusinessConferences))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Contacts must be a valid branch collection', () => {
    const testData = {
      Contacts: {
        List: {
          items: [
            {
              Item: { Has: { value: 'Yes' } },
            },
          ],
        },
      },
    }
    const expectedErrors = ['Contacts.model.List.branchCollection.INCOMPLETE_COLLECTION']
    expect(validateModel(testData, foreignBusinessConferences))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a valid foreign business conference', () => {
    const testData = {
      Description: { value: 'Some foreign conference' },
      Sponsor: { value: 'Test org' },
      City: { value: 'London' },
      Country: { value: 'United Kingdom' },
      Dates: {
        from: { year: 2002, month: 3, day: 4 },
        to: { year: 2002, month: 3, day: 7 },
      },
      Purpose: { value: 'Learning about things' },
      Contacts: {
        List: {
          items: [
            {
              Item: { Has: { value: 'Yes' }, Explanation: { value: 'I made a friend' } },
            },
            {
              Item: { Has: { value: 'No' } },
            },
          ],
        },
      },
    }
    expect(validateModel(testData, foreignBusinessConferences)).toEqual(true)
  })
})
