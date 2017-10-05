import CitizenshipMultipleValidator, { CitizenshipItemValidator } from './citizenship-multiple'
import { battery } from './helpers'
import Location from '../components/Form/Location'

describe('citizenship multiple component validation', function () {
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
          Renounced: null
        },
        expected: false
      },
      {
        state: {
          Renounced: 'Yuppers'
        },
        expected: false
      },
      {
        state: {
          Renounced: 'No'
        },
        expected: false
      },
      {
        state: {
          Renounced: 'Yes'
        },
        expected: false
      },
      {
        state: {
          Renounced: 'Yes',
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
              date: new Date('1/1/2010')
            },
            to: {
              date: new Date('1/1/2012')
            },
            present: true
          },
          Current: null
        },
        expected: true
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
            present: true
          },
          Current: 'Yuppers'
        },
        expected: true
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
            present: true
          },
          Current: 'No'
        },
        expected: true
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
            present: true
          },
          Current: 'Yes'
        },
        expected: true
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
            present: true
          },
          Current: 'Yes',
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
          HasMultiple: 'No'
        },
        expected: true
      },
      {
        state: {
          HasMultiple: 'Yes'
        },
        expected: false
      },
      {
        state: {
          HasMultiple: 'Yes',
          Citizenships: [
            {
              Item: {
              }
            }
          ],
          CitizenshipsBranch: 'No'
        },
        expected: false
      },
      {
        state: {
          HasMultiple: 'Yes',
          Citizenships: [
            {
              Item: {
                Country: {
                  value: 'United States'
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
                How: {
                  value: 'Birth'
                },
                Renounced: 'Yes',
                RenouncedExplanation: {
                  value: 'explanation'
                },
                Current: 'Yes',
                CurrentExplanation: {
                  value: 'explanation'
                }
              }
            }
          ],
          CitizenshipsBranch: 'No'
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
          HasMultiple: 'Yes',
          Citizenships: [{}],
          CitizenshipsBranch: ''
        },
        expected: false
      },
      {
        state: {
          HasMultiple: 'Yes',
          Citizenships: [
            {
              Item: {
                Country: {
                  value: 'United States'
                },
                Dates: {
                  from: {
                    date: new Date('1/1/2010')
                  },
                  to: {
                    date: new Date('1/1/2012')
                  },
                  present: true
                },
                How: {
                  value: 'Birth'
                },
                Renounced: 'Yes',
                RenouncedExplanation: {
                  value: 'explanation'
                },
                Current: 'Yes',
                CurrentExplanation: {
                  value: 'explanation'
                }
              }
            }
          ],
          CitizenshipsBranch: 'No'
        },
        expected: true
      }
    ]

    battery(tests, CitizenshipMultipleValidator, 'isValid')
  })
})
