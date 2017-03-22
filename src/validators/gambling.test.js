import GamblingValidator from './gambling'

describe('gambling debt component validation', function () {
  it('should validate has gambling debt', function () {
    const tests = [
      {
        state: {
          HasGamblingDebt: 'Yes'
        },
        expected: true
      },
      {
        state: {
          HasGamblingDebt: 'No'
        },
        expected: true
      },
      {
        state: {
          HasGamblingDebt: 'Blah'
        },
        expected: false
      },
      {
        state: {
          HasGamblingDebt: 'foo'
        },
        expected: false
      },
      {
        state: {
          HasGamblingDebt: null
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new GamblingValidator(test.state, null).validHasGamblingDebt()).toBe(test.expected)
    })
  })

  it('should validate gambling debt fields', function () {
    const tests = [
      {
        state: {
          HasGamblingDebt: 'Yes',
          List: [
            {
              Losses: {
                value: 10
              },
              Description: {
                value: 'Blah blah blah'
              },
              Actions: {
                value: 'Some action'
              },
              Dates: {
                from: {
                  date: new Date('1/1/2015')
                },
                to: {
                  date: new Date('1/1/2016')
                },
                present: false
              }
            }
          ]
        },
        expected: true
      },
      {
        state: {
          HasGamblingDebt: 'Yes',
          List: [
            {
              Losses: {
                value: 10
              },
              Description: {
                value: 'Blah blah blah'
              },
              Actions: {
                value: 'Some action'
              },
              Dates: {
                from: null,
                to: new Date('1/1/2016'),
                present: false
              }
            }
          ]
        },
        expected: false
      },
      {
        state: {
          HasGamblingDebt: 'Yes',
          List: [
            {
              Losses: {
                value: 10
              },
              Description: {
                value: 'Blah blah blah'
              },
              Actions: {
                value: ''
              },
              Dates: {
                from: {
                  date: new Date('1/1/2015')
                },
                to: {
                  date: new Date('1/1/2016')
                },
                present: false
              }
            }
          ]
        },
        expected: false
      },
      {
        state: {
          HasGamblingDebt: 'Yes',
          List: [
            {
              Losses: {
                value: 10
              },
              Description: {
                value: ''
              },
              Actions: {
                value: 'Foo'
              },
              Dates: {
                from: {
                  date: new Date('1/1/2015')
                },
                to: {
                  date: new Date('1/1/2016')
                },
                present: false
              }
            }
          ]
        },
        expected: false
      },
      {
        state: {
          HasGamblingDebt: 'Yes',
          List: [
            {
              Losses: {
                value: 0
              },
              Description: {
                value: ''
              },
              Actions: {
                value: 'Foo'
              },
              Dates: {
                from: {
                  date: new Date('1/1/2015')
                },
                to: {
                  date: new Date('1/1/2016')
                },
                present: false
              }
            }
          ]
        },
        expected: false
      },
      {
        state: {
          HasGamblingDebt: 'Yes',
          List: []
        },
        expected: false
      },
      {
        state: {
          HasGamblingDebt: 'Yes',
          List: null
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new GamblingValidator(test.state, null).validGamblingDebt()).toBe(test.expected)
    })
  })

  it('should validate gambling debt', function () {
    const tests = [
      {
        state: {
          HasGamblingDebt: 'Foo',
          List: []
        },
        expected: false
      },
      {
        state: {
          HasGamblingDebt: 'Yes',
          List: [
            {
              Losses: {
                value: 10
              },
              Description: {
                value: 'Blah blah blah'
              },
              Actions: {
                value: 'Some action'
              },
              Dates: {
                from: {
                  date: new Date('1/1/2015')
                },
                to: {
                  date: new Date('1/1/2016')
                },
                present: false
              }
            }
          ]
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new GamblingValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
