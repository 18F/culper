import EducationValidator, { EducationItemValidator } from './education'

describe('Education component validation', function () {
  it('handle no education', () => {
    const tests = [
      {
        state: {
          HasAttended: 'No',
          HasDegree10: 'No'
        },
        expected: true
      },
      {
        state: {
          HasAttended: 'Yes',
          HasDegree10: 'No'
        },
        expected: false
      },
      {
        state: {
          HasAttended: 'No',
          HasDegree10: 'Yes'
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
      expect(new EducationValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })

  it('handle dates', () => {
    const tests = [
      {
        state: {
          HasAttended: 'Yes',
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
          HasAttended: 'Yes',
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
          HasAttended: 'Yes',
          Address: {
            addressType: 'United States',
            address: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202'
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
          HasAttended: 'Yes',
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
          HasAttended: 'Yes',
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
          HasAttended: 'Yes',
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
          HasAttended: 'Yes',
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
          HasAttended: 'Yes',
          Diplomas: [ { Has: 'No' } ]
        },
        expected: true
      },
      {
        state: {
          HasAttended: 'Yes',
          Diplomas: []
        },
        expected: false
      },
      {
        state: {
          HasAttended: 'Yes',
          Diplomas: null
        },
        expected: false
      },
      {
        state: {
          HasAttended: 'Yes',
          Diplomas: [
            {
              Has: 'Yes',
              Diploma: {
                Date: {
                  date: new Date()
                },
                Diploma: 'Other',
                DiplomaOther: ''
              }
            }
          ]
        },
        expected: false
      },
      {
        state: {
          HasAttended: 'Yes',
          Diplomas: [
            {
              Has: 'Yes',
              Diploma: {
                Date: null,
                Diploma: 'Other',
                DiplomaOther: 'Other'
              }
            }
          ]
        },
        expected: false
      },
      {
        state: {
          HasAttended: 'Yes',
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
          HasAttended: 'Yes',
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
                DiplomaOther: 'GED'
              }
            }
          ]
        },
        expected: true
      },
      {
        state: {
          HasAttended: 'Yes',
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
          HasAttended: 'Yes',
          hasDegree10: 'Yes'
        },
        expected: true
      },
      {
        state: {
          HasAttended: 'Nope',
          hasDegree10: 'Yes'
        },
        expected: false
      },
      {
        state: {
          HasAttended: 'No',
          hasDegree10: 'Nope'
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new EducationValidator(test.state, null).validAttendance()).toBe(test.expected)
    })
  })
})
