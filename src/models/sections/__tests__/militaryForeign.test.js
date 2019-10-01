import { validateModel } from 'models/validate'
import militaryForeign from 'models/sections/militaryForeign'

describe('The military foreign section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'List.presence.REQUIRED',
    ]

    expect(validateModel(testData, militaryForeign))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('List must be a valid branch collection', () => {
    const testData = {
      List: {
        items: [
          { Item: { Has: 'Yes' } },
        ],
      },
    }

    const expectedErrors = [
      'List.branchCollection.INCOMPLETE_COLLECTION',
    ]

    expect(validateModel(testData, militaryForeign))
      .toEqual(expect.arrayContaining(expectedErrors))
  })
})
