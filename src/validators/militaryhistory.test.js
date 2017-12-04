import MilitaryHistoryValidator from './militaryhistory'

describe('Military history validation', function () {
  it('handle whether subject has served in the military', () => {
    const tests = [
      {
        state: {
          HasServed: { value: '' }
        },
        expected: false
      },
      {
        state: {
          HasServed: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          HasServed: { value: 'Yes' }
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
          HasServed: { value: 'Yes' }
        },
        expected: false
      },
      {
        state: {
          HasServed: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  Service: 'AirNationalGuard',
                  Status: 'ActiveDuty',
                  Officer: 'Enlisted',
                  ServiceNumber: {
                    value: '0123456789'
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
                  HasBeenDischarged: { value: 'Yes' }
                }
              }
            ]
          }
        },
        expected: false
      },
      {
        state: {
          HasServed: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  Service: 'AirNationalGuard',
                  Status: 'ActiveDuty',
                  Officer: 'Enlisted',
                  ServiceNumber: {
                    value: '0123456789'
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
                  HasBeenDischarged: { value: 'Yes' },
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
          }
        },
        expected: true
      },
      {
        state: {
          HasServed: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  Service: 'AirNationalGuard',
                  Status: 'ActiveDuty',
                  Officer: 'Enlisted',
                  ServiceNumber: {
                    value: '0123456789'
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
                  HasBeenDischarged: { value: 'Yes' },
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
          }
        },
        expected: true
      },
      {
        state: {
          HasServed: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  Service: 'AirNationalGuard',
                  Status: 'ActiveDuty',
                  Officer: 'Enlisted',
                  ServiceNumber: {
                    value: '0123456789'
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
                  HasBeenDischarged: { value: 'Yes' },
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
          }
        },
        expected: true
      },
      {
        state: {
          HasServed: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  Service: 'AirNationalGuard',
                  Status: 'ActiveDuty',
                  Officer: 'Enlisted',
                  ServiceNumber: {
                    value: '0123456789'
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
                  HasBeenDischarged: { value: 'No' }
                }
              }
            ]
          }
        },
        expected: true
      },
      {
        state: {
          HasServed: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  Service: 'Army',
                  Officer: 'Enlisted',
                  ServiceNumber: {
                    value: '0123456789'
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
                  HasBeenDischarged: { value: 'No' }
                }
              }
            ]
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new MilitaryHistoryValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
