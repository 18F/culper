import relationshipsReducer from './relationships'

describe('Relationships Reducer', function() {
  it('should handle default relationships update', function() {
    const tests = [
      {
        state: {},
        action: {
          section: 'Foo',
          property: 'Bar',
          values: 'Test'
        },
        expected: {}
      },
      {
        state: {},
        action: {
          section: 'Relationships',
          property: 'Marital',
          values: 'Test'
        },
        expected: {
          Marital: 'Test'
        }
      }
    ]
    tests.forEach(test => {
      expect(relationshipsReducer(test.state, test.action)).toEqual(
        test.expected
      )
    })
  })

  it('should handle ClearSameSpouseConfirmed relationships update', function() {
    const tests = [
      {
        state: {
          Cohabitants: null
        },
        action: {
          section: 'Relationships',
          property: 'ClearSameSpouseConfirmed',
          type: 'Relationships.ClearSameSpouseConfirmed',
          values: true
        },
        expected: {
          Cohabitants: null,
          ClearSameSpouseConfirmed: true
        }
      },
      {
        state: {
          Cohabitants: {
            CohabitantList: []
          }
        },
        action: {
          section: 'Relationships',
          property: 'ClearSameSpouseConfirmed',
          type: 'Relationships.ClearSameSpouseConfirmed',
          values: true
        },
        expected: {
          ClearSameSpouseConfirmed: true,
          Cohabitants: {
            CohabitantList: []
          }
        }
      },
      {
        state: {
          Cohabitants: {
            CohabitantList: null
          }
        },
        action: {
          section: 'Relationships',
          property: 'ClearSameSpouseConfirmed',
          type: 'Relationships.ClearSameSpouseConfirmed',
          values: true
        },
        expected: {
          ClearSameSpouseConfirmed: true,
          Cohabitants: {
            CohabitantList: null
          }
        }
      },
      {
        state: {
          Cohabitants: {
            CohabitantList: [{ Cohabitant: null }]
          }
        },
        action: {
          section: 'Relationships',
          property: 'ClearSameSpouseConfirmed',
          type: 'Relationships.ClearSameSpouseConfirmed',
          values: true
        },
        expected: {
          ClearSameSpouseConfirmed: true,
          Cohabitants: {
            CohabitantList: [{ Cohabitant: null }]
          }
        }
      },
      {
        state: {
          Cohabitants: {
            CohabitantList: [
              {
                Cohabitant: {
                  SameSpouseConfirmed: true
                }
              }
            ]
          }
        },
        action: {
          section: 'Relationships',
          property: 'ClearSameSpouseConfirmed',
          type: 'Relationships.ClearSameSpouseConfirmed',
          values: true
        },
        expected: {
          ClearSameSpouseConfirmed: true,
          Cohabitants: {
            CohabitantList: [
              {
                Cohabitant: {
                  SameSpouseConfirmed: false
                }
              }
            ]
          }
        }
      }
    ]

    tests.forEach(test => {
      expect(relationshipsReducer(test.state, test.action)).toEqual(
        test.expected
      )
    })
  })
})
