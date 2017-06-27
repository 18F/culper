import LegalAssociationsTerroristValidator, { TerroristValidator } from './legalassociationsterrorist'
import { battery } from './helpers'
import Location from '../components/Form/Location'

describe('Legal associations terrorist component validation', function () {
  it('validate organization', () => {
    const tests = [
      {
        props: {
          Organization: {}
        },
        expected: false
      },
      {
        props: {
          Organization: {
            value: 'this is an organization'
          }
        },
        expected: true
      }
    ]

    battery(tests, TerroristValidator, 'validOrganization')
  })

  it('validate address', () => {
    const tests = [
      {
        props: {
          Address: {}
        },
        expected: false
      },
      {
        props: {
          Address: {
            country: 'United States',
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202',
            layout: Location.ADDRESS
          }
        },
        expected: true
      }
    ]

    battery(tests, TerroristValidator, 'validAddress')
  })

  it('validate dates', () => {
    const tests = [
      {
        props: {
          Dates: {}
        },
        expected: false
      },
      {
        props: {
          Dates: {
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
      }
    ]

    battery(tests, TerroristValidator, 'validDates')
  })

  it('validate positions', () => {
    const tests = [
      {
        props: {
          Positions: {}
        },
        expected: false
      },
      {
        props: {
          PositionsNotApplicable: {
            applicable: false
          },
          Positions: {}
        },
        expected: true
      },
      {
        props: {
          Positions: {
            value: 'this is positions'
          }
        },
        expected: true
      }
    ]

    battery(tests, TerroristValidator, 'validPositions')
  })

  it('validate contributions', () => {
    const tests = [
      {
        props: {
          Contributions: {}
        },
        expected: false
      },
      {
        props: {
          ContributionsNotApplicable: {
            applicable: false
          },
          Contributions: {}
        },
        expected: true
      },
      {
        props: {
          Contributions: {
            value: 'this is contributions'
          }
        },
        expected: true
      }
    ]

    battery(tests, TerroristValidator, 'validContributions')
  })

  it('validate reasons', () => {
    const tests = [
      {
        props: {
          Reasons: {}
        },
        expected: false
      },
      {
        props: {
          Reasons: {
            value: 'this is the reasons'
          }
        },
        expected: true
      }
    ]

    battery(tests, TerroristValidator, 'validReasons')
  })

  it('validate associations to terrorist organizations', () => {
    const tests = [
      {
        props: {},
        expected: false
      },
      {
        props: {
          HasTerrorist: 'No'
        },
        expected: true
      },
      {
        props: {
          HasTerrorist: 'Yes',
          List: [],
          ListBranch: 'No'
        },
        expected: false
      },
      {
        props: {
          HasTerrorist: 'Yes',
          List: [{}],
          ListBranch: ''
        },
        expected: false
      },
      {
        props: {
          HasTerrorist: 'Yes',
          List: [
            {
              Organization: {
                value: 'this is an organization'
              },
              Address: {
                country: 'United States',
                street: '1234 Some Rd',
                city: 'Arlington',
                state: 'Virginia',
                zipcode: '22202',
                layout: Location.ADDRESS
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
          ],
          ListBranch: 'No'
        },
        expected: true
      }
    ]

    battery(tests, LegalAssociationsTerroristValidator, 'isValid')
  })
})
