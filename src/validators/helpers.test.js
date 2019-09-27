import {
  validPhoneNumber,
  validDateField,
  withinSevenYears,
  validGenericTextfield,
  validBranch,
  validSSN,
} from './helpers'

describe('Helpers for validators', () => {
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
