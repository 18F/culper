import NegativeImpactsValidator, {
  NegativeImpactValidator
} from './alcoholnegativeimpact'

describe('negative impact component validation', function() {
  it('can validate negative impact', () => {
    const tests = [
      {
        state: {
          Occurred: {
            month: '1',
            year: '2010'
          },
          Circumstances: {
            value: 'Foo'
          },
          NegativeImpact: {
            value: 'Bar'
          },
          Used: {
            from: {
              month: '1',
              day: '1',
              year: '2010'
            },
            to: {
              month: '1',
              day: '1',
              year: '2012'
            },
            present: false
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new NegativeImpactValidator(test.state).isValid()).toBe(
        test.expected
      )
    })
  })

  it('can validate list of negative impacts', () => {
    const tests = [
      {
        state: {
          HasImpacts: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          HasImpacts: { value: 'Yes' },
          List: {
            branch: { value: '' },
            items: []
          }
        },
        expected: false
      },
      {
        state: {
          HasImpacts: { value: 'Yes' },
          List: {
            branch: { value: 'Nope' },
            items: [{}]
          }
        },
        expected: false
      },
      {
        state: {
          HasImpacts: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  Occurred: {
                    month: '1',
                    year: '2010'
                  },
                  Circumstances: {
                    value: 'Foo'
                  },
                  NegativeImpact: {
                    value: 'Bar'
                  },
                  Used: {
                    from: {
                      month: '1',
                      day: '1',
                      year: '2010'
                    },
                    to: {
                      month: '1',
                      day: '1',
                      year: '2012'
                    },
                    present: false
                  }
                }
              }
            ]
          }
        },
        expected: true
      },
      {
        state: {
          HasImpacts: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  Occurred: {
                    month: '1',
                    year: '2010'
                  },
                  Circumstances: {},
                  NegativeImpact: {
                    value: 'Bar'
                  },
                  Used: {
                    from: {
                      month: '1',
                      day: '1',
                      year: '2010'
                    },
                    to: {
                      month: '1',
                      day: '1',
                      year: '2012'
                    },
                    present: false
                  }
                }
              }
            ]
          }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new NegativeImpactsValidator(test.state).isValid()).toBe(
        test.expected
      )
    })
  })
})
