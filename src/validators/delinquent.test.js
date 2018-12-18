import DelinquentValidator, { DelinquentItemValidator } from './delinquent'
import Location from '../components/Form/Location'

describe('delinquent component validation', function() {
  it('validate name', () => {
    const tests = [
      {
        state: {
          Name: {
            value: ''
          }
        },
        expected: false
      },
      {
        state: {
          Name: {
            value: 'The name'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new DelinquentItemValidator(test.state, null).validName()).toBe(
        test.expected
      )
    })
  })

  it('validate infractions', () => {
    const tests = [
      {
        state: {
          Infractions: []
        },
        expected: false
      },
      {
        state: {
          Infractions: ['DoesNotExist']
        },
        expected: false
      },
      {
        state: {
          Infractions: ['Alimony']
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(
        new DelinquentItemValidator(test.state, null).validInfractions()
      ).toBe(test.expected)
    })
  })

  it('validate account number', () => {
    const tests = [
      {
        state: {
          AccountNumber: {
            value: ''
          }
        },
        expected: false
      },
      {
        state: {
          AccountNumber: {
            value: 'ABC1234567890'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(
        new DelinquentItemValidator(test.state, null).validAccountNumber()
      ).toBe(test.expected)
    })
  })

  it('validate property type', () => {
    const tests = [
      {
        state: {
          PropertyType: {
            value: ''
          }
        },
        expected: true
      },
      {
        state: {
          PropertyType: {
            value: 'ABC1234567890'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(
        new DelinquentItemValidator(test.state, null).validPropertyType()
      ).toBe(test.expected)
    })
  })

  it('validate amount', () => {
    const tests = [
      {
        state: {
          Amount: {
            value: ''
          }
        },
        expected: false
      },
      {
        state: {
          Amount: {
            value: 'abc'
          }
        },
        expected: false
      },
      {
        state: {
          Amount: {
            value: '0'
          }
        },
        expected: false
      },
      {
        state: {
          Amount: {
            value: '20000'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new DelinquentItemValidator(test.state, null).validAmount()).toBe(
        test.expected
      )
    })
  })

  it('validate reason', () => {
    const tests = [
      {
        state: {
          Reason: {
            value: ''
          }
        },
        expected: false
      },
      {
        state: {
          Reason: {
            value: 'Completely forgot'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new DelinquentItemValidator(test.state, null).validReason()).toBe(
        test.expected
      )
    })
  })

  it('validate status', () => {
    const tests = [
      {
        state: {
          Status: {
            value: ''
          }
        },
        expected: false
      },
      {
        state: {
          Status: {
            value: 'Paid'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new DelinquentItemValidator(test.state, null).validStatus()).toBe(
        test.expected
      )
    })
  })

  it('validate date', () => {
    const tests = [
      {
        state: {
          Date: null
        },
        expected: false
      },
      {
        state: {
          Date: {
            day: '1',
            month: '1',
            year: '2016',
            present: false
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new DelinquentItemValidator(test.state, null).validDate()).toBe(
        test.expected
      )
    })
  })

  it('validate resolved', () => {
    const tests = [
      {
        state: {
          ResolvedNotApplicable: {
            applicable: true
          },
          Resolved: {
            day: '1',
            month: '1',
            year: '2016',
            present: false
          }
        },
        expected: true
      },
      {
        state: {
          Resolved: {
            day: '1',
            month: '1',
            year: '2016',
            present: false
          }
        },
        expected: true
      },
      {
        state: {
          ResolvedNotApplicable: {
            applicable: false
          },
          Resolved: null
        },
        expected: true
      },
      {
        state: {
          ResolvedNotApplicable: {
            applicable: true
          },
          Resolved: null
        },
        expected: false
      },
      {
        state: {
          Resolved: null
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(
        new DelinquentItemValidator(test.state, null).validResolved()
      ).toBe(test.expected)
    })
  })

  it('validate court name', () => {
    const tests = [
      {
        state: {
          CourtName: {
            value: ''
          }
        },
        expected: false
      },
      {
        state: {
          CourtName: {
            value: 'The court'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(
        new DelinquentItemValidator(test.state, null).validCourtName()
      ).toBe(test.expected)
    })
  })

  it('validate court address', () => {
    const tests = [
      {
        state: {
          CourtAddress: {}
        },
        expected: false
      },
      {
        state: {
          CourtAddress: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(
        new DelinquentItemValidator(test.state, null).validCourtAddress()
      ).toBe(test.expected)
    })
  })

  it('validate description', () => {
    const tests = [
      {
        state: {
          Description: {
            value: ''
          }
        },
        expected: false
      },
      {
        state: {
          Description: {
            value: 'The description'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(
        new DelinquentItemValidator(test.state, null).validDescription()
      ).toBe(test.expected)
    })
  })

  it('validate branch', () => {
    const tests = [
      {
        state: {
          HasDelinquent: { value: '' }
        },
        expected: false
      },
      {
        state: {
          HasDelinquent: { value: 'Unicorn' }
        },
        expected: false
      },
      {
        state: {
          HasDelinquent: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          HasDelinquent: { value: 'Yes' }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(
        new DelinquentValidator(test.state, null).validHasDelinquent()
      ).toBe(test.expected)
    })
  })

  it('validate items', () => {
    const tests = [
      {
        state: {
          HasDelinquent: { value: 'No' },
          List: {
            branch: { value: 'No' },
            items: []
          }
        },
        expected: true
      },
      {
        state: {
          HasDelinquent: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: []
          }
        },
        expected: false
      },
      {
        state: {
          HasDelinquent: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [{}]
          }
        },
        expected: false
      },
      {
        state: {
          HasDelinquent: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  Name: {
                    value: 'The name'
                  },
                  Infractions: [],
                  AccountNumber: {
                    value: 'ABC1234567890'
                  },
                  PropertyType: {
                    value: 'ABC1234567890'
                  },
                  Amount: {
                    value: '20000'
                  },
                  Reason: {
                    value: 'Completely forgot'
                  },
                  Status: {
                    value: 'Paid'
                  },
                  Date: {
                    day: '1',
                    month: '1',
                    year: '2016',
                    present: false
                  },
                  ResolvedNotApplicable: {
                    applicable: true
                  },
                  Resolved: {
                    day: '1',
                    month: '1',
                    year: '2016',
                    present: false
                  },
                  CourtName: {
                    value: 'The court'
                  },
                  CourtAddress: {
                    country: { value: 'United States' },
                    street: '1234 Some Rd',
                    city: 'Arlington',
                    state: 'VA',
                    zipcode: '22202',
                    layout: Location.ADDRESS
                  },
                  Description: {
                    value: 'The description'
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
      expect(new DelinquentValidator(test.state, null).isValid()).toBe(
        test.expected
      )
    })
  })
})
