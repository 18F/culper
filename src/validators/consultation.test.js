import ConsultationValidator from './consultation'
import Location from '../components/Form/Location'

describe('Consultation validation', function () {
  it('validates competence', () => {
    const tests = [
      {
        state: {
          Consulted: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  CourtName: {
                    value: 'Circuit Court'
                  },
                  CourtAddress: {
                    country: { value: 'United States' },
                    street: '1234 Some Rd',
                    city: 'Arlington',
                    state: 'VA',
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
                  Appeals: {
                    items: [{ Item: { Has: { value: 'No' } } }]
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
          Consulted: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: []
          }
        },
        expected: false
      },
      {
        state: {
          Consulted: { value: 'No' },
          List: {
            branch: { value: 'No' },
            items: []
          }
        },
        expected: true
      },
      {
        state: {
          Consulted: { value: 'Nope' },
          List: {
            branch: { value: 'No' },
            items: []
          }
        },
        expected: false
      },
      {
        state: {
          Consulted: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  CourtName: null,
                  CourtAddress: {
                    country: { value: 'United States' },
                    street: '1234 Some Rd',
                    city: 'Arlington',
                    state: 'VA',
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
                  Appeals: {
                    items: [{ Item: { Has: { value: 'No' } } }]
                  }
                }
              }
            ]
          }
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new ConsultationValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
