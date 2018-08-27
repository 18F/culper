import BankruptcyValidator, { BankruptcyItemValidator } from './bankruptcy'
import Location from '../components/Form/Location'

describe('Bankruptcy component validation', function() {
  it('should validate has bankruptcy branch', function() {
    const tests = [
      {
        props: {
          HasBankruptcy: { value: 'Yes' }
        },
        expected: true
      },
      {
        props: {
          HasBankruptcy: { value: 'No' }
        },
        expected: true
      },
      {
        props: {
          HasBankruptcy: { value: '' }
        },
        expected: false
      },
      {
        props: {
          HasBankruptcy: { value: 'Nope' }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new BankruptcyValidator(test.props).validHasBankruptcy()).toBe(
        test.expected
      )
    })
  })

  it('should validate bankruptcy items', function() {
    const tests = [
      {
        props: {
          HasBankruptcy: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: []
          }
        },
        expected: false
      },
      {
        props: {
          HasBankruptcy: { value: 'No' },
          List: {
            branch: { value: 'No' },
            items: []
          }
        },
        expected: true
      },
      {
        props: {
          HasBankruptcy: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  PetitionType: {
                    value: 'Chapter7'
                  },
                  CourtAddress: {
                    country: { value: 'United States' },
                    street: '1234 Some Rd',
                    city: 'Arlington',
                    state: 'VA',
                    zipcode: '22202',
                    layout: Location.ADDRESS
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
                  HasDischargeExplanation: { value: 'Yes' },
                  DischargeExplanation: {
                    value: 'Something'
                  }
                }
              }
            ]
          }
        },
        expected: true
      },
      {
        props: {
          HasBankruptcy: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  PetitionType: {
                    value: 'Chapter7'
                  },
                  CourtAddress: {
                    country: { value: 'United States' },
                    street: '1234 Some Rd',
                    city: 'Arlington',
                    state: 'VA',
                    zipcode: '22202',
                    layout: Location.ADDRESS
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
                  HasDischargeExplanation: { value: 'Yes' },
                  DischargeExplanation: {
                    value: 'Something'
                  }
                }
              }
            ]
          }
        },
        expected: true
      },
      {
        props: {
          HasBankruptcy: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  PetitionType: {
                    value: 'Hello'
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
      expect(new BankruptcyValidator(test.props).isValid()).toBe(test.expected)
    })
  })

  it('should validate bankruptcy petition type', function() {
    const tests = [
      {
        props: {
          PetitionType: {
            value: 'Chapter7'
          }
        },
        expected: true
      },
      {
        props: {
          PetitionType: {
            value: null
          }
        },
        expected: false
      },
      {
        props: {
          PetitionType: {
            value: ''
          }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new BankruptcyItemValidator(test.props).validPetitionType()).toBe(
        test.expected
      )
    })
  })

  it('should validate bankruptcy court address', function() {
    const tests = [
      {
        props: {
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
      },
      {
        props: {
          CourtAddress: null
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new BankruptcyItemValidator(test.props).validCourtAddress()).toBe(
        test.expected
      )
    })
  })

  it('should validate bankruptcy court involved', function() {
    const tests = [
      {
        props: {
          CourtInvolved: {
            value: 'Some Court'
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
      expect(new BankruptcyItemValidator(test.props).validCourtInvolved()).toBe(
        test.expected
      )
    })
  })

  it('should validate bankruptcy court number', function() {
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
      expect(new BankruptcyItemValidator(test.props).validCourtNumber()).toBe(
        test.expected
      )
    })
  })

  it('should validate bankruptcy total amount number', function() {
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
      expect(new BankruptcyItemValidator(test.props).validTotalAmount()).toBe(
        test.expected
      )
    })
  })

  it('should validate bankruptcy date filed', function() {
    const tests = [
      {
        props: {
          DateFiled: {
            month: '1',
            year: '2010'
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
      expect(new BankruptcyItemValidator(test.props).validDateFiled()).toBe(
        test.expected
      )
    })
  })

  it('should validate bankruptcy date discharged', function() {
    const tests = [
      {
        props: {
          DateDischarged: {
            month: '1',
            year: '2010'
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
      expect(
        new BankruptcyItemValidator(test.props).validDateDischarged()
      ).toBe(test.expected)
    })
  })

  it('should validate entire bankruptcy item', function() {
    const tests = [
      {
        props: {
          PetitionType: {
            value: 'Chapter7'
          },
          CourtAddress: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS
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
            month: '1',
            year: '2010'
          },
          DateDischarged: {
            month: '1',
            year: '2010'
          },
          HasDischargeExplanation: { value: 'Yes' },
          DischargeExplanation: {
            value: 'Something'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new BankruptcyItemValidator(test.props).isValid()).toBe(
        test.expected
      )
    })
  })

  it('should validate petition types', function() {
    const tests = [
      {
        props: {
          PetitionType: {
            value: 'Chapter7'
          }
        },
        expected: true
      },
      {
        props: {
          PetitionType: {
            value: 'Chapter11'
          }
        },
        expected: true
      },
      {
        props: {
          PetitionType: {
            value: 'Chapter12'
          }
        },
        expected: true
      },
      {
        props: {
          PetitionType: {
            value: 'Chapter100'
          }
        },
        expected: false
      },
      {
        props: {
          PetitionType: {
            value: 'Chapter13'
          },
          TrusteeAddress: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS
          },
          Trustee: {
            value: 'John Doe'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new BankruptcyItemValidator(test.props).validPetitionType()).toBe(
        test.expected
      )
    })
  })
})
