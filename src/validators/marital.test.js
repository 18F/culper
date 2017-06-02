import MaritalValidator from './marital'

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
                domestic: 'Yes',
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
      }
    ]
    tests.forEach(test => {
      expect(new MaritalValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
