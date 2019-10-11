import { extractApplicantBirthdate, extractOtherNames } from './extractors'

describe('Extractors', () => {
  it('extractApplicantBirthdate should return a date', () => {
    const tests = [
      {
        state: {
          Identification: {
            ApplicantBirthDate: null,
          },
        },
        expected: null,
      },
      {
        state: {
          Identification: null,
        },
        expected: null,
      },
      {
        state: {
          Identification: {
            ApplicantBirthDate: {
              Date: {
                day: '1',
                month: '1',
                year: '2010',
              },
            },
          },
        },
        expected: new Date('1/1/2010'),
      },
      {
        state: {
          Identification: {
            ApplicantBirthDate: {
              Date: {
                day: null,
                month: '1',
                year: '2010',
              },
            },
          },
        },
        expected: null,
      },
    ]

    tests.forEach((test) => {
      expect(extractApplicantBirthdate(test.state)).toEqual(test.expected)
    })
  })

  describe('extractOtherNames function', () => {
    describe('if state is missing', () => {
      it('returns an empty array', () => {
        expect(extractOtherNames(null)).toEqual([])
      })
    })

    describe('if state is incomplete', () => {
      it('returns an empty array', () => {
        expect(extractOtherNames({ Identification: {} })).toEqual([])
      })
    })

    describe('if other names are present', () => {
      it('returns a list of other names', () => {
        const otherNames = {
          List: {
            items: [
              { Item: { Name: 'Test name 1' } },
              { Item: { Name: 'Test name 2' } },
              { Item: { Name: null } },
              { data: 'invalid name' },
            ],
          },
        }

        expect(extractOtherNames({
          Identification: {
            OtherNames: otherNames,
          },
        })).toEqual(['Test name 1', 'Test name 2'])
      })
    })
  })
})
