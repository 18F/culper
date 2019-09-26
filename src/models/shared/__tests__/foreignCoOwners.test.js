import { validateModel } from 'models/validate'
import foreignCoOwnersModel from 'models/shared/foreignCoOwners'

describe('The foreign coowners model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'List.presence.REQUIRED',
    ]

    expect(validateModel(testData, foreignCoOwnersModel))
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

    expect(validateModel(testData, foreignCoOwnersModel))
      .toEqual(expect.arrayContaining(expectedErrors))
  })
})
