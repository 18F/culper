import CivilUnion from './civilunion'

describe('CivilUnion validation', function () {
  it('validates divorce', () => {
    const tests = [
      {
        state: {
          Divorced: 'No'
        },
        expected: true
      },
      {
        state: {
          Divorced: 'Nope'
        },
        expected: false
      },
      {
        state: {
          Divorced: 'Yes',
          DivorcedList: []
        },
        expected: false
      },
      {
        state: {
          Divorced: 'Yes',
          DivorcedList: [{Divorce: {}}]
        },
        expected: false
      },
      {
        state: {
          Divorced: 'Yes',
          DivorcedList: [{
            Divorce: {
              Status: 'Widowed',
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
              DateDivorced: {
                day: '1',
                month: '1',
                year: '2016',
                date: new Date('1/1/2016')
              },
              Birthdate: {
                day: '1',
                month: '1',
                year: '2016',
                date: new Date('1/1/2016')
              },
              BirthPlace: {
                domestic: true,
                country: 'United States',
                city: 'Arlington',
                county: 'Arlington',
                state: 'VA'
              },
              Telephone: {
                noNumber: '',
                number: '7031112222',
                numberType: 'Home',
                timeOfDay: 'Both',
                extension: ''
              },
              Recognized: {
                day: '1',
                month: '1',
                year: '2016',
                date: new Date('1/1/2016')
              },
              Address: {
                addressType: 'United States',
                address: '1234 Some Rd',
                city: 'Arlington',
                state: 'Virginia',
                zipcode: '22202'
              }
            }
          }]
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new CivilUnion(test.state, null).validDivorced()).toBe(test.expected)
    })
  })

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
            addressType: 'United States',
            address: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202'
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
      expect(new CivilUnion(test.state, null).validSeparated()).toBe(test.expected)
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
      expect(new CivilUnion(test.state, null).validOtherName()).toBe(test.expected)
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
            domestic: true,
            country: 'United States',
            city: 'Arlington',
            county: 'Arlington',
            state: 'VA'
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
      expect(new CivilUnion(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
