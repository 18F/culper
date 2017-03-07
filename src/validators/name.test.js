import NameValidator from './name'

describe('Name component validation', function () {
  it('should validate first', function () {
    const tests = [
      {
        state: {
          first: 'Foo',
          firstInitialOnly: false
        },
        expected: true
      },
      {
        state: {
          first: 'Foo',
          firstInitialOnly: true
        },
        expected: false
      },
      {
        state: {
          first: '',
          firstInitialOnly: false
        },
        expected: false
      },
      {
        state: {
          first: 'J',
          firstInitialOnly: true
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new NameValidator(test.state, null).validFirst()).toBe(test.expected)
    })
  })

  it('should validate last', function () {
    const tests = [
      {
        state: {
          last: 'Foo',
          lastInitialOnly: false
        },
        expected: true
      },
      {
        state: {
          last: 'Foo',
          lastInitialOnly: true
        },
        expected: false
      },
      {
        state: {
          last: '',
          lastInitialOnly: false
        },
        expected: false
      },
      {
        state: {
          last: 'J',
          lastInitialOnly: true
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new NameValidator(test.state, null).validLast()).toBe(test.expected)
    })
  })

  it('should validate middle', function () {
    const tests = [
      {
        state: {
          middle: 'Foo',
          middleInitialOnly: false,
          noMiddleName: false
        },
        expected: true
      },
      {
        state: {
          middle: 'Foo',
          middleInitialOnly: true,
          noMiddleName: false
        },
        expected: false
      },
      {
        state: {
          middle: '',
          middleInitialOnly: false,
          noMiddleName: false
        },
        expected: false
      },
      {
        state: {
          middle: 'J',
          middleInitialOnly: true,
          noMiddleName: false
        },
        expected: true
      },
      {
        state: {
          middle: '',
          middleInitialOnly: false,
          noMiddleName: true
        },
        expected: true
      },
      {
        state: {
          middle: 'J',
          middleInitialOnly: true,
          noMiddleName: true
        },
        expected: false
      },
      {
        state: {
          noMiddleName: undefined
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new NameValidator(test.state, null).validMiddle()).toBe(test.expected)
    })
  })

  it('should validate suffix', function () {
    const tests = [
      {
        state: {
          suffix: 'Other',
          suffixOther: 'Some other suffix'
        },
        expected: true
      },
      {
        state: {
          suffix: 'Other',
          suffixOther: ''
        },
        expected: false
      },
      {
        state: {
          suffix: 'Jr',
          suffixOther: ''
        },
        expected: true
      },
      {
        state: {
          suffix: 'Foo'
        },
        expected: false
      },
      {
        state: {
          suffix: '',
          suffixOther: ''
        },
        expected: true
      },
      {
        state: {
          suffix: null,
          suffixOther: ''
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new NameValidator(test.state, null).validSuffix()).toBe(test.expected)
    })
  })

  it('should validate entire name', function () {
    const tests = [
      {
        state: {
          first: 'Foo',
          firstInitialOnly: false,
          middle: 'J',
          middleInitialOnly: true,
          noMiddleName: false,
          last: 'Bar',
          lastInitialOnly: false,
          suffix: 'Jr'
        },
        expected: true
      },
      {
        state: {
          first: '',
          firstInitialOnly: false,
          middle: 'J',
          middleInitialOnly: true,
          noMiddleName: false,
          last: 'Bar',
          lastInitialOnly: false,
          suffix: 'Jr'
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new NameValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})

