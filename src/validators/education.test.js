import EducationValidator from './education'

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
            from: new Date('1/1/2000'),
            to: new Date('1/1/2004'),
            present: false
          }
        },
        expected: true
      },
      {
        state: {
          HasAttended: 'Yes',
          Dates: {
            from: new Date('1/1/2004'),
            to: new Date('1/1/2000'),
            present: false
          }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new EducationValidator(test.state, null).validDates()).toBe(test.expected)
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
      expect(new EducationValidator(test.state, null).validAddress()).toBe(test.expected)
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
      expect(new EducationValidator(test.state, null).validName()).toBe(test.expected)
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
      expect(new EducationValidator(test.state, null).validType()).toBe(test.expected)
    })
  })

  it('handle reference', () => {
    const tests = [
      {
        state: {
          HasAttended: 'Yes',
          Dates: {
            from: new Date('1/1/2000'),
            to: new Date(),
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
            from: new Date('1/1/2000'),
            to: new Date('1/1/2001'),
            present: false
          },
          Reference: null
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new EducationValidator(test.state, null).validReference()).toBe(test.expected)
    })
  })

  it('handle diplomas', () => {
    const tests = [
      {
        state: {
          HasAttended: 'Yes',
          HasDegree: 'No'
        },
        expected: true
      },
      {
        state: {
          HasAttended: 'Yes',
          HasDegree: 'Yes',
          Diplomas: []
        },
        expected: false
      },
      {
        state: {
          HasAttended: 'Yes',
          HasDegree: 'Yes',
          Diplomas: [
            {
              Date: {
                date: new Date()
              },
              Diploma: 'High School Diploma',
              DiplomaOther: null
            },
            {
              Date: {
                date: new Date()
              },
              Diploma: 'Other',
              DiplomaOther: 'GED'
            }
          ]
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new EducationValidator(test.state, null).validDiplomas()).toBe(test.expected)
    })
  })
})
