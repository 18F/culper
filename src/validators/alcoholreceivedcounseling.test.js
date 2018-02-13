import ReceivedCounselingsValidator, { ReceivedCounselingValidator } from './alcoholreceivedcounseling'
import Location from '../components/Form/Location'

describe('received counseling component validation', function () {
  it('can validate received counseling', () => {
    const tests = [
      {
        state: {
          UseSameAddress: { value: 'Yes' },
          TreatmentProviderAddress: {
            country: { value: 'United States' },
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
          UseSameAddress: { value: 'No' },
          TreatmentProviderAddress: {
            country: { value: 'United States' },
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
      expect(new ReceivedCounselingValidator(test.state).validAddress()).toBe(test.expected)
    })
  })

  it('can validate received counseling', () => {
    const tests = [
      {
        state: {
          CounselingDates: {
            from: {
              month: '1',
              day: '1',
              year: '2010',
              date: new Date('1/1/2010')
            },
            to: {
              month: '1',
              day: '1',
              year: '2010',
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
          UseSameAddress: { value: 'Yes' },
          TreatmentProviderAddress: {
            country: { value: 'United States' },
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
          CompletedTreatment: { value: 'Yes' },
          NoCompletedTreatmentExplanation: {
            value: 'Foo'
          }
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new ReceivedCounselingValidator(test.state).isValid()).toBe(test.expected)
    })
  })

  it('can validate completed treatment', () => {
    const tests = [
      {
        state: {
          CompletedTreatment: { value: 'Yes' },
          NoCompletedTreatmentExplanation: {
            value: 'Foo'
          }
        },
        expected: true
      },
      {
        state: {
          CompletedTreatment: { value: 'No' },
          NoCompletedTreatmentExplanation: {
            value: 'Foo'
          }
        },
        expected: true
      },
      {
        state: {
          CompletedTreatment: { value: 'Nope' }
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new ReceivedCounselingValidator(test.state).validCompletedTreatment()).toBe(test.expected)
    })
  })

  it('can validate treatment dates', () => {
    const tests = [
      {
        state: {
          ReceivedTreatment: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  UseSameAddress: { value: 'Yes' },
                  TreatmentProviderName: {
                    value: 'The name'
                  },
                  TreatmentProviderAddress: {
                    country: { value: 'United States' },
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
                  CompletedTreatment: { value: 'Yes' },
                  NoCompletedTreatmentExplanation: {
                    value: 'Foo'
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
          ReceivedTreatment: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  UseSameAddress: { value: 'Yes' },
                  TreatmentProviderName: {
                    value: 'The name'
                  },
                  TreatmentProviderAddress: {
                    country: { value: 'United States' },
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
                  CompletedTreatment: { value: 'Yes' },
                  NoCompletedTreatmentExplanation: {
                    value: 'Foo'
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
          ReceivedTreatment: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  UseSameAddress: { value: 'Yes' },
                  TreatmentProviderName: {
                    value: 'The name'
                  },
                  TreatmentProviderAddress: {
                    country: { value: 'United States' },
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
                  CompletedTreatment: { value: 'Yes' },
                  NoCompletedTreatmentExplanation: {
                    value: 'Foo'
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
      expect(new ReceivedCounselingsValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })

  it('can validate list of received counseling', () => {
    const tests = [
      {
        state: {
          ReceivedTreatment: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  UseSameAddress: { value: 'Yes' },
                  TreatmentProviderName: {
                    value: 'The name'
                  },
                  TreatmentProviderAddress: {
                    country: { value: 'United States' },
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
                  CompletedTreatment: { value: 'Yes' },
                  NoCompletedTreatmentExplanation: {
                    value: 'Foo'
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
          ReceivedTreatment: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          ReceivedTreatment: { value: 'Yes' },
          List: {
            branch: { value: '' },
            items: []
          }
        },
        expected: false
      },
      {
        state: {
          ReceivedTreatment: { value: 'Yes' },
          List: {
            branch: { value: '' },
            items: [{}]
          }
        },
        expected: false
      },
      {
        state: {
          ReceivedTreatment: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [{Item: {}}]
          }
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new ReceivedCounselingsValidator(test.state).isValid()).toBe(test.expected)
    })
  })
})
