import CompetenceValidator from './competence'
import Location from '../components/Form/Location'

describe('Competence validation', function () {
  it('validates competence', () => {
    const tests = [
      {
        state: {
          IsIncompetent: 'Yes',
          List: [
            {
              Item: {
                CourtName: {
                  value: 'Circuit Court'
                },
                CourtAddress: {
                  country: 'United States',
                  street: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'Virginia',
                  zipcode: '22202',
                  layout: Location.ADDRESS
                },
                Disposition: {
                  value: 'Stuff'
                },
                Occurred: {
                  day: '1',
                  month: '1',
                  year: '2016',
                  date: new Date('1/1/2016')
                },
                Appeals: [{ Has: 'No' }]
              }
            }
          ],
          ListBranch: 'No'
        },
        expected: true
      },
      {
        state: {
          List: [],
          ListBranch: 'No',
          IsIncompetent: 'Yes'
        },
        expected: false
      },
      {
        state: {
          List: [],
          ListBranch: 'No',
          IsIncompetent: 'No'
        },
        expected: true
      },
      {
        state: {
          List: [],
          ListBranch: 'No',
          IsIncompetent: 'Nope'
        },
        expected: false
      },
      {
        state: {
          IsIncompetent: 'Yes',
          List: [
            {
              Item: {
                CourtName: null,
                CourtAddress: {
                  country: 'United States',
                  street: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'Virginia',
                  zipcode: '22202',
                  layout: Location.ADDRESS
                },
                Disposition: {
                  value: 'Stuff'
                },
                Occurred: {
                  day: '1',
                  month: '1',
                  year: '2016',
                  date: new Date('1/1/2016')
                },
                Appeals: [{ Has: 'No' }]
              }
            }
          ],
          ListBranch: 'No'
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new CompetenceValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
