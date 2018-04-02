import OtherOffenseValidator from './otheroffense'
import Location from '../components/Form/Location'

describe('OtherOffense validation', function () {
  it('validates date', () => {
    const tests = [
      {
        state: {
          Date: {
            day: '1',
            month: '1',
            year: '2016',
            date: new Date('1/1/2016')
          }
        },
        expected: true
      },
      {
        state: {
          Date: null
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new OtherOffenseValidator(test.state, null).validDate()).toBe(test.expected)
    })
  })

  it('validates description', () => {
    const tests = [
      {
        state: {
          Description: {
            value: 'Some description'
          }
        },
        expected: true
      },
      {
        state: {
          Description: {
            value: ''
          }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new OtherOffenseValidator(test.state, null).validDescription()).toBe(test.expected)
    })
  })

  it('validates violence involvement', () => {
    const tests = [
      {
        state: {
          InvolvedViolence: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          InvolvedViolence: { value: 'Yes' }
        },
        expected: true
      },
      {
        state: {
          InvolvedViolence: null
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new OtherOffenseValidator(test.state, null).validViolence()).toBe(test.expected)
    })
  })

  it('validates firearms involvement', () => {
    const tests = [
      {
        state: {
          InvolvedFirearms: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          InvolvedFirearms: { value: 'Yes' }
        },
        expected: true
      },
      {
        state: {
          InvolvedFirearms: null
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new OtherOffenseValidator(test.state, null).validFirearms()).toBe(test.expected)
    })
  })

  it('validates substances involvement', () => {
    const tests = [
      {
        state: {
          InvolvedSubstances: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          InvolvedSubstances: { value: 'Yes' }
        },
        expected: true
      },
      {
        state: {
          InvolvedSubstances: null
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new OtherOffenseValidator(test.state, null).validSubstances()).toBe(test.expected)
    })
  })

  it('validates court name', () => {
    const tests = [
      {
        state: {
          CourtName: {
            value: 'court name'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new OtherOffenseValidator(test.state, null).validCourtName()).toBe(test.expected)
    })
  })

  it('validates court address', () => {
    const tests = [
      {
        state: {
          CourtAddress: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new OtherOffenseValidator(test.state, null).validCourtAddress()).toBe(test.expected)
    })
  })

  it('validates court type', () => {
    const tests = [
      {
        state: {
          ChargeType: { value: 'Felony' }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new OtherOffenseValidator(test.state, null).validChargeType()).toBe(test.expected)
    })
  })

  it('validates court charge', () => {
    const tests = [
      {
        state: {
          CourtCharge: {
            value: 'Some charge'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new OtherOffenseValidator(test.state, null).validCourtCharge()).toBe(test.expected)
    })
  })

  it('validates court outcome', () => {
    const tests = [
      {
        state: {
          CourtOutcome: {
            value: 'Some outcome'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new OtherOffenseValidator(test.state, null).validCourtOutcome()).toBe(test.expected)
    })
  })

  it('validates court date', () => {
    const tests = [
      {
        state: {
          CourtDate: {
            day: '1',
            month: '1',
            year: '2016',
            date: new Date('1/1/2016')
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new OtherOffenseValidator(test.state, null).validCourtDate()).toBe(test.expected)
    })
  })

  it('validates sentenced', () => {
    const tests = [
      {
        state: {
          WasSentenced: { value: 'Nope' }
        },
        expected: false
      },
      {
        state: {
          WasSentenced: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          WasSentenced: { value: 'Yes' },
          Sentence: {
            AwaitingTrial: { value: 'Yes' },
            AwaitingTrialExplanation: { value: 'Yes' },
            ExceedsYear: { value: 'Yes' },
            Incarcerated: { value: 'Yes' },
            IncarcerationDates: {
              from: {
                month: '1',
                day: '1',
                year: '2000',
                date: new Date('1/1/2000')
              },
              to: {
                month: '1',
                day: '1',
                year: '2004',
                date: new Date('1/1/2004')
              },
              present: false
            },
            ProbationDates: {
              from: {
                month: '1',
                day: '1',
                year: '2000',
                date: new Date('1/1/2000')
              },
              to: {
                month: '1',
                day: '1',
                year: '2004',
                date: new Date('1/1/2004')
              },
              present: false
            },
            Description: {
              value: 'Foo'
            }
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new OtherOffenseValidator(test.state, null).validSentenced()).toBe(test.expected)
    })
  })

  it('validate offense object', () => {
    const tests = [
      {
        state: {
          Date: {
            day: '1',
            month: '1',
            year: '2016',
            date: new Date('1/1/2016')
          },
          Description: {
            value: 'Some description'
          },
          InvolvedViolence: { value: 'No' },
          InvolvedFirearms: { value: 'Yes' },
          InvolvedSubstances: { value: 'No' },
          ChargeType: { value: 'Felony' },
          CourtAddress: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS
          },
          CourtDate: {
            day: '1',
            month: '1',
            year: '2016',
            date: new Date('1/1/2016')
          },
          CourtName: {
            value: 'court name'
          },
          CourtCharge: {
            value: 'Some charge'
          },
          CourtOutcome: {
            value: 'Some outcome'
          },
          WasSentenced: { value: 'Yes' },
          Sentence: {
            AwaitingTrial: { value: 'Yes' },
            AwaitingTrialExplanation: { value: 'Yes' },
            ExceedsYear: { value: 'Yes' },
            Incarcerated: { value: 'Yes' },
            IncarcerationDates: {
              from: {
                month: '1',
                day: '1',
                year: '2000',
                date: new Date('1/1/2000')
              },
              to: {
                month: '1',
                day: '1',
                year: '2004',
                date: new Date('1/1/2004')
              },
              present: false
            },
            ProbationDates: {
              from: {
                month: '1',
                day: '1',
                year: '2000',
                date: new Date('1/1/2000')
              },
              to: {
                month: '1',
                day: '1',
                year: '2004',
                date: new Date('1/1/2004')
              },
              present: false
            },
            Description: {
              value: 'Foo'
            }
          }
        },
        expected: true
      },
      {
        state: {
          Date: {
            day: '1',
            month: '1',
            year: '2016',
            date: new Date('1/1/2016')
          },
          Description: {
            value: 'Some description'
          },
          InvolvedViolence: { value: 'No' },
          InvolvedFirearms: { value: 'Yes' },
          InvolvedSubstances: { value: 'No' },
          ChargeType: { value: 'Felony' },
          CourtAddress: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS
          },
          CourtDate: {
            day: '1',
            month: '1',
            year: '2016',
            date: new Date('1/1/2016')
          },
          CourtName: {
            value: 'court name'
          },
          CourtCharge: {
            value: 'Some charge'
          },
          CourtOutcome: {
            value: 'Some outcome'
          },
          WasSentenced: { value: 'No' },
          Sentenced: null
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new OtherOffenseValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
