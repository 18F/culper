import { ResidenceValidator } from './residence'
import Location from '../components/Form/Location'

describe('Residence component validation', function () {
  it('should validate role', function () {
    const tests = [
      {
        state: {
          Role: {
            value: 'Military'
          }
        },
        expected: true
      },
      {
        state: {
          Role: {
            value: 'Other'
          },
          RoleOther: {
            value: 'Hello world'
          }
        },
        expected: true
      },
      {
        state: {
          Role: {
            value: 'Other'
          },
          RoleOther: {
            value: ''
          }
        },
        expected: false
      },
      {
        state: {
          Role: {}
        },
        expected: false
      },
      {
        state: {
          Role: {
            value: 'foo'
          }
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
              day: '1',
              month: '1',
              year: '2010',
              date: new Date('1/1/2010')
            },
            to: {
              day: '1',
              month: '1',
              year: '2012',
              date: new Date('1/1/2012')
            },
            present: false
          },
          Role: {
            value: 'Military'
          },
          Address: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202',
            layout: Location.ADDRESS
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
            Relationship: {
              value: 'Friend'
            },
            Phone: {
              noNumber: '',
              number: '7031112222',
              numberType: 'Home',
              type: 'Domestic',
              timeOfDay: 'Both',
              extension: ''
            },
            Email: {
              value: 'user@local.dev'
            },
            Address: {
              country: { value: 'United States' },
              street: '1234 Some Rd',
              city: 'Arlington',
              state: 'Virginia',
              zipcode: '22202',
              layout: Location.ADDRESS
            }
          }
        },
        expected: true
      },
      {
        state: {
          Role: {
            value: 'Other'
          },
          RoleOther: {
            value: 'Hello world'
          }
        },
        expected: false
      },
      {
        state: {
          Role: {
            value: 'Other'
          },
          RoleOther: {
            value: ''
          }
        },
        expected: false
      },
      {
        state: {
          Role: {}
        },
        expected: false
      },
      {
        state: {
          Role: {
            value: 'foo'
          }
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new ResidenceValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
