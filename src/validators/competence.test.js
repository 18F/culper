import CompetenceValidator from './competence'

describe('Competence validation', function () {
  it('validates competence', () => {
    const tests = [
      {
        state: {
          IsIncompetent: 'Yes',
          List: [
            {
              Competence: {
                CourtName: {
                  value: 'Circuit Court'
                },
                CourtAddress: {
                  addressType: 'United States',
                  address: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'Virginia',
                  zipcode: '22202'
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
              Competence: {
                CourtName: null,
                CourtAddress: {
                  addressType: 'United States',
                  address: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'Virginia',
                  zipcode: '22202'
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
