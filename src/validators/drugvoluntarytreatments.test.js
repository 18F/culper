import DrugVoluntaryTreatmentsValidator, {
  DrugVoluntaryTreatmentValidator
} from './drugvoluntarytreatments'
import Location from '../components/Form/Location'

describe('Drug Voluntary Treatment Validation', function() {
  it('should validate drug ordered treatments', function() {
    const tests = [
      {
        state: {
          TreatmentVoluntary: { value: 'Nope' }
        },
        expected: false
      },
      {
        state: {
          TreatmentVoluntary: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          TreatmentVoluntary: { value: 'Yes' },
          List: {
            branch: { value: '' },
            items: []
          }
        },
        expected: false
      },
      {
        state: {
          TreatmentVoluntary: { value: 'Yes' },
          List: {
            branch: { value: 'Nope' },
            items: [{ VoluntaryTreatment: {} }]
          }
        },
        expected: false
      },
      {
        state: {
          TreatmentVoluntary: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [{ VoluntaryTreatment: {} }]
          }
        },
        expected: false
      },
      {
        state: {
          TreatmentVoluntary: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  DrugType: 'Cocaine',
                  TreatmentProvider: {
                    value: 'Provider'
                  },
                  TreatmentProviderAddress: {
                    country: { value: 'United States' },
                    street: '1234 Some Rd',
                    city: 'Arlington',
                    state: 'VA',
                    zipcode: '22202',
                    layout: Location.ADDRESS
                  },
                  TreatmentProviderTelephone: {
                    noNumber: '',
                    number: '7031112222',
                    numberType: 'Home',
                    timeOfDay: 'Both',
                    type: 'Domestic',
                    extension: ''
                  },
                  TreatmentDates: {
                    from: {
                      month: '1',
                      day: '1',
                      year: '2010'
                    },
                    to: {
                      month: '1',
                      day: '1',
                      year: '2012'
                    }
                  },
                  TreatmentCompleted: { value: 'Yes' }
                }
              }
            ]
          }
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new DrugVoluntaryTreatmentsValidator(test.state).isValid()).toBe(
        test.expected
      )
    })
  })

  it('should validate treatment completed', function() {
    const tests = [
      {
        state: {
          TreatmentCompleted: { value: 'Nope' }
        },
        expected: false
      },
      {
        state: {
          TreatmentCompleted: { value: 'No' },
          NoTreatmentExplanation: {
            value: 'Nothing'
          }
        },
        expected: true
      },
      {
        state: {
          TreatmentCompleted: { value: 'Yes' }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(
        new DrugVoluntaryTreatmentValidator(
          test.state
        ).validTreatmentCompleted()
      ).toBe(test.expected)
    })
  })
})
