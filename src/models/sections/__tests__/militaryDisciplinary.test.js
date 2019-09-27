import { validateModel } from 'models/validate'
import militaryDisciplinary from 'models/sections/militaryDisciplinary'

describe('The military disciplinary section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'HasDisciplinary.presence.REQUIRED',
    ]

    expect(validateModel(testData, militaryDisciplinary))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasDisciplinary must be a valid value', () => {
    const testData = {
      HasDisciplinary: { value: 'maybe' },
    }

    const expectedErrors = [
      'HasDisciplinary.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, militaryDisciplinary))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if HasDisciplinary is "Yes', () => {
    it('List is required', () => {
      const testData = {
        HasDisciplinary: { value: 'Yes' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, militaryDisciplinary))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        HasDisciplinary: { value: 'Yes' },
        List: ['items'],
      }

      const expectedErrors = [
        'List.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, militaryDisciplinary))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if HasDisciplinary is "No', () => {
    it('List is not required', () => {
      const testData = {
        HasDisciplinary: { value: 'No' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, militaryDisciplinary))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
