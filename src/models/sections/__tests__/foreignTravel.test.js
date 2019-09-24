import { validateModel } from 'models/validate'
import foreignTravel from 'models/sections/foreignTravel'

describe('The foreign travel section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'HasForeignTravelOutside.presence.REQUIRED',
    ]

    expect(validateModel(testData, foreignTravel))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasForeignTravelOutside must be a valid value', () => {
    const testData = {
      HasForeignTravelOutside: { value: 'maybe' },
    }

    const expectedErrors = [
      'HasForeignTravelOutside.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, foreignTravel))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if HasForeignTravelOutside is "Yes', () => {
    it('HasForeignTravelOfficial is required', () => {
      const testData = {
        HasForeignTravelOutside: { value: 'Yes' },
      }

      const expectedErrors = [
        'HasForeignTravelOfficial.presence.REQUIRED',
      ]

      expect(validateModel(testData, foreignTravel))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('HasForeignTravelOfficial must be a valid value', () => {
      const testData = {
        HasForeignTravelOutside: { value: 'Yes' },
        HasForeignTravelOfficial: { value: 'maybe' },
      }

      const expectedErrors = [
        'HasForeignTravelOfficial.hasValue.value.inclusion.INCLUSION',
      ]

      expect(validateModel(testData, foreignTravel))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    describe('if HasForeignTravelOfficial is "No', () => {
      it('List is required', () => {
        const testData = {
          HasForeignTravelOutside: { value: 'Yes' },
          HasForeignTravelOfficial: { value: 'No' },
        }

        const expectedErrors = [
          'List.presence.REQUIRED',
        ]

        expect(validateModel(testData, foreignTravel))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('List must be a valid accordion', () => {
        const testData = {
          HasForeignTravelOutside: { value: 'Yes' },
          HasForeignTravelOfficial: { value: 'No' },
          List: ['items'],
        }

        const expectedErrors = [
          'List.accordion.MISSING_ITEMS',
        ]

        expect(validateModel(testData, foreignTravel))
          .toEqual(expect.arrayContaining(expectedErrors))
      })
    })

    describe('if HasForeignTravelOfficial is "Yes', () => {
      it('List is not required', () => {
        const testData = {
          HasForeignTravelOutside: { value: 'Yes' },
          HasForeignTravelOfficial: { value: 'Yes' },
        }

        const expectedErrors = [
          'List.presence.REQUIRED',
        ]

        expect(validateModel(testData, foreignTravel))
          .not.toEqual(expect.arrayContaining(expectedErrors))
      })
    })
  })

  describe('if HasForeignTravelOutside is "No', () => {
    it('HasForeignTravelOfficial is not required', () => {
      const testData = {
        HasForeignTravelOutside: { value: 'No' },
      }

      const expectedErrors = [
        'HasForeignTravelOfficial.presence.REQUIRED',
      ]

      expect(validateModel(testData, foreignTravel))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
