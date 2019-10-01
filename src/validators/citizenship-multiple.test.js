import { validateCitizenshipMultiple } from './citizenship-multiple'

describe('validateCitizenshipMultiple function', () => {
  describe('if renounced is required', () => {
    it('requires renounced', () => {
      const testData = {
        HasMultiple: { value: 'Yes' },
        List: {
          branch: { value: 'No' },
          items: [
            {
              Item: {
                Country: {
                  value: 'United States',
                },
                Dates: {
                  from: {
                    month: '1',
                    day: '1',
                    year: '2010',
                  },
                  to: {
                    month: '1',
                    day: '1',
                    year: '2012',
                  },
                  present: true,
                },
                Current: { value: 'Yes' },
                CurrentExplanation: {
                  value: 'explanation',
                },
              },
            },
            {
              Item: {
                Country: {
                  value: 'Germany',
                },
                Dates: {
                  from: {
                    month: '1',
                    day: '1',
                    year: '2010',
                  },
                  to: {
                    month: '1',
                    day: '1',
                    year: '2012',
                  },
                  present: false,
                },
                How: {
                  value: 'Birth',
                },
                Current: { value: 'Yes' },
                CurrentExplanation: {
                  value: 'explanation',
                },
              },
            },
          ],
        },
      }

      expect(validateCitizenshipMultiple(testData, 'SF86'))
        .toEqual(expect.arrayContaining([
          'List.accordion.1.Renounced.presence.REQUIRED',
          'List.accordion.1.RenouncedExplanation.presence.REQUIRED',
        ]))
    })

    it('passes valid citizenships', () => {
      const testData = {
        HasMultiple: { value: 'Yes' },
        List: {
          branch: { value: 'No' },
          items: [
            {
              Item: {
                Country: {
                  value: ['United States'],
                },
                Dates: {
                  from: {
                    month: '1',
                    day: '1',
                    year: '2010',
                  },
                  to: {
                    month: '1',
                    day: '1',
                    year: '2012',
                  },
                  present: true,
                },
                Current: { value: 'Yes' },
                CurrentExplanation: {
                  value: 'explanation',
                },
              },
            },
            {
              Item: {
                Country: {
                  value: 'Germany',
                },
                Dates: {
                  from: {
                    month: '1',
                    day: '1',
                    year: '2010',
                  },
                  to: {
                    month: '1',
                    day: '1',
                    year: '2012',
                  },
                  present: false,
                },
                How: {
                  value: 'Birth',
                },
                Renounced: { value: 'Yes' },
                RenouncedExplanation: {
                  value: 'explanation',
                },
                Current: { value: 'Yes' },
                CurrentExplanation: {
                  value: 'explanation',
                },
              },
            },
          ],
        },
      }

      expect(validateCitizenshipMultiple(testData, 'SF86')).toEqual(true)
    })
  })

  describe('if renounced is not required', () => {
    it('passes valid citizenships', () => {
      const testData = {
        HasMultiple: { value: 'Yes' },
        List: {
          branch: { value: 'No' },
          items: [
            {
              Item: {
                Country: {
                  value: 'United States',
                },
                Dates: {
                  from: {
                    month: '1',
                    day: '1',
                    year: '2010',
                  },
                  to: {
                    month: '1',
                    day: '1',
                    year: '2012',
                  },
                  present: true,
                },
                Current: { value: 'Yes' },
                CurrentExplanation: {
                  value: 'explanation',
                },
              },
            },
            {
              Item: {
                Country: {
                  value: 'Germany',
                },
                Dates: {
                  from: {
                    month: '1',
                    day: '1',
                    year: '2010',
                  },
                  to: {
                    month: '1',
                    day: '1',
                    year: '2012',
                  },
                  present: false,
                },
                How: {
                  value: 'Birth',
                },
                Current: { value: 'Yes' },
                CurrentExplanation: {
                  value: 'explanation',
                },
              },
            },
          ],
        },
      }

      expect(validateCitizenshipMultiple(testData, 'SF85')).toEqual(true)
    })
  })
})
