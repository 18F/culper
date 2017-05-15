import CitizenshipMultipleValidator, { CitizenshipItemValidator, PassportItemValidator, TravelValidator } from './citizenship-multiple'
import { battery } from './helpers'

describe('citizenship multiple component validation', function () {
  it('can validate travel country', () => {
    const tests = [
      {
        state: {
          Country: ''
        },
        expected: false
      },
      {
        state: {
          Country: 'United States'
        },
        expected: true
      }
    ]

    battery(tests, TravelValidator, 'validCountry')
  })

  it('can validate travel dates', () => {
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

    battery(tests, TravelValidator, 'validDates')
  })

  it('can validate passport country', () => {
    const tests = [
      {
        state: {
          Country: ''
        },
        expected: false
      },
      {
        state: {
          Country: 'United States'
        },
        expected: true
      }
    ]

    battery(tests, PassportItemValidator, 'validCountry')
  })

  it('can validate passport date issued', () => {
    const tests = [
      {
        state: {
          Issued: null
        },
        expected: false
      },
      {
        state: {
          Issued: {
            day: '1',
            month: '1',
            year: '2016',
            date: new Date('1/1/2016')
          }
        },
        expected: true
      }
    ]

    battery(tests, PassportItemValidator, 'validIssued')
  })

  it('can validate passport location issued', () => {
    const tests = [
      {
        state: {
          Location: null
        },
        expected: false
      },
      {
        state: {
          Location: {
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

    battery(tests, PassportItemValidator, 'validLocation')
  })

  it('can validate passport name', () => {
    const tests = [
      {
        state: {
          Name: null
        },
        expected: false
      },
      {
        state: {
          Name: {
            first: 'Foo',
            firstInitialOnly: false,
            middle: 'J',
            middleInitialOnly: true,
            noMiddleName: false,
            last: 'Bar',
            lastInitialOnly: false,
            suffix: 'Jr'
          }
        },
        expected: true
      }
    ]

    battery(tests, PassportItemValidator, 'validName')
  })

  it('can validate passport number', () => {
    const tests = [
      {
        state: {
          Number: null
        },
        expected: false
      },
      {
        state: {
          Number: {
            value: 'number'
          }
        },
        expected: true
      }
    ]

    battery(tests, PassportItemValidator, 'validNumber')
  })

  it('can validate passport date of expiration', () => {
    const tests = [
      {
        state: {
          Expiration: null
        },
        expected: false
      },
      {
        state: {
          Expiration: {
            day: '1',
            month: '1',
            year: '2016',
            date: new Date('1/1/2016')
          }
        },
        expected: true
      }
    ]

    battery(tests, PassportItemValidator, 'validExpiration')
  })

  it('can validate passport usage', () => {
    const tests = [
      {
        state: {
          Used: null
        },
        expected: false
      },
      {
        state: {
          Used: 'Yuppers'
        },
        expected: false
      },
      {
        state: {
          Used: 'No'
        },
        expected: true
      },
      {
        state: {
          Used: 'Yes'
        },
        expected: true
      }
    ]

    battery(tests, PassportItemValidator, 'validUsed')
  })

  it('can validate passport travel usage', () => {
    const tests = [
      {
        state: {
          Used: 'No'
        },
        expected: true
      },
      {
        state: {
          Used: 'Yes',
          Countries: []
        },
        expected: false
      },
      {
        state: {
          Used: 'Yes',
          Countries: [
            {
              Item: {
                Country: 'United States',
                Dates: {
                  from: {
                    date: new Date('1/1/2010')
                  },
                  to: {
                    date: new Date('1/1/2012')
                  },
                  present: false
                }
              }
            }
          ]
        },
        expected: true
      }
    ]

    battery(tests, PassportItemValidator, 'validCountries')
  })

  it('can validate citizenship country', () => {
    const tests = [
      {
        state: {
          Country: ''
        },
        expected: false
      },
      {
        state: {
          Country: 'United States'
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
        expected: true
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
          Current: null
        },
        expected: false
      },
      {
        state: {
          Current: 'Yuppers'
        },
        expected: false
      },
      {
        state: {
          Current: 'No'
        },
        expected: true
      },
      {
        state: {
          Current: 'Yes'
        },
        expected: false
      },
      {
        state: {
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
                Country: 'United States',
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

  it('can validate multiple passports', () => {
    const tests = [
      {
        state: {
          Passports: [
            {
              Item: {}
            }
          ]
        },
        expected: false
      },
      {
        state: {
          Passports: [
            {
              Has: 'No'
            }
          ]
        },
        expected: true
      },
      {
        state: {
          Passports: [
            {
              Has: 'Yes',
              Item: {
                Country: 'United States',
                Issued: {
                  day: '1',
                  month: '1',
                  year: '2016',
                  date: new Date('1/1/2016')
                },
                Location: {
                  addressType: 'United States',
                  address: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'Virginia',
                  zipcode: '22202'
                },
                Name: {
                  first: 'Foo',
                  firstInitialOnly: false,
                  middle: 'J',
                  middleInitialOnly: true,
                  noMiddleName: false,
                  last: 'Bar',
                  lastInitialOnly: false,
                  suffix: 'Jr'
                },
                Number: {
                  value: 'number'
                },
                Expiration: {
                  day: '1',
                  month: '1',
                  year: '2016',
                  date: new Date('1/1/2016')
                },
                Used: 'Yes',
                Countries: [
                  {
                    Item: {
                      Country: '',
                      Dates: {
                        from: {
                          date: new Date('1/1/2010')
                        },
                        to: {
                          date: new Date('1/1/2012')
                        },
                        present: false
                      }
                    }
                  }
                ]
              }
            }
          ]
        },
        expected: false
      },
      {
        state: {
          Passports: [
            {
              Has: 'Yes',
              Item: {
                Country: 'United States',
                Issued: {
                  day: '1',
                  month: '1',
                  year: '2016',
                  date: new Date('1/1/2016')
                },
                Location: {
                  addressType: 'United States',
                  address: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'Virginia',
                  zipcode: '22202'
                },
                Name: {
                  first: 'Foo',
                  firstInitialOnly: false,
                  middle: 'J',
                  middleInitialOnly: true,
                  noMiddleName: false,
                  last: 'Bar',
                  lastInitialOnly: false,
                  suffix: 'Jr'
                },
                Number: {
                  value: 'number'
                },
                Expiration: {
                  day: '1',
                  month: '1',
                  year: '2016',
                  date: new Date('1/1/2016')
                },
                Used: 'Yes',
                Countries: [
                  {
                    Item: {
                      Country: 'United States',
                      Dates: {
                        from: {
                          date: new Date('1/1/2010')
                        },
                        to: {
                          date: new Date('1/1/2012')
                        },
                        present: false
                      }
                    }
                  }
                ]
              }
            }
          ]
        },
        expected: true
      }
    ]

    battery(tests, CitizenshipMultipleValidator, 'validPassports')
  })

  it('can validate entire multiple citizenships and passports', () => {
    const tests = [
      {
        state: {
          HasMultiple: 'Yes',
          Citizenships: [
            {
              Item: {
                Country: 'United States',
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
          CitizenshipsBranch: 'No',
          Passports: [
            {
              Has: 'Yes',
              Item: {
                Country: 'United States',
                Issued: {
                  day: '1',
                  month: '1',
                  year: '2016',
                  date: new Date('1/1/2016')
                },
                Location: {
                  addressType: 'United States',
                  address: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'Virginia',
                  zipcode: '22202'
                },
                Name: {
                  first: 'Foo',
                  firstInitialOnly: false,
                  middle: 'J',
                  middleInitialOnly: true,
                  noMiddleName: false,
                  last: 'Bar',
                  lastInitialOnly: false,
                  suffix: 'Jr'
                },
                Number: {
                  value: 'number'
                },
                Expiration: {
                  day: '1',
                  month: '1',
                  year: '2016',
                  date: new Date('1/1/2016')
                },
                Used: 'Yes',
                Countries: [
                  {
                    Item: {
                      Country: 'United States',
                      Dates: {
                        from: {
                          date: new Date('1/1/2010')
                        },
                        to: {
                          date: new Date('1/1/2012')
                        },
                        present: false
                      }
                    }
                  }
                ]
              }
            }
          ]
        },
        expected: true
      }
    ]

    battery(tests, CitizenshipMultipleValidator, 'isValid')
  })
})
