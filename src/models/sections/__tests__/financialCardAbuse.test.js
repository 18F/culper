import { validateModel } from 'models/validate'
import financialCardAbuse from 'models/sections/financialCardAbuse'

describe('The financial card abuse section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'HasCardAbuse.presence.REQUIRED',
    ]

    expect(validateModel(testData, financialCardAbuse))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasCardAbuse must be a valid value', () => {
    const testData = {
      HasCardAbuse: { value: 'maybe' },
    }

    const expectedErrors = [
      'HasCardAbuse.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, financialCardAbuse))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if HasCardAbuse is "Yes', () => {
    it('List is required', () => {
      const testData = {
        HasCardAbuse: { value: 'Yes' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, financialCardAbuse))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        HasCardAbuse: { value: 'Yes' },
        List: ['items'],
      }

      const expectedErrors = [
        'List.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, financialCardAbuse))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if HasCardAbuse is "No', () => {
    it('List is not required', () => {
      const testData = {
        HasCardAbuse: { value: 'No' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, financialCardAbuse))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
