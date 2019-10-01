import { validateModel } from 'models/validate'
import relationshipsRelativesModel from 'models/sections/relationshipsRelatives'

describe('The relationships relatives section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'List.presence.REQUIRED',
    ]

    expect(validateModel(testData, relationshipsRelativesModel))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('List must be a valid accordion', () => {
    const testData = {
      List: [{ Name: 'test' }],
    }

    const expectedErrors = [
      'List.accordion.MISSING_ITEMS',
    ]

    expect(validateModel(testData, relationshipsRelativesModel))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('List must have the required items', () => {
    const testData = {
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              Name: { first: 'Relative', noMiddleName: true, last: 'Person' },
              Relation: { value: 'Father-in-law' },
              Birthdate: { year: 1960, month: 2, day: 10 },
              Citizenship: { value: ['Canada', 'United States'] },
              Birthplace: {
                city: 'New York',
                state: 'NY',
                country: 'United States',
              },
              Address: {
                street: '123 Street',
                city: 'New York',
                state: 'NY',
                zipcode: '10001',
                country: 'United States',
              },
              AlternateAddress: {
                HasDifferentAddress: { value: 'No' },
              },
              IsDeceased: { value: 'No' },
            },
          },
        ],
      },
    }

    const expectedErrors = [
      'List.containsRequiredItems.REQUIREMENT_NOT_MET',
    ]

    expect(validateModel(testData, relationshipsRelativesModel))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if maritalStatus is Married or Separated', () => {
    it('List must have the required items', () => {
      const testData = {
        List: {
          branch: { value: 'No' },
          items: [
            {
              Item: {
                Name: { first: 'Relative', noMiddleName: true, last: 'Person' },
                Relation: { value: 'Father' },
                Birthdate: { year: 1960, month: 2, day: 10 },
                Citizenship: { value: ['Canada', 'United States'] },
                Birthplace: {
                  city: 'New York',
                  state: 'NY',
                  country: 'United States',
                },
                Address: {
                  street: '123 Street',
                  city: 'New York',
                  state: 'NY',
                  zipcode: '10001',
                  country: 'United States',
                },
                AlternateAddress: {
                  HasDifferentAddress: { value: 'No' },
                },
                IsDeceased: { value: 'No' },
                Aliases: { items: [{ Item: { Has: { value: 'No' } } }] },
              },
            },
            {
              Item: {
                Name: { first: 'Relative', noMiddleName: true, last: 'Person' },
                Relation: { value: 'Mother' },
                Birthdate: { year: 1960, month: 2, day: 10 },
                Citizenship: { value: ['Canada', 'United States'] },
                Birthplace: {
                  city: 'New York',
                  state: 'NY',
                  country: 'United States',
                },
                Address: {
                  street: '123 Street',
                  city: 'New York',
                  state: 'NY',
                  zipcode: '10001',
                  country: 'United States',
                },
                AlternateAddress: {
                  HasDifferentAddress: { value: 'No' },
                },
                IsDeceased: { value: 'No' },
                Aliases: { items: [{ Item: { Has: { value: 'No' } } }] },
                MaidenSameAsListed: { value: 'Yes' },
              },
            },
          ],
        },
      }

      const expectedErrors = [
        'List.containsRequiredItems.REQUIREMENT_NOT_MET',
      ]

      expect(validateModel(testData, relationshipsRelativesModel, { maritalStatus: 'Married' }))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
