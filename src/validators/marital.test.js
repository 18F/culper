import MaritalValidator from './marital'
import Location from '../components/Form/Location'

describe('Marital validation', function() {
  it('validates divorce', () => {
    const tests = [
      {
        state: {
          DivorcedList: {
            branch: { value: 'No' },
            items: []
          }
        },
        expected: false
      },
      {
        state: {
          DivorcedList: {
            branch: { value: 'No' },
            items: [{ Item: {} }]
          }
        },
        expected: false
      },
      {
        state: {
          DivorcedList: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  Status: { value: 'Widowed' },
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
                    country: { value: 'United States' },
                    city: 'Arlington',
                    county: 'Arlington',
                    state: 'VA',
                    layout: Location.BIRTHPLACE
                  },
                  Citizenship: {
                    value: ['Germany']
                  },
                  Telephone: {
                    noNumber: '',
                    number: '7031112222',
                    numberType: 'Home',
                    type: 'Domestic',
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
                    country: { value: 'United States' },
                    street: '1234 Some Rd',
                    city: 'Arlington',
                    state: 'VA',
                    zipcode: '22202',
                    layout: Location.ADDRESS
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
      expect(new MaritalValidator(test.state, null).validDivorce()).toBe(
        test.expected
      )
    })
  })
  it('validates status', () => {
    const tests = [
      {
        state: {
          Status: {
            value: 'NeverMarried'
          }
        },
        expected: true
      },
      {
        state: {
          Status: {
            value: 'Nope'
          }
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new MaritalValidator(test.state, null).validStatus()).toBe(
        test.expected
      )
    })
  })

  it('validates marital', () => {
    const tests = [
      {
        state: {
          Status: {
            value: 'Nope'
          }
        },
        expected: false
      },
      {
        state: {
          Status: {
            value: 'NeverMarried'
          }
        },
        expected: true
      },
      {
        state: {
          Status: {
            value: 'InCivilUnion'
          }
        },
        expected: false
      },
      {
        state: {
          Status: {
            value: 'Annulled'
          },
          DivorcedList: {
            branch: { value: '' },
            items: [{ Item: {} }]
          }
        },
        expected: false
      },
      {
        state: {
          Status: { value: 'InCivilUnion' },
          DivorcedList: {
            branch: { value: '' },
            items: [{ Item: {} }]
          },
          CivilUnion: {
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
            Divorced: { value: 'Yes' },
            Separated: { value: 'No' },
            OtherNameNotApplicable: { applicable: false },
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
              DocumentType: 'FS240',
              DocumentExpirationNotApplicable: true,
              DocumentNumber: {
                value: 'A1234'
              }
            }
          }
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new MaritalValidator(test.state, null).isValid()).toBe(
        test.expected
      )
    })
  })
})
