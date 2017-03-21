import ResidenceValidator from './residence'

describe('Residence component validation', function () {
  it('should validate role', function () {
    const tests = [
      {
        state: {
          Role: 'Military'
        },
        expected: true
      },
      {
        state: {
          Role: 'Other',
          RoleOther: 'Hello world'
        },
        expected: true
      },
      {
        state: {
          Role: 'Other',
          RoleOther: ''
        },
        expected: false
      },
      {
        state: {
          Role: null
        },
        expected: false
      },
      {
        state: {
          Role: 'foo'
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new ResidenceValidator(test.state, null).validRole()).toBe(test.expected)
    })
  })

  it('should validate residence', function () {
    const tests = [
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
          },
          Role: 'Military',
          Address: {
            addressType: 'United States',
            address: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202'
          },
          Reference: {
            FullName: {
              first: 'Foo',
              firstInitialOnly: false,
              middle: 'J',
              middleInitialOnly: true,
              noMiddleName: false,
              last: 'Bar',
              lastInitialOnly: false,
              suffix: 'Jr'
            },
            LastContact: {
              day: '1',
              month: '1',
              year: '2016',
              date: new Date('1/1/2016')
            },
            Relationship: 'Friend',
            Phone: {
              noNumber: '',
              number: '7031112222',
              numberType: 'Home',
              timeOfDay: 'Both',
              extension: ''
            },
            Email: {
              value: 'user@local.dev'
            },
            Address: {
              addressType: 'United States',
              address: '1234 Some Rd',
              city: 'Arlington',
              state: 'Virginia',
              zipcode: '22202'
            }
          }
        },
        expected: true
      },
      {
        state: {
          Role: 'Other',
          RoleOther: 'Hello world'
        },
        expected: false
      },
      {
        state: {
          Role: 'Other',
          RoleOther: ''
        },
        expected: false
      },
      {
        state: {
          Role: null
        },
        expected: false
      },
      {
        state: {
          Role: 'foo'
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new ResidenceValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
