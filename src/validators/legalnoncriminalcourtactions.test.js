import NonCriminalCourtActionsValidator from './legalnoncriminalcourtactions'
import Location from '../components/Form/Location'

describe('received counseling component validation', function () {
  it('can validate list of court actions', () => {
    const tests = [
      {
        state: {
          ListBranch: 'No',
          HasCourtActions: 'Yes',
          List: [
            {
              Item: {
                CivilActionDate: {
                  day: '1',
                  month: '1',
                  year: '2016',
                  date: new Date('1/1/2016')
                },
                CourtName: {
                  value: 'The name'
                },
                CourtAddress: {
                  country: { value: 'United States' },
                  street: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'Virginia',
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
        },
        expected: true
      },
      {
        state: {
          HasCourtActions: 'No'
        },
        expected: true
      },
      {
        state: {
          HasCourtActions: 'Yes',
          List: []
        },
        expected: false
      },
      {
        state: {
          HasCourtActions: 'Yes',
          ListBranch: 'Nope',
          List: [{}]
        },
        expected: false
      },
      {
        state: {
          HasCourtActions: 'Yes',
          ListBranch: 'No',
          List: [{Item: {}}]
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new NonCriminalCourtActionsValidator(test.state).isValid()).toBe(test.expected)
    })
  })
})
