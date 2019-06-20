import CompetenceValidator from './competence'
import Location from '../components/Form/Location'

describe('Competence validation', function() {
  it('validates competence', () => {
    const tests = [
      {
        data: {
          IsIncompetent: { value: 'Yes' },
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
                    year: '2016'
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
        data: {
          IsIncompetent: { value: 'Yes' },
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
                  Occurred: {
                    day: '1',
                    month: '1',
                    year: '2016'
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
        data: {
          List: {
            branch: { value: 'No' },
            items: []
          },
          IsIncompetent: { value: 'Yes' }
        },
        expected: false
      },
      {
        data: {
          List: {
            branch: { value: 'No' },
            items: []
          },
          IsIncompetent: { value: 'No' }
        },
        expected: true
      },
      {
        data: {
          List: {
            branch: { value: 'No' },
            items: []
          },
          IsIncompetent: { value: 'Nope' }
        },
        expected: false
      },
      {
        data: {
          IsIncompetent: { value: 'Yes' },
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
                    year: '2016'
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
      expect(new CompetenceValidator(test.data).isValid()).toBe(test.expected)
    })
  })
})
