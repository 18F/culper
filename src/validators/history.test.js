import HistoryValidator from './history'
import Location from '../components/Form/Location'

describe('Employment component validation', function() {
  it('should validate entire history', function() {
    const tests = [
      {
        data: {
          List: {
            items: [
              {
                type: 'Employment',
                Item: {
                  EmploymentActivity: {
                    value: 'FederalContractor'
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
                      year: '2012',
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
                    country: { value: 'United States' },
                    street: '1234 Some Rd',
                    city: 'Arlington',
                    state: 'VA',
                    zipcode: '22202',
                    layout: Location.ADDRESS
                  },
                  PhysicalAddress: {
                    HasDifferentAddress: { value: 'Yes' },
                    Address: {
                      country: { value: 'United States' },
                      street: '1234 Some Rd',
                      city: 'Arlington',
                      state: 'VA',
                      zipcode: '22202',
                      layout: Location.ADDRESS
                    }
                  },
                  Additional: {
                    items: [{ Item: { Has: { value: 'No' } } }]
                  },
                  Telephone: {
                    noNumber: '',
                    number: '2028675309',
                    numberType: 'Cell',
                    timeOfDay: 'Day',
                    type: 'Domestic'
                  },
                  Supervisor: {
                    Address: {
                      country: { value: 'United States' },
                      street: '1234 Some Rd',
                      city: 'Arlington',
                      state: 'VA',
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
                      type: 'Domestic',
                      timeOfDay: 'Day'
                    },
                    Title: {
                      value: 'The Foo'
                    }
                  },
                  ReasonLeft: {
                    ReasonDescription: { value: 'Because' },
                    Reasons: {
                      items: [
                        {
                          Item: {
                            Has: { value: 'No' },
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
                        }
                      ]
                    }
                  },
                  Reprimand: {
                    items: [
                      {
                        Item: {
                          Has: { value: 'Yes' },
                          Date: {
                            date: new Date('1/1/2015'),
                            month: '1',
                            year: '2015'
                          },
                          Text: {
                            value: 'Foo'
                          }
                        }
                      },
                      {
                        Item: {
                          Has: { value: 'No' }
                        }
                      }
                    ]
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
      expect(new HistoryValidator(test.data).isValid()).toBe(test.expected)
    })
  })
})
