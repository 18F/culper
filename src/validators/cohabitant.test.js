import CohabitantsValidator, { CohabitantValidator } from './cohabitant'
import Location from '../components/Form/Location'

describe('Cohabitant validation', function() {
  it('validates citizenship', () => {
    const tests = [
      {
        data: {
          Citizenship: {}
        },
        expected: false
      },
      {
        data: {
          Citizenship: {
            value: []
          }
        },
        expected: false
      },
      {
        data: {
          Citizenship: {
            value: ['Germany', 'United States']
          }
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new CohabitantValidator(test.data).validCitizenship()).toBe(
        test.expected
      )
    })
  })

  it('validates other name', () => {
    const tests = [
      {
        data: {
          OtherNames: {
            items: []
          }
        },
        expected: false
      },
      {
        data: {
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
        data: {
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
        data: {
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
      expect(new CohabitantValidator(test.data).validOtherNames()).toBe(
        test.expected
      )
    })
  })

  it('validates cohabitant', () => {
    const tests = [
      {
        data: {
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
            year: '2016'
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
      expect(new CohabitantValidator(test.data).isValid()).toBe(test.expected)
    })
  })

  it('validates cohabitants', () => {
    const tests = [
      {
        data: {
          HasCohabitant: { value: 'Nope' }
        },
        expected: false
      },
      {
        data: {
          HasCohabitant: { value: 'No' }
        },
        expected: true
      },
      {
        data: {
          HasCohabitant: { value: 'Yes' },
          CohabitantList: {
            branch: { value: 'No' },
            items: []
          }
        },
        expected: false
      },
      {
        data: {
          HasCohabitant: { value: 'Yes' },
          CohabitantList: {
            branch: { value: 'No' },
            items: [{ Cohabitant: {} }]
          }
        },
        expected: false
      },
      {
        data: {
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
                    year: '2016'
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
      expect(new CohabitantsValidator(test.data).isValid()).toBe(test.expected)
    })
  })

  it('validates foreign born documents', () => {
    const tests = [
      {
        state: {
          data: {
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
        data: {
          BirthPlace: {}
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(
        new CohabitantValidator(test.data).validForeignBornDocument()
      ).toBe(test.expected)
    })
  })

  it('validates similar spouse', () => {
    const tests = [
      {
        data: {
          name: null
        },
        expected: false
      },
      {
        data: {
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
        data: {
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
      expect(
        new CohabitantValidator(test.data).similarSpouse(test.spouse)
      ).toBe(test.expected)
    })
  })
})
