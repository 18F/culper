import ForeignCoOwnersValidator, { ForeignCoOwnerValidator } from './foreigncoowner'
import Location from '../components/Form/Location'

describe('CoOwner validation', function () {
  it('should validate countries', function () {
    const tests = [
      {
        props: {
          Countries: {
            value: ['Germany']
          }
        },
        expected: true
      },
      {
        props: {
          Countries: {
            value: []
          }
        },
        expected: false
      },
      {
        props: {
          Countries: {
            value: null
          }
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new ForeignCoOwnerValidator(null, test.props).validCountries()).toBe(test.expected)
    })
  })

  it('should validate co-owner', function () {
    const tests = [
      {
        props: {
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
            state: 'Virginia',
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
      expect(new ForeignCoOwnerValidator(null, test.props).isValid()).toBe(test.expected)
    })
  })

  it('should validate list of co-owners', function () {
    const tests = [
      {
        props: {
          List: {
            items: []
          }
        },
        expected: false
      },
      {
        props: {
          List: {
            items: [{ Item: { Has: { value: 'No' } } }]
          }
        },
        expected: true
      },
      {
        props: {
          List: {
            items: [
              {
                Item: {
                  Has: {
                    value: 'Yes'
                  },
                  CoOwner: {
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
                      state: 'Virginia',
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
                }
              }
            ]
          }
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new ForeignCoOwnersValidator(null, test.props).isValid()).toBe(test.expected)
    })
  })
})
