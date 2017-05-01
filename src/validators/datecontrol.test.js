import DateControlValidator from './datecontrol'

describe('date control validator', function () {
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
})
