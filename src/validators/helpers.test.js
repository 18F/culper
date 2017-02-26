import { hasStatus, allHaveStatus, anyHasStatus, validPhoneNumber, validDateField } from './helpers'

describe('Helpers for validators', function () {
  it('should return if a property has a status', function () {
    const tests = [
      {
        completed: {
          name: {
            status: false
          }
        },
        property: 'name',
        status: {
          name: {
            status: false
          }
        },
        val: false
      }
    ]

    tests.forEach(test => {
      expect(hasStatus(test.completed)(test.property, test.status, test.val)).toBe(true)
    })
  })

  it('should return if a all properties have the same status', function () {
    const tests = [
      {
        completed: {
          name: {
            status: false
          },
          age: {
            status: false
          }
        },
        properties: ['name', 'age'],
        status: {
          name: {
            status: false
          }
        },
        val: false,
        expected: true
      },
      {
        completed: {
          name: {
            status: false
          },
          age: {
            status: true
          }
        },
        properties: ['name', 'age'],
        status: {
          name: {
            status: false
          }
        },
        val: false,
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(allHaveStatus(test.completed)(test.properties, test.status, test.val)).toBe(test.expected)
    })
  })

  it('should return if a any properties have the specified status', function () {
    const tests = [
      {
        completed: {
          name: {
            status: false
          },
          age: {
            status: true
          }
        },
        properties: ['name', 'age'],
        status: {
          name: {
            status: false
          }
        },
        val: false,
        expected: true
      },
      {
        completed: {
          name: {
            status: false
          },
          age: {
            status: false
          }
        },
        properties: ['name', 'age'],
        status: {
          name: {
            status: false
          }
        },
        val: true,
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(anyHasStatus(test.completed)(test.properties, test.status, test.val)).toBe(test.expected)
    })
  })

  it('should validate parts of a phone number', function () {
    const tests = [
      {
        phone: {
          noNumber: '',
          number: '7031112222',
          numberType: 'Home',
          timeOfDay: 'Both',
          extension: ''
        },
        expected: true
      },
      {
        phone: {
          noNumber: 'NA'
        },
        expected: true
      },
      {
        phone: {
          noNumber: '',
          number: ''
        },
        expected: false
      },
      {
        phone: {
          noNumber: '',
          number: '7031112222',
          numberType: ''
        },
        expected: false
      },
      {
        phone: {
          noNumber: '',
          number: '7031112222',
          numberType: 'Home'
        },
        expected: false
      },
      {
        phone: null,
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(validPhoneNumber(test.phone)).toBe(test.expected)
    })
  })

  it('should validate a date field', function () {
    const tests = [
      {
        date: {
          day: '1',
          month: '1',
          year: '2016',
          date: new Date('1/1/2016')
        },
        expected: true
      },
      {
        date: {
          day: '',
          month: '1',
          year: '2016',
          date: new Date('1/1/2016')
        },
        expected: false
      },
      {
        date: {
          day: '1',
          month: '',
          year: '2016',
          date: new Date('1/1/2016')
        },
        expected: false
      },
      {
        date: {
          day: '1',
          month: '1',
          year: '',
          date: new Date('1/1/2016')
        },
        expected: false
      },
      {
        date: null,
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(validDateField(test.date)).toBe(test.expected)
    })
  })
})
