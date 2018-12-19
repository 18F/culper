import CardAbuseValidator, { CardAbuseItemValidator } from './cardabuse'
import Location from '../components/Form/Location'

describe('taxes component validation', function() {
  it('validate agency', () => {
    const tests = [
      {
        state: {
          Agency: {
            value: ''
          }
        },
        expected: false
      },
      {
        state: {
          Agency: {
            value: 'IRS'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new CardAbuseItemValidator(test.state, null).validAgency()).toBe(
        test.expected
      )
    })
  })

  it('validate address', () => {
    const tests = [
      {
        state: {
          Address: {}
        },
        expected: false
      },
      {
        state: {
          Address: {
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
      expect(new CardAbuseItemValidator(test.state, null).validAddress()).toBe(
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
      expect(new CardAbuseItemValidator(test.state, null).validDate()).toBe(
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
      expect(new CardAbuseItemValidator(test.state, null).validReason()).toBe(
        test.expected
      )
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
      expect(new CardAbuseItemValidator(test.state, null).validAmount()).toBe(
        test.expected
      )
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
        new CardAbuseItemValidator(test.state, null).validDescription()
      ).toBe(test.expected)
    })
  })

  it('validate branch', () => {
    const tests = [
      {
        state: {
          HasCardAbuse: { value: '' }
        },
        expected: false
      },
      {
        state: {
          HasCardAbuse: { value: 'Unicorn' }
        },
        expected: false
      },
      {
        state: {
          HasCardAbuse: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          HasCardAbuse: { value: 'Yes' }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new CardAbuseValidator(test.state, null).validHasCardAbuse()).toBe(
        test.expected
      )
    })
  })

  it('validate items', () => {
    const tests = [
      {
        state: {
          HasCardAbuse: { value: 'No' },
          List: {
            branch: { value: '' },
            items: []
          }
        },
        expected: true
      },
      {
        state: {
          HasCardAbuse: { value: 'Yes' },
          List: {
            branch: { value: '' },
            items: []
          }
        },
        expected: false
      },
      {
        state: {
          HasCardAbuse: { value: 'Yes' },
          List: {
            branch: { value: '' },
            items: [{}]
          }
        },
        expected: false
      },
      {
        state: {
          HasCardAbuse: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  Agency: {
                    value: 'IRS'
                  },
                  Address: {
                    country: { value: 'United States' },
                    street: '1234 Some Rd',
                    city: 'Arlington',
                    state: 'VA',
                    zipcode: '22202',
                    layout: Location.ADDRESS
                  },
                  Date: {
                    day: '1',
                    month: '1',
                    year: '2016',
                    present: false
                  },
                  Reason: {
                    value: 'Completely forgot'
                  },
                  Amount: {
                    value: '20000'
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
      expect(new CardAbuseValidator(test.state, null).isValid()).toBe(
        test.expected
      )
    })
  })
})
