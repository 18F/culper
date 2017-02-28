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
                Dates: {
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
                },
                Telephone: {
                  noNumber: '',
                  number: '2028675309',
                  numberType: 'Cell',
                  timeOfDay: 'Day'
                },
                ReasonLeft: {
                  Reason: 'Fired',
                  Date: {
                    date: new Date('1/1/2012')
                  },
                  Text: {
                    value: 'Some excuse'
                  }
                },
                Reference: {
                  FullName: {
                    first: 'Foo',
                    firstInitialOnly: false,
                    middle: 'J',
                    middleInitialOnly: true,
                    noMiddleName: false,
                    last: 'Bar',
                    lastInitialOnly: false,
                    suffix: 'Jr'
                  },
                  LastContact: {
                    day: '1',
                    month: '1',
                    year: '2016',
                    date: new Date('1/1/2016')
                  },
                  Relationship: 'Friend',
                  Phone: {
                    noNumber: '',
                    number: '7031112222',
                    numberType: 'Home',
                    timeOfDay: 'Both',
                    extension: ''
                  },
                  Email: {
                    value: 'user@local.dev'
                  },
                  Address: {
                    addressType: 'United States',
                    address: '1234 Some Rd',
                    city: 'Arlington',
                    state: 'Virginia',
                    zipcode: '22202'
                  }
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
