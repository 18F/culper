import ConsultationValidator from './consultation'
import Location from '../components/Form/Location'

describe('Consultation validation', function () {
  it('validates competence', () => {
    const tests = [
      {
        state: {
          Consulted: { value: 'Yes' },
          List: [
            {
              Item: {
                CourtName: {
                  value: 'Circuit Court'
                },
                CourtAddress: {
                  country: { value: 'United States' },
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
          Consulted: { value: 'Yes' },
          ListBranch: 'No'
        },
        expected: false
      },
      {
        state: {
          List: [],
          Consulted: { value: 'No' },
          ListBranch: 'No'
        },
        expected: true
      },
      {
        state: {
          List: [],
          Consulted: { value: 'Nope' },
          ListBranch: 'No'
        },
        expected: false
      },
      {
        state: {
          Consulted: { value: 'Yes' },
          List: [
            {
              Item: {
                CourtName: null,
                CourtAddress: {
                  country: { value: 'United States' },
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
      expect(new ConsultationValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
