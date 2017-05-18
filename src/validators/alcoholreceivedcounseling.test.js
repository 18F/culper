import ReceivedCounselingsValidator, { ReceivedCounselingValidator } from './alcoholreceivedcounseling'

describe('received counseling component validation', function () {
  it('can validate received counseling', () => {
    const tests = [
      {
        state: {
          CounselingDates: {
            from: {
              date: new Date('1/1/2010')
            },
            to: {
              date: new Date('1/1/2012')
            },
            present: false
          },
          TreatmentProviderName: {
            value: 'The name'
          },
          AgencyName: {
            value: 'The agency name'
          },
          TreatmentProviderAddress: {
            addressType: 'United States',
            address: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202'
          },
          CompletedTreatment: 'Yes'
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new ReceivedCounselingValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })

  it('can validate completed treatment', () => {
    const tests = [
      {
        state: {
          CompletedTreatment: 'Yes'
        },
        expected: true
      },
      {
        state: {
          CompletedTreatment: 'No',
          NoCompletedTreatmentExplanation: {
            value: 'Foo'
          }
        },
        expected: true
      },
      {
        state: {
          CompletedTreatment: 'Nope'
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new ReceivedCounselingValidator(test.state, null).validCompletedTreatment()).toBe(test.expected)
    })
  })

  it('can validate list of received counseling', () => {
    const tests = [
      {
        state: {
          ListBranch: 'No',
          ReceivedTreatment: 'Yes',
          List: [
            {
              ReceivedCounseling: {
                CounselingDates: {
                  from: {
                    date: new Date('1/1/2010')
                  },
                  to: {
                    date: new Date('1/1/2012')
                  },
                  present: false
                },
                TreatmentProviderName: {
                  value: 'The name'
                },
                TreatmentProviderAddress: {
                  addressType: 'United States',
                  address: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'Virginia',
                  zipcode: '22202'
                },
                AgencyName: {
                  value: 'The agency name'
                },
                CompletedTreatment: 'Yes'
              }
            }
          ]
        },
        expected: true
      },
      {
        state: {
          ReceivedTreatment: 'No'
        },
        expected: true
      },
      {
        state: {
          ReceivedTreatment: 'Yes',
          List: []
        },
        expected: false
      },
      {
        state: {
          ReceivedTreatment: 'Yes',
          List: [{}]
        },
        expected: false
      },
      {
        state: {
          ReceivedTreatment: 'Yes',
          ListBranch: 'No',
          List: [{ReceivedCounseling: {}}]
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new ReceivedCounselingsValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
