import CreditValidator, { CreditItemValidator } from './credit'
import Location from '../components/Form/Location'

describe('credit component validation', function () {
  it('validate reason', () => {
    const tests = [
      {
        state: {
          Explanation: {
            value: ''
          }
        },
        expected: false
      },
      {
        state: {
          Explanation: {
            value: 'Completely forgot'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new CreditItemValidator(test.state, null).validExplanation()).toBe(test.expected)
    })
  })

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
      expect(new CreditItemValidator(test.state, null).validName()).toBe(test.expected)
    })
  })

  it('validate telephone', () => {
    const tests = [
      {
        state: {
          Telephone: {}
        },
        expected: false
      },
      {
        state: {
          Telephone: {
            noNumber: '',
            number: '7031112222',
            numberType: 'Home',
            timeOfDay: 'Both',
            extension: ''
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new CreditItemValidator(test.state, null).validTelephone()).toBe(test.expected)
    })
  })

  it('validate location', () => {
    const tests = [
      {
        state: {
          Location: {}
        },
        expected: false
      },
      {
        state: {
          Location: {
            city: 'Arlington',
            state: 'Virginia',
            country: 'United States',
            layout: Location.STATE_CITY
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new CreditItemValidator(test.state, null).validLocation()).toBe(test.expected)
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
      expect(new CreditItemValidator(test.state, null).validDescription()).toBe(test.expected)
    })
  })

  it('validate branch', () => {
    const tests = [
      {
        state: {
          HasCreditCounseling: ''
        },
        expected: false
      },
      {
        state: {
          HasCreditCounseling: 'Unicorn'
        },
        expected: false
      },
      {
        state: {
          HasCreditCounseling: 'No'
        },
        expected: true
      },
      {
        state: {
          HasCreditCounseling: 'Yes'
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new CreditValidator(test.state, null).validHasCreditCounseling()).toBe(test.expected)
    })
  })

  it('validate items', () => {
    const tests = [
      {
        state: {
          HasCreditCounseling: 'No',
          List: [],
          ListBranch: 'No'
        },
        expected: true
      },
      {
        state: {
          HasCreditCounseling: 'Yes',
          List: [{
            Explanation: {
              value: 'Completely forgot'
            }
          }],
          ListBranch: 'No'
        },
        expected: false
      },
      {
        state: {
          HasCreditCounseling: 'Yes',
          List: [],
          ListBranch: ''
        },
        expected: false
      },
      {
        state: {
          HasCreditCounseling: 'Yes',
          List: [{}],
          ListBranch: ''
        },
        expected: false
      },
      {
        state: {
          HasCreditCounseling: 'Yes',
          List: [
            {
              Explanation: {
                value: 'Completely forgot'
              },
              Name: {
                value: 'The name'
              },
              Telephone: {
                noNumber: '',
                number: '7031112222',
                numberType: 'Home',
                timeOfDay: 'Both',
                extension: ''
              },
              Location: {
                city: 'Arlington',
                state: 'Virginia',
                country: 'United States',
                layout: Location.STATE_CITY
              },
              Description: {
                value: 'The description'
              }
            }
          ],
          ListBranch: 'No'
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new CreditValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
