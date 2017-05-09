import BankruptcyValidator, { BankruptcyItemValidator } from './bankruptcy'

describe('Bankruptcy component validation', function () {
  it('should validate has bankruptcy branch', function () {
    const tests = [
      {
        state: {
          HasBankruptcy: 'Yes'
        },
        expected: true
      },
      {
        state: {
          HasBankruptcy: 'No'
        },
        expected: true
      },
      {
        state: {
          HasBankruptcy: ''
        },
        expected: false
      },
      {
        state: {
          HasBankruptcy: 'Nope'
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new BankruptcyValidator(test.state, null).validHasBankruptcy()).toBe(test.expected)
    })
  })

  it('should validate bankruptcy items', function () {
    const tests = [
      {
        state: {
          HasBankruptcy: 'Yes',
          List: []
        },
        expected: false
      },
      {
        state: {
          HasBankruptcy: 'No',
          List: []
        },
        expected: true
      },
      {
        state: {
          HasBankruptcy: 'Yes',
          List: [
            {
              Bankruptcy: {
                PetitionType: 'Chapter7',
                CourtAddress: {
                  addressType: 'United States',
                  address: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'Virginia',
                  zipcode: '22202'
                },
                CourtInvolved: {
                  value: 'Some Court'
                },
                CourtNumber: {
                  value: 'C1234'
                },
                DateFiled: {
                  month: 1,
                  year: 2010
                },
                DateDischarged: {
                  month: 1,
                  year: 2012
                },
                NameDebt: {
                  first: 'Foo',
                  firstInitialOnly: false,
                  middle: 'J',
                  middleInitialOnly: true,
                  noMiddleName: false,
                  last: 'Bar',
                  lastInitialOnly: false,
                  suffix: 'Jr'
                },
                TotalAmount: {
                  value: 200
                },
                HasDischargeExplanation: 'Yes',
                DischargeExplanation: {
                  value: 'Something'
                }
              }
            }
          ]
        },
        expected: true
      },
      {
        state: {
          HasBankruptcy: 'Yes',
          List: [
            {
              Bankruptcy: {
                PetitionType: 'Chapter7',
                CourtAddress: {
                  addressType: 'United States',
                  address: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'Virginia',
                  zipcode: '22202'
                },
                CourtInvolved: {
                  value: 'Some Court'
                },
                CourtNumber: {
                  value: 'C1234'
                },
                DateFiled: {
                  month: 1,
                  year: 2010
                },
                DateDischargedNotApplicable: {
                  applicable: false
                },
                NameDebt: {
                  first: 'Foo',
                  firstInitialOnly: false,
                  middle: 'J',
                  middleInitialOnly: true,
                  noMiddleName: false,
                  last: 'Bar',
                  lastInitialOnly: false,
                  suffix: 'Jr'
                },
                TotalAmount: {
                  value: 200
                },
                HasDischargeExplanation: 'Yes',
                DischargeExplanation: {
                  value: 'Something'
                }
              }
            }
          ]
        },
        expected: true
      },
      {
        state: {
          HasBankruptcy: 'Yes',
          List: [
            {
              Bankruptcy: {
                PetitionType: 'Hello'
              }
            }
          ]
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new BankruptcyValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })

  it('should validate bankruptcy petition type', function () {
    const tests = [
      {
        state: {
          PetitionType: 'Chapter7'
        },
        expected: true
      },
      {
        state: {
          PetitionType: null
        },
        expected: false
      },
      {
        state: {
          PetitionType: ''
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new BankruptcyItemValidator(test.state, null).validPetitionType()).toBe(test.expected)
    })
  })

  it('should validate bankruptcy court address', function () {
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
      },
      {
        state: {
          CourtAddress: null
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new BankruptcyItemValidator(test.state, null).validCourtAddress()).toBe(test.expected)
    })
  })

  it('should validate bankruptcy court involved', function () {
    const tests = [
      {
        state: {
          CourtInvolved: {
            value: 'Some Sourt'
          }
        },
        expected: true
      },
      {
        state: {
          CourtInvolved: null
        },
        expected: false
      },
      {
        state: {
          CourtInvolved: {
            value: ''
          }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new BankruptcyItemValidator(test.state, null).validCourtInvolved()).toBe(test.expected)
    })
  })

  it('should validate bankruptcy court number', function () {
    const tests = [
      {
        state: {
          CourtNumber: {
            value: 'A12234'
          }
        },
        expected: true
      },
      {
        state: {
          CourtNumber: null
        },
        expected: false
      },
      {
        state: {
          CourtNumber: {
            value: ''
          }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new BankruptcyItemValidator(test.state, null).validCourtNumber()).toBe(test.expected)
    })
  })

  it('should validate bankruptcy total amount number', function () {
    const tests = [
      {
        state: {
          TotalAmount: {
            value: 100
          }
        },
        expected: true
      },
      {
        state: {
          TotalAmount: null
        },
        expected: false
      },
      {
        state: {
          TotalAmount: {
            value: ''
          }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new BankruptcyItemValidator(test.state, null).validTotalAmount()).toBe(test.expected)
    })
  })

  it('should validate bankruptcy date filed', function () {
    const tests = [
      {
        state: {
          DateFiled: {
            month: 1,
            year: 2010
          }
        },
        expected: true
      },
      {
        state: {
          DateFiled: null
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new BankruptcyItemValidator(test.state, null).validDateFiled()).toBe(test.expected)
    })
  })

  it('should validate bankruptcy date discharged', function () {
    const tests = [
      {
        state: {
          DateDischarged: {
            month: 1,
            year: 2010
          }
        },
        expected: true
      },
      {
        state: {
          DateDischarged: null
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new BankruptcyItemValidator(test.state, null).validDateDischarged()).toBe(test.expected)
    })
  })

  it('should validate entire bankruptcy item', function () {
    const tests = [
      {
        state: {
          PetitionType: 'Chapter7',
          CourtAddress: {
            addressType: 'United States',
            address: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202'
          },
          NameDebt: {
            first: 'Foo',
            firstInitialOnly: false,
            middle: 'J',
            middleInitialOnly: true,
            noMiddleName: false,
            last: 'Bar',
            lastInitialOnly: false,
            suffix: 'Jr'
          },
          CourtInvolved: {
            value: 'Some Sourt'
          },
          CourtNumber: {
            value: 'A12234'
          },
          TotalAmount: {
            value: 100
          },
          DateFiled: {
            month: 1,
            year: 2010
          },
          DateDischarged: {
            month: 1,
            year: 2010
          },
          HasDischargeExplanation: 'Yes',
          DischargeExplanation: {
            value: 'Something'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new BankruptcyItemValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })

  it('should validate petition types', function () {
    const tests = [
      {
        state: {
          PetitionType: 'Chapter7'
        },
        expected: true
      },
      {
        state: {
          PetitionType: 'Chapter11'
        },
        expected: true
      },
      {
        state: {
          PetitionType: 'Chapter12'
        },
        expected: true
      },
      {
        state: {
          PetitionType: 'Chapter100'
        },
        expected: false
      },
      {
        state: {
          PetitionType: 'Chapter13',
          TrusteeAddress: {
            addressType: 'United States',
            address: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202'
          },
          Trustee: {
            value: 'John Doe'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new BankruptcyItemValidator(test.state, null).validPetitionType()).toBe(test.expected)
    })
  })
})
