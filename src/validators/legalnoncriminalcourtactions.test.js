import NonCriminalCourtActionsValidator from './legalnoncriminalcourtactions'
import Location from '../components/Form/Location'

describe('received counseling component validation', function() {
  it('can validate list of court actions', () => {
    const tests = [
      {
        state: {
          HasCourtActions: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  CivilActionDate: {
                    day: '1',
                    month: '1',
                    year: '2016'
                  },
                  CourtName: {
                    value: 'The name'
                  },
                  CourtAddress: {
                    country: { value: 'United States' },
                    street: '1234 Some Rd',
                    city: 'Arlington',
                    state: 'VA',
                    zipcode: '22202',
                    layout: Location.ADDRESS
                  },
                  NatureOfAction: {
                    value: 'Nature of action'
                  },
                  ResultsOfAction: {
                    value: 'Results of action'
                  },
                  PrincipalPartyNames: {
                    value: 'John Doe'
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
          HasCourtActions: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          HasCourtActions: { value: 'Yes' },
          List: {
            branch: { value: '' },
            items: []
          }
        },
        expected: false
      },
      {
        state: {
          HasCourtActions: { value: 'Yes' },
          List: {
            branch: { value: 'Nope' },
            items: [{}]
          }
        },
        expected: false
      },
      {
        state: {
          HasCourtActions: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [{ Item: {} }]
          }
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new NonCriminalCourtActionsValidator(test.state).isValid()).toBe(
        test.expected
      )
    })
  })
})
