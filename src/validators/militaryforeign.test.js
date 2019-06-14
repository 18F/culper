import MilitaryForeignValidator, {
  ForeignServiceValidator,
} from './militaryforeign'
import Location from '../components/Form/Location'

describe('Military foreign validation', () => {
  it('handle whether subject has foreign military', () => {
    const tests = [
      {
        props: {
          List: {
            items: [
              {
                Item: {
                  Has: { value: '' },
                },
              },
            ],
          },
        },
        expected: false,
      },
      {
        props: {
          List: {
            items: [
              {
                Item: {
                  Has: { value: 'No' },
                },
              },
            ],
          },
        },
        expected: true,
      },
      {
        props: {
          List: {
            items: [
              {
                Item: {
                  Has: { value: 'Yes' },
                },
              },
            ],
          },
        },
        expected: false,
      },
    ]

    tests.forEach((test) => {
      expect(new MilitaryForeignValidator(test.props).isValid()).toBe(
        test.expected
      )
    })
  })

  it('handle overall validity', () => {
    const tests = [
      {
        props: {
          List: {
            items: [
              {
                Item: {
                  Has: { value: 'Yes' },
                },
              },
            ],
          },
        },
        expected: false,
      },
      {
        props: {
          List: {
            items: [
              {
                Item: {
                  Has: { value: 'Yes' },
                  Organization: 'Military',
                  Name: {
                    value: 'Army',
                  },
                  Dates: {
                    from: {
                      month: '1',
                      day: '1',
                      year: '2010',
                    },
                    to: {
                      month: '1',
                      day: '1',
                      year: '2012',
                    },
                    present: false,
                  },
                  Country: {
                    value: 'Germany',
                  },
                  Rank: {
                    value: 'Captain',
                  },
                  Division: {
                    value: 'Luftwaffe',
                  },
                  Circumstances: {
                    value: 'Mandatory service',
                  },
                  ReasonLeft: {
                    value: 'Moved',
                  },
                  MaintainsContact: { value: 'Yes' },
                  List: {
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
                            suffix: 'Jr',
                          },
                          Address: {
                            street: '1234 Some Rd',
                            city: 'Munich',
                            country: { value: 'Germany' },
                            layout: Location.ADDRESS,
                          },
                          Title: {
                            value: 'Mr.',
                          },
                          Dates: {
                            from: {
                              month: '1',
                              day: '1',
                              year: '2010',
                            },
                            to: {
                              month: '1',
                              day: '1',
                              year: '2012',
                            },
                            present: false,
                          },
                          Frequency: {
                            value: 'Monthly',
                          },
                        },
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
                            suffix: 'Jr',
                          },
                          Address: {
                            street: '1234 Some Rd',
                            city: 'Munich',
                            country: { value: 'Germany' },
                            layout: Location.ADDRESS,
                          },
                          Title: {
                            value: null,
                          },
                          Dates: {
                            from: {
                              month: '1',
                              day: '1',
                              year: '2010',
                            },
                            to: {
                              month: '1',
                              day: '1',
                              year: '2012',
                            },
                            present: false,
                          },
                          Frequency: {
                            value: 'Monthly',
                          },
                        },
                      },
                    ],
                  },
                },
              },
            ],
          },
        },
        expected: false,
      },
    ]

    tests.forEach((test) => {
      expect(new MilitaryForeignValidator(test.props).isValid()).toBe(
        test.expected
      )
    })
  })

  xit('validates maintains contact', () => {
    const tests = [
      {
        state: {
          MaintainsContact: null,
        },
        expected: false,
      },
      {
        state: {
          MaintainsContact: { value: 'No' },
        },
        expected: true,
      },
      {
        state: {
          MaintainsContact: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [],
          },
        },
        expected: false,
      },
      {
        state: {
          MaintainsContact: { value: 'Yes' },
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
                    suffix: 'Jr',
                  },
                  Address: {
                    street: '1234 Some Rd',
                    city: 'Munich',
                    country: { value: 'Germany' },
                    layout: Location.ADDRESS,
                  },
                  Title: {
                    value: 'Test',
                  },
                  Dates: {
                    from: {
                      month: '1',
                      day: '1',
                      year: '2010',
                    },
                    to: {
                      month: '1',
                      day: '1',
                      year: '2012',
                    },
                    present: false,
                  },
                  Frequency: {
                    value: 'Monthly',
                  },
                },
              },
            ],
          },
        },
        expected: true,
      },
    ]

    tests.forEach((test) => {
      expect(
        new ForeignServiceValidator(test.state).validMaintainsContact()
      ).toBe(test.expected)
    })
  })
})
