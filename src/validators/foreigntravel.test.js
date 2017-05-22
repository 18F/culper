import ForeignTravelValidator, { TravelValidator } from './foreigntravel'
import { battery } from './helpers'

describe('Foreign travel component validation', function () {
  it('validate foreign travel country', () => {
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

    battery(tests, TravelValidator, 'validCountry')
  })

  it('validate foreign travel dates', () => {
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

    battery(tests, TravelValidator, 'validDates')
  })

  it('validate foreign travel days of visit', () => {
    const tests = [
      {
        props: {
          Days: []
        },
        expected: false
      },
      {
        props: {
          Days: ['00000']
        },
        expected: false
      },
      {
        props: {
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
        props: {
          Purpose: []
        },
        expected: false
      },
      {
        props: {
          Purpose: ['Nothing']
        },
        expected: false
      },
      {
        props: {
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
        props: {
          Questioned: ''
        },
        expected: false
      },
      {
        props: {
          Questioned: 'No'
        },
        expected: true
      },
      {
        props: {
          Questioned: 'Yes',
          QuestionedExplanation: {
            value: ''
          }
        },
        expected: false
      },
      {
        props: {
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
        props: {
          Encounter: ''
        },
        expected: false
      },
      {
        props: {
          Encounter: 'No'
        },
        expected: true
      },
      {
        props: {
          Encounter: 'Yes',
          EncounterExplanation: {
            value: ''
          }
        },
        expected: false
      },
      {
        props: {
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
        props: {
          Contacted: ''
        },
        expected: false
      },
      {
        props: {
          Contacted: 'No'
        },
        expected: true
      },
      {
        props: {
          Contacted: 'Yes',
          ContactedExplanation: {
            value: ''
          }
        },
        expected: false
      },
      {
        props: {
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
        props: {
          Counter: ''
        },
        expected: false
      },
      {
        props: {
          Counter: 'No'
        },
        expected: true
      },
      {
        props: {
          Counter: 'Yes',
          CounterExplanation: {
            value: ''
          }
        },
        expected: false
      },
      {
        props: {
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
        props: {
          Interest: ''
        },
        expected: false
      },
      {
        props: {
          Interest: 'No'
        },
        expected: true
      },
      {
        props: {
          Interest: 'Yes',
          InterestExplanation: {
            value: ''
          }
        },
        expected: false
      },
      {
        props: {
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
        props: {
          Sensitive: ''
        },
        expected: false
      },
      {
        props: {
          Sensitive: 'No'
        },
        expected: true
      },
      {
        props: {
          Sensitive: 'Yes',
          SensitiveExplanation: {
            value: ''
          }
        },
        expected: false
      },
      {
        props: {
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
        props: {
          Threatened: ''
        },
        expected: false
      },
      {
        props: {
          Threatened: 'No'
        },
        expected: true
      },
      {
        props: {
          Threatened: 'Yes',
          ThreatenedExplanation: {
            value: ''
          }
        },
        expected: false
      },
      {
        props: {
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
        props: {},
        expected: false
      },
      {
        props: {
          HasForeignTravelOutside: 'No',
          HasForeignTravelOfficial: 'Yes'
        },
        expected: true
      },
      {
        props: {
          HasForeignTravelOutside: 'Yes',
          HasForeignTravelOfficial: 'No',
          List: [],
          ListBranch: 'No'
        },
        expected: false
      },
      {
        props: {
          HasForeignTravelOutside: 'Yes',
          HasForeignTravelOfficial: 'No',
          List: [{}],
          ListBranch: ''
        },
        expected: false
      },
      {
        props: {
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

    battery(tests, ForeignTravelValidator, 'isValid')
  })
})
