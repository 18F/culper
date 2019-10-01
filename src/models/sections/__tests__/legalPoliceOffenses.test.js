import { validateModel } from 'models/validate'
import legalPoliceOffenses from 'models/sections/legalPoliceOffenses'

describe('The legalPoliceOffenses section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'List.presence.REQUIRED',
    ]

    expect(validateModel(testData, legalPoliceOffenses))
      .toEqual(expect.arrayContaining(expectedErrors))
  })
  
  describe('if Has is "Yes', () => {
    it('List is required', () => {
      const testData = {
        List: {
          items: [
            {
              Item: {
                Has: { value: 'Yes' },
                Date: { month: 1, year: 1970, day: 2 },
              },
            },
            { Item: { Has: { value: 'Yes' } } },
          ],
        },
      }

      const expectedErrors = [
        'List.branchCollection.INCOMPLETE_COLLECTION',
      ]

      expect(validateModel(testData, legalPoliceOffenses))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid branchCollection', () => {
      const testData = {

        List: ['items'],
      }

      const expectedErrors = [
        'List.branchCollection.MISSING_ITEMS',
      ]

      expect(validateModel(testData, legalPoliceOffenses))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if Has is "No', () => {
    it('List is not required', () => {
      const testData = {
        List: {
          items: [
            {
              Item: {
                Has: { value: 'No' },
              },
            }
          ],
        }
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, legalPoliceOffenses))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
