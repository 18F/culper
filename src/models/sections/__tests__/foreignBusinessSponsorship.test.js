import { validateModel } from 'models/validate'
import foreignBusinessSponsorship from 'models/sections/foreignBusinessSponsorship'

describe('The foreign business sponsorship section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'HasForeignSponsorship.presence.REQUIRED',
    ]

    expect(validateModel(testData, foreignBusinessSponsorship))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasForeignSponsorship must be a valid value', () => {
    const testData = {
      HasForeignSponsorship: { value: 'maybe' },
    }

    const expectedErrors = [
      'HasForeignSponsorship.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, foreignBusinessSponsorship))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if HasForeignSponsorship is "Yes', () => {
    it('List is required', () => {
      const testData = {
        HasForeignSponsorship: { value: 'Yes' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, foreignBusinessSponsorship))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        HasForeignSponsorship: { value: 'Yes' },
        List: ['items'],
      }

      const expectedErrors = [
        'List.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, foreignBusinessSponsorship))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if HasForeignSponsorship is "No', () => {
    it('List is not required', () => {
      const testData = {
        HasForeignSponsorship: { value: 'No' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, foreignBusinessSponsorship))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
