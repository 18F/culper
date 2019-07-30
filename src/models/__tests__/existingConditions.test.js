import { validateModel } from 'models/validate'
import existingConditions from 'models/existingConditions'

describe('The existingConditions model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'HasCondition.presence.REQUIRED',
    ]

    expect(validateModel(testData, existingConditions))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasCondition must be a valid value', () => {
    const testData = {
      HasCondition: { value: 'true' },
    }
    const expectedErrors = [
      'HasCondition.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, existingConditions))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if HasCondition is "No"', () => {
    it('passes a valid existingConditions', () => {
      const testData = {
        HasCondition: { value: 'No' },
      }

      expect(validateModel(testData, existingConditions)).toEqual(true)
    })
  })

  describe('if HasCondition is "Yes"', () => {
    it('validates required fields', () => {
      const testData = {
        HasCondition: { value: 'Yes' },
      }
      const expectedErrors = [
        'DidNotFollow.presence.REQUIRED',
        'ReceivedTreatment.presence.REQUIRED',
      ]

      expect(validateModel(testData, existingConditions))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('DidNotFollow must be a valid value', () => {
      const testData = {
        HasCondition: { value: 'Yes' },
        DidNotFollow: { value: 'true' },
      }
      const expectedErrors = [
        'DidNotFollow.hasValue.value.inclusion.INCLUSION',
      ]

      expect(validateModel(testData, existingConditions))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    describe('if DidNotFollow is "Yes"', () => {
      it('DidNotFollowExplanation must have a value', () => {
        const testData = {
          HasCondition: { value: 'Yes' },
          DidNotFollow: { value: 'Yes' },
        }
        const expectedErrors = [
          'DidNotFollowExplanation.hasValue.MISSING_VALUE',
        ]

        expect(validateModel(testData, existingConditions))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('passes a valid existing conditions', () => {
        const testData = {
          HasCondition: { value: 'Yes' },
          DidNotFollow: { value: 'Yes' },
          DidNotFollowExplanation: { value: 'Test' },
          ReceivedTreatment: { value: 'Decline' },
        }

        expect(validateModel(testData, existingConditions)).toEqual(true)
      })
    })

    describe('if DidNotFollow is "No"', () => {
      it('passes a valid existing conditions', () => {
        const testData = {
          HasCondition: { value: 'Yes' },
          DidNotFollow: { value: 'No' },
          ReceivedTreatment: { value: 'Decline' },
        }

        expect(validateModel(testData, existingConditions)).toEqual(true)
      })
    })

    it('ReceivedTreatment must be a valid value', () => {
      const testData = {
        HasCondition: { value: 'Yes' },
        ReceivedTreatment: { value: 'true' },
      }
      const expectedErrors = [
        'ReceivedTreatment.hasValue.value.inclusion.INCLUSION',
      ]

      expect(validateModel(testData, existingConditions))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    describe('if ReceivedTreatment is "No"', () => {
      it('Explanation must have a value', () => {
        const testData = {
          HasCondition: { value: 'Yes' },
          ReceivedTreatment: { value: 'No' },
        }
        const expectedErrors = [
          'Explanation.hasValue.MISSING_VALUE',
        ]

        expect(validateModel(testData, existingConditions))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('passes a valid existingConditions', () => {
        const testData = {
          HasCondition: { value: 'Yes' },
          DidNotFollow: { value: 'No' },
          ReceivedTreatment: { value: 'No' },
          Explanation: { value: 'Test' },
        }

        expect(validateModel(testData, existingConditions)).toEqual(true)
      })
    })

    describe('if ReceivedTreatment is "Decline"', () => {
      it('passes a valid existingConditions', () => {
        const testData = {
          HasCondition: { value: 'Yes' },
          DidNotFollow: { value: 'No' },
          ReceivedTreatment: { value: 'Decline' },
        }

        expect(validateModel(testData, existingConditions)).toEqual(true)
      })
    })

    describe('if ReceivedTreatment is "Yes"', () => {
      it('TreatmentList must be a valid accordion', () => {
        const testData = {
          HasCondition: { value: 'Yes' },
          ReceivedTreatment: { value: 'Yes' },
          TreatmentList: { values: [] },
        }
        const expectedErrors = [
          'TreatmentList.accordion.INVALID_BRANCH',
        ]

        expect(validateModel(testData, existingConditions))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('TreatmentList items must be valid treatments', () => {
        const testData = {
          HasCondition: { value: 'Yes' },
          ReceivedTreatment: { value: 'Yes' },
          TreatmentList: {
            branch: { value: 'No' },
            items: [
              { Item: { test: 'treatment' } },
            ],
          },
        }
        const expectedErrors = [
          'TreatmentList.accordion.0.Diagnosed.presence.REQUIRED',
          'TreatmentList.accordion.0.Treatment.presence.REQUIRED',
          'TreatmentList.accordion.0.TreatmentFacility.presence.REQUIRED',
        ]

        expect(validateModel(testData, existingConditions))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('passes a valid existingConditions', () => {
        const testData = {
          HasCondition: { value: 'Yes' },
          DidNotFollow: { value: 'No' },
          ReceivedTreatment: { value: 'Yes' },
          TreatmentList: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  Diagnosed: {
                    from: { year: 2010, month: 2, day: 20 },
                    present: true,
                  },
                  Treatment: {
                    Name: { value: 'Test name' },
                    Phone: {
                      number: '1234567890',
                      timeOfDay: 'Both',
                      type: 'Domestic',
                    },
                    Address: {
                      street: '39 Facility St',
                      city: 'New York',
                      state: 'NY',
                      zipcode: '10025',
                      country: 'United States',
                    },
                  },
                  TreatmentFacility: {
                    Name: { value: 'Test name' },
                    Phone: {
                      number: '1234567890',
                      timeOfDay: 'Both',
                      type: 'Domestic',
                    },
                    Address: {
                      street: '39 Facility St',
                      city: 'New York',
                      state: 'NY',
                      zipcode: '10025',
                      country: 'United States',
                    },
                  },
                },
              },
            ],
          },
        }

        expect(validateModel(testData, existingConditions)).toEqual(true)
      })
    })
  })
})
