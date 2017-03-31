import OtherOffenseValidator from './otheroffense'

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
          InvolvedViolence: 'No'
        },
        expected: true
      },
      {
        state: {
          InvolvedViolence: 'Yes'
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
          InvolvedFirearms: 'No'
        },
        expected: true
      },
      {
        state: {
          InvolvedFirearms: 'Yes'
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
          InvolvedSubstances: 'No'
        },
        expected: true
      },
      {
        state: {
          InvolvedSubstances: 'Yes'
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
            addressType: 'United States',
            address: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202'
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
          CourtType: 'Felony'
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new OtherOffenseValidator(test.state, null).validCourtType()).toBe(test.expected)
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
          WasSentenced: 'Nope'
        },
        expected: false
      },
      {
        state: {
          WasSentenced: 'No'
        },
        expected: true
      },
      {
        state: {
          WasSentenced: 'Yes',
          Sentence: {
            AwaitingTrial: 'Yes',
            AwaitingTrialExplanation: 'Yes',
            ExceedsYear: 'Yes',
            Incarcerated: 'Yes',
            IncarcerationDates: {
              from: {
                date: new Date('1/1/2000')
              },
              to: {
                date: new Date('1/1/2004')
              },
              present: false
            },
            ProbationDates: {
              from: {
                date: new Date('1/1/2000')
              },
              to: {
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
          InvolvedViolence: 'No',
          InvolvedFirearms: 'Yes',
          InvolvedSubstances: 'No',
          CourtType: 'Felony',
          CourtAddress: {
            addressType: 'United States',
            address: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202'
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
          WasSentenced: 'Yes',
          Sentence: {
            AwaitingTrial: 'Yes',
            AwaitingTrialExplanation: 'Yes',
            ExceedsYear: 'Yes',
            Incarcerated: 'Yes',
            IncarcerationDates: {
              from: {
                date: new Date('1/1/2000')
              },
              to: {
                date: new Date('1/1/2004')
              },
              present: false
            },
            ProbationDates: {
              from: {
                date: new Date('1/1/2000')
              },
              to: {
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
          InvolvedViolence: 'No',
          InvolvedFirearms: 'Yes',
          InvolvedSubstances: 'No',
          CourtType: 'Felony',
          CourtAddress: {
            addressType: 'United States',
            address: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202'
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
          WasSentenced: 'No',
          Sentenced: null
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new OtherOffenseValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
