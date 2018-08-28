import NameValidator from './name'

describe('Name component validation', function() {
  it('should validate first', function() {
    const tests = [
      {
        data: {
          first: 'Foo',
          firstInitialOnly: false
        },
        expected: true
      },
      {
        data: {
          first: 'Foo',
          firstInitialOnly: true
        },
        expected: false
      },
      {
        data: {
          first: '',
          firstInitialOnly: false
        },
        expected: false
      },
      {
        data: {
          first: 'J',
          firstInitialOnly: true
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new NameValidator(test.data).validFirst()).toBe(test.expected)
    })
  })

  it('should validate last', function() {
    const tests = [
      {
        data: {
          last: 'Foo',
          lastInitialOnly: false
        },
        expected: true
      },
      {
        data: {
          last: 'Foo',
          lastInitialOnly: true
        },
        expected: false
      },
      {
        data: {
          last: '',
          lastInitialOnly: false
        },
        expected: false
      },
      {
        data: {
          last: 'J',
          lastInitialOnly: true
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new NameValidator(test.data).validLast()).toBe(test.expected)
    })
  })

  it('should validate middle', function() {
    const tests = [
      {
        data: {
          middle: 'Foo',
          middleInitialOnly: false,
          noMiddleName: false
        },
        expected: true
      },
      {
        data: {
          middle: 'Foo',
          middleInitialOnly: true,
          noMiddleName: false
        },
        expected: false
      },
      {
        data: {
          middle: '',
          middleInitialOnly: false,
          noMiddleName: false
        },
        expected: false
      },
      {
        data: {
          middle: 'J',
          middleInitialOnly: true,
          noMiddleName: false
        },
        expected: true
      },
      {
        data: {
          middle: '',
          middleInitialOnly: false,
          noMiddleName: true
        },
        expected: true
      },
      {
        data: {
          middle: 'J',
          middleInitialOnly: true,
          noMiddleName: true
        },
        expected: false
      },
      {
        data: {
          noMiddleName: undefined
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new NameValidator(test.data).validMiddle()).toBe(test.expected)
    })
  })

  it('should validate suffix', function() {
    const tests = [
      {
        data: {
          suffix: 'Other',
          suffixOther: 'Some other suffix'
        },
        expected: true
      },
      {
        data: {
          suffix: 'Other',
          suffixOther: ''
        },
        expected: false
      },
      {
        data: {
          suffix: 'Jr',
          suffixOther: ''
        },
        expected: true
      },
      {
        data: {
          suffix: 'Foo'
        },
        expected: false
      },
      {
        data: {
          suffix: '',
          suffixOther: ''
        },
        expected: true
      },
      {
        data: {
          suffix: null,
          suffixOther: ''
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new NameValidator(test.data).validSuffix()).toBe(test.expected)
    })
  })

  it('should validate entire name', function() {
    const tests = [
      {
        data: {
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
        data: {
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
      expect(new NameValidator(test.data).isValid()).toBe(test.expected)
    })
  })
})
