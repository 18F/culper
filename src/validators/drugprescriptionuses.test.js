import DrugPrescriptionUsesValidator from './drugprescriptionuses'

describe('Drug Prescription Validation', function() {
  it('should validate drug prescription misuse', function() {
    const tests = [
      {
        data: {
          MisusedDrugs: { value: 'Nope' }
        },
        expected: false
      },
      {
        data: {
          MisusedDrugs: { value: 'No' }
        },
        expected: true
      },
      {
        data: {
          MisusedDrugs: { value: 'Yes' },
          List: {
            branch: { value: '' },
            items: []
          }
        },
        expected: false
      },
      {
        data: {
          MisusedDrugs: { value: 'Yes' },
          List: {
            branch: { value: 'Nope' },
            items: [{ DrugUse: {} }]
          }
        },
        expected: false
      },
      {
        data: {
          MisusedDrugs: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [{ DrugUse: {} }]
          }
        },
        expected: false
      },
      {
        data: {
          MisusedDrugs: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  InvolvementDates: {
                    from: {
                      month: '1',
                      day: '1',
                      year: '2010',
                      date: new Date('1/1/2010')
                    },
                    to: {
                      month: '1',
                      day: '1',
                      year: '2012',
                      date: new Date('1/1/2012')
                    },
                    present: false
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
      expect(new DrugPrescriptionUsesValidator(test.data).isValid()).toBe(
        test.expected
      )
    })
  })
})
