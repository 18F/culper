import PoliceOffensesValidator from './policeoffenses'
import Location from '../components/Form/Location'

describe('Police record validation', function () {
  it('validates offenses', () => {
    const tests = [
      {
        state: {
          HasOffenses: { value: 'No' },
          List: {
            branch: { value: 'No' },
            items: []
          }
        },
        expected: true
      },
      {
        state: {
          HasOffenses: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  Date: {
                    day: '1',
                    month: '1',
                    year: '2016',
                    date: new Date('1/1/2016')
                  },
                  Description: {
                    value: 'Some description'
                  },
                  InvolvedViolence: { value: 'No' },
                  InvolvedFirearms: { value: 'No' },
                  InvolvedSubstances: { value: 'No' },
                  Address: {
                    country: { value: 'United States' },
                    street: '1234 Some Rd',
                    city: 'Arlington',
                    state: 'VA',
                    zipcode: '22202',
                    layout: Location.ADDRESS
                  },
                  WasCited: { value: 'Yes' },
                  CitedBy: {
                    value: 'Somebody'
                  },
                  WasCharged: { value: 'No' },
                  Explanation: {
                    value: 'Some explanation'
                  },
                  AgencyAddress: {
                    country: { value: 'United States' },
                    street: '1234 Some Rd',
                    city: 'Arlington',
                    state: 'VA',
                    zipcode: '22202',
                    layout: Location.ADDRESS
                  },
                  WasSentenced: { value: 'No' },
                  AwaitingTrial: { value: 'Yes' },
                  AwaitingTrialExplanation: {
                    value: 'Yessss'
                  }
                }
              }
            ]
          }
        },
        expected: true
      },
      {
        state: {
          HasOffenses: { value: 'Yes' },
          List: {
            branch: { value: '' },
            items: [{Item: {}}]
          }
        },
        expected: false
      },
      {
        state: {
          HasOffenses: { value: 'Yes' },
          List: {
            branch: { value: '' },
            items: []
          }
        },
        expected: false
      },
      {
        state: {
          HasOffenses: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [{Item: {}}]
          }
        },
        expected: false
      },
      {
        state: {
          HasOffenses: { value: 'No' }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new PoliceOffensesValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
