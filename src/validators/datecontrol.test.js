import DateControlValidator from './datecontrol'
import { today, daysAgo } from '../components/Section/History/dateranges'

describe('date control validator', function() {
  it('validate basic date properties', () => {
    const tests = [
      {
        data: {
          month: '1',
          day: '1',
          year: '2005'
        },
        expected: true
      },
      {
        data: {
          month: '1',
          day: '',
          year: '2005'
        },
        expected: false
      },
      {
        data: {
          month: '1',
          day: '',
          year: '2005',
          hideDay: true
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new DateControlValidator(test.data).isValid()).toBe(test.expected)
    })
  })

  it('validate max date', () => {
    const tests = [
      {
        data: {
          month: '1',
          day: '1',
          year: '2005',
          maxDate: new Date('1/1/2004')
        },
        expected: false
      },
      {
        data: {
          month: '1',
          day: '1',
          year: '2004',
          maxDate: new Date('1/1/2005')
        },
        expected: true
      },
      {
        data: {
          month: '1',
          day: '1',
          year: '2005',
          maxDate: new Date('1/1/2005')
        },
        expected: false
      },
      {
        data: {
          month: '1',
          day: '1',
          year: '2005',
          maxDate: null
        },
        expected: true
      },
      {
        data: {
          month: null,
          day: '1',
          year: '2005',
          maxDate: new Date('1/1/2004')
        },
        expected: false
      },
      {
        data: {
          month: '1',
          day: null,
          year: '2005',
          maxDate: new Date('1/1/2004')
        },
        expected: false
      },
      {
        data: {
          month: '1',
          day: '1',
          year: null,
          maxDate: new Date('1/1/2004')
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new DateControlValidator(test.data).validMaxDate()).toBe(
        test.expected
      )
    })
  })

  it('validate min date', () => {
    const tests = [
      {
        data: {
          month: '1',
          day: '1',
          year: '2003',
          minDate: new Date('1/1/2005')
        },
        expected: false
      },
      {
        data: {
          month: '1',
          day: '1',
          year: '2005',
          minDate: new Date('1/1/2004')
        },
        expected: true
      },
      {
        data: {
          month: null,
          day: '1',
          year: '2005',
          minDate: new Date('1/1/2004')
        },
        expected: false
      },
      {
        data: {
          month: '1',
          day: '1',
          year: '2004',
          minDate: new Date('1/1/2004'),
          hideDay: true
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new DateControlValidator(test.data).validMinDate()).toBe(
        test.expected
      )
    })
  })

  it('validates based on relationship and birthdate', () => {
    function age(i) {
      const date = daysAgo(today, 365 * i)
      return {
        month: `${date.getMonth() + 1}`,
        day: `${date.getDate()}`,
        year: `${date.getFullYear()}`
      }
    }

    const birthdate = age(25)
    const tests = [
      {
        data: {
          relationship: 'Self',
          ...age(15)
        },
        context: {
          applicantBirthdate: null
        },
        min: true,
        max: false
      },
      {
        data: {
          relationship: 'Self',
          ...age(131)
        },
        context: {
          applicantBirthdate: null
        },
        min: false,
        max: true
      },
      {
        data: {
          relationship: 'Self',
          ...age(20)
        },
        context: {
          applicantBirthdate: birthdate
        },
        min: true,
        max: true
      },
      {
        data: {
          relationship: 'Mother',
          ...age(1)
        },
        context: {
          applicantBirthdate: birthdate
        },
        min: true,
        max: false
      },
      {
        data: {
          relationship: 'Mother',
          ...age(202)
        },
        context: {
          applicantBirthdate: birthdate
        },
        min: false,
        max: true
      },
      {
        data: {
          relationship: 'Mother',
          ...age(40)
        },
        context: {
          applicantBirthdate: birthdate
        },
        min: true,
        max: true
      },
      {
        data: {
          relationship: 'Child',
          ...age(-1)
        },
        context: {
          applicantBirthdate: birthdate
        },
        min: true,
        max: false
      },
      {
        data: {
          relationship: 'Child',
          ...age(26)
        },
        context: {
          applicantBirthdate: birthdate
        },
        min: false,
        max: true
      },
      {
        data: {
          relationship: 'Child',
          ...age(18)
        },
        context: {
          applicantBirthdate: birthdate
        },
        min: true,
        max: true
      },
      {
        data: {
          relationship: 'Other',
          ...age(-1)
        },
        context: {
          applicantBirthdate: birthdate
        },
        min: true,
        max: false
      },
      {
        data: {
          relationship: 'Other',
          ...age(201)
        },
        context: {
          applicantBirthdate: birthdate
        },
        min: false,
        max: true
      },
      {
        data: {
          relationship: 'Other',
          ...age(50)
        },
        context: {
          applicantBirthdate: birthdate
        },
        min: true,
        max: true
      },
      {
        data: {
          relationship: '',
          ...age(-1)
        },
        context: {
          applicantBirthdate: birthdate
        },
        min: true,
        max: false
      },
      {
        data: {
          relationship: '',
          ...age(26)
        },
        context: {
          applicantBirthdate: birthdate
        },
        min: false,
        max: true
      },
      {
        data: {
          relationship: '',
          ...age(20)
        },
        context: {
          applicantBirthdate: birthdate
        },
        min: true,
        max: true
      },
      {
        data: {
          relationship: '',
          ...age(26)
        },
        context: {
          applicantBirthdate: null
        },
        min: true,
        max: true
      },
      {
        data: {
          relationship: '',
          ...age(201)
        },
        context: {
          applicantBirthdate: null
        },
        min: false,
        max: true
      }
    ]

    tests.forEach(test => {
      const validator = new DateControlValidator(test.data, test.context)
      expect(validator.validMaxDate()).toBe(test.max)
      expect(validator.validMinDate()).toBe(test.min)
    })
  })

  it('can handle min/max explicitly set along with applicant birthdate', () => {
    function age(i) {
      const date = daysAgo(today, 365 * i)
      return {
        month: `${date.getMonth() + 1}`,
        day: `${date.getDate()}`,
        year: `${date.getFullYear()}`
      }
    }

    const birthdate = age(25)
    const tests = [
      {
        data: {
          minDate: daysAgo(today, 365 * 23),
          ...age(24)
        },
        context: {
          applicantBirthdate: birthdate
        },
        min: false,
        max: true
      },
      {
        data: {
          minDate: daysAgo(today, 365 * 23),
          ...age(26)
        },
        context: {
          applicantBirthdate: birthdate
        },
        min: false,
        max: true
      },
      {
        data: {
          maxDate: daysAgo(today, 365 * 20),
          ...age(19)
        },
        context: {
          applicantBirthdate: birthdate
        },
        min: true,
        max: false
      },
      {
        data: {
          maxDate: daysAgo(today, 365 * 30),
          ...age(0)
        },
        context: {
          applicantBirthdate: birthdate
        },
        min: true,
        max: false
      }
    ]

    tests.forEach(test => {
      const validator = new DateControlValidator(test.data, test.context)
      expect(validator.validMaxDate()).toBe(test.max)
      expect(validator.validMinDate()).toBe(test.min)
    })
  })
})
