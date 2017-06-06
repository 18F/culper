import DrugPublicSafetyUsesValidator from './drugpublicsafetyuses'

describe('Drug Use Validation', function () {
  it('should validate drug usage', function () {
    const tests = [
      {
        state: {
          UsedDrugs: 'Nope'
        },
        expected: false
      },
      {
        state: {
          UsedDrugs: 'No'
        },
        expected: true
      },
      {
        state: {
          UsedDrugs: 'Yes',
          List: [],
          ListBranch: ''
        },
        expected: false
      },
      {
        state: {
          UsedDrugs: 'Yes',
          List: [{DrugUse: {}}],
          ListBranch: 'Nope'
        },
        expected: false
      },
      {
        state: {
          UsedDrugs: 'Yes',
          List: [{DrugUse: {}}],
          ListBranch: 'No'
        },
        expected: false
      },
      {
        state: {
          UsedDrugs: 'Yes',
          ListBranch: 'No',
          List: [
            {
              DrugPublicSafetyUse: {
                InvolvementDates: {
                  from: {
                    date: new Date('1/1/2010')
                  },
                  to: {
                    date: new Date('1/1/2012')
                  }
                },
                Description: {
                  value: 'Foo'
                },
                EstimatedUse: {
                  value: 'Foo'
                }
              }
            }
          ]
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new DrugPublicSafetyUsesValidator(test.state).isValid()).toBe(test.expected)
    })
  })
})
