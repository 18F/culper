import {
  hasStatus,
  allHaveStatus,
  anyHasStatus,
  validPhoneNumber,
  validDateField,
  withinSevenYears,
  validGenericTextfield,
  BranchCollection,
  validNotApplicable,
  validBranch,
  validSSN,
  validCurrency,
  isDefined,
} from './helpers'

describe('Helpers for validators', () => {
  describe('.isDefined', () => {
    expect(isDefined(0)).toBe(true)
    expect(isDefined('')).toBe(true)
    expect(isDefined(false)).toBe(true)
    expect(isDefined()).toBe(false)
    expect(isDefined(null)).toBe(false)
  })

  it('should return if a property has a status', () => {
    const tests = [
      {
        completed: {
          name: {
            status: false,
          },
        },
        property: 'name',
        status: {
          name: {
            status: false,
          },
        },
        val: false,
      },
    ]

    tests.forEach((test) => {
      expect(
        hasStatus(test.completed)(test.property, test.status, test.val)
      ).toBe(true)
    })
  })

  it('should validate generic text field', () => {
    const tests = [
      {
        Field: {
          value: 'hello',
        },
        expected: true,
      },
      {
        Field: {
          value: '',
        },
        expected: false,
      },
    ]

    tests.forEach((test) => {
      expect(validGenericTextfield(test.Field)).toBe(test.expected)
    })
  })

  it('should validate currency field', () => {
    const tests = [
      {
        Field: {
          value: '1',
        },
        expected: true,
      },
      {
        Field: {
          value: '',
        },
        expected: false,
      },
      {
        Field: {
          value: 'f',
        },
        expected: false,
      },
      {
        Field: {
          value: '2147483648',
        },
        expected: false,
      },
    ]

    tests.forEach((test) => {
      expect(validCurrency(test.Field)).toBe(test.expected)
    })
  })

  it('should return if a all properties have the same status', () => {
    const tests = [
      {
        completed: {
          name: {
            status: false,
          },
          age: {
            status: false,
          },
        },
        properties: ['name', 'age'],
        status: {
          name: {
            status: false,
          },
        },
        val: false,
        expected: true,
      },
      {
        completed: {
          name: {
            status: false,
          },
          age: {
            status: true,
          },
        },
        properties: ['name', 'age'],
        status: {
          name: {
            status: false,
          },
        },
        val: false,
        expected: false,
      },
    ]

    tests.forEach((test) => {
      expect(
        allHaveStatus(test.completed)(test.properties, test.status, test.val)
      ).toBe(test.expected)
    })
  })

  it('should return if a any properties have the specified status', () => {
    const tests = [
      {
        completed: {
          name: {
            status: false,
          },
          age: {
            status: true,
          },
        },
        properties: ['name', 'age'],
        status: {
          name: {
            status: false,
          },
        },
        val: false,
        expected: true,
      },
      {
        completed: {
          name: {
            status: false,
          },
          age: {
            status: false,
          },
        },
        properties: ['name', 'age'],
        status: {
          name: {
            status: false,
          },
        },
        val: true,
        expected: false,
      },
    ]

    tests.forEach((test) => {
      expect(
        anyHasStatus(test.completed)(test.properties, test.status, test.val)
      ).toBe(test.expected)
    })
  })

  it('should validate parts of a phone number', () => {
    const tests = [
      {
        phone: {
          noNumber: '',
          number: '7031112222',
          numberType: 'Home',
          timeOfDay: 'Both',
          type: 'Domestic',
          extension: '',
        },
        expected: true,
      },
      {
        phone: {
          noNumber: '',
          number: '0237031112222',
          numberType: 'Home',
          timeOfDay: 'Both',
          type: 'International',
          extension: '',
        },
        expected: true,
      },
      {
        phone: {
          noNumber: '',
          number: '0007031112222',
          numberType: 'Home',
          timeOfDay: 'Both',
          type: 'International',
          extension: '',
        },
        expected: false,
      },
      {
        phone: {
          noNumber: '',
          number: '   7031112222',
          numberType: 'Home',
          timeOfDay: 'Both',
          type: 'International',
          extension: '',
        },
        expected: false,
      },
      {
        phone: {
          noNumber: '',
          number: '1234567',
          numberType: 'Home',
          timeOfDay: 'Both',
          type: 'Unknown',
          extension: '',
        },
        expected: false,
      },
      {
        phone: {
          noNumber: 'NA',
        },
        expected: true,
      },
      {
        phone: {
          noNumber: '',
          number: '',
        },
        expected: false,
      },
      {
        phone: {
          noNumber: '',
          number: '7031112222',
          numberType: '',
        },
        expected: false,
      },
      {
        phone: {
          noNumber: '',
          number: '7031112222',
          numberType: 'Home',
        },
        expected: false,
      },
      {
        phone: null,
        expected: false,
      },
      {
        phone: {
          noNumber: '',
          number: '7031112222',
          numberType: 'Home',
          timeOfDay: '',
          type: 'Domestic',
          extension: '',
        },
        expected: false,
      },
    ]

    tests.forEach((test) => {
      expect(validPhoneNumber(test.phone, test.options)).toBe(test.expected)
    })
  })

  it('should validate a date field', () => {
    const tests = [
      {
        date: {
          day: '1',
          month: '1',
          year: '2016',
        },
        expected: true,
      },
      {
        date: {
          day: '',
          month: '1',
          year: '2016',
        },
        expected: false,
      },
      {
        date: {
          day: '1',
          month: '',
          year: '2016',
        },
        expected: false,
      },
      {
        date: {
          day: '1',
          month: '1',
          year: '',
        },
        expected: false,
      },
      {
        date: null,
        expected: false,
      },
    ]

    tests.forEach((test) => {
      expect(validDateField(test.date)).toBe(test.expected)
    })
  })

  it('should validate if within seven years', () => {
    const tests = [
      {
        Dates: {
          from: {
            month: '1',
            day: '1',
            year: '2010',
          },
          to: {
            month: '1',
            day: '1',
            year: '2016',
          },
          present: false,
        },
        expected: true,
      },
      {
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
        expected: false,
      },
    ]

    tests.forEach((test) => {
      expect(withinSevenYears(test.Dates.from, test.Dates.to)).toBe(
        test.expected
      )
    })
  })

  it('should validate if branch collection is empty', () => {
    const tests = [
      {
        Collection: {
          items: [{ Item: { Has: { value: 'Yes' } } }],
        },
        expected: false,
      },
      {
        Collection: {
          items: [{ Item: { Has: { value: 'No' } } }],
        },
        expected: false,
      },
      {
        Collection: {
          items: [],
        },
        expected: true,
      },
      {
        Collection: null,
        expected: true,
      },
    ]

    tests.forEach((test) => {
      const branchValidator = new BranchCollection(test.Collection)
      expect(branchValidator.empty()).toBe(test.expected)
    })
  })

  it('should validate if branch collection has a key', () => {
    const tests = [
      {
        Collection: {
          items: [{ Item: { Has: { value: 'Yes' } } }],
        },
        value: 'Yes',
        expected: true,
      },
      {
        Collection: {
          items: [{ Item: { Has: { value: 'No' } } }],
        },
        value: 'No',
        expected: true,
      },
      {
        Collection: {
          items: [],
        },
        expected: false,
        value: 'No',
      },
      {
        Collection: null,
        expected: false,
        value: 'Yes',
      },
    ]

    tests.forEach((test) => {
      const branchValidator = new BranchCollection(test.Collection)
      expect(branchValidator.hasKeyValue(test.value)).toBe(test.expected)
    })
  })

  it('should validate with custom each function', () => {
    const tests = [
      {
        Function: item => true,
        Collection: {
          items: [{ Item: { Has: { value: 'Yes' } } }],
        },
        expected: true,
      },
      {
        Function: item => true,
        Collection: {
          items: [],
        },
        expected: false,
      },
      {
        Function: item => false,
        Collection: {
          items: [{ Item: { Has: { value: 'Yes' } } }],
        },
        expected: false,
      },
    ]
    tests.forEach((test) => {
      const branchValidator = new BranchCollection(test.Collection)
      expect(branchValidator.each(test.Function)).toBe(test.expected)
    })
  })

  it('should validate not applicable groups', () => {
    const tests = [
      {
        logic: () => false,
        expected: false,
      },
      {
        NotApplicable: {
          applicable: true,
        },
        logic: () => false,
        expected: false,
      },
      {
        NotApplicable: {
          applicable: false,
        },
        logic: () => false,
        expected: true,
      },
    ]

    tests.forEach((test) => {
      expect(validNotApplicable(test.NotApplicable, test.logic)).toBe(
        test.expected
      )
    })
  })

  it('should validate branch options', () => {
    const tests = [
      {
        Value: 'Yes',
        YesValue: 'Yes',
        NoValue: 'No',
        expected: true,
      },
      {
        Value: 'Yessss',
        YesValue: 'Yes',
        NoValue: 'No',
        expected: false,
      },
      {
        Value: 'Nope',
        YesValue: 'Yes',
        NoValue: 'Nope',
        expected: true,
      },
    ]

    tests.forEach((test) => {
      expect(validBranch(test.Value, test.YesValue, test.NoValue)).toBe(
        test.expected
      )
    })
  })

  it('should validate ssn', () => {
    const tests = [
      {
        ssn: {
          first: '111',
          middle: '11',
          last: '1111',
          notApplicable: false,
        },
        expected: true,
      },
      {
        ssn: {
          notApplicable: true,
        },
        expected: true,
      },
    ]

    tests.forEach((test) => {
      expect(validSSN(test.ssn)).toBe(test.expected)
    })
  })
})
