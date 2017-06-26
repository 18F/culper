import HistoryValidator from './history'
import Location from '../components/Form/Location'

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
                  value: 'FederalContractor'
                },
                Dates: {
                  from: {
                    date: new Date('1/1/2010')
                  },
                  to: {
                    date: new Date('1/1/2012')
                  },
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
                  country: 'United States',
                  street: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'Virginia',
                  zipcode: '22202',
                  layout: Location.ADDRESS
                },
                Additional: {
                  List: [{ Has: 'No' }]
                },
                Telephone: {
                  noNumber: '',
                  number: '2028675309',
                  numberType: 'Cell',
                  timeOfDay: 'Day'
                },
                Supervisor: {
                  Address: {
                    country: 'United States',
                    street: '1234 Some Rd',
                    city: 'Arlington',
                    state: 'Virginia',
                    zipcode: '22202',
                    layout: Location.ADDRESS
                  },
                  Email: {
                    value: 'foo@local.dev'
                  },
                  SupervisorName: {
                    value: 'John Doe'
                  },
                  Telephone: {
                    noNumber: '',
                    number: '2021112222',
                    numberType: 'Cell',
                    timeOfDay: 'Day'
                  },
                  Title: {
                    value: 'The Foo'
                  }
                },
                ReasonLeft: {
                  Reasons: [
                    {
                      Has: 'Yes',
                      Reason: 'Fired',
                      Date: {
                        date: new Date('1/1/2016'),
                        day: '1',
                        month: '1',
                        year: '2016'
                      },
                      Text: {
                        value: 'Some excuse'
                      }
                    }
                  ]
                },
                Reprimand: {
                  Reasons: [
                    {
                      Date: {
                        date: new Date('1/1/2015'),
                        month: '1',
                        year: '2015'
                      },
                      Has: 'Yes',
                      Text: {
                        value: 'Foo'
                      }
                    }
                  ]
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
