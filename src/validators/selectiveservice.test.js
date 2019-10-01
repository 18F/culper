import { hideSelectiveService } from './selectiveservice'

describe('Selective service validation', () => {
  it('', () => {
    const tests = [
      {
        store: {},
        expected: false,
      },
      {
        store: {
          Identification: {
            ApplicantBirthDate: {
              Date: {},
            },
          },
        },
        expected: false,
      },
      {
        store: {
          Identification: {
            ApplicantBirthDate: {
              Date: {
                month: `${new Date().getMonth() + 1}`,
                day: `${new Date().getDate()}`,
                year: `${new Date().getFullYear()}`,
              },
            },
          },
        },
        expected: false,
      },
      {
        store: {
          Identification: {
            ApplicantBirthDate: {
              Date: {
                month: '1',
                day: '1',
                year: '1940',
              },
            },
          },
        },
        expected: true,
      },
      {
        store: {
          Identification: {
            ApplicantBirthDate: {
              Date: {
                month: '11',
                day: '31',
                year: '1959',
              },
            },
          },
        },
        expected: true,
      },
    ]

    tests.forEach((test) => {
      expect(hideSelectiveService(test.store)).toBe(test.expected)
    })
  })
})
