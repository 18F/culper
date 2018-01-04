import CohabitantsValidator, { CohabitantValidator } from './cohabitant'
import Location from '../components/Form/Location'

describe('Cohabitant validation', function () {
  it('validates citizenship', () => {
    const tests = [
      {
        state: {
          Citizenship: {}
        },
        expected: false
      },
      {
        state: {
          Citizenship: {
            value: []
          }
        },
        expected: false
      },
      {
        state: {
          Citizenship: {
            value: ['Germany', 'United States']
          }
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new CohabitantValidator(test.state, null).validCitizenship()).toBe(test.expected)
    })
  })

  it('validates other name', () => {
    const tests = [
      {
        state: {
          OtherNames: {
            items: []
          }
        },
        expected: false
      },
      {
        state: {
          OtherNames: {
            items: [
              {
                Item: {
                  Has: { value: 'No' }
                }
              }
            ]
          }
        },
        expected: true
      },
      {
        state: {
          OtherNames: {
            items: [
              {
                Item: {
                  Has: { value: 'Nope' }
                }
              }
            ]
          }
        },
        expected: false
      },
      {
        state: {
          OtherNames: {
            items: [
              {
                Item: {
                  Has: { value: 'Yes' }
                }
              }
            ]
          }
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new CohabitantValidator(test.state, null).validOtherNames()).toBe(test.expected)
    })
  })

  it('validates cohabitant', () => {
    const tests = [
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
          },
          Birthdate: {
            day: '1',
            month: '1',
            year: '2016',
            date: new Date('1/1/2016')
          },
          BirthPlace: {
            country: { value: 'United States' },
            city: 'Arlington',
            county: 'Arlington',
            state: 'VA',
            layout: Location.BIRTHPLACE
          },
          SSN: {
            first: '111',
            middle: '11',
            last: '1111',
            applicable: true
          },
          OtherNames: {
            items: [
              {
                Item: {
                  Has: { value: 'No' }
                }
              }
            ]
          },
          Citizenship: {
            value: ['Germany', 'United States']
          },
          ForeignBornDocument: {
            DocumentType: { value: 'FS240' },
            DocumentExpirationNotApplicable: { applicable: true },
            DocumentNumber: {
              value: 'A1234'
            }
          }
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new CohabitantValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })

  it('validates cohabitants', () => {
    const tests = [
      {
        state: {
          HasCohabitant: { value: 'Nope' }
        },
        expected: false
      },
      {
        state: {
          HasCohabitant: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          HasCohabitant: { value: 'Yes' },
          CohabitantList: {
            branch: { value: 'No' },
            items: []
          }
        },
        expected: false
      },
      {
        state: {
          HasCohabitant: { value: 'Yes' },
          CohabitantList: {
            branch: { value: 'No' },
            items: [{Cohabitant: {}}]
          }
        },
        expected: false
      },

      {
        state: {
          HasCohabitant: { value: 'Yes' },
          CohabitantList: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
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
                  Birthdate: {
                    day: '1',
                    month: '1',
                    year: '2016',
                    date: new Date('1/1/2016')
                  },
                  BirthPlace: {
                    country: { value: 'United States' },
                    city: 'Arlington',
                    county: 'Arlington',
                    state: 'VA',
                    layout: Location.BIRTHPLACE
                  },
                  SSN: {
                    first: '111',
                    middle: '11',
                    last: '1111',
                    applicable: true
                  },
                  OtherNames: {
                    items: [
                      {
                        Item: {
                          Has: { value: 'No' }
                        }
                      }
                    ]
                  },
                  Citizenship: {
                    value: ['Germany', 'United States']
                  },
                  ForeignBornDocument: {
                    DocumentType: { value: 'FS240' },
                    DocumentExpirationNotApplicable: { applicable: true },
                    DocumentNumber: {
                      value: 'A1234'
                    }
                  }
                }
              }
            ]
          }
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new CohabitantsValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })

  it('validates foreign born documents', () => {
    const tests = [
      {
        state: {
          BirthPlace: {
            country: { value: 'Germany' },
            city: 'Munich',
            layout: Location.BIRTHPLACE
          },
          ForeignBornDocument: {
            DocumentType: { value: 'FS240' },
            DocumentExpirationNotApplicable: { applicable: true },
            DocumentNumber: {
              value: 'A1234'
            }
          }
        },
        expected: true
      },
      {
        state: {
          BirthPlace: {}
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new CohabitantValidator(test.state, null).validForeignBornDocument()).toBe(test.expected)
    })
  })

  it('validates similar spouse', () => {
    const tests = [
      {
        state: {
          name: null
        },
        expected: false
      },
      {
        state: {
          Name: {
            first: 'John',
            middle: 'S',
            last: 'Doe'
          }
        },
        spouse: {
          first: 'John',
          middle: 'S',
          last: 'Doe'
        },
        expected: true
      },
      {
        state: {
          Name: {
            first: 'John',
            middle: 'S',
            last: 'Doe'
          }
        },
        spouse: {
          first: 'John',
          middle: 'S',
          last: 'Does'
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new CohabitantValidator(test.state, null).similarSpouse(test.spouse)).toBe(test.expected)
    })
  })
})
