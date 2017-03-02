import MilitaryHistoryValidator from './militaryhistory'

describe('Military history validation', function () {
  it('handle whether subject has served in the military', () => {
    const tests = [
      {
        state: {
          HasServed: ''
        },
        expected: false
      },
      {
        state: {
          HasServed: 'No'
        },
        expected: true
      },
      {
        state: {
          HasServed: 'Yes'
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new MilitaryHistoryValidator(test.state, null).validServed()).toBe(test.expected)
    })
  })

  it('handle overall validity', function () {
    const tests = [
      {
        state: {
          HasServed: 'Yes'
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new MilitaryHistoryValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
