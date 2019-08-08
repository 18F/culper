import { validateModel } from 'models/validate'
import diagnoses from 'models/diagnoses'

describe('The diagnoses model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'Diagnosed.presence.REQUIRED',
    ]

    expect(validateModel(testData, diagnoses))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Diagnosed must be a valid value', () => {
    const testData = {
      Diagnosed: { value: 'true' },
    }
    const expectedErrors = [
      'Diagnosed.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, diagnoses))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if Diagnosed is "No"', () => {
    it('passes a valid diagnoses', () => {
      const testData = {
        Diagnosed: { value: 'No' },
      }

      expect(validateModel(testData, diagnoses)).toEqual(true)
    })
  })

  describe('if Diagnosed is "Yes"', () => {
    it('validates required fields', () => {
      const testData = {
        Diagnosed: { value: 'Yes' },
      }
      const expectedErrors = [
        'DidNotConsult.presence.REQUIRED',
        'InTreatment.presence.REQUIRED',
        'DiagnosisList.presence.REQUIRED',
      ]

      expect(validateModel(testData, diagnoses))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('DidNotConsult must be a valid value', () => {
      const testData = {
        Diagnosed: { value: 'Yes' },
        DidNotConsult: { value: 'true' },
      }
      const expectedErrors = [
        'DidNotConsult.hasValue.value.inclusion.INCLUSION',
      ]

      expect(validateModel(testData, diagnoses))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('InTreatment must be a valid value', () => {
      const testData = {
        Diagnosed: { value: 'Yes' },
        InTreatment: { value: 'true' },
      }
      const expectedErrors = [
        'InTreatment.hasValue.value.inclusion.INCLUSION',
      ]

      expect(validateModel(testData, diagnoses))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('DiagnosisList must be a valid accordion', () => {
      const testData = {
        Diagnosed: { value: 'Yes' },
        DiagnosisList: { values: [] },
      }
      const expectedErrors = [
        'DiagnosisList.accordion.INVALID_BRANCH',
      ]

      expect(validateModel(testData, diagnoses))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('DiagnosisList items must be valid diagnoses', () => {
      const testData = {
        Diagnosed: { value: 'Yes' },
        DiagnosisList: {
          branch: { value: 'No' },
          items: [
            { Item: { test: 'diagnosis' } },
          ],
        },
      }
      const expectedErrors = [
        'DiagnosisList.accordion.0.Condition.presence.REQUIRED',
        'DiagnosisList.accordion.0.Diagnosed.presence.REQUIRED',
        'DiagnosisList.accordion.0.Treatment.presence.REQUIRED',
        'DiagnosisList.accordion.0.TreatmentFacility.presence.REQUIRED',
        'DiagnosisList.accordion.0.Effective.presence.REQUIRED',
      ]

      expect(validateModel(testData, diagnoses))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    describe('if InTreatment is "No"', () => {
      it('passes a valid diagnoses', () => {
        const testData = {
          Diagnosed: { value: 'Yes' },
          DidNotConsult: { value: 'No' },
          InTreatment: { value: 'No' },
          DiagnosisList: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  Condition: { value: 'Test' },
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
                  Effective: { value: 'Yes' },
                },
              },
            ],
          },
        }

        expect(validateModel(testData, diagnoses)).toEqual(true)
      })
    })

    describe('if InTreatment is "Yes"', () => {
      it('TreatmentList must be a valid accordion', () => {
        const testData = {
          Diagnosed: { value: 'Yes' },
          InTreatment: { value: 'Yes' },
          TreatmentList: { values: [] },
        }
        const expectedErrors = [
          'TreatmentList.accordion.INVALID_BRANCH',
        ]

        expect(validateModel(testData, diagnoses))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('TreatmentList items must be valid treatments', () => {
        const testData = {
          Diagnosed: { value: 'Yes' },
          InTreatment: { value: 'Yes' },
          TreatmentList: {
            branch: { value: 'No' },
            items: [
              { Item: { test: 'treatment' } },
            ],
          },
        }
        const expectedErrors = [
          'TreatmentList.accordion.0.Name.presence.REQUIRED',
          'TreatmentList.accordion.0.Phone.presence.REQUIRED',
          'TreatmentList.accordion.0.Address.presence.REQUIRED',
        ]

        expect(validateModel(testData, diagnoses))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('passes a valid diagnoses', () => {
        const testData = {
          Diagnosed: { value: 'Yes' },
          DidNotConsult: { value: 'No' },
          InTreatment: { value: 'Yes' },
          DiagnosisList: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  Condition: { value: 'Test' },
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
                  Effective: { value: 'Yes' },
                },
              },
            ],
          },
          TreatmentList: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
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
            ],
          },
        }

        expect(validateModel(testData, diagnoses)).toEqual(true)
      })
    })
  })
})
