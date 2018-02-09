import DateControlValidator from './datecontrol'
import { today, daysAgo } from '../components/Section/History/dateranges'

describe('date control validator', function () {
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
      },
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
        expected: true
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
      expect(new DateControlValidator(test.data).validMaxDate()).toBe(test.expected)
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
          minDate: new Date('1/8/2004'),
          hideDay: true
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new DateControlValidator(test.data).validMinDate()).toBe(test.expected)
    })
  })

  it('validates based on relationship and birthdate', () => {
    function age (i) {
      const date = daysAgo(today, 365 * i)
      return {
        month: `${date.getMonth()+1}`,
        day: `${date.getDate()}`,
        year: `${date.getFullYear()}`
      }
    }

    const birthdate = age(25)
    const tests = [
      {
        data: {
          relationship: 'Self',
          applicantBirthdate: null,
          ...age(15)
        },
        min: true,
        max: false
      },
      {
        data: {
          relationship: 'Self',
          applicantBirthdate: null,
          ...age(131)
        },
        min: false,
        max: true
      },
      {
        data: {
          relationship: 'Self',
          applicantBirthdate: null,
          ...age(20)
        },
        min: true,
        max: true
      },
      {
        data: {
          relationship: 'Mother',
          applicantBirthdate: birthdate,
          ...age(1)
        },
        min: true,
        max: false
      },
      {
        data: {
          relationship: 'Mother',
          applicantBirthdate: birthdate,
          ...age(202)
        },
        min: false,
        max: true
      },
      {
        data: {
          relationship: 'Mother',
          applicantBirthdate: birthdate,
          ...age(40)
        },
        min: true,
        max: true
      },
      {
        data: {
          relationship: 'Child',
          applicantBirthdate: birthdate,
          ...age(-1)
        },
        min: true,
        max: false
      },
      {
        data: {
          relationship: 'Child',
          applicantBirthdate: birthdate,
          ...age(26)
        },
        min: false,
        max: true
      },
      {
        data: {
          relationship: 'Child',
          applicantBirthdate: birthdate,
          ...age(18)
        },
        min: true,
        max: true
      },
      {
        data: {
          relationship: 'Other',
          applicantBirthdate: birthdate,
          ...age(-1)
        },
        min: true,
        max: false
      },
      {
        data: {
          relationship: 'Other',
          applicantBirthdate: birthdate,
          ...age(201)
        },
        min: false,
        max: true
      },
      {
        data: {
          relationship: 'Other',
          applicantBirthdate: birthdate,
          ...age(50)
        },
        min: true,
        max: true
      },
      {
        data: {
          relationship: '',
          applicantBirthdate: birthdate,
          ...age(-1)
        },
        min: true,
        max: false
      },
      {
        data: {
          relationship: '',
          applicantBirthdate: birthdate,
          ...age(26)
        },
        min: false,
        max: true
      },
      {
        data: {
          relationship: '',
          applicantBirthdate: birthdate,
          ...age(20)
        },
        min: true,
        max: true
      },
      {
        data: {
          relationship: '',
          applicantBirthdate: null,
          ...age(26)
        },
        min: true,
        max: true
      },
      {
        data: {
          relationship: '',
          applicantBirthdate: null,
          ...age(201)
        },
        min: false,
        max: true
      },
    ]

    tests.forEach(test => {
      const validator = new DateControlValidator(test.data)
      expect(validator.validMaxDate()).toBe(test.max)
      expect(validator.validMinDate()).toBe(test.min)
    })
  })

  it('can handle min/max explicitly set along with applicant birthdate', () => {
    function age (i) {
      const date = daysAgo(today, 365 * i)
      return {
        month: `${date.getMonth()+1}`,
        day: `${date.getDate()}`,
        year: `${date.getFullYear()}`
      }
    }

    const birthdate = age(25)
    const tests = [
      {
        data: {
          applicantBirthdate: birthdate,
          minDate: daysAgo(today, 365 * 23),
          ...age(24)
        },
        min: false,
        max: true
      },
      {
        data: {
          applicantBirthdate: birthdate,
          minDate: daysAgo(today, 365 * 23),
          ...age(26)
        },
        min: false,
        max: true
      },
      {
        data: {
          applicantBirthdate: birthdate,
          maxDate: daysAgo(today, 365 * 20),
          ...age(19)
        },
        min: true,
        max: false
      },
      {
        data: {
          applicantBirthdate: birthdate,
          maxDate: daysAgo(today, 365 * 30),
          ...age(0)
        },
        min: true,
        max: false
      },
    ]

    tests.forEach(test => {
      const validator = new DateControlValidator(test.data)
      expect(validator.validMaxDate()).toBe(test.max)
      expect(validator.validMinDate()).toBe(test.min)
    })
  })
})
