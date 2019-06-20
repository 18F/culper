import { validateModel } from 'models/validate'
import foreignDirectInterest from '../foreignDirectInterest'

describe('The foreignDirectInterest model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'InterestTypes.required',
      'InterestType.required',
      'Acquired.required',
      'HowAcquired.required',
      'Cost.required',
      'Value.required',
      'Relinquished.required',
      'CoOwners.required',
      'Explanation.required',
    ]

    expect(validateModel(testData, foreignDirectInterest))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('InterestTypes must have at least one value', () => {
    const testData = {
      InterestTypes: { values: [] },
    }
    const expectedErrors = ['InterestTypes.array']
    expect(validateModel(testData, foreignDirectInterest))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('InterestType must have a value', () => {
    const testData = {
      InterestType: { value: false },
    }
    const expectedErrors = ['InterestType.hasValue']
    expect(validateModel(testData, foreignDirectInterest))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Acquired must be a valid month/year', () => {
    const testData = {
      Acquired: { month: 15, year: 9 },
    }
    const expectedErrors = ['Acquired.date']
    expect(validateModel(testData, foreignDirectInterest))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HowAcquired must have a value', () => {
    const testData = {
      HowAcquired: { value: false },
    }
    const expectedErrors = ['HowAcquired.hasValue']
    expect(validateModel(testData, foreignDirectInterest))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Cost must have a value', () => {
    const testData = {
      Cost: { value: false },
    }
    const expectedErrors = ['Cost.hasValue']
    expect(validateModel(testData, foreignDirectInterest))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Value must have a value', () => {
    const testData = {
      Value: { value: false },
    }
    const expectedErrors = ['Value.hasValue']
    expect(validateModel(testData, foreignDirectInterest))
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

    const expectedErrors = ['CoOwners.model']
    expect(validateModel(testData, foreignDirectInterest))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Relinquished must be a valid month/year', () => {
    const testData = {
      Relinquished: { day: 2, month: 10 },
    }
    const expectedErrors = ['Relinquished.date']
    expect(validateModel(testData, foreignDirectInterest))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Explanation must have a value', () => {
    const testData = {
      Explanation: { value: false },
    }
    const expectedErrors = ['Explanation.hasValue']
    expect(validateModel(testData, foreignDirectInterest))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if RelinquishedNotApplicable', () => {
    it('Relinquished is not required', () => {
      const testData = {
        RelinquishedNotApplicable: { applicable: false },
      }
      const expectedErrors = ['Relinquished.required']
      expect(validateModel(testData, foreignDirectInterest))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Explanation is not required', () => {
      const testData = {
        RelinquishedNotApplicable: { applicable: false },
      }
      const expectedErrors = ['Explanation.required']
      expect(validateModel(testData, foreignDirectInterest))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid foreign direct interest', () => {
      const testData = {
        InterestTypes: { values: ['One', 'Two'] },
        InterestType: { value: 'Something' },
        Acquired: { month: 2, year: '2002' },
        HowAcquired: { value: 'I bought it' },
        Cost: { value: 2500 },
        Value: { value: '12000' },
        RelinquishedNotApplicable: { applicable: false },
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

      expect(validateModel(testData, foreignDirectInterest)).toEqual(true)
    })
  })

  it('passes a valid foreign direct interest', () => {
    const testData = {
      InterestTypes: { values: ['One', 'Two'] },
      InterestType: { value: 'Something' },
      Acquired: { month: 2, year: '2002' },
      HowAcquired: { value: 'I bought it' },
      Cost: { value: 2500 },
      Value: { value: '12000' },
      Relinquished: { month: '10', year: '2010' },
      Explanation: { value: 'I sold it' },
      CoOwners: {
        List: {
          items: [
            { Item: { Has: { value: 'No' } } },
          ],
        },
      },
    }

    expect(validateModel(testData, foreignDirectInterest)).toEqual(true)
  })
})
