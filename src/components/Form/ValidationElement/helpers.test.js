import { flattenObject, mergeError, triageErrors } from './helpers'

describe('The ValidationElement helpers', () => {
  it('can flatten an object', () => {
    const tests = [
      {
        toFlatten: {
          first: 'pattern'
        },
        expected: 'first.pattern'
      },
      {
        toFlatten: [{ first: 'pattern' }],
        expected: 'first.pattern'
      }
    ]

    tests.forEach(test => {
      expect(flattenObject(test.toFlatten)).toBe(test.expected)
    })
  })

  it('can merge error codes', () => {
    const tests = [
      {
        previous: [],
        error: null,
        expected: []
      },
      {
        previous: [],
        error: 'first.pattern',
        expected: ['first.pattern']
      },
      {
        previous: ['first.pattern', 'last.pattern'],
        error: null,
        expected: ['first.pattern', 'last.pattern']
      },
      {
        previous: ['first.pattern', 'last.pattern'],
        error: 'last.pattern',
        expected: ['first.pattern', 'last.pattern']
      },
      {
        previous: ['middle.pattern'],
        error: 'middle.',
        expected: []
      }
    ]

    tests.forEach(test => {
      expect(mergeError(test.previous, test.error)).toEqual(test.expected)
    })
  })

  it('can create triage of errors', () => {
    const tests = [
      {
        section: 'identification',
        previous: [],
        codes: {
          name: []
        },
        expected: []
      },
      {
        section: 'identification',
        previous: [],
        codes: {
          name: ['first.pattern']
        },
        expected: ['name.first.pattern']
      },
      {
        section: 'identification',
        previous: ['identification.name.first.pattern'],
        codes: {
          name: ['first.pattern']
        },
        expected: ['name.first.pattern']
      }
    ]

    tests.forEach(test => {
      expect(triageErrors(test.section, test.previous, test.codes)).toEqual(
        test.expected
      )
    })
  })
})
