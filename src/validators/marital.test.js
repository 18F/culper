import MaritalValidator from './marital'
import { Layouts } from '../components/Form/Location'

describe('Marital validation', function () {
  it('validates divorce', () => {
    const tests = [
      {
        state: {
          DivorcedList: [],
          DivorcedListBranch: 'No'
        },
        expected: false
      },
      {
        state: {
          DivorcedList: [{Divorce: {}}],
          DivorcedListBranch: 'No'
        },
        expected: false
      },
      {
        state: {
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
                country: 'United States',
                city: 'Arlington',
                county: 'Arlington',
                state: 'VA',
                layout: Layouts.BIRTHPLACE
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
          }],
          DivorcedListBranch: 'No'
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new MaritalValidator(test.state, null).validDivorce()).toBe(test.expected)
    })
  })
  it('validates status', () => {
    const tests = [
      {
        state: {
          Status: 'Never'

        },
        expected: true
      },
      {
        state: {
          Status: 'Nope'

        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new MaritalValidator(test.state, null).validStatus()).toBe(test.expected)
    })
  })

  it('validates marital', () => {
    const tests = [
      {
        state: {
          Status: 'Nope'

        },
        expected: false
      },
      {
        state: {
          Status: 'Never'

        },
        expected: true
      },
      {
        state: {
          Status: 'InCivilUnion'

        },
        expected: false
      },
      {
        state: {
          Status: 'Annulled',
          DivorcedList: [{Divorce: {}}],
          DivorcedListBranch: ''
        },
        expected: false
      },
      {
        state: {
          Status: 'InCivilUnion',
          DivorcedList: [{Divorce: {}}],
          DivorcedListBranch: '',
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
              country: 'United States',
              city: 'Arlington',
              county: 'Arlington',
              state: 'VA',
              layout: Layouts.BIRTHPLACE
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
            Divorced: 'Yes',
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
          }
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new MaritalValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
