import FederalServiceValidator from './federalservice'
import Location from '../components/Form/Location'

describe('Federal service component validation', function () {
  it('should validate employment entry', function () {
    const tests = [
      {
        state: {
          List: []
        },
        expected: false
      },
      {
        state: {
          HasFederalService: { value: 'No' },
          List: []
        },
        expected: true
      },
      {
        state: {
          HasFederalService: { value: 'Yes' },
          List: [],
          ListBranch: 'No'
        },
        expected: false
      },
      {
        state: {
          HasFederalService: { value: 'Yes' },
          List: [{}],
          ListBranch: ''
        },
        expected: false
      },
      {
        state: {
          HasFederalService: { value: 'Yes' },
          List: [
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
                    date: new Date('1/1/2010')
                  },
                  to: {
                    date: new Date('1/1/2016')
                  },
                  present: false
                },
                Address: {
                  country: { value: 'United States' },
                  street: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'Virginia',
                  zipcode: '22202',
                  layout: Location.ADDRESS
                }
              }
            }
          ],
          ListBranch: 'No'
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new FederalServiceValidator(test.state).isValid()).toBe(test.expected)
    })
  })
})
