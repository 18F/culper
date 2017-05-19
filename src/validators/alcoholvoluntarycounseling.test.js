import VoluntaryCounselingsValidator, { VoluntaryCounselingValidator } from './alcoholvoluntarycounseling'

describe('ordered counseling component validation', function () {
  it('can validate ordered counseling', () => {
    const tests = [
      {
        state: {
          CounselingDates: {
            from: {
              date: new Date('1/1/2010')
            },
            to: {
              date: new Date('1/1/2012')
            },
            present: false
          },
          TreatmentProviderName: {
            value: 'The name'
          },
          TreatmentProviderAddress: {
            addressType: 'United States',
            address: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202'
          },
          TreatmentProviderTelephone: {
            noNumber: '',
            number: '7031112222',
            numberType: 'Home',
            timeOfDay: 'Both',
            extension: ''
          },
          CompletedTreatment: 'Yes'
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new VoluntaryCounselingValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })

  it('can validate completed treatment', () => {
    const tests = [
      {
        state: {
          CompletedTreatment: 'Yes'
        },
        expected: true
      },
      {
        state: {
          CompletedTreatment: 'No',
          NoCompletedTreatmentExplanation: {
            value: 'Foo'
          }
        },
        expected: true
      },
      {
        state: {
          CompletedTreatment: 'Nope'
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new VoluntaryCounselingValidator(test.state, null).validCompletedTreatment()).toBe(test.expected)
    })
  })

  it('can validate list of ordered counseling', () => {
    const tests = [
      {
        state: {
          ListBranch: 'No',
          SoughtTreatment: 'Yes',
          List: [
            {
              VoluntaryCounseling: {
                CounselingDates: {
                  from: {
                    date: new Date('1/1/2010')
                  },
                  to: {
                    date: new Date('1/1/2012')
                  },
                  present: false
                },
                TreatmentProviderName: {
                  value: 'The name'
                },
                TreatmentProviderAddress: {
                  addressType: 'United States',
                  address: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'Virginia',
                  zipcode: '22202'
                },
                TreatmentProviderTelephone: {
                  noNumber: '',
                  number: '7031112222',
                  numberType: 'Home',
                  timeOfDay: 'Both',
                  extension: ''
                },
                CompletedTreatment: 'Yes'
              }
            }
          ]
        },
        expected: true
      },
      {
        state: {
          SoughtTreatment: 'No'
        },
        expected: true
      },
      {
        state: {
          SoughtTreatment: 'Yes',
          List: []
        },
        expected: false
      },
      {
        state: {
          SoughtTreatment: 'Yes',
          List: [{}]
        },
        expected: false
      },
      {
        state: {
          SoughtTreatment: 'Yes',
          ListBranch: 'No',
          List: [{VoluntaryCounseling: {}}]
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new VoluntaryCounselingsValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
