import { validateModel } from 'models/validate'
import alcoholReceivedCounseling from '../alcoholReceivedCounseling'

describe('The alcoholReceivedCounseling model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'TreatmentProviderName.required',
      'UseSameAddress.required',
      'TreatmentProviderAddress.required',
      'AgencyName.required',
      'CompletedTreatment.required',
      'TreatmentBeganDate.required',
      'TreatmentEndDate.required',
      'TreatmentDates.required',
      'NoCompletedTreatmentExplanation.required',
    ]

    expect(validateModel(testData, alcoholReceivedCounseling))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('TreatmentProviderName must have a value', () => {
    const testData = {
      TreatmentProviderName: { value: '' },
    }
    const expectedErrors = [
      'TreatmentProviderName.hasValue',
    ]

    expect(validateModel(testData, alcoholReceivedCounseling))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('UseSameAddress must have a valid value', () => {
    const testData = {
      UseSameAddress: { value: true },
    }
    const expectedErrors = [
      'UseSameAddress.hasValue',
    ]

    expect(validateModel(testData, alcoholReceivedCounseling))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('TreatmentProviderAddress must be a valid location', () => {
    const testData = {
      TreatmentProviderAddress: 'invalid address',
    }
    const expectedErrors = [
      'TreatmentProviderAddress.location',
    ]

    expect(validateModel(testData, alcoholReceivedCounseling))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if UseSameAddress is "Yes"', () => {
    it('AgencyAddress is not required', () => {
      const testData = {
        UseSameAddress: { value: 'Yes' },
      }
      const expectedErrors = [
        'AgencyAddress.required',
      ]

      expect(validateModel(testData, alcoholReceivedCounseling))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid alcoholReceivedCounseling', () => {
      const testData = {
        TreatmentProviderName: { value: 'Testing' },
        TreatmentProviderAddress: {
          street: '50 Provider ST',
          city: 'New York',
          state: 'NY',
          zipcode: '10023',
          country: 'United States',
        },
        AgencyName: { value: 'Testing' },
        UseSameAddress: { value: 'Yes' },
        TreatmentBeganDate: { month: 8, day: 20, year: 2010 },
        TreatmentEndDate: { month: 10, day: 23, year: 2012 },
        TreatmentDates: {
          from: { month: 8, day: 20, year: 2010 },
          to: { month: 10, day: 23, year: 2012 },
        },
        CompletedTreatment: { value: 'Yes' },
        NoCompletedTreatmentExplanation: { value: 'Because' },
      }

      expect(validateModel(testData, alcoholReceivedCounseling)).toEqual(true)
    })
  })

  describe('if UseSameAddress is "No"', () => {
    it('AgencyAddress is required', () => {
      const testData = {
        UseSameAddress: { value: 'No' },
      }
      const expectedErrors = [
        'AgencyAddress.required',
      ]

      expect(validateModel(testData, alcoholReceivedCounseling))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('AgencyAddress must be a valid location', () => {
      const testData = {
        UseSameAddress: { value: 'No' },
        AgencyAddress: 'invalid address',
      }
      const expectedErrors = [
        'AgencyAddress.location',
      ]

      expect(validateModel(testData, alcoholReceivedCounseling))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid alcoholReceivedCounseling', () => {
      const testData = {
        TreatmentProviderName: { value: 'Testing' },
        TreatmentProviderAddress: {
          street: '50 Provider ST',
          city: 'New York',
          state: 'NY',
          zipcode: '10023',
          country: 'United States',
        },
        AgencyName: { value: 'Testing' },
        AgencyAddress: {
          street: '50 Agency ST',
          city: 'New York',
          state: 'NY',
          zipcode: '10023',
          country: 'United States',
        },
        UseSameAddress: { value: 'No' },
        TreatmentBeganDate: { month: 8, day: 20, year: 2010 },
        TreatmentEndDate: { month: 10, day: 23, year: 2012 },
        TreatmentDates: {
          from: { month: 8, day: 20, year: 2010 },
          to: { month: 10, day: 23, year: 2012 },
        },
        CompletedTreatment: { value: 'No' },
        NoCompletedTreatmentExplanation: { value: 'Because' },
      }

      expect(validateModel(testData, alcoholReceivedCounseling)).toEqual(true)
    })
  })

  it('AgencyName must have a value', () => {
    const testData = {
      AgencyName: { value: '' },
    }
    const expectedErrors = [
      'AgencyName.hasValue',
    ]

    expect(validateModel(testData, alcoholReceivedCounseling))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('TreatmentDates must be a valid date range', () => {
    const testData = {
      TreatmentDates: false,
    }
    const expectedErrors = [
      'TreatmentDates.daterange',
    ]

    expect(validateModel(testData, alcoholReceivedCounseling))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('CompletedTreatment must have a valid value', () => {
    const testData = {
      CompletedTreatment: true,
    }
    const expectedErrors = [
      'CompletedTreatment.hasValue',
    ]

    expect(validateModel(testData, alcoholReceivedCounseling))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('NoCompletedTreatmentExplanation must have a value', () => {
    const testData = {}
    const expectedErrors = [
      'NoCompletedTreatmentExplanation.hasValue',
    ]

    expect(validateModel(testData, alcoholReceivedCounseling))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a valid alcoholReceivedCounseling', () => {
    const testData = {
      TreatmentProviderName: { value: 'Testing' },
      TreatmentProviderAddress: {
        street: '50 Provider ST',
        city: 'New York',
        state: 'NY',
        zipcode: '10023',
        country: 'United States',
      },
      AgencyName: { value: 'Testing' },
      AgencyAddress: {
        street: '50 Agency ST',
        city: 'New York',
        state: 'NY',
        zipcode: '10023',
        country: 'United States',
      },
      UseSameAddress: { value: 'No' },
      TreatmentBeganDate: { month: 8, day: 20, year: 2010 },
      TreatmentEndDate: { month: 10, day: 23, year: 2012 },
      TreatmentDates: {
        from: { month: 8, day: 20, year: 2010 },
        to: { month: 10, day: 23, year: 2012 },
      },
      CompletedTreatment: { value: 'Yes' },
      NoCompletedTreatmentExplanation: { value: 'Because' },
    }

    expect(validateModel(testData, alcoholReceivedCounseling)).toEqual(true)
  })
})
