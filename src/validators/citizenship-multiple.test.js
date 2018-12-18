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

    battery(tests, CitizenshipItemValidator, 'validDates')
  })

  it('can validate citizenship how it was acquired', () => {
    const tests = [
      {
        state: {
          Country: {
            value: 'Germany'
          },
          How: null
        },
        expected: false
      },
      {
        state: {
          Country: {
            value: 'Germany'
          },
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
          Country: {
            value: 'Germany'
          },
          Renounced: { value: null }
        },
        expected: false
      },
      {
        state: {
          Country: {
            value: 'Germany'
          },
          Renounced: { value: 'Yuppers' }
        },
        expected: false
      },
      {
        state: {
          Country: {
            value: 'Germany'
          },
          Renounced: { value: 'No' }
        },
        expected: false
      },
      {
        state: {
          Country: {
            value: 'Germany'
          },
          Renounced: { value: 'Yes' }
        },
        expected: false
      },
      {
        state: {
          Country: {
            value: 'Germany'
          },
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
              year: '2010'
            },
            to: {
              month: '1',
              day: '1',
              year: '2012'
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
              year: '2010'
            },
            to: {
              month: '1',
              day: '1',
              year: '2012'
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
              year: '2010'
            },
            to: {
              month: '1',
              day: '1',
              year: '2012'
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
              year: '2010'
            },
            to: {
              month: '1',
              day: '1',
              year: '2012'
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
              year: '2010'
            },
            to: {
              month: '1',
              day: '1',
              year: '2012'
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
                      year: '2010'
                    },
                    to: {
                      month: '1',
                      day: '1',
                      year: '2012'
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

  it('can validate minimum number of citizenships provided', () => {
    const tests = [
      {
        state: {
          HasMultiple: { value: 'Yes' },
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
                      year: '2010'
                    },
                    to: {
                      month: '1',
                      day: '1',
                      year: '2012'
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
                      year: '2010'
                    },
                    to: {
                      month: '1',
                      day: '1',
                      year: '2012'
                    },
                    present: false
                  },
                  Current: { value: 'Yes' },
                  CurrentExplanation: {
                    value: 'explanation'
                  }
                }
              },
              {
                Item: {
                  Country: {
                    value: 'Germany'
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

    battery(tests, CitizenshipMultipleValidator, 'validMinimumCitizenships')
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
                      year: '2010'
                    },
                    to: {
                      month: '1',
                      day: '1',
                      year: '2012'
                    },
                    present: true
                  },
                  Current: { value: 'Yes' },
                  CurrentExplanation: {
                    value: 'explanation'
                  }
                }
              },
              {
                Item: {
                  Country: {
                    value: 'Germany'
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
