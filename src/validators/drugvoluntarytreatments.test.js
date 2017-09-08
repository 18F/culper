import DrugVoluntaryTreatmentsValidator, { DrugVoluntaryTreatmentValidator } from './drugvoluntarytreatments'
import Location from '../components/Form/Location'

describe('Drug Voluntary Treatment Validation', function () {
  it('should validate drug ordered treatments', function () {
    const tests = [
      {
        state: {
          TreatmentVoluntary: 'Nope'
        },
        expected: false
      },
      {
        state: {
          TreatmentVoluntary: 'No'
        },
        expected: true
      },
      {
        state: {
          TreatmentVoluntary: 'Yes',
          List: [],
          ListBranch: ''
        },
        expected: false
      },
      {
        state: {
          TreatmentVoluntary: 'Yes',
          List: [{VoluntaryTreatment: {}}],
          ListBranch: 'Nope'
        },
        expected: false
      },
      {
        state: {
          TreatmentVoluntary: 'Yes',
          List: [{VoluntaryTreatment: {}}],
          ListBranch: 'No'
        },
        expected: false
      },
      {
        state: {
          TreatmentVoluntary: 'Yes',
          ListBranch: 'No',
          List: [
            {
              VoluntaryTreatment: {
                DrugType: 'Cocaine',
                TreatmentProvider: {
                  value: 'Provider'
                },
                TreatmentProviderAddress: {
                  country: 'United States',
                  street: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'Virginia',
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
                    date: new Date('1/1/2010')
                  },
                  to: {
                    date: new Date('1/1/2012')
                  }
                },
                TreatmentCompleted: 'Yes'
              }
            }
          ]
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new DrugVoluntaryTreatmentsValidator(test.state).isValid()).toBe(test.expected)
    })
  })

  it('should validate treatment completed', function () {
    const tests = [
      {
        state: {
          TreatmentCompleted: 'Nope'
        },
        expected: false
      },
      {
        state: {
          TreatmentCompleted: 'No',
          NoTreatmentExplanation: {
            value: 'Nothing'
          }
        },
        expected: true
      },
      {
        state: {
          TreatmentCompleted: 'Yes'
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new DrugVoluntaryTreatmentValidator(test.state).validTreatmentCompleted()).toBe(test.expected)
    })
  })
})
