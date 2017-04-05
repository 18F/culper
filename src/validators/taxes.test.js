import TaxesValidator, { TaxValidator } from './taxes'

describe('taxes component validation', function () {
  it('validate failures', () => {
    const tests = [
      {
        state: {
          Failure: ''
        },
        expected: false
      },
      {
        state: {
          Failure: 'File'
        },
        expected: true
      },
      {
        state: {
          Failure: 'Pay'
        },
        expected: true
      },
      {
        state: {
          Failure: 'Both'
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new TaxValidator(test.state, null).validFailure()).toBe(test.expected)
    })
  })

  it('validate year', () => {
    const tests = [
      {
        state: {
          Year: {
            value: ''
          }
        },
        expected: false
      },
      {
        state: {
          Year: {
            value: '0'
          }
        },
        expected: false
      },
      {
        state: {
          Year: {
            value: 'abc'
          }
        },
        expected: false
      },
      {
        state: {
          Year: {
            value: '2000'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new TaxValidator(test.state, null).validYear()).toBe(test.expected)
    })
  })

  it('validate reason', () => {
    const tests = [
      {
        state: {
          Reason: {
            value: ''
          }
        },
        expected: false
      },
      {
        state: {
          Reason: {
            value: 'Completely forgot'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new TaxValidator(test.state, null).validReason()).toBe(test.expected)
    })
  })

  it('validate agency', () => {
    const tests = [
      {
        state: {
          Agency: {
            value: ''
          }
        },
        expected: false
      },
      {
        state: {
          Agency: {
            value: 'IRS'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new TaxValidator(test.state, null).validAgency()).toBe(test.expected)
    })
  })

  it('validate tax type', () => {
    const tests = [
      {
        state: {
          TaxType: {
            value: ''
          }
        },
        expected: false
      },
      {
        state: {
          TaxType: {
            value: 'Income'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new TaxValidator(test.state, null).validTaxType()).toBe(test.expected)
    })
  })

  it('validate amount', () => {
    const tests = [
      {
        state: {
          Amount: {
            value: ''
          }
        },
        expected: false
      },
      {
        state: {
          Amount: {
            value: 'abc'
          }
        },
        expected: false
      },
      {
        state: {
          Amount: {
            value: '0'
          }
        },
        expected: false
      },
      {
        state: {
          Amount: {
            value: '20000'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new TaxValidator(test.state, null).validAmount()).toBe(test.expected)
    })
  })

  it('validate date', () => {
    const tests = [
      {
        state: {
          DateNotApplicable: {
            applicable: true
          },
          Date: {
            day: '1',
            month: '1',
            year: '2016',
            date: new Date('1/1/2016'),
            present: false
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
            date: new Date('1/1/2016'),
            present: false
          }
        },
        expected: true
      },
      {
        state: {
          DateNotApplicable: {
            applicable: false
          },
          Date: null
        },
        expected: true
      },
      {
        state: {
          DateNotApplicable: {
            applicable: true
          },
          Date: null
        },
        expected: false
      },
      {
        state: {
          Date: null
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new TaxValidator(test.state, null).validDate()).toBe(test.expected)
    })
  })

  it('validate description', () => {
    const tests = [
      {
        state: {
          Description: {
            value: ''
          }
        },
        expected: false
      },
      {
        state: {
          Description: {
            value: 'The description'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new TaxValidator(test.state, null).validDescription()).toBe(test.expected)
    })
  })

  it('validate branch', () => {
    const tests = [
      {
        state: {
          HasTaxes: ''
        },
        expected: false
      },
      {
        state: {
          HasTaxes: 'Unicorn'
        },
        expected: false
      },
      {
        state: {
          HasTaxes: 'No'
        },
        expected: true
      },
      {
        state: {
          HasTaxes: 'Yes'
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new TaxesValidator(test.state, null).validHasTaxes()).toBe(test.expected)
    })
  })

  it('validate items', () => {
    const tests = [
      {
        state: {
          HasTaxes: 'No',
          List: []
        },
        expected: true
      },
      {
        state: {
          HasTaxes: 'Yes',
          List: []
        },
        expected: false
      },
      {
        state: {
          HasTaxes: 'Yes',
          List: [{}]
        },
        expected: false
      },
      {
        state: {
          HasTaxes: 'Yes',
          List: [
            {
              Failure: 'File',
              Year: {
                value: '2000'
              },
              Reason: {
                value: 'Completely forgot'
              },
              Agency: {
                value: 'IRS'
              },
              TaxType: {
                value: 'Income'
              },
              Amount: {
                value: '20000'
              },
              DateNotApplicable: {
                applicable: true
              },
              Date: {
                day: '1',
                month: '1',
                year: '2016',
                date: new Date('1/1/2016'),
                present: false
              },
              Description: {
                value: 'The description'
              }
            }
          ]
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new TaxesValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
