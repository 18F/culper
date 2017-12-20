import DateControlValidator from './datecontrol'
import { today, daysAgo } from '../components/Section/History/dateranges'

describe('date control validator', function () {
  it('validate basic date properties', () => {
    const tests = [
      {
        state: {
          month: '1',
          day: '1',
          year: '2005'
        },
        props: {},
        expected: true
      },
      {
        state: {
          month: '1',
          day: '',
          year: '2005'
        },
        props: {},
        expected: false
      },
      {
        state: {
          month: '1',
          day: '',
          year: '2005'
        },
        props: {
          hideDay: true
        },
        expected: false
      },
    ]

    tests.forEach(test => {
      expect(new DateControlValidator(test.state, test.props).isValid()).toBe(test.expected)
    })
  })

  it('validate max date', () => {
    const tests = [
      {
        state: {
          month: '1',
          day: '1',
          year: '2005'
        },
        props: {
          maxDate: new Date('1/1/2004')
        },
        expected: false
      },
      {
        state: {
          month: '1',
          day: '1',
          year: '2004'
        },
        props: {
          maxDate: new Date('1/1/2005')
        },
        expected: true
      },
      {
        state: {
          month: '1',
          day: '1',
          year: '2005'
        },
        props: {
          maxDate: new Date('1/1/2005')
        },
        expected: true
      },
      {
        state: {
          month: '1',
          day: '1',
          year: '2005'
        },
        props: {
          maxDate: null
        },
        expected: true
      },
      {
        state: {
          month: null,
          day: '1',
          year: '2005'
        },
        props: {
          maxDate: new Date('1/1/2004')
        },
        expected: false
      },
      {
        state: {
          month: '1',
          day: null,
          year: '2005'
        },
        props: {
          maxDate: new Date('1/1/2004')
        },
        expected: false
      },
      {
        state: {
          month: '1',
          day: '1',
          year: null
        },
        props: {
          maxDate: new Date('1/1/2004')
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new DateControlValidator(test.state, test.props).validMaxDate()).toBe(test.expected)
    })
  })

  it('validate min date', () => {
    const tests = [
      {
        state: {
          month: '1',
          day: '1',
          year: '2003'
        },
        props: {
          minDate: new Date('1/1/2005')
        },
        expected: false
      },
      {
        state: {
          month: '1',
          day: '1',
          year: '2005'
        },
        props: {
          minDate: new Date('1/1/2004')
        },
        expected: true
      },
      {
        state: {
          month: null,
          day: '1',
          year: '2005'
        },
        props: {
          minDate: new Date('1/1/2004')
        },
        expected: false
      },
      {
        state: {
          month: '1',
          day: '1',
          year: '2004'
        },
        props: {
          minDate: new Date('1/8/2004'),
          hideDay: true
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new DateControlValidator(test.state, test.props).validMinDate()).toBe(test.expected)
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
        props: {
          relationship: 'Self',
          applicantBirthdate: null,
          ...age(15)
        },
        min: true,
        max: false
      },
      {
        props: {
          relationship: 'Self',
          applicantBirthdate: null,
          ...age(131)
        },
        min: false,
        max: true
      },
      {
        props: {
          relationship: 'Self',
          applicantBirthdate: null,
          ...age(20)
        },
        min: true,
        max: true
      },
      {
        props: {
          relationship: 'Mother',
          applicantBirthdate: birthdate,
          ...age(1)
        },
        min: true,
        max: false
      },
      {
        props: {
          relationship: 'Mother',
          applicantBirthdate: birthdate,
          ...age(202)
        },
        min: false,
        max: true
      },
      {
        props: {
          relationship: 'Mother',
          applicantBirthdate: birthdate,
          ...age(40)
        },
        min: true,
        max: true
      },
      {
        props: {
          relationship: 'Child',
          applicantBirthdate: birthdate,
          ...age(-1)
        },
        min: true,
        max: false
      },
      {
        props: {
          relationship: 'Child',
          applicantBirthdate: birthdate,
          ...age(26)
        },
        min: false,
        max: true
      },
      {
        props: {
          relationship: 'Child',
          applicantBirthdate: birthdate,
          ...age(18)
        },
        min: true,
        max: true
      },
      {
        props: {
          relationship: 'Other',
          applicantBirthdate: birthdate,
          ...age(-1)
        },
        min: true,
        max: false
      },
      {
        props: {
          relationship: 'Other',
          applicantBirthdate: birthdate,
          ...age(201)
        },
        min: false,
        max: true
      },
      {
        props: {
          relationship: 'Other',
          applicantBirthdate: birthdate,
          ...age(50)
        },
        min: true,
        max: true
      },
      {
        props: {
          relationship: '',
          applicantBirthdate: birthdate,
          ...age(-1)
        },
        min: true,
        max: false
      },
      {
        props: {
          relationship: '',
          applicantBirthdate: birthdate,
          ...age(26)
        },
        min: false,
        max: true
      },
      {
        props: {
          relationship: '',
          applicantBirthdate: birthdate,
          ...age(20)
        },
        min: true,
        max: true
      },
      {
        props: {
          relationship: '',
          applicantBirthdate: null,
          ...age(26)
        },
        min: true,
        max: true
      },
      {
        props: {
          relationship: '',
          applicantBirthdate: null,
          ...age(201)
        },
        min: false,
        max: true
      },
    ]

    tests.forEach(test => {
      const validator = new DateControlValidator(test.state, test.props)
      expect(validator.validMaxDate()).toBe(test.max)
      expect(validator.validMinDate()).toBe(test.min)
    })
  })
})
