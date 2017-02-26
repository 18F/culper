import HistoryValidator from './history'

describe('Employment component validation', function () {
  it('should validate entire history', function () {
    const tests = [
      {
        state: {
          List: [
            {
              type: 'Employment',
              Item: {
                EmploymentActivity: {
                  value: 'Contractor'
                },
                DatesEmployed: {
                  from: new Date('1/1/2010'),
                  to: new Date('1/1/2012'),
                  present: false
                },
                Employment: {
                  value: 'SW'
                },
                Status: {
                  value: 'Some status'
                },
                Title: {
                  value: 'Dev'
                },
                Address: {
                  addressType: 'United States',
                  address: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'Virginia',
                  zipcode: '22202'
                },
                Additional: {
                  HasAdditionalActivity: 'No',
                  List: []
                }
              }
            }
          ]
        },
        expected: true
      },
      {
        state: {
          List: [
            {
              type: 'Employment',
              Item: {
                EmploymentActivity: {
                  value: 'Contractor'
                }
              }
            }
          ]
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new HistoryValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
