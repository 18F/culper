import ForeignBusinessPoliticalValidator, { PoliticalValidator } from './foreignbusinesspolitical'
import { battery } from './helpers'

describe('Foreign business political component validation', function () {
  it('validate foreign business political position', () => {
    const tests = [
      {
        props: {
          Position: {}
        },
        expected: false
      },
      {
        props: {
          Position: {
            value: 'this is the position'
          }
        },
        expected: true
      }
    ]

    battery(tests, PoliticalValidator, 'validPosition')
  })

  it('validate foreign business political dates', () => {
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

    battery(tests, PoliticalValidator, 'validDates')
  })

  it('validate foreign business political country', () => {
    const tests = [
      {
        props: {
          Country: {}
        },
        expected: false
      },
      {
        props: {
          Country: {
            value: 'Germany'
          }
        },
        expected: true
      }
    ]

    battery(tests, PoliticalValidator, 'validCountry')
  })

  it('validate foreign business political reason', () => {
    const tests = [
      {
        props: {
          Reason: {}
        },
        expected: false
      },
      {
        props: {
          Reason: {
            value: 'this is the reason'
          }
        },
        expected: true
      }
    ]

    battery(tests, PoliticalValidator, 'validReason')
  })

  it('validate foreign business political eligibility', () => {
    const tests = [
      {
        props: {
          Eligibility: {}
        },
        expected: false
      },
      {
        props: {
          Eligibility: {
            value: 'this is the eligibility'
          }
        },
        expected: true
      }
    ]

    battery(tests, PoliticalValidator, 'validEligibility')
  })

  it('validate foreign business political', () => {
    const tests = [
      {
        props: {},
        expected: false
      },
      {
        props: {
          HasForeignPolitical: 'No'
        },
        expected: true
      },
      {
        props: {
          HasForeignPolitical: 'Yes',
          List: [],
          ListBranch: 'No'
        },
        expected: false
      },
      {
        props: {
          HasForeignPolitical: 'Yes',
          List: [{}],
          ListBranch: 'No'
        },
        expected: false
      },
      {
        props: {
          HasForeignPolitical: 'Yes',
          List: [
            {
              Position: {
                value: 'this is the position'
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
              Country: {
                value: 'Germany'
              },
              Reason: {
                value: 'this is the reason'
              },
              Eligibility: {
                value: 'this is the eligibility'
              }
            }
          ],
          ListBranch: 'No'
        },
        expected: true
      }
    ]

    battery(tests, ForeignBusinessPoliticalValidator, 'isValid')
  })
})
