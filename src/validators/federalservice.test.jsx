import FederalServiceValidator from './federalservice'

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
          HasFederalService: 'No',
          List: []
        },
        expected: true
      },
      {
        state: {
          HasFederalService: 'Yes',
          List: []
        },
        expected: false
      },
      {
        state: {
          HasFederalService: 'Yes',
          List: [
            {
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
                addressType: 'United States',
                address: '1234 Some Rd',
                city: 'Arlington',
                state: 'Virginia',
                zipcode: '22202'
              }
            }
          ]
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new FederalServiceValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
