import { validateModel } from 'models/validate'
import relationshipsPeopleModel from 'models/sections/relationshipsPeople'

describe('The relationships people section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'List.presence.REQUIRED',
    ]

    expect(validateModel(testData, relationshipsPeopleModel))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('List must be a valid accordion', () => {
    const testData = {
      List: [{ Name: 'test' }],
    }

    const expectedErrors = [
      'List.accordion.MISSING_ITEMS',
    ]

    expect(validateModel(testData, relationshipsPeopleModel))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('List must have the minimum number of people', () => {
    const testData = {
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              Name: {
                first: 'Someone', middle: 'I', middleInitialOnly: true, last: 'Know',
              },
              Dates: {
                from: { year: 2010, month: 7, day: 12 },
                present: true,
              },
              RankNotApplicable: { applicable: false },
              Relationship: {
                values: ['Friend', 'Other'],
              },
              RelationshipOther: { value: 'Something else' },
              MobileTelephone: { number: '1234567890', type: 'Domestic', timeOfDay: 'Both' },
              OtherTelephone: { noNumber: true },
              Email: { value: 'friend@gmail.com' },
              Address: {
                street: '9 Friend St.',
                street2: 'Apt 1',
                city: 'New york',
                state: 'NY',
                country: { value: 'United States' },
                zipcode: '10011',
              },
            },
          },
          {
            Item: {
              Name: {
                first: 'Someone', middle: 'I', middleInitialOnly: true, last: 'Know',
              },
              Dates: {
                from: { year: 2010, month: 7, day: 12 },
                present: true,
              },
              RankNotApplicable: { applicable: false },
              Relationship: {
                values: ['Friend', 'Other'],
              },
              RelationshipOther: { value: 'Something else' },
              MobileTelephone: { number: '1234567890', type: 'Domestic', timeOfDay: 'Both' },
              OtherTelephone: { noNumber: true },
              Email: { value: 'friend@gmail.com' },
              Address: {
                street: '9 Friend St.',
                street2: 'Apt 1',
                city: 'New york',
                state: 'NY',
                country: { value: 'United States' },
                zipcode: '10011',
              },
            },
          },
        ],
      },
    }

    const expectedErrors = [
      'List.accordion.items.length.LENGTH_TOO_SHORT',
    ]

    expect(validateModel(testData, relationshipsPeopleModel))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('List must cover the required duration', () => {
    const testData = {
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              Name: {
                first: 'Someone', middle: 'I', middleInitialOnly: true, last: 'Know',
              },
              Dates: {
                from: { year: 2010, month: 7, day: 12 },
                to: { year: 2012, month: 7, day: 12 },
              },
              RankNotApplicable: { applicable: false },
              Relationship: {
                values: ['Friend', 'Other'],
              },
              RelationshipOther: { value: 'Something else' },
              MobileTelephone: { number: '1234567890', type: 'Domestic', timeOfDay: 'Both' },
              OtherTelephone: { noNumber: true },
              Email: { value: 'friend@gmail.com' },
              Address: {
                street: '9 Friend St.',
                street2: 'Apt 1',
                city: 'New york',
                state: 'NY',
                country: { value: 'United States' },
                zipcode: '10011',
              },
            },
          },
          {
            Item: {
              Name: {
                first: 'Someone', middle: 'I', middleInitialOnly: true, last: 'Know',
              },
              Dates: {
                from: { year: 2012, month: 7, day: 12 },
                to: { year: 2013, month: 7, day: 12 },
              },
              RankNotApplicable: { applicable: false },
              Relationship: {
                values: ['Friend', 'Other'],
              },
              RelationshipOther: { value: 'Something else' },
              MobileTelephone: { number: '1234567890', type: 'Domestic', timeOfDay: 'Both' },
              OtherTelephone: { noNumber: true },
              Email: { value: 'friend@gmail.com' },
              Address: {
                street: '9 Friend St.',
                street2: 'Apt 1',
                city: 'New york',
                state: 'NY',
                country: { value: 'United States' },
                zipcode: '10011',
              },
            },
          },
          {
            Item: {
              Name: {
                first: 'Someone', middle: 'I', middleInitialOnly: true, last: 'Know',
              },
              Dates: {
                from: { year: 2019, month: 7, day: 12 },
                present: true,
              },
              RankNotApplicable: { applicable: false },
              Relationship: {
                values: ['Friend', 'Other'],
              },
              RelationshipOther: { value: 'Something else' },
              MobileTelephone: { number: '1234567890', type: 'Domestic', timeOfDay: 'Both' },
              OtherTelephone: { noNumber: true },
              Email: { value: 'friend@gmail.com' },
              Address: {
                street: '9 Friend St.',
                street2: 'Apt 1',
                city: 'New york',
                state: 'NY',
                country: { value: 'United States' },
                zipcode: '10011',
              },
            },
          },
        ],
      },
    }

    const expectedErrors = [
      'List.durationCoverage.INCOMPLETE_DURATION',
    ]

    expect(validateModel(testData, relationshipsPeopleModel))
      .toEqual(expect.arrayContaining(expectedErrors))
  })
})
