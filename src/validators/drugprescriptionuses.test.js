import DrugPrescriptionUsesValidator from './drugprescriptionuses'

describe('Drug Prescription Validation', function () {
  it('should validate drug prescription misuse', function () {
    const tests = [
      {
        state: {
          MisusedDrugs: { value: 'Nope' }
        },
        expected: false
      },
      {
        state: {
          MisusedDrugs: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          MisusedDrugs: { value: 'Yes' },
          List: {
            branch: { value: '' },
            items: []
          }
        },
        expected: false
      },
      {
        state: {
          MisusedDrugs: { value: 'Yes' },
          List: {
            branch: { value: 'Nope' },
            items: [{DrugUse: {}}]
          }
        },
        expected: false
      },
      {
        state: {
          MisusedDrugs: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [{DrugUse: {}}]
          }
        },
        expected: false
      },
      {
        state: {
          MisusedDrugs: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  InvolvementDates: {
                    from: {
                      date: new Date('1/1/2010')
                    },
                    to: {
                      date: new Date('1/1/2012')
                    }
                  },
                  PrescriptionName: {
                    value: 'Foo'
                  },
                  Reason: {
                    value: 'The reason'
                  },
                  UseWhileEmployed: { value: 'Yes' },
                  UseWithClearance: { value: 'Yes' }
                }
              }
            ]
          }
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new DrugPrescriptionUsesValidator(test.state).isValid()).toBe(test.expected)
    })
  })
})
