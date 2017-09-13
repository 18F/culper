import CitizenshipPassportsValidator, { PassportItemValidator, TravelItemValidator } from './citizenship-passports'
import { battery } from './helpers'
import Location from '../components/Form/Location'

describe('citizenship multiple component validation', function () {
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
                Country: {
                  value: 'United States'
                },
                Issued: {
                  day: '1',
                  month: '1',
                  year: '2016',
                  date: new Date('1/1/2016')
                },
                Location: {
                  country: 'United States',
                  city: 'Arlington',
                  layout: Location.CITY_COUNTRY
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
                Country: {
                  value: 'United States'
                },
                Issued: {
                  day: '1',
                  month: '1',
                  year: '2016',
                  date: new Date('1/1/2016')
                },
                Location: {
                  country: 'United States',
                  city: 'Arlington',
                  layout: Location.CITY_COUNTRY
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
    battery(tests, CitizenshipPassportsValidator, 'isValid')
  })

  it('can validate travel country', () => {
    const tests = [
      {
        state: {
          Country: {
            value: ''
          }
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

    battery(tests, TravelItemValidator, 'validCountry')
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

    battery(tests, TravelItemValidator, 'validDates')
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
          Country: {
            value: 'United States'
          }
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
            country: 'United States',
            city: 'Arlington',
            layout: Location.CITY_COUNTRY
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
})
