import { validateModel } from 'models/validate'
import foreignBusinessVoting from 'models/sections/foreignBusinessVoting'

describe('The foreign business voting section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'HasForeignVoting.presence.REQUIRED',
    ]

    expect(validateModel(testData, foreignBusinessVoting))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasForeignVoting must be a valid value', () => {
    const testData = {
      HasForeignVoting: { value: 'maybe' },
    }

    const expectedErrors = [
      'HasForeignVoting.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, foreignBusinessVoting))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if HasForeignVoting is "Yes', () => {
    it('List is required', () => {
      const testData = {
        HasForeignVoting: { value: 'Yes' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, foreignBusinessVoting))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        HasForeignVoting: { value: 'Yes' },
        List: ['items'],
      }

      const expectedErrors = [
        'List.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, foreignBusinessVoting))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if HasForeignVoting is "No', () => {
    it('List is not required', () => {
      const testData = {
        HasForeignVoting: { value: 'No' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, foreignBusinessVoting))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
