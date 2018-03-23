import FederalServiceValidator from './federalservice'
import Location from '../components/Form/Location'

describe('Federal service component validation', function () {
  it('should validate employment entry', function () {
    const tests = [
      {
        state: {
          List: {
            branch: { value: '' },
            items: []
          }
        },
        expected: false
      },
      {
        state: {
          HasFederalService: { value: 'No' },
          List: {
            branch: { value: '' },
            items: []
          }
        },
        expected: true
      },
      {
        state: {
          HasFederalService: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: []
          }
        },
        expected: false
      },
      {
        state: {
          HasFederalService: { value: 'Yes' },
          List: {
            branch: { value: '' },
            items: [{}]
          }
        },
        expected: false
      },
      {
        state: {
          HasFederalService: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  Name: {
                    value: 'FDA'
                  },
                  Position: {
                    value: 'CTR'
                  },
                  Dates: {
                    from: {
                      month: '1',
                      day: '1',
                      year: '2010',
                      date: new Date('1/1/2010')
                    },
                    to: {
                      month: '1',
                      day: '1',
                      year: '2016',
                      date: new Date('1/1/2016')
                    },
                    present: false
                  },
                  Address: {
                    country: { value: 'United States' },
                    street: '1234 Some Rd',
                    city: 'Arlington',
                    state: 'VA',
                    zipcode: '22202',
                    layout: Location.ADDRESS
                  }
                }
              }
            ]
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new FederalServiceValidator(test.state).isValid()).toBe(test.expected)
    })
  })
})
