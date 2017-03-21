import MilitaryHistoryValidator from './militaryhistory'

describe('Military history validation', function () {
  it('handle whether subject has served in the military', () => {
    const tests = [
      {
        state: {
          HasServed: ''
        },
        expected: false
      },
      {
        state: {
          HasServed: 'No'
        },
        expected: true
      },
      {
        state: {
          HasServed: 'Yes'
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new MilitaryHistoryValidator(test.state, null).validServed()).toBe(test.expected)
    })
  })

  it('handle overall validity', function () {
    const tests = [
      {
        state: {
          HasServed: 'Yes'
        },
        expected: false
      },
      {
        state: {
          HasServed: 'Yes',
          List: [
            {
              Item: {
                Service: 'AirNationalGuard',
                Status: 'ActiveDuty',
                Officer: 'Enlisted',
                ServiceNumber: '0123456789',
                Dates: {
                  from: {
                    date: new Date('1/1/2010')
                  },
                  to: {
                    date: new Date('1/1/2012')
                  },
                  present: false
                },
                HasBeenDischarged: 'Yes'
              }
            }
          ]
        },
        expected: false
      },
      {
        state: {
          HasServed: 'Yes',
          List: [
            {
              Item: {
                Service: 'AirNationalGuard',
                Status: 'ActiveDuty',
                Officer: 'Enlisted',
                ServiceNumber: '0123456789',
                Dates: {
                  from: {
                    date: new Date('1/1/2010')
                  },
                  to: {
                    date: new Date('1/1/2012')
                  },
                  present: false
                },
                HasBeenDischarged: 'Yes',
                DischargeType: 'Other',
                DischargeTypeOther: {
                  value: 'Something'
                },
                DischargeReason: {
                  value: 'My reason'
                },
                DischargeDate: {
                  day: '1',
                  month: '1',
                  year: '2016',
                  date: new Date('1/1/2012')
                }
              }
            }
          ]
        },
        expected: true
      },
      {
        state: {
          HasServed: 'Yes',
          List: [
            {
              Item: {
                Service: 'AirNationalGuard',
                Status: 'ActiveDuty',
                Officer: 'Enlisted',
                ServiceNumber: '0123456789',
                Dates: {
                  from: {
                    date: new Date('1/1/2010')
                  },
                  to: {
                    date: new Date('1/1/2012')
                  },
                  present: false
                },
                HasBeenDischarged: 'Yes',
                DischargeType: 'Honorable',
                DischargeDate: {
                  day: '1',
                  month: '1',
                  year: '2016',
                  date: new Date('1/1/2012')
                }
              }
            }
          ]
        },
        expected: true
      },
      {
        state: {
          HasServed: 'Yes',
          List: [
            {
              Item: {
                Service: 'AirNationalGuard',
                Status: 'ActiveDuty',
                Officer: 'Enlisted',
                ServiceNumber: '0123456789',
                Dates: {
                  from: {
                    date: new Date('1/1/2010')
                  },
                  to: {
                    date: new Date('1/1/2012')
                  },
                  present: false
                },
                HasBeenDischarged: 'Yes',
                DischargeType: 'General',
                DischargeReason: {
                  value: 'My reason'
                },
                DischargeDate: {
                  day: '1',
                  month: '1',
                  year: '2016',
                  date: new Date('1/1/2012')
                }
              }
            }
          ]
        },
        expected: true
      },
      {
        state: {
          HasServed: 'Yes',
          List: [
            {
              Item: {
                Service: 'AirNationalGuard',
                Status: 'ActiveDuty',
                Officer: 'Enlisted',
                ServiceNumber: '0123456789',
                Dates: {
                  from: {
                    date: new Date('1/1/2010')
                  },
                  to: {
                    date: new Date('1/1/2012')
                  },
                  present: false
                },
                HasBeenDischarged: 'No'
              }
            }
          ]
        },
        expected: true
      },
      {
        state: {
          HasServed: 'Yes',
          List: [
            {
              Item: {
                Service: 'Army',
                Officer: 'Enlisted',
                ServiceNumber: '0123456789',
                Dates: {
                  from: {
                    date: new Date('1/1/2010')
                  },
                  to: {
                    date: new Date('1/1/2012')
                  },
                  present: false
                },
                HasBeenDischarged: 'No'
              }
            }
          ]
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new MilitaryHistoryValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
