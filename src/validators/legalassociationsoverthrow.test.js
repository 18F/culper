import LegalAssociationsOverthrowValidator, {
  OverthrowValidator
} from './legalassociationsoverthrow'
import { battery } from './helpers'
import Location from '../components/Form/Location'

describe('Legal associations overthrow component validation', function() {
  it('validate organization', () => {
    const tests = [
      {
        state: {
          Organization: {}
        },
        expected: false
      },
      {
        state: {
          Organization: {
            value: 'this is an organization'
          }
        },
        expected: true
      }
    ]

    battery(tests, OverthrowValidator, 'validOrganization')
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

    battery(tests, OverthrowValidator, 'validAddress')
  })

  it('validate dates', () => {
    const tests = [
      {
        state: {
          Dates: {}
        },
        expected: false
      },
      {
        state: {
          Dates: {
            from: {
              month: '1',
              day: '1',
              year: '2010'
            },
            to: {
              month: '1',
              day: '1',
              year: '2012'
            },
            present: false
          }
        },
        expected: true
      }
    ]

    battery(tests, OverthrowValidator, 'validDates')
  })

  it('validate positions', () => {
    const tests = [
      {
        state: {
          Positions: {}
        },
        expected: false
      },
      {
        state: {
          PositionsNotApplicable: {
            applicable: false
          },
          Positions: {}
        },
        expected: true
      },
      {
        state: {
          Positions: {
            value: 'this is positions'
          }
        },
        expected: true
      }
    ]

    battery(tests, OverthrowValidator, 'validPositions')
  })

  it('validate contributions', () => {
    const tests = [
      {
        state: {
          Contributions: {}
        },
        expected: false
      },
      {
        state: {
          ContributionsNotApplicable: {
            applicable: false
          },
          Contributions: {}
        },
        expected: true
      },
      {
        state: {
          Contributions: {
            value: 'this is contributions'
          }
        },
        expected: true
      }
    ]

    battery(tests, OverthrowValidator, 'validContributions')
  })

  it('validate reasons', () => {
    const tests = [
      {
        state: {
          Reasons: {}
        },
        expected: false
      },
      {
        state: {
          Reasons: {
            value: 'this is the reasons'
          }
        },
        expected: true
      }
    ]

    battery(tests, OverthrowValidator, 'validReasons')
  })

  it('validate associations overthrow in terrorism', () => {
    const tests = [
      {
        state: {},
        expected: false
      },
      {
        state: {
          HasOverthrow: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          HasOverthrow: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: []
          }
        },
        expected: false
      },
      {
        state: {
          HasOverthrow: { value: 'Yes' },
          List: {
            branch: { value: '' },
            items: [{}]
          }
        },
        expected: false
      },
      {
        state: {
          HasOverthrow: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  Organization: {
                    value: 'this is an organization'
                  },
                  Address: {
                    country: { value: 'United States' },
                    street: '1234 Some Rd',
                    city: 'Arlington',
                    state: 'VA',
                    zipcode: '22202',
                    layout: Location.ADDRESS
                  },
                  Dates: {
                    from: {
                      month: '1',
                      day: '1',
                      year: '2010'
                    },
                    to: {
                      month: '1',
                      day: '1',
                      year: '2012'
                    },
                    present: false
                  },
                  PositionsNotApplicable: {
                    applicable: false
                  },
                  Positions: {},
                  ContributionsNotApplicable: {
                    applicable: false
                  },
                  Contributions: {},
                  Reasons: {
                    value: 'this is the reasons'
                  }
                }
              }
            ]
          }
        },
        expected: true
      }
    ]

    battery(tests, LegalAssociationsOverthrowValidator, 'isValid')
  })
})
