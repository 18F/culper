import { validateModel } from 'models/validate'
import foreignBenefit from '../foreignBenefit'

describe('The foreignBenefit model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'InterestTypes.presence.REQUIRED',
      'BenefitType.presence.REQUIRED',
      'BenefitFrequency.presence.REQUIRED',
    ]

    expect(validateModel(testData, foreignBenefit))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('InterestTypes must have at least one value', () => {
    const testData = { InterestTypes: { values: [] } }
    const expectedErrors = [
      'InterestTypes.array.array.length.LENGTH_TOO_SHORT',
    ]

    expect(validateModel(testData, foreignBenefit))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('BenefitType must have a valid value', () => {
    const testData = { BenefitType: { value: 'benefit' } }
    const expectedErrors = ['BenefitType.hasValue.value.inclusion.INCLUSION']

    expect(validateModel(testData, foreignBenefit))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if BenefitType is "Other"', () => {
    it('OtherBenefitType is required', () => {
      const testData = {
        BenefitType: { value: 'Other' },
      }
      const expectedErrors = ['OtherBenefitType.presence.REQUIRED']

      expect(validateModel(testData, foreignBenefit))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('OtherBenefitType must have a value', () => {
      const testData = {
        BenefitType: { value: 'Other' },
        OtherBenefitType: 'something',
      }
      const expectedErrors = ['OtherBenefitType.hasValue.MISSING_VALUE']

      expect(validateModel(testData, foreignBenefit))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  it('BenefitFrequency must have a valid value', () => {
    const testData = { BenefitFrequency: { value: 'frequency' } }
    const expectedErrors = ['BenefitFrequency.hasValue.value.inclusion.INCLUSION']

    expect(validateModel(testData, foreignBenefit))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if BenefitFrequency is "OneTime"', () => {
    it('OneTimeBenefit is required', () => {
      const testData = {
        BenefitFrequency: { value: 'OneTime' },
      }
      const expectedErrors = ['OneTimeBenefit.presence.REQUIRED']

      expect(validateModel(testData, foreignBenefit))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('OneTimeBenefit must be a valid benefit type', () => {
      const testData = {
        BenefitFrequency: { value: 'OneTime' },
        OneTimeBenefit: { benefit: 'test' },
      }
      const expectedErrors = [
        'OneTimeBenefit.model.Country.presence.REQUIRED',
        'OneTimeBenefit.model.Value.presence.REQUIRED',
        'OneTimeBenefit.model.Reason.presence.REQUIRED',
        'OneTimeBenefit.model.Obligated.presence.REQUIRED',
        'OneTimeBenefit.model.Received.presence.REQUIRED',
      ]

      expect(validateModel(testData, foreignBenefit))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid benefit', () => {
      const testData = {
        InterestTypes: { values: ['something'] },
        BenefitType: { value: 'SocialWelfare' },
        BenefitFrequency: { value: 'OneTime' },
        OneTimeBenefit: {
          Country: { value: 'Canada' },
          Value: { value: '2500' },
          Reason: { value: 'because' },
          Obligated: { value: 'No' },
          Received: { year: 2000, month: 2, day: 10 },
        },
      }

      expect(validateModel(testData, foreignBenefit)).toEqual(true)
    })
  })

  describe('if BenefitFrequency is "Future"', () => {
    it('FutureBenefit is required', () => {
      const testData = {
        BenefitFrequency: { value: 'Future' },
      }
      const expectedErrors = ['FutureBenefit.presence.REQUIRED']

      expect(validateModel(testData, foreignBenefit))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('FutureBenefit must be a valid benefit type', () => {
      const testData = {
        BenefitFrequency: { value: 'Future' },
        FutureBenefit: { benefit: 'test' },
      }
      const expectedErrors = [
        'FutureBenefit.model.Country.presence.REQUIRED',
        'FutureBenefit.model.Value.presence.REQUIRED',
        'FutureBenefit.model.Reason.presence.REQUIRED',
        'FutureBenefit.model.Obligated.presence.REQUIRED',
        'FutureBenefit.model.Began.presence.REQUIRED',
        'FutureBenefit.model.Frequency.presence.REQUIRED',
      ]

      expect(validateModel(testData, foreignBenefit))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid benefit', () => {
      const testData = {
        InterestTypes: { values: ['something'] },
        BenefitType: { value: 'Educational' },
        BenefitFrequency: { value: 'Future' },
        FutureBenefit: {
          Country: { value: 'Spain' },
          Value: { value: '2500' },
          Reason: { value: 'because' },
          Obligated: { value: 'No' },
          Began: { year: 2030, month: 2, day: 10 },
          Frequency: { value: 'Other' },
          OtherFrequency: { value: 'some other frequency' },
        },
      }

      expect(validateModel(testData, foreignBenefit)).toEqual(true)
    })
  })

  describe('if BenefitFrequency is "Continuing"', () => {
    it('ContinuingBenefit is required', () => {
      const testData = {
        BenefitFrequency: { value: 'Continuing' },
      }
      const expectedErrors = ['ContinuingBenefit.presence.REQUIRED']

      expect(validateModel(testData, foreignBenefit))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('ContinuingBenefit must be a valid benefit type', () => {
      const testData = {
        BenefitFrequency: { value: 'Continuing' },
        ContinuingBenefit: { benefit: 'test' },
      }
      const expectedErrors = [
        'ContinuingBenefit.model.Country.presence.REQUIRED',
        'ContinuingBenefit.model.Value.presence.REQUIRED',
        'ContinuingBenefit.model.Reason.presence.REQUIRED',
        'ContinuingBenefit.model.Obligated.presence.REQUIRED',
        'ContinuingBenefit.model.Began.presence.REQUIRED',
        'ContinuingBenefit.model.Frequency.presence.REQUIRED',
        'ContinuingBenefit.model.End.presence.REQUIRED',
      ]

      expect(validateModel(testData, foreignBenefit))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid benefit', () => {
      const testData = {
        InterestTypes: { values: ['something'] },
        BenefitType: { value: 'Educational' },
        BenefitFrequency: { value: 'Continuing' },
        ContinuingBenefit: {
          Country: { value: 'Portugal' },
          Value: { value: '2500' },
          Reason: { value: 'because' },
          Obligated: { value: 'No' },
          Began: { year: 2000, month: 2, day: 10 },
          End: { year: 2005, month: 10, day: 2 },
          Frequency: { value: 'Annually' },
        },
      }

      expect(validateModel(testData, foreignBenefit)).toEqual(true)
    })
  })

  describe('if BenefitFrequency is "Other"', () => {
    it('OtherBenefit is required', () => {
      const testData = {
        BenefitFrequency: { value: 'Other' },
      }
      const expectedErrors = ['OtherBenefit.presence.REQUIRED']

      expect(validateModel(testData, foreignBenefit))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('OtherBenefit must be a valid benefit type', () => {
      const testData = {
        BenefitFrequency: { value: 'Other' },
        OtherBenefit: { benefit: 'test' },
      }
      const expectedErrors = [
        'OtherBenefit.model.Country.presence.REQUIRED',
        'OtherBenefit.model.Value.presence.REQUIRED',
        'OtherBenefit.model.Reason.presence.REQUIRED',
        'OtherBenefit.model.Obligated.presence.REQUIRED',
        'OtherBenefit.model.Began.presence.REQUIRED',
        'OtherBenefit.model.Frequency.presence.REQUIRED',
        'OtherBenefit.model.End.presence.REQUIRED',
        'OtherBenefit.model.OtherFrequencyTypeExplanation.presence.REQUIRED',
      ]

      expect(validateModel(testData, foreignBenefit))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid benefit', () => {
      const testData = {
        InterestTypes: { values: ['something'] },
        BenefitType: { value: 'Educational' },
        BenefitFrequency: { value: 'Other' },
        OtherBenefit: {
          Country: { value: 'Australia' },
          Value: { value: '2500' },
          Reason: { value: 'because' },
          Obligated: { value: 'No' },
          Began: { year: 2000, month: 2, day: 10 },
          End: { year: 2005, month: 10, day: 2 },
          Frequency: { value: 'Annually' },
          OtherFrequencyTypeExplanation: { value: 'reason' },
        },
      }

      expect(validateModel(testData, foreignBenefit)).toEqual(true)
    })
  })
})
