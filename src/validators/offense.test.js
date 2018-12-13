import OffenseValidator from './offense'
import Location from '../components/Form/Location'

describe('Offense validation', function() {
  it('validates date', () => {
    const tests = [
      {
        state: {
          Date: {
            day: '1',
            month: '1',
            year: '2016'
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
      expect(new OffenseValidator(test.state, null).validDate()).toBe(
        test.expected
      )
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
      expect(new OffenseValidator(test.state, null).validDescription()).toBe(
        test.expected
      )
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
      expect(new OffenseValidator(test.state, null).validViolence()).toBe(
        test.expected
      )
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
      expect(new OffenseValidator(test.state, null).validFirearms()).toBe(
        test.expected
      )
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
      expect(new OffenseValidator(test.state, null).validSubstances()).toBe(
        test.expected
      )
    })
  })

  it('validates address', () => {
    const tests = [
      {
        state: {
          Address: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS
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
      expect(new OffenseValidator(test.state, null).validAddress()).toBe(
        test.expected
      )
    })
  })

  it('validates if was cited', () => {
    const tests = [
      {
        state: {
          WasCited: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          WasCited: { value: 'Yes' }
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
      expect(new OffenseValidator(test.state, null).validCited()).toBe(
        test.expected
      )
    })
  })

  it('validates cited by', () => {
    const tests = [
      {
        state: {
          WasCited: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          WasCited: { value: 'Yes' },
          CitedBy: {
            value: ''
          }
        },
        expected: false
      },
      {
        state: {
          WasCited: { value: 'Yes' },
          CitedBy: {
            value: 'Somebody'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new OffenseValidator(test.state, null).validCitedBy()).toBe(
        test.expected
      )
    })
  })

  it('validates cited by', () => {
    const tests = [
      {
        state: {
          WasCited: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          WasCited: { value: 'Yes' },
          AgencyAddress: null
        },
        expected: false
      },
      {
        state: {
          WasCited: { value: 'Yes' },
          AgencyAddress: {
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
      expect(new OffenseValidator(test.state, null).validAgencyAddress()).toBe(
        test.expected
      )
    })
  })

  it('validates if was charged', () => {
    const tests = [
      {
        state: {
          WasCited: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          WasCited: { value: 'Yes' }
        },
        expected: false
      },
      {
        state: {
          WasCited: { value: 'Yes' },
          WasCharged: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          WasCited: { value: 'Yes' },
          WasCharged: { value: 'Yes' }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new OffenseValidator(test.state, null).validCharged()).toBe(
        test.expected
      )
    })
  })

  it('validates if was not charged but needs explanation', () => {
    const tests = [
      {
        state: {
          WasCited: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          WasCited: { value: 'Yes' }
        },
        expected: true
      },
      {
        state: {
          WasCited: { value: 'Yes' },
          WasCharged: { value: 'Yes' }
        },
        expected: true
      },
      {
        state: {
          WasCited: { value: 'Yes' },
          WasCharged: { value: 'No' }
        },
        expected: false
      },
      {
        state: {
          WasCited: { value: 'Yes' },
          WasCharged: { value: 'No' },
          Explanation: null
        },
        expected: false
      },
      {
        state: {
          WasCited: { value: 'Yes' },
          WasCharged: { value: 'No' },
          Explanation: {
            value: 'Some explanation'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new OffenseValidator(test.state, null).validExplanation()).toBe(
        test.expected
      )
    })
  })

  it('validates court name', () => {
    const tests = [
      {
        state: {
          WasCited: { value: 'Yes' },
          WasCharged: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          WasCited: { value: 'Yes' },
          WasCharged: { value: 'Yes' }
        },
        expected: false
      },
      {
        state: {
          WasCited: { value: 'Yes' },
          WasCharged: { value: 'Yes' },
          CourtName: {
            value: 'court name'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new OffenseValidator(test.state, null).validCourtName()).toBe(
        test.expected
      )
    })
  })

  it('validates court address', () => {
    const tests = [
      {
        state: {
          WasCited: { value: 'Yes' },
          WasCharged: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          WasCited: { value: 'Yes' },
          WasCharged: { value: 'Yes' }
        },
        expected: false
      },
      {
        state: {
          WasCited: { value: 'Yes' },
          WasCharged: { value: 'Yes' },
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
      expect(new OffenseValidator(test.state, null).validCourtAddress()).toBe(
        test.expected
      )
    })
  })

  it('validates charge type', () => {
    const tests = [
      {
        state: {
          WasCited: { value: 'Yes' },
          WasCharged: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          WasCited: { value: 'Yes' },
          WasCharged: { value: 'Yes' }
        },
        expected: false
      },
      {
        state: {
          WasCited: { value: 'Yes' },
          WasCharged: { value: 'Yes' },
          ChargeType: 'Does not exit'
        },
        expected: false
      },
      {
        state: {
          WasCited: { value: 'Yes' },
          WasCharged: { value: 'Yes' },
          ChargeType: { value: 'Felony' }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new OffenseValidator(test.state, null).validChargeType()).toBe(
        test.expected
      )
    })
  })

  it('validates court charge', () => {
    const tests = [
      {
        state: {
          WasCited: { value: 'Yes' },
          WasCharged: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          WasCited: { value: 'Yes' },
          WasCharged: { value: 'Yes' }
        },
        expected: false
      },
      {
        state: {
          WasCited: { value: 'Yes' },
          WasCharged: { value: 'Yes' },
          CourtCharge: {
            value: 'Some charge'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new OffenseValidator(test.state, null).validCourtCharge()).toBe(
        test.expected
      )
    })
  })

  it('validates court outcome', () => {
    const tests = [
      {
        state: {
          WasCited: { value: 'Yes' },
          WasCharged: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          WasCited: { value: 'Yes' },
          WasCharged: { value: 'Yes' }
        },
        expected: false
      },
      {
        state: {
          WasCited: { value: 'Yes' },
          WasCharged: { value: 'Yes' },
          CourtOutcome: {
            value: 'Some outcome'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new OffenseValidator(test.state, null).validCourtOutcome()).toBe(
        test.expected
      )
    })
  })

  it('validates court date', () => {
    const tests = [
      {
        state: {
          WasCited: { value: 'Yes' },
          WasCharged: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          WasCited: { value: 'Yes' },
          WasCharged: { value: 'Yes' }
        },
        expected: false
      },
      {
        state: {
          WasCited: { value: 'Yes' },
          WasCharged: { value: 'Yes' },
          CourtDate: {
            day: '1',
            month: '1',
            year: '2016'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new OffenseValidator(test.state, null).validCourtDate()).toBe(
        test.expected
      )
    })
  })

  it('validates sentenced', () => {
    const tests = [
      {
        state: {
          WasCited: { value: 'Yes' },
          WasCharged: { value: 'No' },
          Sentence: {
            AwaitingTrial: { value: 'Yes' },
            AwaitingTrialExplanation: 'Yes',
            ExceedsYear: { value: 'Yes' },
            Incarcerated: { value: 'Yes' },
            IncarcerationDates: {
              from: {
                month: '1',
                day: '1',
                year: '2000'
              },
              to: {
                month: '1',
                day: '1',
                year: '2004'
              },
              present: false
            },
            ProbationDates: {
              from: {
                month: '1',
                day: '1',
                year: '2000'
              },
              to: {
                month: '1',
                day: '1',
                year: '2004'
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
          WasCited: { value: 'Yes' },
          WasCharged: { value: 'Yes' },
          WasSentenced: { value: 'No' },
          Sentence: {
            AwaitingTrial: { value: 'Yes' },
            AwaitingTrialExplanation: 'Yes',
            ExceedsYear: { value: 'Yes' },
            Incarcerated: { value: 'Yes' },
            IncarcerationDates: {
              from: {
                month: '1',
                day: '1',
                year: '2000'
              },
              to: {
                month: '1',
                day: '1',
                year: '2004'
              },
              present: false
            },
            ProbationDates: {
              from: {
                month: '1',
                day: '1',
                year: '2000'
              },
              to: {
                month: '1',
                day: '1',
                year: '2004'
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
          WasCited: { value: 'Yes' },
          WasCharged: { value: 'Yes' },
          WasSentenced: { value: 'Yes' },
          Sentence: {
            AwaitingTrial: { value: 'Yes' },
            AwaitingTrialExplanation: 'Yes',
            ExceedsYear: { value: 'Yes' },
            Incarcerated: { value: 'Yes' },
            IncarcerationDates: {
              from: {
                month: '1',
                day: '1',
                year: '2000'
              },
              to: {
                month: '1',
                day: '1',
                year: '2004'
              },
              present: false
            },
            ProbationDates: {
              from: {
                month: '1',
                day: '1',
                year: '2000'
              },
              to: {
                month: '1',
                day: '1',
                year: '2004'
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
          WasCited: { value: 'Yes' },
          WasCharged: { value: 'Yes' },
          WasSentenced: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          WasCited: { value: 'Yes' },
          WasCharged: { value: 'Yes' },
          WasSentenced: { value: 'Nope' }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new OffenseValidator(test.state, null).validSentenced()).toBe(
        test.expected
      )
    })
  })

  it('validate offense object', () => {
    const tests = [
      {
        state: {
          Date: {
            day: '1',
            month: '1',
            year: '2016'
          },
          Description: {
            value: 'Some description'
          },
          InvolvedViolence: { value: 'No' },
          InvolvedFirearms: { value: 'Yes' },
          InvolvedSubstances: { value: 'No' },
          Address: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS
          },
          WasCited: { value: 'No' }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new OffenseValidator(test.state, null).validAddress()).toBe(
        test.expected
      )
    })
  })

  it('validate awaiting trial', () => {
    const tests = [
      {
        state: {
          WasSentenced: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          WasSentenced: { value: 'Yes' }
        },
        expected: true
      },
      {
        state: {
          WasSentenced: { value: 'No' },
          WasCited: { value: 'Yes' },
          WasCharged: { value: 'Yes' },
          AwaitingTrial: { value: 'Yes' },
          AwaitingTrialExplanation: {
            value: 'Trial explanation'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new OffenseValidator(test.state, null).validAwaitingTrial()).toBe(
        test.expected
      )
    })
  })

  it('validate offense', () => {
    const tests = [
      {
        state: {
          Date: {
            day: '1',
            month: '1',
            year: '2016'
          },
          Description: {
            value: 'Some description'
          },
          InvolvedViolence: { value: 'No' },
          InvolvedFirearms: { value: 'No' },
          InvolvedSubstances: { value: 'No' },
          Address: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS
          },
          WasCited: { value: 'Yes' },
          CitedBy: {
            value: 'Somebody'
          },
          WasCharged: { value: 'No' },
          Explanation: {
            value: 'Some explanation'
          },
          AgencyAddress: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS
          },
          WasSentenced: { value: 'No' },
          AwaitingTrial: { value: 'Yes' },
          AwaitingTrialExplanation: {
            value: 'Yessss'
          }
        },
        expected: true
      },
      {
        state: {
          WasSentenced: { value: 'Yes' }
        },
        expected: true
      },
      {
        state: {
          WasSentenced: { value: 'No' },
          AwaitingTrial: { value: 'Yes' },
          AwaitingTrialExplanation: null
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new OffenseValidator(test.state, null).validAwaitingTrial()).toBe(
        test.expected
      )
    })
  })
})
