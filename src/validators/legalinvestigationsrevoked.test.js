import LegalInvestigationsRevokedValidator from './legalinvestigationsrevoked'

describe('Legal investigations revoked component validation', function() {
  it('validate list', () => {
    const tests = [
      {
        state: {
          HasRevocations: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          HasRevocations: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: []
          }
        },
        expected: false
      },
      {
        state: {
          HasRevocations: { value: 'Yes' },
          List: {
            branch: { value: '' },
            items: [{}]
          }
        },
        expected: false
      },
      {
        state: {
          HasRevocations: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  Date: {
                    day: '1',
                    month: '1',
                    year: '2010'
                  },
                  Agency: {
                    value: 'U.S. Department of Defense'
                  },
                  Explanation: {
                    value: 'this is an explanation'
                  }
                }
              }
            ]
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new LegalInvestigationsRevokedValidator(test.state).isValid()).toBe(
        test.expected
      )
    })
  })
})
