import { EducationItemValidator } from './education'
import Location from '../components/Form/Location'

describe('Education component validation', () => {
  it('handle dates', () => {
    const tests = [
      {
        data: {
          HasAttended: { value: 'Yes' },
          Dates: {
            from: {
              month: '1',
              day: '1',
              year: '2000',
            },
            to: {
              month: '1',
              day: '1',
              year: '2004',
            },
            present: false,
          },
        },
        expected: true,
      },
      {
        data: {
          HasAttended: { value: 'Yes' },
          Dates: {
            from: {
              month: '1',
              day: '1',
              year: '2004',
            },
            to: {
              month: '1',
              day: '1',
              year: '2000',
            },
            present: false,
          },
        },
        expected: false,
      },
    ]

    tests.forEach((test) => {
      expect(new EducationItemValidator(test.data).validDates()).toBe(
        test.expected
      )
    })
  })

  it('handle address', () => {
    const tests = [
      {
        data: {
          HasAttended: { value: 'Yes' },
          Address: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS,
          },
        },
        expected: true,
      },
    ]

    tests.forEach((test) => {
      expect(new EducationItemValidator(test.data).validAddress()).toBe(
        test.expected
      )
    })
  })

  it('handle name', () => {
    const tests = [
      {
        data: {
          HasAttended: { value: 'Yes' },
          Name: {
            value: 'Hubert Humphrey High',
          },
        },
        expected: true,
      },
    ]

    tests.forEach((test) => {
      expect(new EducationItemValidator(test.data).validName()).toBe(
        test.expected
      )
    })
  })

  it('handle type', () => {
    const tests = [
      {
        data: {
          HasAttended: { value: 'Yes' },
          Type: { value: 'High School' },
        },
        expected: true,
      },
    ]

    tests.forEach((test) => {
      expect(new EducationItemValidator(test.data).validType()).toBe(
        test.expected
      )
    })
  })

  it('handle reference', () => {
    const today = new Date()
    const tests = [
      {
        data: {
          HasAttended: { value: 'Yes' },
          Dates: {
            from: {
              month: '1',
              day: '1',
              year: '2000',
            },
            to: {
              month: `${today.getMonth() + 1}`,
              day: `${today.getDate()}`,
              year: `${today.getFullYear()}`,
            },
            present: true,
          },
          ReferenceName: {
            first: 'Foo',
            firstInitialOnly: false,
            noMiddleName: true,
            last: 'Bar',
            suffix: 'Jr',
          },
          ReferenceNameNotApplicable: {
            applicable: true,
          },
          ReferencePhone: {
            noNumber: false,
            number: '7031112222',
            numberType: 'Home',
            type: 'Domestic',
            timeOfDay: 'Both',
            extension: '',
          },
          ReferenceEmail: {
            value: 'user@local.dev',
          },
          ReferenceEmailNotApplicable: {
            applicable: true,
          },
          ReferenceAddress: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS,
          },
        },
        expected: true,
      },
      {
        data: {
          HasAttended: { value: 'Yes' },
          Dates: {
            from: {
              month: '1',
              day: '1',
              year: '2000',
            },
            to: {
              month: '1',
              day: '1',
              year: '2001',
            },
            present: false,
          },
        },
        expected: true,
      },
    ]

    tests.forEach((test) => {
      expect(new EducationItemValidator(test.data).validReference()).toBe(
        test.expected
      )
    })
  })

  it('handle diplomas', () => {
    const today = new Date()
    const tests = [
      {
        data: {
          HasAttended: { value: 'Yes' },
          Diplomas: {
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
        data: {
          HasAttended: { value: 'Yes' },
          Diplomas: { items: [] },
        },
        expected: false,
      },
      {
        data: {
          HasAttended: { value: 'Yes' },
          Diplomas: null,
        },
        expected: false,
      },
      {
        data: {
          HasAttended: { value: 'Yes' },
          Diplomas: {
            items: [
              {
                Item: {
                  Has: { value: 'Yes' },
                  Date: {
                    month: `${today.getMonth() + 1}`,
                    day: `${today.getDate()}`,
                    year: `${today.getFullYear()}`,
                  },
                  Diploma: {
                    value: 'Other',
                  },
                  DiplomaOther: {
                    value: '',
                  },
                },
              },
            ],
          },
        },
        expected: false,
      },
      {
        data: {
          HasAttended: { value: 'Yes' },
          Diplomas: {
            items: [
              {
                Item: {
                  Has: { value: 'Yes' },
                  Date: {},
                  Diploma: {
                    value: 'Other',
                  },
                  DiplomaOther: {
                    value: 'Other',
                  },
                },
              },
            ],
          },
        },
        expected: false,
      },
      {
        data: {
          HasAttended: { value: 'Yes' },
          Diplomas: {
            items: [
              {
                Item: {
                  Has: { value: 'Yes' },
                  Diploma: {},
                },
              },
            ],
          },
        },
        expected: false,
      },
      {
        data: {
          HasAttended: { value: 'Yes' },
          Diplomas: {
            items: [
              {
                Item: {
                  Has: { value: 'Yes' },
                  Date: {
                    month: `${today.getMonth() + 1}`,
                    day: `${today.getDate()}`,
                    year: `${today.getFullYear()}`,
                  },
                  Diploma: {
                    value: 'High School Diploma',
                  },
                  DiplomaOther: {},
                },
              },
              {
                Item: {
                  Has: { value: 'Yes' },
                  Date: {
                    month: `${today.getMonth() + 1}`,
                    day: `${today.getDate()}`,
                    year: `${today.getFullYear()}`,
                  },
                  Diploma: {
                    value: 'Other',
                  },
                  DiplomaOther: {
                    value: 'GED',
                  },
                },
              },
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
        data: {
          HasAttended: { value: 'Yes' },
          Diplomas: {
            items: [
              {
                Item: {
                  Has: { value: 'Yes' },
                  Date: {
                    month: `${today.getMonth() + 1}`,
                    day: `${today.getDate()}`,
                    year: `${today.getFullYear()}`,
                  },
                  Diploma: {
                    value: 'High School Diploma',
                  },
                  DiplomaOther: {},
                },
              },
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
    ]

    tests.forEach((test) => {
      expect(new EducationItemValidator(test.data).validDiplomas()).toBe(
        test.expected
      )
    })
  })
})
