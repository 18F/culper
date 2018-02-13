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
              month: '1',
              day: '1',
              year: '2010',
              date: new Date('1/1/2010')
            },
            to: {
              month: '1',
              day: '1',
              year: '2012',
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
          Questioned: { value: '' }
        },
        expected: false
      },
      {
        state: {
          Questioned: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          Questioned: { value: 'Yes' },
          QuestionedExplanation: {
            value: ''
          }
        },
        expected: false
      },
      {
        state: {
          Questioned: { value: 'Yes' },
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
          Encounter: { value: '' }
        },
        expected: false
      },
      {
        state: {
          Encounter: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          Encounter: { value: 'Yes' },
          EncounterExplanation: {
            value: ''
          }
        },
        expected: false
      },
      {
        state: {
          Encounter: { value: 'Yes' },
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
          Contacted: { value: '' }
        },
        expected: false
      },
      {
        state: {
          Contacted: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          Contacted: { value: 'Yes' },
          ContactedExplanation: {
            value: ''
          }
        },
        expected: false
      },
      {
        state: {
          Contacted: { value: 'Yes' },
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
          Counter: { value: '' }
        },
        expected: false
      },
      {
        state: {
          Counter: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          Counter: { value: 'Yes' },
          CounterExplanation: {
            value: ''
          }
        },
        expected: false
      },
      {
        state: {
          Counter: { value: 'Yes' },
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
          Interest: { value: '' }
        },
        expected: false
      },
      {
        state: {
          Interest: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          Interest: { value: 'Yes' },
          InterestExplanation: {
            value: ''
          }
        },
        expected: false
      },
      {
        state: {
          Interest: { value: 'Yes' },
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
          Sensitive: { value: '' }
        },
        expected: false
      },
      {
        state: {
          Sensitive: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          Sensitive: { value: 'Yes' },
          SensitiveExplanation: {
            value: ''
          }
        },
        expected: false
      },
      {
        state: {
          Sensitive: { value: 'Yes' },
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
          Threatened: { value: '' }
        },
        expected: false
      },
      {
        state: {
          Threatened: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          Threatened: { value: 'Yes' },
          ThreatenedExplanation: {
            value: ''
          }
        },
        expected: false
      },
      {
        state: {
          Threatened: { value: 'Yes' },
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
          HasForeignTravelOutside: { value: 'No' },
          HasForeignTravelOfficial: { value: 'Yes' }
        },
        expected: true
      },
      {
        state: {
          HasForeignTravelOutside: { value: 'Yes' },
          HasForeignTravelOfficial: { value: 'No' },
          List: {
            branch: { value: 'No' },
            items: []
          }
        },
        expected: false
      },
      {
        state: {
          HasForeignTravelOutside: { value: 'Yes' },
          HasForeignTravelOfficial: { value: 'No' },
          List: {
            branch: { value: '' },
            items: [{}]
          }
        },
        expected: false
      },
      {
        state: {
          HasForeignTravelOutside: { value: 'Yes' },
          HasForeignTravelOfficial: { value: 'No' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  Country: {
                    value: 'Germany'
                  },
                  Dates: {
                    from: {
                      month: '1',
                      day: '1',
                      year: '2010',
                      date: new Date('1/1/2010')
                    },
                    to: {
                      month: '1',
                      day: '1',
                      year: '2012',
                      date: new Date('1/1/2012')
                    },
                    present: false
                  },
                  Days: ['1-5', '21-30'],
                  Purpose: ['Business', 'Family'],
                  Questioned: { value: 'No' },
                  Encounter: { value: 'No' },
                  Contacted: { value: 'No' },
                  Counter: { value: 'No' },
                  Interest: { value: 'No' },
                  Sensitive: { value: 'No' },
                  Threatened: { value: 'No' }
                }
              }
            ]
          }
        },
        expected: true
      }
    ]

    battery(tests, ForeignTravelValidator, 'isValid')
  })
})
