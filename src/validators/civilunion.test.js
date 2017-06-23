import CivilUnionValidator from './civilunion'
import Location from '../components/Form/Location'

describe('CivilUnion validation', function () {
  it('validates separated', () => {
    const tests = [
      {
        state: {
          Separated: 'No'
        },
        expected: true
      },
      {
        state: {
          Separated: 'Nope'
        },
        expected: false
      },
      {
        state: {
          Separated: 'Yes',
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
        state: {
          Separated: 'Yes',
          AddressSeparatedNotApplicable: false,
          AddressSeparated: {
            country: 'United States',
            city: 'Arlington',
            state: 'Virginia',
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
      expect(new CivilUnionValidator(test.state, null).validSeparated()).toBe(test.expected)
    })
  })

  it('validates other name', () => {
    const tests = [
      {
        state: {
          OtherNameNotApplicable: true
        },
        expected: true
      },
      {
        state: {
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
              date: new Date('1/1/2010')
            },
            to: {
              date: new Date('1/1/2016')
            },
            present: false
          }
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new CivilUnionValidator(test.state, null).validOtherName()).toBe(test.expected)
    })
  })

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
      expect(new CivilUnionValidator(test.state, null).validCitizenship()).toBe(test.expected)
    })
  })

  it('validates civil union', () => {
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
            country: 'United States',
            city: 'Arlington',
            county: 'Arlington',
            state: 'VA',
            layout: Location.BIRTHPLACE
          },
          Location: {
            country: 'United States',
            city: 'Arlington',
            state: 'Virginia',
            county: 'Arlington',
            zipcode: '22202',
            layout: Location.BIRTHPLACE
          },
          Address: {
            addressType: 'United States',
            address: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202'
          },
          Telephone: {
            noNumber: '',
            number: '7031112222',
            numberType: 'Home',
            timeOfDay: 'Both',
            extension: ''
          },
          SSN: {
            first: '111',
            middle: '11',
            last: '1111',
            applicable: true
          },
          Divorced: 'No',
          Separated: 'No',
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
              date: new Date('1/1/2010')
            },
            to: {
              date: new Date('1/1/2016')
            },
            present: false
          },
          Citizenship: {
            value: ['Germany', 'United States']
          },
          ForeignBornDocument: {
            DocumentType: 'FS240',
            DocumentExpirationNotApplicable: true,
            DocumentNumber: {
              value: 'A1234'
            }
          }
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new CivilUnionValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })

  it('validates foreign born documents', () => {
    const tests = [
      {
        state: {
          BirthPlace: {
            domestic: 'No',
            country: 'Germany',
            city: 'Munich'
          },
          ForeignBornDocument: {
            DocumentType: 'FS240',
            DocumentExpirationNotApplicable: true,
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
      expect(new CivilUnionValidator(test.state, null).validForeignBornDocument()).toBe(test.expected)
    })
  })
})
