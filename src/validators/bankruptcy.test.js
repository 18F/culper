import BankruptcyValidator, { BankruptcyItemValidator } from './bankruptcy'

describe('Bankruptcy component validation', function () {
  it('should validate has bankruptcy branch', function () {
    const tests = [
      {
        props: {
          HasBankruptcy: 'Yes'
        },
        expected: true
      },
      {
        props: {
          HasBankruptcy: 'No'
        },
        expected: true
      },
      {
        props: {
          HasBankruptcy: ''
        },
        expected: false
      },
      {
        props: {
          HasBankruptcy: 'Nope'
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new BankruptcyValidator(null, test.props).validHasBankruptcy()).toBe(test.expected)
    })
  })

  it('should validate bankruptcy items', function () {
    const tests = [
      {
        props: {
          HasBankruptcy: 'Yes',
          List: [],
          ListBranch: 'No'
        },
        expected: false
      },
      {
        props: {
          HasBankruptcy: 'No',
          List: [],
          ListBranch: 'No'
        },
        expected: true
      },
      {
        props: {
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
          ],
          ListBranch: 'No'
        },
        expected: true
      },
      {
        props: {
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
          ],
          ListBranch: 'No'
        },
        expected: true
      },
      {
        props: {
          HasBankruptcy: 'Yes',
          List: [
            {
              Bankruptcy: {
                PetitionType: 'Hello'
              }
            }
          ],
          ListBranch: 'No'
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new BankruptcyValidator(null, test.props).isValid()).toBe(test.expected)
    })
  })

  it('should validate bankruptcy petition type', function () {
    const tests = [
      {
        props: {
          PetitionType: 'Chapter7'
        },
        expected: true
      },
      {
        props: {
          PetitionType: null
        },
        expected: false
      },
      {
        props: {
          PetitionType: ''
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new BankruptcyItemValidator(null, test.props).validPetitionType()).toBe(test.expected)
    })
  })

  it('should validate bankruptcy court address', function () {
    const tests = [
      {
        props: {
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
        props: {
          CourtAddress: null
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new BankruptcyItemValidator(null, test.props).validCourtAddress()).toBe(test.expected)
    })
  })

  it('should validate bankruptcy court involved', function () {
    const tests = [
      {
        props: {
          CourtInvolved: {
            value: 'Some Sourt'
          }
        },
        expected: true
      },
      {
        props: {
          CourtInvolved: null
        },
        expected: false
      },
      {
        props: {
          CourtInvolved: {
            value: ''
          }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new BankruptcyItemValidator(null, test.props).validCourtInvolved()).toBe(test.expected)
    })
  })

  it('should validate bankruptcy court number', function () {
    const tests = [
      {
        props: {
          CourtNumber: {
            value: 'A12234'
          }
        },
        expected: true
      },
      {
        props: {
          CourtNumber: null
        },
        expected: false
      },
      {
        props: {
          CourtNumber: {
            value: ''
          }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new BankruptcyItemValidator(null, test.props).validCourtNumber()).toBe(test.expected)
    })
  })

  it('should validate bankruptcy total amount number', function () {
    const tests = [
      {
        props: {
          TotalAmount: {
            value: 100
          }
        },
        expected: true
      },
      {
        props: {
          TotalAmount: null
        },
        expected: false
      },
      {
        props: {
          TotalAmount: {
            value: ''
          }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new BankruptcyItemValidator(null, test.props).validTotalAmount()).toBe(test.expected)
    })
  })

  it('should validate bankruptcy date filed', function () {
    const tests = [
      {
        props: {
          DateFiled: {
            month: 1,
            year: 2010
          }
        },
        expected: true
      },
      {
        props: {
          DateFiled: null
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new BankruptcyItemValidator(null, test.props).validDateFiled()).toBe(test.expected)
    })
  })

  it('should validate bankruptcy date discharged', function () {
    const tests = [
      {
        props: {
          DateDischarged: {
            month: 1,
            year: 2010
          }
        },
        expected: true
      },
      {
        props: {
          DateDischarged: null
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new BankruptcyItemValidator(null, test.props).validDateDischarged()).toBe(test.expected)
    })
  })

  it('should validate entire bankruptcy item', function () {
    const tests = [
      {
        props: {
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
      expect(new BankruptcyItemValidator(null, test.props).isValid()).toBe(test.expected)
    })
  })

  it('should validate petition types', function () {
    const tests = [
      {
        props: {
          PetitionType: 'Chapter7'
        },
        expected: true
      },
      {
        props: {
          PetitionType: 'Chapter11'
        },
        expected: true
      },
      {
        props: {
          PetitionType: 'Chapter12'
        },
        expected: true
      },
      {
        props: {
          PetitionType: 'Chapter100'
        },
        expected: false
      },
      {
        props: {
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
      expect(new BankruptcyItemValidator(null, test.props).validPetitionType()).toBe(test.expected)
    })
  })
})
