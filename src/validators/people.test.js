import PeopleValidator from './people'
import PersonValidator from './person'
import Location from '../components/Form/Location'

describe('People validator', function () {
  it('should validate people', function () {
    const currentYear = (new Date()).getFullYear().toString()
    const tests = [
      {
        data: {
          List: {
            branch: { value: 'No' },
            items: []
          }
        },
        expected: false
      },
      {
        data: {
          List: {
            branch: { value: 'No' },
            items: [{ Item: {} }, { Item: {} }, { Item: {} }]
          }
        },
        expected: false
      },
      {
        data: {
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
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
                  Relationship: {
                    values: ['Friend']
                  },
                  Dates: {
                    from: {
                      month: '1',
                      day: '1',
                      year: '2009',
                      date: new Date('1/1/2009')
                    },
                    to: {
                      month: '1',
                      day: '1',
                      year: currentYear,
                      date: new Date(`1/1/${currentYear}`)
                    },
                    present: false
                  },
                  Rank: {
                    value: 'Some rank'
                  },
                  MobileTelephone: {
                    noNumber: '',
                    number: '7031112222',
                    numberType: 'Home',
                    type: 'Domestic',
                    timeOfDay: 'Both',
                    extension: ''
                  },
                  OtherTelephone: {
                    noNumber: '',
                    number: '7031112223',
                    numberType: 'Home',
                    type: 'Domestic',
                    timeOfDay: 'Both',
                    extension: ''
                  },
                  Email: {
                    value: 'test@local.dev'
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
              },
              {
                Item: {
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
                  Relationship: {
                    values: ['Friend']
                  },
                  Dates: {
                    from: {
                      month: '1',
                      day: '1',
                      year: '2010',
                      date: new Date('1/1/2010')
                    },
                    to: {
                      month: '1',
                      day: '1',
                      year: '2012',
                      date: new Date('1/1/2012')
                    },
                    present: false
                  },
                  Rank: {
                    value: 'Some rank'
                  },
                  MobileTelephone: {
                    noNumber: '',
                    number: '7031112222',
                    numberType: 'Home',
                    type: 'Domestic',
                    timeOfDay: 'Both',
                    extension: ''
                  },
                  OtherTelephone: {
                    noNumber: '',
                    number: '7031112223',
                    numberType: 'Home',
                    type: 'Domestic',
                    timeOfDay: 'Both',
                    extension: ''
                  },
                  Email: {
                    value: 'test@local.dev'
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
              },
              {
                Item: {
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
                  Relationship: {
                    values: ['Friend']
                  },
                  Dates: {
                    from: {
                      month: '1',
                      day: '1',
                      year: '2010',
                      date: new Date('1/1/2010')
                    },
                    to: {
                      month: '1',
                      day: '1',
                      year: '2012',
                      date: new Date('1/1/2012')
                    },
                    present: false
                  },
                  Rank: {
                    value: 'Some rank'
                  },
                  MobileTelephone: {
                    noNumber: '',
                    number: '7031112222',
                    numberType: 'Home',
                    type: 'Domestic',
                    timeOfDay: 'Both',
                    extension: ''
                  },
                  OtherTelephone: {
                    noNumber: '',
                    number: '7031112223',
                    numberType: 'Home',
                    type: 'Domestic',
                    timeOfDay: 'Both',
                    extension: ''
                  },
                  Email: {
                    value: 'test@local.dev'
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
      expect(new PeopleValidator(test.data).isValid()).toBe(test.expected)
    })
  })

  it('should count number of valid people', function () {
    const tests = [
      {
        data: {
          List: {
            branch: { value: 'No' },
            items: []
          }
        },
        expected: 0
      },
      {
        data: {
          List: {
            branch: { value: 'No' },
            items: [{
              Item: {
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
                Relationship: {
                  values: ['Friend']
                },
                Dates: {
                  from: {
                    month: '1',
                    day: '1',
                    year: '2005',
                    date: new Date('1/1/2005')
                  },
                  to: {
                    month: '1',
                    day: '1',
                    year: '2017',
                    date: new Date('1/1/2017')
                  },
                  present: false
                },
                Rank: {
                  value: 'Some rank'
                },
                MobileTelephone: {
                  noNumber: '',
                  number: '7031112222',
                  numberType: 'Home',
                  type: 'Domestic',
                  timeOfDay: 'Both',
                  extension: ''
                },
                OtherTelephone: {
                  noNumber: '',
                  number: '7031112223',
                  numberType: 'Home',
                  type: 'Domestic',
                  timeOfDay: 'Both',
                  extension: ''
                },
                Email: {
                  value: 'test@local.dev'
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
            }]
          }
        },
        expected: 1
      }
    ]

    tests.forEach(test => {
      // ensure each individual person is valid
      test.data.List.items.forEach(person => {
        expect(new PersonValidator(person.Item).isValid()).toBe(true)
      })
      expect(new PeopleValidator(test.data).validCount()).toBe(test.expected)
    })
  })
})
