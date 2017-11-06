import HistoryEducationValidator, { EducationItemValidator } from './education'
import Location from '../components/Form/Location'

describe('Education component validation', function () {
  it('handle no education', () => {
    const tests = [
      {
        state: {
          HasAttended: { value: 'No' },
          HasDegree10: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          HasAttended: { value: 'Yes' },
          HasDegree10: { value: 'No' }
        },
        expected: false
      },
      {
        state: {
          HasAttended: { value: 'No' },
          HasDegree10: { value: 'Yes' }
        },
        expected: false
      },
      {
        state: {
          HasAttended: null,
          HasDegree10: null
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new HistoryEducationValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })

  it('handle dates', () => {
    const tests = [
      {
        state: {
          HasAttended: { value: 'Yes' },
          Dates: {
            from: {
              date: new Date('1/1/2000')
            },
            to: {
              date: new Date('1/1/2004')
            },
            present: false
          }
        },
        expected: true
      },
      {
        state: {
          HasAttended: { value: 'Yes' },
          Dates: {
            from: {
              date: new Date('1/1/2004')
            },
            to: {
              date: new Date('1/1/2000')
            },
            present: false
          }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new EducationItemValidator(test.state, null).validDates()).toBe(test.expected)
    })
  })

  it('handle address', () => {
    const tests = [
      {
        state: {
          HasAttended: { value: 'Yes' },
          Address: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202',
            layout: Location.ADDRESS
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new EducationItemValidator(test.state, null).validAddress()).toBe(test.expected)
    })
  })

  it('handle name', () => {
    const tests = [
      {
        state: {
          HasAttended: { value: 'Yes' },
          Name: {
            value: 'Hubert Humphrey High'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new EducationItemValidator(test.state, null).validName()).toBe(test.expected)
    })
  })

  it('handle type', () => {
    const tests = [
      {
        state: {
          HasAttended: { value: 'Yes' },
          Type: 'High School'
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new EducationItemValidator(test.state, null).validType()).toBe(test.expected)
    })
  })

  it('handle reference', () => {
    const tests = [
      {
        state: {
          HasAttended: { value: 'Yes' },
          Dates: {
            from: {
              date: new Date('1/1/2000')
            },
            to: {
              date: new Date()
            },
            present: false
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
            Relationship: ['Friend'],
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
          HasAttended: { value: 'Yes' },
          Dates: {
            from: {
              date: new Date('1/1/2000')
            },
            to: {
              date: new Date('1/1/2001')
            },
            present: false
          },
          Reference: null
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new EducationItemValidator(test.state, null).validReference()).toBe(test.expected)
    })
  })

  it('handle diplomas', () => {
    const tests = [
      {
        state: {
          HasAttended: { value: 'Yes' },
          Diplomas: [ { Has: 'No' } ]
        },
        expected: true
      },
      {
        state: {
          HasAttended: { value: 'Yes' },
          Diplomas: []
        },
        expected: false
      },
      {
        state: {
          HasAttended: { value: 'Yes' },
          Diplomas: null
        },
        expected: false
      },
      {
        state: {
          HasAttended: { value: 'Yes' },
          Diplomas: [
            {
              Has: 'Yes',
              Diploma: {
                Date: {
                  date: new Date()
                },
                Diploma: 'Other',
                DiplomaOther: {
                  value: ''
                }
              }
            }
          ]
        },
        expected: false
      },
      {
        state: {
          HasAttended: { value: 'Yes' },
          Diplomas: [
            {
              Has: 'Yes',
              Diploma: {
                Date: null,
                Diploma: 'Other',
                DiplomaOther: {
                  value: 'Other'
                }
              }
            }
          ]
        },
        expected: false
      },
      {
        state: {
          HasAttended: { value: 'Yes' },
          Diplomas: [
            {
              Has: 'Yes',
              Diploma: null
            }
          ]
        },
        expected: false
      },
      {
        state: {
          HasAttended: { value: 'Yes' },
          Diplomas: [
            {
              Has: 'Yes',
              Diploma: {
                Date: {
                  date: new Date()
                },
                Diploma: 'High School Diploma',
                DiplomaOther: null
              }
            },
            {
              Has: 'Yes',
              Diploma: {
                Date: {
                  date: new Date()
                },
                Diploma: 'Other',
                DiplomaOther: {
                  value: 'GED'
                }
              }
            }
          ]
        },
        expected: true
      },
      {
        state: {
          HasAttended: { value: 'Yes' },
          Diplomas: [
            {
              Has: 'Yes',
              Diploma: {
                Date: {
                  date: new Date()
                },
                Diploma: 'High School Diploma',
                DiplomaOther: null
              }
            },
            {
              Has: 'No'
            }
          ]
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new EducationItemValidator(test.state, null).validDiplomas()).toBe(test.expected)
    })
  })

  it('handle valid attendance', () => {
    const tests = [
      {
        state: {
          HasAttended: { value: 'Yes' },
          HasDegree10: { value: 'Yes' }
        },
        expected: true
      },
      {
        state: {
          HasAttended: { value: 'Nope' },
          HasDegree10: { value: 'Yes' }
        },
        expected: false
      },
      {
        state: {
          HasAttended: { value: 'No' },
          HasDegree10: { value: 'Nope' }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new HistoryEducationValidator(test.state, null).validAttendance()).toBe(test.expected)
    })
  })

  it('handle valid list', () => {
    const tests = [
      {
        state: {
          HasAttended: { value: 'Yes' },
          HasDegree10: { value: 'Yes' },
          List: {
            items: [
              {
                Item: {
                  Name: {
                    value: 'School name'
                  },
                  Reference: {
                    FullNameNotApplicable: {
                      applicable: false
                    }
                  },
                  Type: 'High School',
                  Address: {
                    country: { value: 'United States' },
                    street: '1234 Some Rd',
                    city: 'Arlington',
                    state: 'Virginia',
                    zipcode: '22202',
                    layout: Location.ADDRESS
                  },
                  Dates: {
                    from: {
                      date: new Date('1/1/2010')
                    },
                    to: {
                      date: new Date('1/1/2016')
                    },
                    present: false
                  },
                  Diplomas: [
                    {
                      Has: 'No',
                      Diploma: null
                    }
                  ]
                }
              }
            ]
          }
        },
        expected: true
      },
      {
        state: {
          HasAttended: { value: 'Yes' },
          HasDegree10: { value: 'Yes' },
          List: {
            items: [
              {
                Item: {
                  Name: {
                    value: ''
                  },
                  Reference: null,
                  Type: 'High School',
                  Address: {
                    country: { value: 'United States' },
                    street: '1234 Some Rd',
                    city: 'Arlington',
                    state: 'Virginia',
                    zipcode: '22202',
                    layout: Location.ADDRESS
                  },
                  Dates: {
                    from: {
                      date: new Date('1/1/2010')
                    },
                    to: {
                      date: new Date('1/1/2016')
                    },
                    present: false
                  },
                  Diplomas: [
                    {
                      Has: 'No',
                      Diploma: null
                    }
                  ]
                }
              }
            ]
          }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new HistoryEducationValidator(test.state, null).validList()).toBe(test.expected)
    })
  })
})
