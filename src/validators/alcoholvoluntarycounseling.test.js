import VoluntaryCounselingsValidator, {
  VoluntaryCounselingValidator
} from './alcoholvoluntarycounseling'
import Location from '../components/Form/Location'

describe('ordered counseling component validation', function() {
  it('can validate ordered counseling', () => {
    const tests = [
      {
        state: {
          CounselingDates: {
            from: {
              month: '1',
              day: '1',
              year: '2010'
            },
            to: {
              month: '1',
              day: '1',
              year: '2012'
            },
            present: false
          },
          TreatmentProviderName: {
            value: 'The name'
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
          CompletedTreatment: { value: 'Yes' }
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new VoluntaryCounselingValidator(test.state).isValid()).toBe(
        test.expected
      )
    })
  })

  it('can validate completed treatment', () => {
    const tests = [
      {
        state: {
          CompletedTreatment: { value: 'Yes' }
        },
        expected: true
      },
      {
        state: {
          CompletedTreatment: { value: 'No' },
          NoCompletedTreatmentExplanation: {
            value: 'Foo'
          }
        },
        expected: true
      },
      {
        state: {
          CompletedTreatment: { value: 'Nope' }
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(
        new VoluntaryCounselingValidator(test.state).validCompletedTreatment()
      ).toBe(test.expected)
    })
  })

  it('can validate list of ordered counseling', () => {
    const tests = [
      {
        state: {
          SoughtTreatment: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  CounselingDates: {
                    from: {
                      month: '1',
                      day: '1',
                      year: '2010'
                    },
                    to: {
                      month: '1',
                      day: '1',
                      year: '2012'
                    },
                    present: false
                  },
                  TreatmentProviderName: {
                    value: 'The name'
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
                    type: 'Domestic',
                    timeOfDay: 'Both',
                    extension: ''
                  },
                  CompletedTreatment: { value: 'Yes' }
                }
              }
            ]
          }
        },
        expected: true
      },
      {
        state: {
          SoughtTreatment: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          SoughtTreatment: { value: 'Yes' },
          List: {
            branch: { value: '' },
            items: []
          }
        },
        expected: false
      },
      {
        state: {
          SoughtTreatment: { value: 'Yes' },
          List: {
            branch: { value: '' },
            items: [{}]
          }
        },
        expected: false
      },
      {
        state: {
          SoughtTreatment: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [{ Item: {} }]
          }
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new VoluntaryCounselingsValidator(test.state).isValid()).toBe(
        test.expected
      )
    })
  })
})
