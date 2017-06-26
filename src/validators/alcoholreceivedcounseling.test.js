import ReceivedCounselingsValidator, { ReceivedCounselingValidator } from './alcoholreceivedcounseling'
import Location from '../components/Form/Location'

describe('received counseling component validation', function () {
  it('can validate received counseling', () => {
    const tests = [
      {
        state: {
          UseSameAddress: 'Yes',
          TreatmentProviderAddress: {
            country: 'United States',
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202',
            layout: Location.ADDRESS
          }
        },
        expected: true
      },
      {
        state: {
          UseSameAddress: 'No',
          TreatmentProviderAddress: {
            country: 'United States',
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202',
            layout: Location.ADDRESS
          }
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new ReceivedCounselingValidator(test.state, null).validAddress()).toBe(test.expected)
    })
  })

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
          UseSameAddress: 'Yes',
          TreatmentProviderAddress: {
            country: 'United States',
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202',
            layout: Location.ADDRESS
          },
          TreatmentBeganDate: {
            day: '1',
            month: '1',
            year: '2016',
            date: new Date('1/1/2016')
          },
          TreatmentEndDate: {
            day: '1',
            month: '2',
            year: '2016',
            date: new Date('1/2/2016')
          },
          CompletedTreatment: 'Yes',
          NoCompletedTreatmentExplanation: {
            value: 'Foo'
          }
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
          CompletedTreatment: 'Yes',
          NoCompletedTreatmentExplanation: {
            value: 'Foo'
          }
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

  it('can validate treatment dates', () => {
    const tests = [
      {
        state: {
          ListBranch: 'No',
          ReceivedTreatment: 'Yes',
          List: [
            {
              ReceivedCounseling: {
                UseSameAddress: 'Yes',
                TreatmentProviderName: {
                  value: 'The name'
                },
                TreatmentProviderAddress: {
                  country: 'United States',
                  street: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'Virginia',
                  zipcode: '22202',
                  layout: Location.ADDRESS
                },
                AgencyName: {
                  value: 'The agency name'
                },
                TreatmentBeganDate: {
                  day: '1',
                  month: '1',
                  year: '2016',
                  date: new Date('1/1/2016')
                },
                TreatmentEndDate: {
                  day: '1',
                  month: '2',
                  year: '2016',
                  date: new Date('1/2/2016')
                },
                CompletedTreatment: 'Yes',
                NoCompletedTreatmentExplanation: {
                  value: 'Foo'
                }
              }
            }
          ]
        },
        expected: true
      },
      {
        state: {
          ListBranch: 'No',
          ReceivedTreatment: 'Yes',
          List: [
            {
              ReceivedCounseling: {
                UseSameAddress: 'Yes',
                TreatmentProviderName: {
                  value: 'The name'
                },
                TreatmentProviderAddress: {
                  country: 'United States',
                  street: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'Virginia',
                  zipcode: '22202',
                  layout: Location.ADDRESS
                },
                AgencyName: {
                  value: 'The agency name'
                },
                TreatmentBeganDate: {
                  day: '1',
                  month: '1',
                  year: '2016',
                  date: new Date('1/1/2016')
                },
                TreatmentEndDate: {
                  day: '1',
                  month: '1',
                  year: '2016',
                  date: new Date('1/1/2016')
                },
                CompletedTreatment: 'Yes',
                NoCompletedTreatmentExplanation: {
                  value: 'Foo'
                }
              }
            }
          ]
        },
        expected: false
      },
      {
        state: {
          ListBranch: 'No',
          ReceivedTreatment: 'Yes',
          List: [
            {
              ReceivedCounseling: {
                UseSameAddress: 'Yes',
                TreatmentProviderName: {
                  value: 'The name'
                },
                TreatmentProviderAddress: {
                  country: 'United States',
                  street: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'Virginia',
                  zipcode: '22202',
                  layout: Location.ADDRESS
                },
                AgencyName: {
                  value: 'The agency name'
                },
                TreatmentBeganDate: {
                  day: '1',
                  month: '1',
                  year: '2016',
                  date: new Date('1/1/2016')
                },
                TreatmentEndDate: {
                  day: '1',
                  month: '1',
                  year: '1982',
                  date: new Date('1/1/1982')
                },
                CompletedTreatment: 'Yes',
                NoCompletedTreatmentExplanation: {
                  value: 'Foo'
                }
              }
            }
          ]
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new ReceivedCounselingsValidator(test.state, null).isValid()).toBe(test.expected)
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
                UseSameAddress: 'Yes',
                TreatmentProviderName: {
                  value: 'The name'
                },
                TreatmentProviderAddress: {
                  country: 'United States',
                  street: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'Virginia',
                  zipcode: '22202',
                  layout: Location.ADDRESS
                },
                AgencyName: {
                  value: 'The agency name'
                },
                TreatmentBeganDate: {
                  day: '1',
                  month: '1',
                  year: '2016',
                  date: new Date('1/1/2016')
                },
                TreatmentEndDate: {
                  day: '1',
                  month: '2',
                  year: '2016',
                  date: new Date('1/2/2016')
                },
                CompletedTreatment: 'Yes',
                NoCompletedTreatmentExplanation: {
                  value: 'Foo'
                }
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
