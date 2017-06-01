import MilitaryForeignValidator, { ForeignServiceValidator } from './militaryforeign'

describe('Military foreign validation', function () {
  it('handle whether subject has foreign military', () => {
    const tests = [
      {
        props: {
          List: [
            {
              Has: ''
            }
          ],
          ListBranch: ''
        },
        expected: false
      },
      {
        props: {
          List: [
            {
              Has: 'No'
            }
          ],
          ListBranch: ''
        },
        expected: true
      },
      {
        props: {
          List: [
            {
              Has: 'Yes'
            }
          ],
          ListBranch: ''
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new MilitaryForeignValidator(null, test.props).isValid()).toBe(test.expected)
    })
  })

  it('handle overall validity', function () {
    const tests = [
      {
        props: {
          List: [
            {
              Has: 'Yes'
            }
          ],
          ListBranch: ''
        },
        expected: false
      },
      {
        props: {
          List: [
            {
              Has: 'Yes',
              Item: {
                Organization: 'Military',
                Name: {
                  value: 'Army'
                },
                Dates: {
                  from: {
                    date: new Date('1/1/2010')
                  },
                  to: {
                    date: new Date('1/1/2012')
                  },
                  present: false
                },
                Country: {
                  value: 'Germany'
                },
                Rank: {
                  value: 'Captain'
                },
                Division: {
                  value: 'Luftwaffe'
                },
                Circumstances: {
                  value: 'Mandatory service'
                },
                ReasonLeft: {
                  value: 'Moved'
                },
                MaintainsContact: 'Yes',
                List: [
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
                      Address: {
                        addressType: 'International',
                        address: '1234 Some Rd',
                        city: 'Munich',
                        country: 'Germany'
                      },
                      Title: {
                        value: 'Mr.'
                      },
                      Dates: {
                        from: {
                          date: new Date('1/1/2010')
                        },
                        to: {
                          date: new Date('1/1/2012')
                        },
                        present: false
                      },
                      Frequency: {
                        value: 'Monthly'
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
                      Address: {
                        addressType: 'International',
                        address: '1234 Some Rd',
                        city: 'Munich',
                        country: 'Germany'
                      },
                      Title: {
                        value: null
                      },
                      Dates: {
                        from: {
                          date: new Date('1/1/2010')
                        },
                        to: {
                          date: new Date('1/1/2012')
                        },
                        present: false
                      },
                      Frequency: {
                        value: 'Monthly'
                      }
                    }
                  }
                ],
                ListBranch: 'No'
              }
            }
          ]
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new MilitaryForeignValidator(null, test.props).isValid()).toBe(test.expected)
    })
  })

  it('validates maintains contact', () => {
    const tests = [
      {
        state: {
          MaintainsContact: null
        },
        expected: false
      },
      {
        state: {
          MaintainsContact: 'No'
        },
        expected: true
      },
      {
        state: {
          MaintainsContact: 'Yes',
          List: [],
          ListBranch: 'No'
        },
        expected: false
      },
      {
        state: {
          MaintainsContact: 'Yes',
          List: [{
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
              Address: {
                addressType: 'International',
                address: '1234 Some Rd',
                city: 'Munich',
                country: 'Germany'
              },
              Title: {
                value: 'Test'
              },
              Dates: {
                from: {
                  date: new Date('1/1/2010')
                },
                to: {
                  date: new Date('1/1/2012')
                },
                present: false
              },
              Frequency: {
                value: 'Monthly'
              }
            }
          }],
          ListBranch: 'No'
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new ForeignServiceValidator(test.state, null).validMaintainsContact()).toBe(test.expected)
    })
  })
})
