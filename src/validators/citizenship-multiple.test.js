import CitizenshipMultipleValidator, {
  CitizenshipItemValidator
} from './citizenship-multiple'
import { battery } from './helpers'

describe('citizenship multiple component validation', function() {
  it('can validate citizenship country', () => {
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
            value: 'United States'
          }
        },
        expected: true
      }
    ]

    battery(tests, CitizenshipItemValidator, 'validCountry')
  })

  it('can validate citizenship date range', () => {
    const tests = [
      {
        state: {
          Dates: null
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

    battery(tests, CitizenshipItemValidator, 'validDates')
  })

  it('can validate citizenship how it was acquired', () => {
    const tests = [
      {
        state: {
          How: null
        },
        expected: false
      },
      {
        state: {
          How: {
            value: 'Birth'
          }
        },
        expected: true
      }
    ]

    battery(tests, CitizenshipItemValidator, 'validHow')
  })

  it('can validate citizenship renouncement', () => {
    const tests = [
      {
        state: {
          Renounced: { value: null }
        },
        expected: false
      },
      {
        state: {
          Renounced: { value: 'Yuppers' }
        },
        expected: false
      },
      {
        state: {
          Renounced: { value: 'No' }
        },
        expected: false
      },
      {
        state: {
          Renounced: { value: 'Yes' }
        },
        expected: false
      },
      {
        state: {
          Renounced: { value: 'Yes' },
          RenouncedExplanation: {
            value: 'explanation'
          }
        },
        expected: true
      }
    ]

    battery(tests, CitizenshipItemValidator, 'validRenounced')
  })

  it('can validate citizenship current status', () => {
    const tests = [
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
            present: true
          },
          Current: { value: null }
        },
        expected: true
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
            present: true
          },
          Current: { value: 'Yuppers' }
        },
        expected: true
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
            present: true
          },
          Current: { value: 'No' }
        },
        expected: true
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
            present: true
          },
          Current: { value: 'Yes' }
        },
        expected: true
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
            present: true
          },
          Current: { value: 'Yes' },
          CurrentExplanation: {
            value: 'explanation'
          }
        },
        expected: true
      }
    ]

    battery(tests, CitizenshipItemValidator, 'validCurrent')
  })

  it('can validate multiple citizenships', () => {
    const tests = [
      {
        state: {
          HasMultiple: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          HasMultiple: { value: 'Yes' }
        },
        expected: false
      },
      {
        state: {
          HasMultiple: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {}
              }
            ]
          }
        },
        expected: false
      },
      {
        state: {
          HasMultiple: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  Country: {
                    value: 'United States'
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
                  How: {
                    value: 'Birth'
                  },
                  Renounced: { value: 'Yes' },
                  RenouncedExplanation: {
                    value: 'explanation'
                  },
                  Current: { value: 'Yes' },
                  CurrentExplanation: {
                    value: 'explanation'
                  }
                }
              }
            ]
          }
        },
        expected: true
      }
    ]

    battery(tests, CitizenshipMultipleValidator, 'validCitizenships')
  })

  it('can validate entire multiple citizenships and passports', () => {
    const tests = [
      {
        state: {
          HasMultiple: { value: 'Yes' },
          List: {
            branch: { value: '' },
            items: [{}]
          }
        },
        expected: false
      },
      {
        state: {
          HasMultiple: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  Country: {
                    value: 'United States'
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
                    present: true
                  },
                  How: {
                    value: 'Birth'
                  },
                  Renounced: { value: 'Yes' },
                  RenouncedExplanation: {
                    value: 'explanation'
                  },
                  Current: { value: 'Yes' },
                  CurrentExplanation: {
                    value: 'explanation'
                  }
                }
              }
            ]
          }
        },
        expected: true
      }
    ]

    battery(tests, CitizenshipMultipleValidator, 'isValid')
  })
})
