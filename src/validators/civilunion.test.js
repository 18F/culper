import CivilUnionValidator from './civilunion'
import Location from '../components/Form/Location'

describe('CivilUnion validation', function() {
  it('validates separated', () => {
    const tests = [
      {
        data: {
          Separated: { value: 'No' }
        },
        expected: true
      },
      {
        data: {
          Separated: { value: 'Nope' }
        },
        expected: false
      },
      {
        data: {
          Separated: { value: 'Yes' },
          AddressSeparatedNotApplicable: true,
          DateSeparated: {
            day: '1',
            month: '1',
            year: '2016',
            date: new Date('1/1/2016')
          }
        },
        expected: true
      },
      {
        data: {
          Separated: { value: 'Yes' },
          AddressSeparatedNotApplicable: false,
          AddressSeparated: {
            country: { value: 'United States' },
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.US_CITY_STATE_ZIP_INTERNATIONAL_CITY
          },
          DateSeparated: {
            day: '1',
            month: '1',
            year: '2016',
            date: new Date('1/1/2016')
          }
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new CivilUnionValidator(test.data).validSeparated()).toBe(
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
                  Has: { value: 'Yes' },
                  Othername: {
                    first: 'Foo',
                    firstInitialOnly: false,
                    middle: 'J',
                    middleInitialOnly: true,
                    noMiddleName: false,
                    last: 'Bar',
                    lastInitialOnly: false,
                    suffix: 'Jr'
                  },
                  MaidenName: {
                    value: 'No'
                  },
                  DatesUsed: {
                    from: {
                      month: '1',
                      day: '1',
                      year: '2010',
                      date: new Date('1/1/2010')
                    },
                    to: {
                      month: '1',
                      day: '1',
                      year: '2016',
                      date: new Date('1/1/2016')
                    },
                    present: false
                  }
                }
              },
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
      expect(new CivilUnionValidator(test.data).validOtherName()).toBe(
        test.expected
      )
    })
  })

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
      expect(new CivilUnionValidator(test.data).validCitizenship()).toBe(
        test.expected
      )
    })
  })

  it('validates address', () => {
    const tests = [
      {
        data: {
          Address: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS
          }
        },
        expected: true
      },
      {
        data: {
          Address: {
            country: { value: 'United States' },
            street: '',
            city: '',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS
          }
        },
        expected: false
      },
      {
        data: {
          Address: {}
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new CivilUnionValidator(test.data).validAddress()).toBe(
        test.expected
      )
    })
  })

  it('validates civil union', () => {
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
          Location: {
            country: { value: 'United States' },
            city: 'Arlington',
            state: 'VA',
            county: 'Arlington',
            zipcode: '22202',
            layout: Location.BIRTHPLACE
          },
          Address: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS
          },
          Telephone: {
            noNumber: '',
            number: '7031112222',
            numberType: 'Home',
            type: 'Domestic',
            timeOfDay: 'Both',
            extension: ''
          },
          SSN: {
            first: '111',
            middle: '11',
            last: '1111',
            applicable: true
          },
          Divorced: { value: 'No' },
          Separated: { value: 'No' },
          OtherNameNotApplicable: false,
          OtherName: {
            first: 'Foo',
            firstInitialOnly: false,
            middle: 'J',
            middleInitialOnly: true,
            noMiddleName: false,
            last: 'Bar',
            lastInitialOnly: false,
            suffix: 'Jr'
          },
          DatesUsed: {
            from: {
              month: '1',
              day: '1',
              year: '2010',
              date: new Date('1/1/2010')
            },
            to: {
              month: '1',
              day: '1',
              year: '2016',
              date: new Date('1/1/2016')
            },
            present: false
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
      expect(new CivilUnionValidator(test.data).isValid()).toBe(test.expected)
    })
  })

  it('validates foreign born documents', () => {
    const tests = [
      {
        data: {
          BirthPlace: {
            domestic: 'No',
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
        new CivilUnionValidator(test.data).validForeignBornDocument()
      ).toBe(test.expected)
    })
  })
})
