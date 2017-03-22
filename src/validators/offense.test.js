import OffenseValidator from './offense'

describe('Offense validation', function () {
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
      expect(new OffenseValidator(test.state, null).validDate()).toBe(test.expected)
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
      expect(new OffenseValidator(test.state, null).validDescription()).toBe(test.expected)
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
      expect(new OffenseValidator(test.state, null).validViolence()).toBe(test.expected)
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
      expect(new OffenseValidator(test.state, null).validFirearms()).toBe(test.expected)
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
      expect(new OffenseValidator(test.state, null).validSubstances()).toBe(test.expected)
    })
  })

  it('validates address', () => {
    const tests = [
      {
        state: {
          Address: {
            addressType: 'United States',
            address: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202'
          }
        },
        expected: true
      },
      {
        state: {
          Address: null
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new OffenseValidator(test.state, null).validAddress()).toBe(test.expected)
    })
  })

  it('validates if was cited', () => {
    const tests = [
      {
        state: {
          WasCited: 'No'
        },
        expected: true
      },
      {
        state: {
          WasCited: 'Yes'
        },
        expected: true
      },
      {
        state: {
          WasCited: null
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new OffenseValidator(test.state, null).validCited()).toBe(test.expected)
    })
  })

  it('validates cited by', () => {
    const tests = [
      {
        state: {
          WasCited: 'No'
        },
        expected: true
      },
      {
        state: {
          WasCited: 'Yes',
          CitedBy: {
            value: ''
          }
        },
        expected: false
      },
      {
        state: {
          WasCited: 'Yes',
          CitedBy: {
            value: 'Somebody'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new OffenseValidator(test.state, null).validCitedBy()).toBe(test.expected)
    })
  })

  it('validates cited by', () => {
    const tests = [
      {
        state: {
          WasCited: 'No'
        },
        expected: true
      },
      {
        state: {
          WasCited: 'Yes',
          AgencyAddress: null
        },
        expected: false
      },
      {
        state: {
          WasCited: 'Yes',
          AgencyAddress: {
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
      expect(new OffenseValidator(test.state, null).validAgencyAddress()).toBe(test.expected)
    })
  })

  it('validates if was charged', () => {
    const tests = [
      {
        state: {
          WasCited: 'No'
        },
        expected: true
      },
      {
        state: {
          WasCited: 'Yes'
        },
        expected: false
      },
      {
        state: {
          WasCited: 'Yes',
          WasCharged: 'No'
        },
        expected: true
      },
      {
        state: {
          WasCited: 'Yes',
          WasCharged: 'Yes'
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new OffenseValidator(test.state, null).validCharged()).toBe(test.expected)
    })
  })

  it('validates if was not charged but needs explanation', () => {
    const tests = [
      {
        state: {
          WasCited: 'No'
        },
        expected: true
      },
      {
        state: {
          WasCited: 'Yes'
        },
        expected: true
      },
      {
        state: {
          WasCited: 'Yes',
          WasCharged: 'Yes'
        },
        expected: true
      },
      {
        state: {
          WasCited: 'Yes',
          WasCharged: 'No'
        },
        expected: false
      },
      {
        state: {
          WasCited: 'Yes',
          WasCharged: 'No',
          Explanation: null
        },
        expected: false
      },
      {
        state: {
          WasCited: 'Yes',
          WasCharged: 'No',
          Explanation: {
            value: 'Some explanation'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new OffenseValidator(test.state, null).validExplanation()).toBe(test.expected)
    })
  })

  it('validates court name', () => {
    const tests = [
      {
        state: {
          WasCited: 'Yes',
          WasCharged: 'No'
        },
        expected: true
      },
      {
        state: {
          WasCited: 'Yes',
          WasCharged: 'Yes'
        },
        expected: false
      },
      {
        state: {
          WasCited: 'Yes',
          WasCharged: 'Yes',
          CourtName: {
            value: 'court name'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new OffenseValidator(test.state, null).validCourtName()).toBe(test.expected)
    })
  })

  it('validates court address', () => {
    const tests = [
      {
        state: {
          WasCited: 'Yes',
          WasCharged: 'No'
        },
        expected: true
      },
      {
        state: {
          WasCited: 'Yes',
          WasCharged: 'Yes'
        },
        expected: false
      },
      {
        state: {
          WasCited: 'Yes',
          WasCharged: 'Yes',
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
      expect(new OffenseValidator(test.state, null).validCourtAddress()).toBe(test.expected)
    })
  })

  it('validates court type', () => {
    const tests = [
      {
        state: {
          WasCited: 'Yes',
          WasCharged: 'No'
        },
        expected: true
      },
      {
        state: {
          WasCited: 'Yes',
          WasCharged: 'Yes'
        },
        expected: false
      },
      {
        state: {
          WasCited: 'Yes',
          WasCharged: 'Yes',
          CourtType: 'Does not exit'
        },
        expected: false
      },
      {
        state: {
          WasCited: 'Yes',
          WasCharged: 'Yes',
          CourtType: 'Felony'
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new OffenseValidator(test.state, null).validCourtType()).toBe(test.expected)
    })
  })

  it('validates court charge', () => {
    const tests = [
      {
        state: {
          WasCited: 'Yes',
          WasCharged: 'No'
        },
        expected: true
      },
      {
        state: {
          WasCited: 'Yes',
          WasCharged: 'Yes'
        },
        expected: false
      },
      {
        state: {
          WasCited: 'Yes',
          WasCharged: 'Yes',
          CourtCharge: {
            value: 'Some charge'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new OffenseValidator(test.state, null).validCourtCharge()).toBe(test.expected)
    })
  })

  it('validates court outcome', () => {
    const tests = [
      {
        state: {
          WasCited: 'Yes',
          WasCharged: 'No'
        },
        expected: true
      },
      {
        state: {
          WasCited: 'Yes',
          WasCharged: 'Yes'
        },
        expected: false
      },
      {
        state: {
          WasCited: 'Yes',
          WasCharged: 'Yes',
          CourtOutcome: {
            value: 'Some outcome'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new OffenseValidator(test.state, null).validCourtOutcome()).toBe(test.expected)
    })
  })

  it('validates court date', () => {
    const tests = [
      {
        state: {
          WasCited: 'Yes',
          WasCharged: 'No'
        },
        expected: true
      },
      {
        state: {
          WasCited: 'Yes',
          WasCharged: 'Yes'
        },
        expected: false
      },
      {
        state: {
          WasCited: 'Yes',
          WasCharged: 'Yes',
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
      expect(new OffenseValidator(test.state, null).validCourtDate()).toBe(test.expected)
    })
  })

  it('validates sentenced', () => {
    const tests = [
      {
        state: {
          WasCited: 'Yes',
          WasCharged: 'No',
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
          WasCited: 'Yes',
          WasCharged: 'Yes',
          WasSentenced: 'No',
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
          WasCited: 'Yes',
          WasCharged: 'Yes',
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
          WasCited: 'Yes',
          WasCharged: 'Yes',
          WasSentenced: 'No'
        },
        expected: true
      },
      {
        state: {
          WasCited: 'Yes',
          WasCharged: 'Yes',
          WasSentenced: 'Nope'
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new OffenseValidator(test.state, null).validSentenced()).toBe(test.expected)
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
          Address: {
            addressType: 'United States',
            address: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202'
          },
          WasCited: 'No'
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new OffenseValidator(test.state, null).validAddress()).toBe(test.expected)
    })
  })
})
