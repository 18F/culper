import { hasStatus, allHaveStatus, anyHasStatus, validPhoneNumber, validDateField, withinSevenYears, validGenericTextfield, BranchCollection, validNotApplicable } from './helpers'

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

  it('should validate generic text field', function () {
    const tests = [
      {
        Field: {
          value: 'hello'
        },
        expected: true
      },
      {
        Field: {
          value: ''
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(validGenericTextfield(test.Field)).toBe(test.expected)
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

  it('should validate if within seven years', function () {
    const tests = [
      {
        Dates: {
          from: {
            date: new Date('1/1/2010')
          },
          to: {
            date: new Date('1/1/2016')
          },
          present: false
        },
        expected: true
      },
      {
        Dates: {
          from: {
            date: new Date('1/1/2000')
          },
          to: {
            date: new Date('1/1/2001')
          },
          present: false
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(withinSevenYears(test.Dates.from, test.Dates.to)).toBe(test.expected)
    })
  })

  it('should validate if branch collection is empty', function () {
    const tests = [
      {
        Collection: [
          {
            Has: 'Yes'
          }
        ],
        expected: false
      },
      {
        Collection: [
          {
            Has: 'No'
          }
        ],
        expected: false
      },
      {
        Collection: [],
        expected: true
      },
      {
        Collection: null,
        expected: true
      }
    ]

    tests.forEach(test => {
      const branchValidator = new BranchCollection(test.Collection)
      expect(branchValidator.empty()).toBe(test.expected)
    })
  })

  it('should validate if branch collection has a key', function () {
    const tests = [
      {
        Collection: [
          {
            Has: 'Yes'
          }
        ],
        value: 'Yes',
        expected: true
      },
      {
        Collection: [
          {
            Has: 'No'
          }
        ],
        value: 'No',
        expected: true
      },
      {
        Collection: [],
        expected: false,
        value: 'No'
      },
      {
        Collection: null,
        expected: false,
        value: 'Yes'
      }
    ]

    tests.forEach(test => {
      const branchValidator = new BranchCollection(test.Collection)
      expect(branchValidator.hasKeyValue(test.value)).toBe(test.expected)
    })
  })

  it('should validate with custom each function', function () {
    const tests = [
      {
        Function: (item) => {
          return true
        },
        Collection: [
          {
            Has: 'Yes'
          }
        ],
        expected: true
      },
      {
        Function: (item) => {
          return true
        },
        Collection: [],
        expected: false
      },
      {
        Function: (item) => {
          return false
        },
        Collection: [{ Has: 'Yes' }],
        expected: false
      }
    ]
    tests.forEach(test => {
      const branchValidator = new BranchCollection(test.Collection)
      expect(branchValidator.each(test.Function)).toBe(test.expected)
    })
  })

  it('should validate not applicable groups', function () {
    const tests = [
      {
        logic: () => { return false },
        expected: false
      },
      {
        NotApplicable: {
          applicable: true
        },
        logic: () => { return false },
        expected: false
      },
      {
        NotApplicable: {
          applicable: false
        },
        logic: () => { return false },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(validNotApplicable(test.NotApplicable, test.logic)).toBe(test.expected)
    })
  })
})
