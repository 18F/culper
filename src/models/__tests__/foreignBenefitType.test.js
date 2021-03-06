import { validateModel } from 'models/validate'
import foreignBenefitType from '../foreignBenefitType'

describe('The foreignBenefitType model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'Country.presence.REQUIRED',
      'Value.presence.REQUIRED',
      'Reason.presence.REQUIRED',
      'Obligated.presence.REQUIRED',
    ]

    expect(validateModel(testData, foreignBenefitType))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Country must have a value', () => {
    const testData = { Country: 'test' }
    const expectedErrors = ['Country.country.INVALID_COUNTRY']

    expect(validateModel(testData, foreignBenefitType))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Country must have a valid value', () => {
    const testData = { Country: { value: ['invalid'] } }
    const expectedErrors = ['Country.country.INVALID_COUNTRY']

    expect(validateModel(testData, foreignBenefitType))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Value must be a valid currency', () => {
    const testData = { Value: { value: 'invalid' } }
    const expectedErrors = [
      'Value.hasValue.value.numericality.INVALID_NUMBER',
    ]

    expect(validateModel(testData, foreignBenefitType))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Reason must have a value', () => {
    const testData = { Reason: 'test' }
    const expectedErrors = ['Reason.hasValue.MISSING_VALUE']

    expect(validateModel(testData, foreignBenefitType))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Obligated must have a valid value', () => {
    const testData = { Obligated: { value: true } }
    const expectedErrors = ['Obligated.hasValue.value.inclusion.INCLUSION']

    expect(validateModel(testData, foreignBenefitType))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if Obligated is "Yes"', () => {
    it('ObligatedExplanation is required', () => {
      const testData = {
        Obligated: { value: 'Yes' },
      }
      const expectedErrors = ['ObligatedExplanation.presence.REQUIRED']

      expect(validateModel(testData, foreignBenefitType))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('ObligatedExplanation must have a value', () => {
      const testData = {
        Obligated: { value: 'Yes' },
        ObligatedExplanation: 'test',
      }
      const expectedErrors = ['ObligatedExplanation.hasValue.MISSING_VALUE']

      expect(validateModel(testData, foreignBenefitType))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if Obligated is "No"', () => {
    it('ObligatedExplanation is not required', () => {
      const testData = {
        Obligated: { value: 'No' },
      }
      const expectedErrors = ['ObligatedExplanation.presence.REQUIRED']

      expect(validateModel(testData, foreignBenefitType))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('for a One Time benefit', () => {
    it('Received is required', () => {
      const testData = {}
      const expectedErrors = ['Received.presence.REQUIRED']

      expect(validateModel(testData, foreignBenefitType, { benefitType: 'OneTime' }))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Received must be a valid date', () => {
      const testData = {
        Received: { year: 2000, month: 99, day: 200 },
      }
      const expectedErrors = ['Received.date.date.datetime.INVALID_DATE']

      expect(validateModel(testData, foreignBenefitType, { benefitType: 'OneTime' }))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Received cannot be in the future', () => {
      const testData = {
        Received: { month: 1, year: 2050, day: 2 },
      }

      const expectedErrors = [
        'Received.date.date.datetime.DATE_TOO_LATE',
      ]

      expect(validateModel(testData, foreignBenefitType, { benefitType: 'OneTime' }))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid benefit', () => {
      const testData = {
        Country: { value: 'Germany' },
        Value: { value: '2500' },
        Reason: { value: 'because' },
        Obligated: { value: 'No' },
        Received: { year: 2000, month: 2, day: 10 },
      }

      expect(validateModel(testData, foreignBenefitType, { benefitType: 'OneTime' }))
        .toEqual(true)
    })
  })

  describe('for a Future benefit', () => {
    it('Began is required', () => {
      const testData = {}
      const expectedErrors = ['Began.presence.REQUIRED']

      expect(validateModel(testData, foreignBenefitType, { benefitType: 'Future' }))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Began must be a valid date', () => {
      const testData = {
        Began: { year: 2000, month: 99, day: 200 },
      }
      const expectedErrors = ['Began.date.date.datetime.INVALID_DATE']

      expect(validateModel(testData, foreignBenefitType, { benefitType: 'Future' }))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Began must be in the future', () => {
      const testData = {
        Began: { year: 2000, month: 9, day: 20 },
      }
      const expectedErrors = ['Began.date.date.datetime.DATE_TOO_EARLY']

      expect(validateModel(testData, foreignBenefitType, { benefitType: 'Future' }))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Frequency is required', () => {
      const testData = {}
      const expectedErrors = ['Frequency.presence.REQUIRED']

      expect(validateModel(testData, foreignBenefitType, { benefitType: 'Future' }))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Frequency must have a valid value', () => {
      const testData = {
        Frequency: { value: 'invalid' },
      }
      const expectedErrors = ['Frequency.hasValue.value.inclusion.INCLUSION']

      expect(validateModel(testData, foreignBenefitType, { benefitType: 'Future' }))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    describe('if Frequency is "Other"', () => {
      it('OtherFrequency is required', () => {
        const testData = {
          Frequency: { value: 'Other' },
        }
        const expectedErrors = ['OtherFrequency.presence.REQUIRED']

        expect(validateModel(testData, foreignBenefitType, { benefitType: 'Future' }))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('OtherFrequency must have a value', () => {
        const testData = {
          Frequency: { value: 'Other' },
          OtherFrequency: { value: '' },
        }
        const expectedErrors = ['OtherFrequency.hasValue.MISSING_VALUE']

        expect(validateModel(testData, foreignBenefitType, { benefitType: 'Future' }))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('passes a valid benefit', () => {
        const testData = {
          Country: { value: 'France' },
          Value: { value: '2500' },
          Reason: { value: 'because' },
          Obligated: { value: 'No' },
          Began: { year: 2030, month: 2, day: 10 },
          Frequency: { value: 'Other' },
          OtherFrequency: { value: 'some other frequency' },
        }

        expect(validateModel(testData, foreignBenefitType, { benefitType: 'Future' }))
          .toEqual(true)
      })
    })

    it('passes a valid benefit', () => {
      const testData = {
        Country: { value: 'Italy' },
        Value: { value: '2500' },
        Reason: { value: 'because' },
        Obligated: { value: 'No' },
        Began: { year: 2030, month: 2, day: 10 },
        Frequency: { value: 'Annually' },
      }

      expect(validateModel(testData, foreignBenefitType, { benefitType: 'Future' }))
        .toEqual(true)
    })
  })

  describe('for a Continuing benefit', () => {
    it('Began is required', () => {
      const testData = {}
      const expectedErrors = ['Began.presence.REQUIRED']

      expect(validateModel(testData, foreignBenefitType, { benefitType: 'Continuing' }))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Began must be a valid date', () => {
      const testData = {
        Began: { year: 2000, month: 99, day: 200 },
      }
      const expectedErrors = ['Began.date.date.datetime.INVALID_DATE']

      expect(validateModel(testData, foreignBenefitType, { benefitType: 'Continuing' }))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Began cannot be in the future', () => {
      const testData = {
        Began: { year: 2030, month: 9, day: 20 },
      }
      const expectedErrors = ['Began.date.date.datetime.DATE_TOO_LATE']

      expect(validateModel(testData, foreignBenefitType, { benefitType: 'Continuing' }))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('End is required', () => {
      const testData = {}
      const expectedErrors = ['End.presence.REQUIRED']

      expect(validateModel(testData, foreignBenefitType, { benefitType: 'Continuing' }))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('End must be a valid date', () => {
      const testData = {
        End: { year: 2000, month: 99, day: 200 },
      }
      const expectedErrors = ['End.date.date.datetime.INVALID_DATE']

      expect(validateModel(testData, foreignBenefitType, { benefitType: 'Continuing' }))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('End must be after Began', () => {
      const testData = {
        Began: { year: 2010, month: 2, day: 1 },
        End: { year: 2000, month: 9, day: 20 },
      }
      const expectedErrors = ['End.date.date.datetime.DATE_TOO_EARLY']

      expect(validateModel(testData, foreignBenefitType, { benefitType: 'Continuing' }))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Frequency is required', () => {
      const testData = {}
      const expectedErrors = ['Frequency.presence.REQUIRED']

      expect(validateModel(testData, foreignBenefitType, { benefitType: 'Continuing' }))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Frequency must have a valid value', () => {
      const testData = {
        Frequency: { value: 'invalid' },
      }
      const expectedErrors = ['Frequency.hasValue.value.inclusion.INCLUSION']

      expect(validateModel(testData, foreignBenefitType, { benefitType: 'Continuing' }))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    describe('if Frequency is "Other"', () => {
      it('OtherFrequency is required', () => {
        const testData = {
          Frequency: { value: 'Other' },
        }
        const expectedErrors = ['OtherFrequency.presence.REQUIRED']

        expect(validateModel(testData, foreignBenefitType, { benefitType: 'Continuing' }))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('OtherFrequency must have a value', () => {
        const testData = {
          Frequency: { value: 'Other' },
          OtherFrequency: { value: '' },
        }
        const expectedErrors = ['OtherFrequency.hasValue.MISSING_VALUE']

        expect(validateModel(testData, foreignBenefitType, { benefitType: 'Continuing' }))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('passes a valid benefit', () => {
        const testData = {
          Country: { value: 'Canada' },
          Value: { value: '2500' },
          Reason: { value: 'because' },
          Obligated: { value: 'No' },
          Began: { year: 2000, month: 2, day: 10 },
          End: { year: 2005, month: 10, day: 2 },
          Frequency: { value: 'Other' },
          OtherFrequency: { value: 'some other frequency' },
        }

        expect(validateModel(testData, foreignBenefitType, { benefitType: 'Continuing' }))
          .toEqual(true)
      })
    })

    it('passes a valid benefit', () => {
      const testData = {
        Country: { value: 'United Kingdom' },
        Value: { value: '2500' },
        Reason: { value: 'because' },
        Obligated: { value: 'No' },
        Began: { year: 2000, month: 2, day: 10 },
        End: { year: 2005, month: 10, day: 2 },
        Frequency: { value: 'Annually' },
      }

      expect(validateModel(testData, foreignBenefitType, { benefitType: 'Continuing' }))
        .toEqual(true)
    })
  })

  describe('for an Other benefit', () => {
    it('OtherFrequencyTypeExplanation is required', () => {
      const testData = {}
      const expectedErrors = ['OtherFrequencyTypeExplanation.presence.REQUIRED']

      expect(validateModel(testData, foreignBenefitType, { benefitType: 'Other' }))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('OtherFrequencyTypeExplanation must have a value', () => {
      const testData = {
        OtherFrequencyTypeExplanation: { value: '' },
      }
      const expectedErrors = ['OtherFrequencyTypeExplanation.hasValue.MISSING_VALUE']

      expect(validateModel(testData, foreignBenefitType, { benefitType: 'Other' }))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Began is required', () => {
      const testData = {}
      const expectedErrors = ['Began.presence.REQUIRED']

      expect(validateModel(testData, foreignBenefitType, { benefitType: 'Other' }))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Began must be a valid date', () => {
      const testData = {
        Began: { year: 2000, month: 99, day: 200 },
      }
      const expectedErrors = ['Began.date.date.datetime.INVALID_DATE']

      expect(validateModel(testData, foreignBenefitType, { benefitType: 'Other' }))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Began cannot be in the future', () => {
      const testData = {
        Began: { year: 2030, month: 9, day: 20 },
      }
      const expectedErrors = ['Began.date.date.datetime.DATE_TOO_LATE']

      expect(validateModel(testData, foreignBenefitType, { benefitType: 'Other' }))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('End is required', () => {
      const testData = {}
      const expectedErrors = ['End.presence.REQUIRED']

      expect(validateModel(testData, foreignBenefitType, { benefitType: 'Other' }))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('End must be a valid date', () => {
      const testData = {
        End: { year: 2000, month: 99, day: 200 },
      }
      const expectedErrors = ['End.date.date.datetime.INVALID_DATE']

      expect(validateModel(testData, foreignBenefitType, { benefitType: 'Other' }))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('End must be after Began', () => {
      const testData = {
        Began: { year: 2010, month: 2, day: 1 },
        End: { year: 2000, month: 9, day: 20 },
      }
      const expectedErrors = ['End.date.date.datetime.DATE_TOO_EARLY']

      expect(validateModel(testData, foreignBenefitType, { benefitType: 'Other' }))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Frequency is required', () => {
      const testData = {}
      const expectedErrors = ['Frequency.presence.REQUIRED']

      expect(validateModel(testData, foreignBenefitType, { benefitType: 'Other' }))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Frequency must have a valid value', () => {
      const testData = {
        Frequency: { value: 'invalid' },
      }
      const expectedErrors = ['Frequency.hasValue.value.inclusion.INCLUSION']

      expect(validateModel(testData, foreignBenefitType, { benefitType: 'Other' }))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    describe('if Frequency is "Other"', () => {
      it('OtherFrequency is required', () => {
        const testData = {
          Frequency: { value: 'Other' },
        }
        const expectedErrors = ['OtherFrequency.presence.REQUIRED']

        expect(validateModel(testData, foreignBenefitType, { benefitType: 'Other' }))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('OtherFrequency must have a value', () => {
        const testData = {
          Frequency: { value: 'Other' },
          OtherFrequency: { value: '' },
        }
        const expectedErrors = ['OtherFrequency.hasValue.MISSING_VALUE']

        expect(validateModel(testData, foreignBenefitType, { benefitType: 'Other' }))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('passes a valid benefit', () => {
        const testData = {
          Country: { value: 'Costa Rica' },
          Value: { value: '2500' },
          Reason: { value: 'because' },
          Obligated: { value: 'No' },
          Began: { year: 2000, month: 2, day: 10 },
          End: { year: 2005, month: 10, day: 2 },
          Frequency: { value: 'Other' },
          OtherFrequency: { value: 'some other frequency' },
          OtherFrequencyTypeExplanation: { value: 'reason' },
        }

        expect(validateModel(testData, foreignBenefitType, { benefitType: 'Other' }))
          .toEqual(true)
      })
    })

    it('passes a valid benefit', () => {
      const testData = {
        Country: { value: 'Japan' },
        Value: { value: '2500' },
        Reason: { value: 'because' },
        Obligated: { value: 'No' },
        Began: { year: 2000, month: 2, day: 10 },
        End: { year: 2005, month: 10, day: 2 },
        Frequency: { value: 'Annually' },
        OtherFrequencyTypeExplanation: { value: 'reason' },
      }

      expect(validateModel(testData, foreignBenefitType, { benefitType: 'Other' }))
        .toEqual(true)
    })
  })
})
