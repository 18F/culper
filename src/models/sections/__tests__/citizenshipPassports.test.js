import { validateModel } from 'models/validate'
import citizenshipPassports from 'models/sections/citizenshipPassports'

describe('The citizenship passports section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'Passports.presence.REQUIRED',
    ]

    expect(validateModel(testData, citizenshipPassports))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Passports must be a valid branch collection', () => {
    const testData = {
      Passports: {
        items: [
          { Item: { Has: 'Yes' } },
        ],
      },
    }

    const expectedErrors = [
      'Passports.branchCollection.INCOMPLETE_COLLECTION',
    ]

    expect(validateModel(testData, citizenshipPassports))
      .toEqual(expect.arrayContaining(expectedErrors))
  })
})
