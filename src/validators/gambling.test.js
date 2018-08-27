import GamblingValidator from './gambling'

describe('gambling debt component validation', function() {
  it('should validate has gambling debt', function() {
    const tests = [
      {
        state: {
          HasGamblingDebt: { value: 'Yes' }
        },
        expected: true
      },
      {
        state: {
          HasGamblingDebt: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          HasGamblingDebt: { value: 'Blah' }
        },
        expected: false
      },
      {
        state: {
          HasGamblingDebt: { value: 'foo' }
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
      expect(
        new GamblingValidator(test.state, null).validHasGamblingDebt()
      ).toBe(test.expected)
    })
  })

  it('should validate gambling debt fields', function() {
    const tests = [
      {
        state: {
          HasGamblingDebt: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
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
                      month: '1',
                      day: '1',
                      year: '2015',
                      date: new Date('1/1/2015')
                    },
                    to: {
                      month: '1',
                      day: '1',
                      year: '2016',
                      date: new Date('1/1/2016')
                    },
                    present: false
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
          HasGamblingDebt: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
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
                    to: {
                      month: '1',
                      day: '1',
                      year: '2016'
                    },
                    present: false
                  }
                }
              }
            ]
          }
        },
        expected: false
      },
      {
        state: {
          HasGamblingDebt: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
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
                      month: '1',
                      day: '1',
                      year: '2015',
                      date: new Date('1/1/2015')
                    },
                    to: {
                      month: '1',
                      day: '1',
                      year: '2016',
                      date: new Date('1/1/2016')
                    },
                    present: false
                  }
                }
              }
            ]
          }
        },
        expected: false
      },
      {
        state: {
          HasGamblingDebt: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
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
                      month: '1',
                      day: '1',
                      year: '2015',
                      date: new Date('1/1/2015')
                    },
                    to: {
                      month: '1',
                      day: '1',
                      year: '2016',
                      date: new Date('1/1/2016')
                    },
                    present: false
                  }
                }
              }
            ]
          }
        },
        expected: false
      },
      {
        state: {
          HasGamblingDebt: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
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
                      month: '1',
                      day: '1',
                      year: '2015',
                      date: new Date('1/1/2015')
                    },
                    to: {
                      month: '1',
                      day: '1',
                      year: '2016',
                      date: new Date('1/1/2016')
                    },
                    present: false
                  }
                }
              }
            ]
          }
        },
        expected: false
      },
      {
        state: {
          HasGamblingDebt: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: []
          }
        },
        expected: false
      },
      {
        state: {
          HasGamblingDebt: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: null
          }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new GamblingValidator(test.state, null).validGamblingDebt()).toBe(
        test.expected
      )
    })
  })

  it('should validate gambling debt', function() {
    const tests = [
      {
        state: {
          HasGamblingDebt: { value: 'Foo' },
          List: {
            branch: { value: 'No' },
            items: []
          }
        },
        expected: false
      },
      {
        state: {
          HasGamblingDebt: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
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
                      month: '1',
                      day: '1',
                      year: '2015',
                      date: new Date('1/1/2015')
                    },
                    to: {
                      month: '1',
                      day: '1',
                      year: '2016',
                      date: new Date('1/1/2016')
                    },
                    present: false
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
      expect(new GamblingValidator(test.state, null).isValid()).toBe(
        test.expected
      )
    })
  })
})
