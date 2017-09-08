import OrderedCounselingsValidator, { OrderedCounselingValidator } from './alcoholorderedcounseling'
import Location from '../components/Form/Location'

describe('ordered counseling component validation', function () {
  it('can validate ordered counseling', () => {
    const tests = [
      {
        state: {
          ActionTaken: 'No',
          NoActionTakenExplanation: {
            value: 'Foo'
          }
        },
        expected: true
      },
      {
        state: {
          ActionTaken: 'Nope'
        },
        expected: false
      },
      {
        state: {
          Seekers: ['Other'],
          OtherSeeker: {
            value: 'Other'
          },
          ActionTaken: 'Yes',
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
          CompletedTreatment: 'Yes'
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new OrderedCounselingValidator(test.state, null).isValid()).toBe(test.expected)
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
      expect(new OrderedCounselingValidator(test.state, null).validCompletedTreatment()).toBe(test.expected)
    })
  })

  it('can validate list of ordered counseling', () => {
    const tests = [
      {
        state: {
          ListBranch: 'No',
          HasBeenOrdered: 'Yes',
          List: [
            {
              OrderedCounseling: {
                ActionTaken: 'Yes',
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
                CompletedTreatment: 'Yes'
              }
            }
          ]
        },
        expected: true
      },
      {
        state: {
          HasBeenOrdered: 'No'
        },
        expected: true
      },
      {
        state: {
          HasBeenOrdered: 'Yes',
          List: []
        },
        expected: false
      },
      {
        state: {
          HasBeenOrdered: 'Yes',
          List: [{}]
        },
        expected: false
      },
      {
        state: {
          HasBeenOrdered: 'Yes',
          ListBranch: 'No',
          List: [{OrderedCounseling: {}}]
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new OrderedCounselingsValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
