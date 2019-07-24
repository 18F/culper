import { validateModel } from 'models/validate'
import foreignRealEstateInterest from '../foreignRealEstateInterest'

describe('The foreignRealEstateInterest model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'InterestTypes.required',
      'RealEstateType.required',
      'Address.required',
      'Acquired.required',
      'HowAcquired.required',
      'Cost.required',
      'Sold.required',
      'CoOwners.required',
    ]

    expect(validateModel(testData, foreignRealEstateInterest))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('InterestTypes must have at least one value', () => {
    const testData = {
      InterestTypes: { values: [] },
    }
    const expectedErrors = ['InterestTypes.array']
    expect(validateModel(testData, foreignRealEstateInterest))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('RealEstateType must have a value', () => {
    const testData = {
      RealEstateType: { value: false },
    }
    const expectedErrors = ['RealEstateType.hasValue']
    expect(validateModel(testData, foreignRealEstateInterest))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Address must be a valid address', () => {
    const testData = {
      Address: { street: '1 St', country: null },
    }
    const expectedErrors = ['Address.location']
    expect(validateModel(testData, foreignRealEstateInterest))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Acquired must be a valid month/year', () => {
    const testData = {
      Acquired: { month: 15, year: 9 },
    }
    const expectedErrors = ['Acquired.date']
    expect(validateModel(testData, foreignRealEstateInterest))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HowAcquired must have a value', () => {
    const testData = {
      HowAcquired: { value: false },
    }
    const expectedErrors = ['HowAcquired.hasValue']
    expect(validateModel(testData, foreignRealEstateInterest))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Cost must have a value', () => {
    const testData = {
      Cost: { value: false },
    }
    const expectedErrors = ['Cost.hasValue']
    expect(validateModel(testData, foreignRealEstateInterest))
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
    expect(validateModel(testData, foreignRealEstateInterest))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Sold must be a valid month/year', () => {
    const testData = {
      Sold: { day: 2, month: 10 },
    }
    const expectedErrors = ['Sold.date']
    expect(validateModel(testData, foreignRealEstateInterest))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if SoldNotApplicable', () => {
    it('Sold is not required', () => {
      const testData = {
        SoldNotApplicable: { applicable: false },
      }
      const expectedErrors = ['Sold.required']
      expect(validateModel(testData, foreignRealEstateInterest))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid foreign real estate interest', () => {
      const testData = {
        InterestTypes: { values: ['One', 'Two'] },
        RealEstateType: { value: 'Something' },
        Address: { street: '123 Test St', city: 'London', country: 'United Kingdom' },
        Acquired: { day: 10, month: 2, year: '2002' },
        HowAcquired: { value: 'I bought it' },
        Cost: { value: 2500 },
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

      expect(validateModel(testData, foreignRealEstateInterest)).toEqual(true)
    })
  })

  it('passes a valid foreign real estate interest', () => {
    const testData = {
      InterestTypes: { values: ['One', 'Two'] },
      RealEstateType: { value: 'Something' },
      Address: { street: '123 Test St', city: 'London', country: { value: 'United Kingdom' } },
      Acquired: { day: 2, month: 2, year: '2002' },
      HowAcquired: { value: 'I bought it' },
      Cost: { value: 2500 },
      Sold: { day: 9, month: '10', year: '2010' },
      CoOwners: {
        List: {
          items: [
            { Item: { Has: { value: 'No' } } },
          ],
        },
      },
    }

    expect(validateModel(testData, foreignRealEstateInterest)).toEqual(true)
  })
})
