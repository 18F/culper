import DrugPrescriptionUsesValidator from './drugprescriptionuses'

describe('Drug Prescription Validation', function () {
  it('should validate drug prescription misuse', function () {
    const tests = [
      {
        state: {
          MisusedDrugs: 'Nope'
        },
        expected: false
      },
      {
        state: {
          MisusedDrugs: 'No'
        },
        expected: true
      },
      {
        state: {
          MisusedDrugs: 'Yes',
          List: [],
          ListBranch: ''
        },
        expected: false
      },
      {
        state: {
          MisusedDrugs: 'Yes',
          List: [{DrugUse: {}}],
          ListBranch: 'Nope'
        },
        expected: false
      },
      {
        state: {
          MisusedDrugs: 'Yes',
          List: [{DrugUse: {}}],
          ListBranch: 'No'
        },
        expected: false
      },
      {
        state: {
          MisusedDrugs: 'Yes',
          ListBranch: 'No',
          List: [
            {
              DrugPrescriptionUse: {
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
                UseWhileEmployed: 'Yes',
                UseWithClearance: 'Yes'
              }
            }
          ]
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new DrugPrescriptionUsesValidator(test.state).isValid()).toBe(test.expected)
    })
  })
})
