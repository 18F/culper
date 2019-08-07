import { validateModel } from 'models/validate'
import packageComments from 'models/sections/packageComments'

describe('The package comments section', () => {
  describe('HasComments', () => {
    it('is required', () => {
      const testData = {}
      const expectedErrors = ['HasComments.required']

      expect(validateModel(testData, packageComments))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('requires a valid value', () => {
      const testData = {
        HasComments: { value: 'Invalid' },
      }
      const expectedErrors = ['HasComments.hasValue']

      expect(validateModel(testData, packageComments))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('validates with a valid value', () => {
      const testData = {
        HasComments: { value: 'No' },
      }

      expect(validateModel(testData, packageComments))
        .toEqual(true)
    })
  })

  describe('Comments', () => {
    describe('HasComments is Yes', () => {
      it('requires a comment', () => {
        const testData = {
          HasComments: { value: 'Yes' },
        }
        const expectedErrors = ['Comments.required']

        expect(validateModel(testData, packageComments))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('validates with a comment', () => {
        const testData = {
          HasComments: { value: 'Yes' },
          Comments: { value: 'Test' },
        }

        expect(validateModel(testData, packageComments))
          .toEqual(true)
      })
    })
  })
})
