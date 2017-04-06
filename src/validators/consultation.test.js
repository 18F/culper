import ConsultationValidator from './consultation'

describe('Consultation validation', function () {
  it('validates competence', () => {
    const tests = [
      {
        state: {
          IsIncompetent: 'Yes',
          List: [
            {
              Consultation: {
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
          ]
        },
        expected: true
      },
      {
        state: {
          List: [],
          IsIncompetent: 'Yes'
        },
        expected: false
      },
      {
        state: {
          List: [],
          IsIncompetent: 'No'
        },
        expected: true
      },
      {
        state: {
          List: [],
          IsIncompetent: 'Nope'
        },
        expected: false
      },
      {
        state: {
          IsIncompetent: 'Yes',
          List: [
            {
              Consultation: {
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
          ]
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new ConsultationValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
