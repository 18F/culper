import ForeignCoOwnersValidator, { ForeignCoOwnerValidator } from './foreigncoowner'

describe('CoOwner validation', function () {
  it('should validate countries', function () {
    const tests = [
      {
        props: {
          Countries: {
            value: [{value: 'Germany'}]
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

            addressType: 'United States',
            address: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202'
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
          List: []
        },
        expected: false
      },
      {
        props: {
          List: [{ Has: 'No' }]
        },
        expected: true
      },
      {
        props: {
          List: [
            {
              Has: 'Yes',
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
                  addressType: 'United States',
                  address: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'Virginia',
                  zipcode: '22202'
                },
                Countries: {
                  value: [{value: 'Germany'}]
                },
                RelationshipNature: {
                  value: 'Some stuff'
                }
              }
            }
          ]
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new ForeignCoOwnersValidator(null, test.props).isValid()).toBe(test.expected)
    })
  })
})
