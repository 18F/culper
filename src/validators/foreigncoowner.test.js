import ForeignCoOwnersValidator, { ForeignCoOwnerValidator } from './foreigncoowner'
import Location from '../components/Form/Location'

describe('CoOwner validation', function () {
  it('should validate countries', function () {
    const tests = [
      {
        data: {
          Countries: {
            value: ['Germany']
          }
        },
        expected: true
      },
      {
        data: {
          Countries: {
            value: []
          }
        },
        expected: false
      },
      {
        data: {
          Countries: {
            value: null
          }
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new ForeignCoOwnerValidator(test.data).validCountries()).toBe(test.expected)
    })
  })

  it('should validate co-owner', function () {
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
          Address: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS
          },
          Countries: {
            value: [{value: 'Germany'}]
          },
          RelationshipNature: {
            value: 'Some stuff'
          }
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new ForeignCoOwnerValidator(test.data).isValid()).toBe(test.expected)
    })
  })

  it('should validate list of co-owners', function () {
    const tests = [
      {
        data: {
          List: {
            items: []
          }
        },
        expected: false
      },
      {
        data: {
          List: {
            items: [{ Item: { Has: { value: 'No' } } }]
          }
        },
        expected: true
      },
      {
        data: {
          List: {
            items: [
              {
                Item: {
                  Has: {
                    value: 'Yes'
                  },
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
                  Address: {
                    country: { value: 'United States' },
                    street: '1234 Some Rd',
                    city: 'Arlington',
                    state: 'VA',
                    zipcode: '22202',
                    layout: Location.ADDRESS
                  },
                  Countries: {
                    value: ['Germany']
                  },
                  RelationshipNature: {
                    value: 'Some stuff'
                  }
                }
              },
              {
                Item: {
                  Has: {
                    value: 'No'
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
      expect(new ForeignCoOwnersValidator(test.data).isValid()).toBe(test.expected)
    })
  })
})
