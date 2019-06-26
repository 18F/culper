import { validateModel } from 'models/validate'
import alcoholOrderedCounseling from '../alcoholOrderedCounseling'

describe('The alcoholOrderedCounseling model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'ActionTaken.required',
    ]

    expect(validateModel(testData, alcoholOrderedCounseling))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if Seekers includes "Other"', () => {
    it('OtherSeeker must have a value', () => {
      const testData = {
        Seekers: { values: ['Other'] },
        OtherSeeker: 'test',
      }
      const expectedErrors = [
        'OtherSeeker.hasValue',
      ]

      expect(validateModel(testData, alcoholOrderedCounseling))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid alcoholOrderedCounseling', () => {
      const testData = {
        Seekers: { values: ['Other'] },
        OtherSeeker: { value: 'Someone else' },
        ActionTaken: { value: 'Yes' },
        TreatmentProviderName: { value: 'Testing' },
        TreatmentProviderAddress: {
          street: '50 Provider ST',
          city: 'New York',
          state: 'NY',
          zipcode: '10023',
          country: 'United States',
        },
        TreatmentProviderTelephone: {
          number: '1234567890',
          type: 'Domestic',
          timeOfDay: 'Both',
        },
        CounselingDates: {
          from: { month: 8, day: 20, year: 2010 },
          to: { month: 10, day: 23, year: 2012 },
        },
        CompletedTreatment: { value: 'No' },
        NoCompletedTreatmentExplanation: { value: 'Because' },
      }

      expect(validateModel(testData, alcoholOrderedCounseling)).toEqual(true)
    })
  })

  it('ActionTaken must have a valid value', () => {
    const testData = {
      ActionTaken: { value: true },
    }
    const expectedErrors = [
      'ActionTaken.hasValue',
    ]

    expect(validateModel(testData, alcoholOrderedCounseling))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if ActionTaken is "Yes"', () => {
    it('TreatmentProviderName must have a value', () => {
      const testData = {
        ActionTaken: { value: 'Yes' },
      }
      const expectedErrors = [
        'TreatmentProviderName.required',
        'TreatmentProviderName.hasValue',
      ]

      expect(validateModel(testData, alcoholOrderedCounseling))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('TreatmentProviderAddress must be a valid location', () => {
      const testData = {
        ActionTaken: { value: 'Yes' },
        TreatmentProviderAddress: 'invalid address',
      }
      const expectedErrors = [
        'TreatmentProviderAddress.location',
      ]

      expect(validateModel(testData, alcoholOrderedCounseling))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('TreatmentProviderTelephone must be a valid phone', () => {
      const testData = {
        ActionTaken: { value: 'Yes' },
        TreatmentProviderTelephone: '1234567890',
      }
      const expectedErrors = [
        'TreatmentProviderTelephone.model',
      ]

      expect(validateModel(testData, alcoholOrderedCounseling))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('CounselingDates must be a valid date range', () => {
      const testData = {
        ActionTaken: { value: 'Yes' },
        CounselingDates: false,
      }
      const expectedErrors = [
        'CounselingDates.daterange',
      ]

      expect(validateModel(testData, alcoholOrderedCounseling))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('CompletedTreatment must have a valid value', () => {
      const testData = {
        ActionTaken: { value: 'Yes' },
        CompletedTreatment: true,
      }
      const expectedErrors = [
        'CompletedTreatment.hasValue',
      ]

      expect(validateModel(testData, alcoholOrderedCounseling))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    describe('if CompletedTreatment is "Yes"', () => {
      it('passes a valid alcoholOrderedCounseling', () => {
        const testData = {
          Seekers: { values: ['Test', 'Test 2'] },
          ActionTaken: { value: 'Yes' },
          TreatmentProviderName: { value: 'Testing' },
          TreatmentProviderAddress: {
            street: '50 Provider ST',
            city: 'New York',
            state: 'NY',
            zipcode: '10023',
            country: 'United States',
          },
          TreatmentProviderTelephone: {
            number: '1234567890',
            type: 'Domestic',
            timeOfDay: 'Both',
          },
          CounselingDates: {
            from: { month: 8, day: 20, year: 2010 },
            to: { month: 10, day: 23, year: 2012 },
          },
          CompletedTreatment: { value: 'Yes' },
        }

        expect(validateModel(testData, alcoholOrderedCounseling)).toEqual(true)
      })
    })

    describe('if CompletedTreatment is "No', () => {
      it('NoCompletedTreatmentExplanation must have a value', () => {
        const testData = {
          ActionTaken: { value: 'Yes' },
          CompletedTreatment: { value: 'No' },
        }
        const expectedErrors = [
          'NoCompletedTreatmentExplanation.required',
          'NoCompletedTreatmentExplanation.hasValue',
        ]

        expect(validateModel(testData, alcoholOrderedCounseling))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('passes a valid alcoholOrderedCounseling', () => {
        const testData = {
          Seekers: { values: [] },
          ActionTaken: { value: 'Yes' },
          TreatmentProviderName: { value: 'Testing' },
          TreatmentProviderAddress: {
            street: '50 Provider ST',
            city: 'New York',
            state: 'NY',
            zipcode: '10023',
            country: 'United States',
          },
          TreatmentProviderTelephone: {
            number: '1234567890',
            type: 'Domestic',
            timeOfDay: 'Both',
          },
          CounselingDates: {
            from: { month: 8, day: 20, year: 2010 },
            to: { month: 10, day: 23, year: 2012 },
          },
          CompletedTreatment: { value: 'No' },
          NoCompletedTreatmentExplanation: { value: 'Because' },
        }

        expect(validateModel(testData, alcoholOrderedCounseling)).toEqual(true)
      })
    })
  })

  describe('if ActionTaken is "No"', () => {
    it('NoActionTakenExplanation must have a value', () => {
      const testData = {
        ActionTaken: { value: 'No' },
      }
      const expectedErrors = [
        'NoActionTakenExplanation.required',
        'NoActionTakenExplanation.hasValue',
      ]

      expect(validateModel(testData, alcoholOrderedCounseling))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid alcoholOrderedCounseling', () => {
      const testData = {
        ActionTaken: { value: 'No' },
        NoActionTakenExplanation: { value: 'Because' },
      }

      expect(validateModel(testData, alcoholOrderedCounseling)).toEqual(true)
    })
  })
})
