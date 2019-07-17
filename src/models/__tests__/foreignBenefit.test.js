import { validateModel } from 'models/validate'
import foreignBenefit from '../foreignBenefit'

describe('The foreignBenefit model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'InterestTypes.required',
      'BenefitType.required',
      'BenefitFrequency.required',
    ]

    expect(validateModel(testData, foreignBenefit))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('InterestTypes must have at least one value', () => {
    const testData = { InterestTypes: { values: [] } }
    const expectedErrors = ['InterestTypes.array']

    expect(validateModel(testData, foreignBenefit))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('BenefitType must have a valid value', () => {
    const testData = { BenefitType: { value: 'benefit' } }
    const expectedErrors = ['BenefitType.hasValue']

    expect(validateModel(testData, foreignBenefit))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if BenefitType is "Other"', () => {
    it('OtherBenefitType is required', () => {
      const testData = {
        BenefitType: { value: 'Other' },
      }
      const expectedErrors = ['OtherBenefitType.required']

      expect(validateModel(testData, foreignBenefit))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('OtherBenefitType must have a value', () => {
      const testData = {
        BenefitType: { value: 'Other' },
        OtherBenefitType: 'something',
      }
      const expectedErrors = ['OtherBenefitType.hasValue']

      expect(validateModel(testData, foreignBenefit))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  it('BenefitFrequency must have a valid value', () => {
    const testData = { BenefitFrequency: { value: 'frequency' } }
    const expectedErrors = ['BenefitFrequency.hasValue']

    expect(validateModel(testData, foreignBenefit))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if BenefitFrequency is "OneTime"', () => {
    it('OneTimeBenefit is required', () => {
      const testData = {
        BenefitFrequency: { value: 'OneTime' },
      }
      const expectedErrors = ['OneTimeBenefit.required']

      expect(validateModel(testData, foreignBenefit))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('OneTimeBenefit must be a valid benefit type', () => {
      const testData = {
        BenefitFrequency: { value: 'OneTime' },
        OneTimeBenefit: { benefit: 'test' },
      }
      const expectedErrors = ['OneTimeBenefit.model']

      expect(validateModel(testData, foreignBenefit))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid benefit', () => {
      const testData = {
        InterestTypes: { values: ['something'] },
        BenefitType: { value: 'Educational' },
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
      const expectedErrors = ['FutureBenefit.required']

      expect(validateModel(testData, foreignBenefit))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('FutureBenefit must be a valid benefit type', () => {
      const testData = {
        BenefitFrequency: { value: 'Future' },
        FutureBenefit: { benefit: 'test' },
      }
      const expectedErrors = ['FutureBenefit.model']

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
          Began: { year: 2000, month: 2, day: 10 },
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
      const expectedErrors = ['ContinuingBenefit.required']

      expect(validateModel(testData, foreignBenefit))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('ContinuingBenefit must be a valid benefit type', () => {
      const testData = {
        BenefitFrequency: { value: 'Continuing' },
        ContinuingBenefit: { benefit: 'test' },
      }
      const expectedErrors = ['ContinuingBenefit.model']

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
      const expectedErrors = ['OtherBenefit.required']

      expect(validateModel(testData, foreignBenefit))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('OtherBenefit must be a valid benefit type', () => {
      const testData = {
        BenefitFrequency: { value: 'Other' },
        OtherBenefit: { benefit: 'test' },
      }
      const expectedErrors = ['OtherBenefit.model']

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
