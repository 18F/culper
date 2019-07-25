import { validateModel } from 'models/validate'
import alcoholVoluntaryCounseling from '../alcoholVoluntaryCounseling'

describe('The alcoholVoluntaryCounseling model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'CounselingDates.presence.REQUIRED',
      'TreatmentProviderName.presence.REQUIRED',
      'TreatmentProviderAddress.presence.REQUIRED',
      'TreatmentProviderTelephone.presence.REQUIRED',
      'CompletedTreatment.presence.REQUIRED',
    ]

    expect(validateModel(testData, alcoholVoluntaryCounseling))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('TreatmentProviderName must have a value', () => {
    const testData = {
      TreatmentProviderName: { value: '' },
    }
    const expectedErrors = [
      'TreatmentProviderName.hasValue.MISSING_VALUE',
    ]

    expect(validateModel(testData, alcoholVoluntaryCounseling))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('TreatmentProviderAddress must be a valid location', () => {
    const testData = {
      TreatmentProviderAddress: 'invalid address',
    }
    const expectedErrors = [
      'TreatmentProviderAddress.location.street.presence.REQUIRED',
      'TreatmentProviderAddress.location.city.presence.REQUIRED',
      'TreatmentProviderAddress.location.country.presence.REQUIRED',
    ]

    expect(validateModel(testData, alcoholVoluntaryCounseling))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('TreatmentProviderTelephone must be a valid phone', () => {
    const testData = {
      TreatmentProviderTelephone: '1234567890',
    }
    const expectedErrors = [
      'TreatmentProviderTelephone.model.timeOfDay.presence.REQUIRED',
      'TreatmentProviderTelephone.model.number.presence.REQUIRED',
    ]

    expect(validateModel(testData, alcoholVoluntaryCounseling))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('TreatmentProviderTelephone must exist', () => {
    const testData = {
      TreatmentProviderTelephone: { noNumber: true },
    }
    const expectedErrors = [
      'TreatmentProviderTelephone.model',
    ]

    expect(validateModel(testData, alcoholVoluntaryCounseling))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('CounselingDates must be a valid date range', () => {
    const testData = {
      CounselingDates: false,
    }
    const expectedErrors = [
      'CounselingDates.daterange.from.presence.REQUIRED',
      'CounselingDates.daterange.to.presence.REQUIRED',
    ]

    expect(validateModel(testData, alcoholVoluntaryCounseling))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('CompletedTreatment must have a valid value', () => {
    const testData = {
      CompletedTreatment: true,
    }
    const expectedErrors = [
      'CompletedTreatment.hasValue.MISSING_VALUE',
    ]

    expect(validateModel(testData, alcoholVoluntaryCounseling))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if CompletedTreatment is "Yes"', () => {
    it('passes a valid alcoholVoluntaryCounseling', () => {
      const testData = {
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

      expect(validateModel(testData, alcoholVoluntaryCounseling)).toEqual(true)
    })
  })

  describe('if CompletedTreatment is "No', () => {
    it('NoCompletedTreatmentExplanation must have a value', () => {
      const testData = {
        CompletedTreatment: { value: 'No' },
      }
      const expectedErrors = [
        'NoCompletedTreatmentExplanation.presence.REQUIRED',
        'NoCompletedTreatmentExplanation.hasValue.MISSING_VALUE',
      ]

      expect(validateModel(testData, alcoholVoluntaryCounseling))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid alcoholVoluntaryCounseling', () => {
      const testData = {
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

      expect(validateModel(testData, alcoholVoluntaryCounseling)).toEqual(true)
    })
  })
})
