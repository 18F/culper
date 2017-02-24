import { hasStatus, allHaveStatus, anyHasStatus } from './helpers'

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
})
