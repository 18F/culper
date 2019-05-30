import PoliceOffensesValidator from './policeoffenses'
import Location from '../components/Form/Location'

describe('Police record validation', () => {
  it('validates offenses', () => {
    const tests = [
      {
        state: {
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  Has: { value: 'No' },
                },
              },
            ],
          },
        },
        expected: true,
      },
      {
        state: {
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  Has: { value: 'Yes' },
                  Date: {
                    day: '1',
                    month: '1',
                    year: '2016',
                  },
                  Description: {
                    value: 'Some description',
                  },
                  InvolvedViolence: { value: 'No' },
                  InvolvedFirearms: { value: 'No' },
                  InvolvedSubstances: { value: 'No' },
                  Address: {
                    country: { value: 'United States' },
                    city: 'Arlington',
                    state: 'VA',
                    zipcode: '22202',
                    layout: Location.OFFENSE,
                  },
                  WasCited: { value: 'Yes' },
                  CitedBy: {
                    value: 'Somebody',
                  },
                  WasCharged: { value: 'No' },
                  Explanation: {
                    value: 'Some explanation',
                  },
                  AgencyAddress: {
                    country: { value: 'United States' },
                    city: 'Arlington',
                    state: 'VA',
                    zipcode: '22202',
                    layout: Location.OFFENSE,
                  },
                  WasSentenced: { value: 'No' },
                  AwaitingTrial: { value: 'Yes' },
                  AwaitingTrialExplanation: {
                    value: 'Yessss',
                  },
                },
              },
              {
                Item: {
                  Has: { value: 'No' },
                },
              },
            ],
          },
        },
        expected: true,
      },
      {
        state: {
          List: {
            branch: { value: '' },
            items: [{ Item: {} }],
          },
        },
        expected: false,
      },
      {
        state: {
          List: {
            branch: { value: '' },
            items: [],
          },
        },
        expected: false,
      },
      {
        state: {
          List: {
            branch: { value: 'No' },
            items: [{ Item: {} }],
          },
        },
        expected: false,
      },
      {
        state: {
          List: {
            branch: { value: 'No' },
            items: [{ Item: { Has: { value: 'No' } } }],
          },
        },
        expected: true,
      },
    ]

    tests.forEach((test) => {
      expect(new PoliceOffensesValidator(test.state, null).isValid()).toBe(
        test.expected
      )
    })
  })
})
