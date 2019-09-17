import { hideDisciplinaryProcedures } from './militarydisciplinary'

describe('Military disciplinary validation', () => {
  it('only display disciplinary procedures if military history is present', () => {
    const tests = [
      {
        store: {},
        hidden: true,
      },
      {
        store: {
          Military: {
            History: {},
          },
        },
        hidden: true,
      },
      {
        store: {
          Military: {
            History: {
              HasServed: { value: 'No' },
            },
          },
        },
        hidden: true,
      },
      {
        store: {
          Military: {
            History: {
              HasServed: { value: 'Yes' },
            },
          },
        },
        hidden: false,
      },
    ]

    tests.forEach((test) => {
      expect(hideDisciplinaryProcedures(test.store)).toBe(test.hidden)
    })
  })
})
