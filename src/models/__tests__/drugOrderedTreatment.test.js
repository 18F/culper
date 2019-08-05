import { validateModel } from 'models/validate'
import drugOrderedTreatment from '../drugOrderedTreatment'

describe('The drugOrderedTreatment model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'DrugType.presence.REQUIRED',
      'Explanation.presence.REQUIRED',
      'ActionTaken.presence.REQUIRED',
      'OrderedBy.presence.REQUIRED',
    ]

    expect(validateModel(testData, drugOrderedTreatment))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('DrugType must have a valid value', () => {
    const testData = {
      DrugType: { value: '' },
    }
    const expectedErrors = [
      'DrugType.hasValue.MISSING_VALUE',
    ]

    expect(validateModel(testData, drugOrderedTreatment))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  // TODO this is not how the form works
  // Right now, Explanation text becomes DrugType.value
  // So currently, only validation on DrugType is that it can't be "Other"
  describe.skip('if DrugType is "Other"', () => {
    it('DrugTypeExplanation must have a value', () => {
      const testData = {
        DrugType: { value: 'Other' },
        DrugTypeExplanation: 'test',
      }
      const expectedErrors = [
        'DrugTypeExplanation.hasValue',
      ]

      expect(validateModel(testData, drugOrderedTreatment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  it('Explanation must have a value', () => {
    const testData = {
      Explanation: 'testing',
    }
    const expectedErrors = [
      'Explanation.hasValue.MISSING_VALUE',
    ]

    expect(validateModel(testData, drugOrderedTreatment))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('OrderedBy must have at least one value', () => {
    const testData = {
      OrderedBy: 'testing',
    }
    const expectedErrors = [
      'OrderedBy.array.MISSING_ITEMS',
    ]

    expect(validateModel(testData, drugOrderedTreatment))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if OrderedBy includes "None"', () => {
    it('OrderedBy must have only one value', () => {
      const testData = {
        OrderedBy: { values: ['None', 'Something else'] },
      }
      const expectedErrors = [
        'OrderedBy.array.array.length.LENGTH_TOO_LONG',
      ]

      expect(validateModel(testData, drugOrderedTreatment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid drugOrderedTreatment', () => {
      const testData = {
        DrugType: { value: 'Test drug' },
        // DrugTypeExplanation: { value: 'Test Drug' },
        Explanation: { value: 'Testing' },
        OrderedBy: { values: ['None'] },
        ActionTaken: { value: 'No' },
        NoActionTakenExplanation: { value: 'Because' },
      }

      expect(validateModel(testData, drugOrderedTreatment)).toEqual(true)
    })
  })

  it('ActionTaken must have a valid value', () => {
    const testData = {
      ActionTaken: { value: true },
    }
    const expectedErrors = [
      'ActionTaken.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, drugOrderedTreatment))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if ActionTaken is "Yes"', () => {
    it('TreatmentProvider must have a value', () => {
      const testData = {
        ActionTaken: { value: 'Yes' },
      }
      const expectedErrors = [
        'TreatmentProvider.presence.REQUIRED',
        'TreatmentProvider.hasValue.MISSING_VALUE',
      ]

      expect(validateModel(testData, drugOrderedTreatment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('TreatmentProviderAddress must be a valid location', () => {
      const testData = {
        ActionTaken: { value: 'Yes' },
        TreatmentProviderAddress: 'invalid address',
      }
      const expectedErrors = [
        'TreatmentProviderAddress.location.street.presence.REQUIRED',
        'TreatmentProviderAddress.location.city.presence.REQUIRED',
        'TreatmentProviderAddress.location.country.presence.REQUIRED',
      ]

      expect(validateModel(testData, drugOrderedTreatment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('TreatmentProviderTelephone must be a valid phone', () => {
      const testData = {
        ActionTaken: { value: 'Yes' },
        TreatmentProviderTelephone: '1234567890',
      }
      const expectedErrors = [
        'TreatmentProviderTelephone.model.timeOfDay.presence.REQUIRED',
        'TreatmentProviderTelephone.model.number.presence.REQUIRED',
      ]

      expect(validateModel(testData, drugOrderedTreatment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('TreatmentProviderTelephone must exist', () => {
      const testData = {
        ActionTaken: { value: 'Yes' },
        TreatmentProviderTelephone: { noNumber: true },
      }
      const expectedErrors = [
        'TreatmentProviderTelephone.model.noNumber.inclusion.INCLUSION',
      ]

      expect(validateModel(testData, drugOrderedTreatment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('TreatmentDates must be a valid date range', () => {
      const testData = {
        ActionTaken: { value: 'Yes' },
        TreatmentDates: false,
      }
      const expectedErrors = [
        'TreatmentDates.daterange.from.presence.REQUIRED',
        'TreatmentDates.daterange.to.presence.REQUIRED',
      ]

      expect(validateModel(testData, drugOrderedTreatment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('TreatmentCompleted must have a valid value', () => {
      const testData = {
        ActionTaken: { value: 'Yes' },
        TreatmentCompleted: true,
      }
      const expectedErrors = [
        'TreatmentCompleted.hasValue.MISSING_VALUE',
      ]

      expect(validateModel(testData, drugOrderedTreatment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    describe('if TreatmentCompleted is "Yes"', () => {
      it('passes a valid drugOrderedTreatment', () => {
        const testData = {
          DrugType: { value: 'THC' },
          Explanation: { value: 'Testing' },
          OrderedBy: { values: ['Test 1', 'Test 2'] },
          ActionTaken: { value: 'Yes' },
          TreatmentProvider: { value: 'Testing' },
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
          TreatmentDates: {
            from: { month: 8, day: 20, year: 2010 },
            to: { month: 10, day: 23, year: 2012 },
          },
          TreatmentCompleted: { value: 'Yes' },
        }

        expect(validateModel(testData, drugOrderedTreatment)).toEqual(true)
      })
    })

    describe('if TreatmentCompleted is "No', () => {
      it('NoTreatmentExplanation must have a value', () => {
        const testData = {
          ActionTaken: { value: 'Yes' },
          TreatmentCompleted: { value: 'No' },
        }
        const expectedErrors = [
          'NoTreatmentExplanation.presence.REQUIRED',
          'NoTreatmentExplanation.hasValue.MISSING_VALUE',
        ]

        expect(validateModel(testData, drugOrderedTreatment))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('passes a valid drugOrderedTreatment', () => {
        const testData = {
          DrugType: { value: 'THC' },
          Explanation: { value: 'Testing' },
          OrderedBy: { values: ['Test 1', 'Test 2'] },
          ActionTaken: { value: 'Yes' },
          TreatmentProvider: { value: 'Testing' },
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
          TreatmentDates: {
            from: { month: 8, day: 20, year: 2010 },
            to: { month: 10, day: 23, year: 2012 },
          },
          TreatmentCompleted: { value: 'No' },
          NoTreatmentExplanation: { value: 'Because' },
        }

        expect(validateModel(testData, drugOrderedTreatment)).toEqual(true)
      })
    })
  })

  describe('if ActionTaken is "No"', () => {
    it('NoActionTakenExplanation must have a value', () => {
      const testData = {
        ActionTaken: { value: 'No' },
      }
      const expectedErrors = [
        'NoActionTakenExplanation.presence.REQUIRED',
        'NoActionTakenExplanation.hasValue.MISSING_VALUE',
      ]

      expect(validateModel(testData, drugOrderedTreatment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid drugOrderedTreatment', () => {
      const testData = {
        DrugType: { value: 'THC' },
        Explanation: { value: 'Testing' },
        OrderedBy: { values: ['Test 1', 'Test 2'] },
        ActionTaken: { value: 'No' },
        NoActionTakenExplanation: { value: 'Because' },
      }

      expect(validateModel(testData, drugOrderedTreatment)).toEqual(true)
    })
  })
})
