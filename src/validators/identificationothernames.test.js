import IdentificationOtherNamesValidator, { OtherNameValidator } from './identificationothernames'

describe('OtherNames validation', function () {
  it('should validate has other names', function () {
    const tests = [
      {
        state: {
          HasOtherNames: { value: 'Yes' }
        },
        expected: true
      },
      {
        state: {
          HasOtherNames: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          HasOtherNames: { value: 'Blah' }
        },
        expected: false
      },
      {
        state: {
          HasOtherNames: { value: 'foo' }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new IdentificationOtherNamesValidator(test.state, null).validHasOtherNames()).toBe(test.expected)
    })
  })

  it('should validate list of other names', function () {
    const tests = [
      {
        state: {
          HasOtherNames: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  Name: {
                    first: 'Foo',
                    firstInitialOnly: false,
                    middle: 'J',
                    middleInitialOnly: true,
                    noMiddleName: false,
                    last: 'Bar',
                    lastInitialOnly: false,
                    suffix: 'Jr'
                  },
                  MaidenName: {
                    value: 'Foo'
                  },
                  DatesUsed: {
                    from: {
                      date: new Date('1/1/2010')
                    },
                    to: {
                      date: new Date('1/1/2012')
                    }
                  },
                  Reason: {
                    value: 'Testing'
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
          HasOtherNames: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  Name: {
                    first: '',
                    firstInitialOnly: false,
                    middle: 'J',
                    middleInitialOnly: true,
                    noMiddleName: false,
                    last: 'Bar',
                    lastInitialOnly: false,
                    suffix: 'Jr'
                  },
                  MaidenName: {
                    value: 'Foo'
                  },
                  DatesUsed: {
                    from: {
                      date: new Date('1/1/2010')
                    },
                    to: {
                      date: new Date('1/1/2012')
                    },
                    present: false
                  },
                  Reason: {
                    value: 'Testing'
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
          HasOtherNames: { value: 'Foo' },
          List: {
            branch: { value: 'No' },
            items: []
          }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new IdentificationOtherNamesValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })

  it('should validate name', function () {
    const tests = [
      {
        state: {
          Name: {
            first: 'Foo',
            firstInitialOnly: false,
            middle: 'J',
            middleInitialOnly: true,
            noMiddleName: false,
            last: 'Bar',
            lastInitialOnly: false,
            suffix: 'Jr'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new OtherNameValidator(test.state, null).validName()).toBe(test.expected)
    })
  })

  it('should validate maiden name', function () {
    const tests = [
      {
        state: {
          MaidenName: {
            value: 'Foo'
          }
        },
        expected: true
      },
      {
        state: {
          MaidenName: {
            value: ''
          }
        },
        expected: false
      },
      {
        state: {
          MaidenName: null
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new OtherNameValidator(test.state, null).validMaidenName()).toBe(test.expected)
    })
  })

  it('should validate dates used', function () {
    const tests = [
      {
        state: {
          DatesUsed: {
            from: {
              date: new Date('1/1/2010')
            },
            to: {
              date: new Date('1/1/2012')
            },
            present: false
          }
        },
        expected: true
      },
      {
        state: {
          DatesUsed: null
        },
        expected: false
      },
      {
        state: {
          DatesUsed: {
            from: {
              date: null
            },
            to: {
              date: new Date('1/1/2012')
            }
          }
        },
        expected: false
      },
      {
        state: {
          DatesUsed: {
            from: {
              date: new Date('1/1/2010')
            },
            to: {
              date: null
            }
          }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new OtherNameValidator(test.state, null).validDatesUsed()).toBe(test.expected)
    })
  })

  it('should validate a full other name', function () {
    const tests = [
      {
        state: {
          Name: {
            first: 'Foo',
            firstInitialOnly: false,
            middle: 'J',
            middleInitialOnly: true,
            noMiddleName: false,
            last: 'Bar',
            lastInitialOnly: false,
            suffix: 'Jr'
          },
          MaidenName: {
            value: 'Foo'
          },
          DatesUsed: {
            from: {
              date: new Date('1/1/2010')
            },
            to: {
              date: new Date('1/1/2012')
            },
            present: false
          },
          Reason: {
            value: 'Testing'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new OtherNameValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
