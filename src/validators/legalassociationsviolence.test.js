import LegalAssociationsViolenceValidator, { ViolenceValidator } from './legalassociationsviolence'
import { battery } from './helpers'

describe('Legal associations violence component validation', function () {
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

    battery(tests, ViolenceValidator, 'validOrganization')
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
            addressType: 'United States',
            address: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202'
          }
        },
        expected: true
      }
    ]

    battery(tests, ViolenceValidator, 'validAddress')
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

    battery(tests, ViolenceValidator, 'validDates')
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

    battery(tests, ViolenceValidator, 'validPositions')
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

    battery(tests, ViolenceValidator, 'validContributions')
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

    battery(tests, ViolenceValidator, 'validReasons')
  })

  it('validate associations violence in terrorism', () => {
    const tests = [
      {
        props: {},
        expected: false
      },
      {
        props: {
          HasViolence: 'No'
        },
        expected: true
      },
      {
        props: {
          HasViolence: 'Yes',
          List: [],
          ListBranch: 'No'
        },
        expected: false
      },
      {
        props: {
          HasViolence: 'Yes',
          List: [{}],
          ListBranch: ''
        },
        expected: false
      },
      {
        props: {
          HasViolence: 'Yes',
          List: [
            {
              Organization: {
                value: 'this is an organization'
              },
              Address: {
                addressType: 'United States',
                address: '1234 Some Rd',
                city: 'Arlington',
                state: 'Virginia',
                zipcode: '22202'
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

    battery(tests, LegalAssociationsViolenceValidator, 'isValid')
  })
})
