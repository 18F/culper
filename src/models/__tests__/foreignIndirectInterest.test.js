import { validateModel } from 'models/validate'
import foreignIndirectInterest from '../foreignIndirectInterest'

describe('The foreignIndirectInterest model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'InterestTypes.presence.REQUIRED',
      'InterestType.presence.REQUIRED',
      'Firstname.presence.REQUIRED',
      'Lastname.presence.REQUIRED',
      'Relationship.presence.REQUIRED',
      'Acquired.presence.REQUIRED',
      'HowAcquired.presence.REQUIRED',
      'Cost.presence.REQUIRED',
      'Value.presence.REQUIRED',
      'Sold.presence.REQUIRED',
      'CoOwners.presence.REQUIRED',
      'Explanation.presence.REQUIRED',
    ]

    expect(validateModel(testData, foreignIndirectInterest))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('InterestTypes must have at least one value', () => {
    const testData = {
      InterestTypes: { values: [] },
    }
    const expectedErrors = ['InterestTypes.array.array.length.LENGTH_TOO_SHORT']
    expect(validateModel(testData, foreignIndirectInterest))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('InterestType must have a value', () => {
    const testData = {
      InterestType: { value: false },
    }
    const expectedErrors = ['InterestType.hasValue.MISSING_VALUE']
    expect(validateModel(testData, foreignIndirectInterest))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Firstname must have a valid value', () => {
    const testData = {
      Firstname: { value: '!!invalid' },
    }
    const expectedErrors = ['Firstname.hasValue.MISSING_VALUE']
    expect(validateModel(testData, foreignIndirectInterest))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Lastname must have a valid value', () => {
    const testData = {
      Lastname: { value: 'myname12345' },
    }
    const expectedErrors = ['Lastname.hasValue.MISSING_VALUE']
    expect(validateModel(testData, foreignIndirectInterest))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Relationship must have a value', () => {
    const testData = {
      Relationship: { value: false },
    }
    const expectedErrors = ['Relationship.hasValue.MISSING_VALUE']
    expect(validateModel(testData, foreignIndirectInterest))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Acquired must be a valid month/year', () => {
    const testData = {
      Acquired: { month: 15, year: 9 },
    }
    const expectedErrors = ['Acquired.date.date.datetime.INVALID_DATE']
    expect(validateModel(testData, foreignIndirectInterest))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Acquired cannot be in the future', () => {
    const testData = {
      Acquired: { day: 3, month: 12, year: 2050 },
    }
    const expectedErrors = ['Acquired.date']
    expect(validateModel(testData, foreignIndirectInterest))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HowAcquired must have a value', () => {
    const testData = {
      HowAcquired: { value: false },
    }
    const expectedErrors = ['HowAcquired.hasValue.MISSING_VALUE']
    expect(validateModel(testData, foreignIndirectInterest))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Cost must have a value', () => {
    const testData = {
      Cost: { value: false },
    }
    const expectedErrors = ['Cost.hasValue.MISSING_VALUE']
    expect(validateModel(testData, foreignIndirectInterest))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Value must have a value', () => {
    const testData = {
      Value: { value: false },
    }
    const expectedErrors = ['Value.hasValue.MISSING_VALUE']
    expect(validateModel(testData, foreignIndirectInterest))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('CoOwners must be valid', () => {
    const testData = {
      CoOwners: {
        List: {
          items: [
            {
              Item: {
                Has: { value: 'Yes' },
              },
            },
          ],
        },
      },
    }

    const expectedErrors = ['CoOwners.model.List.branchCollection.INCOMPLETE_COLLECTION']
    expect(validateModel(testData, foreignIndirectInterest))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Sold must be a valid month/year', () => {
    const testData = {
      Sold: { day: 2, month: 10 },
    }
    const expectedErrors = ['Sold.date.year.presence.REQUIRED']
    expect(validateModel(testData, foreignIndirectInterest))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Sold must be after Acquired', () => {
    const testData = {
      Acquired: { day: 2, month: 1, year: 2015 },
      Sold: { day: 2, month: 10, year: 1990 },
    }
    const expectedErrors = ['Sold.date']
    expect(validateModel(testData, foreignIndirectInterest))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Sold can be in the future', () => {
    const testData = {
      Acquired: { day: 2, month: 1, year: 2015 },
      Sold: { day: 2, month: 10, year: 2050 },
    }
    const expectedErrors = ['Sold.date']
    expect(validateModel(testData, foreignIndirectInterest))
      .not.toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Explanation must have a value', () => {
    const testData = {
      Explanation: { value: false },
    }
    const expectedErrors = ['Explanation.hasValue.MISSING_VALUE']
    expect(validateModel(testData, foreignIndirectInterest))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if SoldNotApplicable', () => {
    it('Sold is not required', () => {
      const testData = {
        SoldNotApplicable: { applicable: false },
      }
      const expectedErrors = ['Sold.presence.REQUIRED']
      expect(validateModel(testData, foreignIndirectInterest))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Explanation is not required', () => {
      const testData = {
        SoldNotApplicable: { applicable: false },
      }
      const expectedErrors = ['Explanation.presence.REQUIRED']
      expect(validateModel(testData, foreignIndirectInterest))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid foreign indirect interest', () => {
      const testData = {
        InterestTypes: { values: ['One', 'Two'] },
        InterestType: { value: 'Something' },
        Firstname: { value: 'first' },
        Lastname: { value: 'last' },
        Relationship: { value: 'test' },
        Acquired: { day: 9, month: 2, year: '2002' },
        HowAcquired: { value: 'I bought it' },
        Cost: { value: 2500 },
        Value: { value: '12000' },
        SoldNotApplicable: { applicable: false },
        CoOwners: {
          List: {
            items: [
              {
                Item: {
                  Has: { value: 'Yes' },
                  Name: { first: 'my', middle: 'full', last: 'name' },
                  Address: {
                    street: '123 Coowner St',
                    city: 'London',
                    country: 'United Kingdom',
                  },
                  Countries: { value: ['United States', 'Canada'] },
                  RelationshipNature: { value: 'Some test thing' },
                },
              },
              { Item: { Has: { value: 'No' } } },
            ],
          },
        },
      }

      expect(validateModel(testData, foreignIndirectInterest)).toEqual(true)
    })
  })

  it('passes a valid foreign indirect interest', () => {
    const testData = {
      InterestTypes: { values: ['One', 'Two'] },
      InterestType: { value: 'Something' },
      Firstname: { value: 'first' },
      Lastname: { value: 'last' },
      Relationship: { value: 'test' },
      Acquired: { day: 9, month: 2, year: '2002' },
      HowAcquired: { value: 'I bought it' },
      Cost: { value: 2500 },
      Value: { value: '12000' },
      Sold: { day: 2, month: '10', year: '2010' },
      Explanation: { value: 'I sold it' },
      CoOwners: {
        List: {
          items: [
            { Item: { Has: { value: 'No' } } },
          ],
        },
      },
    }

    expect(validateModel(testData, foreignIndirectInterest)).toEqual(true)
  })
})
