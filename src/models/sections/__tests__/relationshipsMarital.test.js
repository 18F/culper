import { validateModel } from 'models/validate'
import relationshipsMaritalModel from 'models/sections/relationshipsMarital'

describe('The relationships marital section model', () => {
  it('validates required fields', () => {
    const testData = {}

    const expectedErrors = [
      'Status.presence.REQUIRED',
    ]

    expect(validateModel(testData, relationshipsMaritalModel))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Status must be a valid value', () => {
    const testData = {
      Status: { value: 'test' },
    }

    const expectedErrors = [
      'Status.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, relationshipsMaritalModel))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if "Status" is a currently married value', () => {
    it('CivilUnion is required', () => {
      const testData = {
        Status: { value: 'Married' },
      }

      const expectedErrors = [
        'CivilUnion.presence.REQUIRED',
      ]

      expect(validateModel(testData, relationshipsMaritalModel))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('CivilUnion must be a valid civilUnion', () => {
      const testData = {
        Status: { value: 'Separated' },
        CivilUnion: {
          data: 'invalid',
        },
      }

      const expectedErrors = [
        'CivilUnion.model.Name.presence.REQUIRED',
      ]

      expect(validateModel(testData, relationshipsMaritalModel))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    describe('if CivilUnion Divorced is "Yes"', () => {
      it('DivorcedList is required', () => {
        const testData = {
          Status: { value: 'Separated' },
          CivilUnion: {
            Divorced: { value: 'Yes' },
          },
        }

        const expectedErrors = [
          'CivilUnion.model.Name.presence.REQUIRED',
        ]

        expect(validateModel(testData, relationshipsMaritalModel))
          .toEqual(expect.arrayContaining(expectedErrors))
      })
    })
  })

  describe('if "Status" is a previously married value', () => {
    it('DivorcedList is required', () => {
      const testData = {
        Status: { value: 'Divorced' },
      }

      const expectedErrors = [
        'DivorcedList.presence.REQUIRED',
      ]

      expect(validateModel(testData, relationshipsMaritalModel))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('DivorcedList must be a valid accordion', () => {
      const testData = {
        Status: { value: 'Widowed' },
        DivorcedList: 'test',
      }

      const expectedErrors = [
        'DivorcedList.accordion.MISSING_ITEMS',
      ]

      expect(validateModel(testData, relationshipsMaritalModel))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if "Status" is never married', () => {
    it('CivilUnion and DivorcedList are not required', () => {
      const testData = {
        Status: { value: 'NeverMarried' },
      }

      const expectedErrors = [
        'CivilUnion.presence.REQUIRED',
        'DivorcedList.presence.REQUIRED',
      ]

      expect(validateModel(testData, relationshipsMaritalModel))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
