import OrderedCounselingsValidator, { OrderedCounselingValidator } from './alcoholorderedcounseling'
import Location from '../components/Form/Location'

describe('ordered counseling component validation', function () {
  it('can validate ordered counseling', () => {
    const tests = [
      {
        state: {
          ActionTaken: { value: 'No' },
          NoActionTakenExplanation: {
            value: 'Foo'
          }
        },
        expected: true
      },
      {
        state: {
          ActionTaken: { value: 'Nope' }
        },
        expected: false
      },
      {
        state: {
          Seekers: ['Other'],
          OtherSeeker: {
            value: 'Other'
          },
          ActionTaken: { value: 'Yes' },
          CounselingDates: {
            from: {
              month: '1',
              day: '1',
              year: '2010',
              date: new Date('1/1/2010')
            },
            to: {
              month: '1',
              day: '1',
              year: '2012',
              date: new Date('1/1/2012')
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
          CompletedTreatment: { value: 'Yes' }
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
      expect(new OrderedCounselingValidator(test.state).validCompletedTreatment()).toBe(test.expected)
    })
  })

  it('can validate list of ordered counseling', () => {
    const tests = [
      {
        state: {
          HasBeenOrdered: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  ActionTaken: { value: 'Yes' },
                  CounselingDates: {
                    from: {
                      month: '1',
                      day: '1',
                      year: '2010',
                      date: new Date('1/1/2010')
                    },
                    to: {
                      month: '1',
                      day: '1',
                      year: '2012',
                      date: new Date('1/1/2012')
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
          HasBeenOrdered: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          HasBeenOrdered: { value: 'Yes' },
          List: {
            branch: { value: '' },
            items: []
          }
        },
        expected: false
      },
      {
        state: {
          HasBeenOrdered: { value: 'Yes' },
          List: {
            branch: { value: '' },
            items: [{}]
          }
        },
        expected: false
      },
      {
        state: {
          HasBeenOrdered: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [{Item: {}}]
          }
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new OrderedCounselingsValidator(test.state).isValid()).toBe(test.expected)
    })
  })
})
