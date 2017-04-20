import MaritalValidator from './marital'

describe('Marital validation', function () {
  it('validates status', () => {
    const tests = [
      {
        state: {
          Status: 'Never'

        },
        expected: true
      },
      {
        state: {
          Status: 'Nope'

        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new MaritalValidator(test.state, null).validStatus()).toBe(test.expected)
    })
  })

  it('validates marital', () => {
    const tests = [
      {
        state: {
          Status: 'Nope'

        },
        expected: false
      },
      {
        state: {
          Status: 'Never'

        },
        expected: true
      },
      {
        state: {
          Status: 'InCivilUnion'

        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new MaritalValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
