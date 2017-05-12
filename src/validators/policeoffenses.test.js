import PoliceOffensesValidator from './policeoffenses'

describe('Police record validation', function () {
  it('can validate checks against multiple branches', () => {
    const tests = [
      {
        state: {
          HasSummons: 'Yes',
          HasArrests: null,
          HasCharges: null,
          HasProbation: null,
          HasTrial: null
        },
        expected: false
      },
      {
        state: {
          HasSummons: 'Yes',
          HasArrests: 'No',
          HasCharges: 'No',
          HasProbation: 'No',
          HasTrial: 'No'
        },
        expected: true
      },
      {
        state: {
          HasSummons: 'Yes',
          HasArrests: 'Yes',
          HasCharges: 'Yes',
          HasProbation: 'Yes',
          HasTrial: 'Yes'
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new PoliceOffensesValidator(test.state, null).validChecks()).toBe(test.expected)
    })
  })

  it('validates offenses', () => {
    const tests = [
      {
        state: {
          HasSummons: 'No',
          HasArrests: 'No',
          HasCharges: 'No',
          HasProbation: 'No',
          HasTrial: 'No',
          List: []
        },
        expected: true
      },
      {
        state: {
          HasSummons: 'No',
          HasArrests: 'No',
          HasCharges: 'No',
          HasProbation: 'No',
          HasTrial: 'Yes',
          List: [
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
                InvolvedViolence: 'No',
                InvolvedFirearms: 'No',
                InvolvedSubstances: 'No',
                Address: {
                  addressType: 'United States',
                  address: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'Virginia',
                  zipcode: '22202'
                },
                WasCited: 'Yes',
                CitedBy: {
                  value: 'Somebody'
                },
                WasCharged: 'No',
                Explanation: {
                  value: 'Some explanation'
                },
                AgencyAddress: {
                  addressType: 'United States',
                  address: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'Virginia',
                  zipcode: '22202'
                },

                WasSentenced: 'No',
                AwaitingTrial: 'Yes',
                AwaitingTrialExplanation: {
                  value: 'Yessss'
                }
              }
            }
          ]
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new PoliceOffensesValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
