import { validateModel } from 'models/validate'
import hospitalization from 'models/sections/hospitalization'

describe('The hospitalization section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'Hospitalized.presence.REQUIRED',
    ]

    expect(validateModel(testData, hospitalization))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Hospitalized must be a valid value', () => {
    const testData = {
      Hospitalized: { value: 'maybe' },
    }

    const expectedErrors = [
      'Hospitalized.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, hospitalization))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if Hospitalized is "Yes', () => {
    it('List is required', () => {
      const testData = {
        Hospitalized: { value: 'Yes' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, hospitalization))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('List must be a valid accordion', () => {
      const testData = {
        Hospitalized: { value: 'Yes' },
        List: ['items'],
      }

      const expectedErrors = [
        'List.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, hospitalization))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if Hospitalized is "No', () => {
    it('List is not required', () => {
      const testData = {
        Hospitalized: { value: 'No' },
      }

      const expectedErrors = [
        'List.presence.REQUIRED',
      ]

      expect(validateModel(testData, hospitalization))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
