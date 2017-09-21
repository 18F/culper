import schematize from '../schema'
import validate from '.'
import ForeignTravelValidator, { TravelValidator } from './foreigntravel'
import { battery } from './helpers'

describe('Foreign travel component validation', function () {
  it('validate foreign travel country', () => {
    const tests = [
      {
        state: {
          Country: {}
        },
        expected: false
      },
      {
        state: {
          Country: {
            value: 'Germany'
          }
        },
        expected: true
      }
    ]

    battery(tests, TravelValidator, 'validCountry')
  })

  it('validate foreign travel dates', () => {
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

    battery(tests, TravelValidator, 'validDates')
  })

  it('validate foreign travel days of visit', () => {
    const tests = [
      {
        state: {
          Days: []
        },
        expected: false
      },
      {
        state: {
          Days: ['00000']
        },
        expected: false
      },
      {
        state: {
          Days: ['1-5', '21-30']
        },
        expected: true
      }
    ]

    battery(tests, TravelValidator, 'validDays')
  })

  it('validate foreign travel purpose of visit', () => {
    const tests = [
      {
        state: {
          Purpose: []
        },
        expected: false
      },
      {
        state: {
          Purpose: ['Nothing']
        },
        expected: false
      },
      {
        state: {
          Purpose: ['Business', 'Family']
        },
        expected: true
      }
    ]

    battery(tests, TravelValidator, 'validPurpose')
  })

  it('validate foreign travel questioned', () => {
    const tests = [
      {
        state: {
          Questioned: ''
        },
        expected: false
      },
      {
        state: {
          Questioned: 'No'
        },
        expected: true
      },
      {
        state: {
          Questioned: 'Yes',
          QuestionedExplanation: {
            value: ''
          }
        },
        expected: false
      },
      {
        state: {
          Questioned: 'Yes',
          QuestionedExplanation: {
            value: 'some text'
          }
        },
        expected: true
      }
    ]

    battery(tests, TravelValidator, 'validQuestioned')
  })

  it('validate foreign travel encounter', () => {
    const tests = [
      {
        state: {
          Encounter: ''
        },
        expected: false
      },
      {
        state: {
          Encounter: 'No'
        },
        expected: true
      },
      {
        state: {
          Encounter: 'Yes',
          EncounterExplanation: {
            value: ''
          }
        },
        expected: false
      },
      {
        state: {
          Encounter: 'Yes',
          EncounterExplanation: {
            value: 'some text'
          }
        },
        expected: true
      }
    ]

    battery(tests, TravelValidator, 'validEncounter')
  })

  it('validate foreign travel contacted', () => {
    const tests = [
      {
        state: {
          Contacted: ''
        },
        expected: false
      },
      {
        state: {
          Contacted: 'No'
        },
        expected: true
      },
      {
        state: {
          Contacted: 'Yes',
          ContactedExplanation: {
            value: ''
          }
        },
        expected: false
      },
      {
        state: {
          Contacted: 'Yes',
          ContactedExplanation: {
            value: 'some text'
          }
        },
        expected: true
      }
    ]

    battery(tests, TravelValidator, 'validContacted')
  })

  it('validate foreign travel counter', () => {
    const tests = [
      {
        state: {
          Counter: ''
        },
        expected: false
      },
      {
        state: {
          Counter: 'No'
        },
        expected: true
      },
      {
        state: {
          Counter: 'Yes',
          CounterExplanation: {
            value: ''
          }
        },
        expected: false
      },
      {
        state: {
          Counter: 'Yes',
          CounterExplanation: {
            value: 'some text'
          }
        },
        expected: true
      }
    ]

    battery(tests, TravelValidator, 'validCounter')
  })

  it('validate foreign travel interest', () => {
    const tests = [
      {
        state: {
          Interest: ''
        },
        expected: false
      },
      {
        state: {
          Interest: 'No'
        },
        expected: true
      },
      {
        state: {
          Interest: 'Yes',
          InterestExplanation: {
            value: ''
          }
        },
        expected: false
      },
      {
        state: {
          Interest: 'Yes',
          InterestExplanation: {
            value: 'some text'
          }
        },
        expected: true
      }
    ]

    battery(tests, TravelValidator, 'validInterest')
  })

  it('validate foreign travel sensitive', () => {
    const tests = [
      {
        state: {
          Sensitive: ''
        },
        expected: false
      },
      {
        state: {
          Sensitive: 'No'
        },
        expected: true
      },
      {
        state: {
          Sensitive: 'Yes',
          SensitiveExplanation: {
            value: ''
          }
        },
        expected: false
      },
      {
        state: {
          Sensitive: 'Yes',
          SensitiveExplanation: {
            value: 'some text'
          }
        },
        expected: true
      }
    ]

    battery(tests, TravelValidator, 'validSensitive')
  })

  it('validate foreign travel threatened', () => {
    const tests = [
      {
        state: {
          Threatened: ''
        },
        expected: false
      },
      {
        state: {
          Threatened: 'No'
        },
        expected: true
      },
      {
        state: {
          Threatened: 'Yes',
          ThreatenedExplanation: {
            value: ''
          }
        },
        expected: false
      },
      {
        state: {
          Threatened: 'Yes',
          ThreatenedExplanation: {
            value: 'some text'
          }
        },
        expected: true
      }
    ]

    battery(tests, TravelValidator, 'validThreatened')
  })

  it('validate foreign travel', () => {
    const tests = [
      {
        state: {},
        expected: false
      },
      {
        state: {
          HasForeignTravelOutside: 'No',
          HasForeignTravelOfficial: 'Yes'
        },
        expected: true
      },
      {
        state: {
          HasForeignTravelOutside: 'Yes',
          HasForeignTravelOfficial: 'No',
          List: [],
          ListBranch: 'No'
        },
        expected: false
      },
      {
        state: {
          HasForeignTravelOutside: 'Yes',
          HasForeignTravelOfficial: 'No',
          List: [{}],
          ListBranch: ''
        },
        expected: false
      },
      {
        state: {
          HasForeignTravelOutside: 'Yes',
          HasForeignTravelOfficial: 'No',
          List: [
            {
              Item: {
                Country: {
                  value: 'Germany'
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
                Days: ['1-5', '21-30'],
                Purpose: ['Business', 'Family'],
                Questioned: 'No',
                Encounter: 'No',
                Contacted: 'No',
                Counter: 'No',
                Interest: 'No',
                Sensitive: 'No',
                Threatened: 'No'
              }
            }
          ],
          ListBranch: 'No'
        },
        expected: true
      }
    ]

    // battery(tests, ForeignTravelValidator, 'isValid')
    tests.forEach(test => {
      expect(validate(schematize('foreign.travel', test.state))).toBe(test.expected)
    })
  })
})
