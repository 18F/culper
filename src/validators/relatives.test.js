import RelativesValidator, { RelativeValidator } from './relatives'

describe('Relatives validation', function () {
  it('validate initial relations', () => {
    const tests = [
      {
        state: {
          Relations: [],
          List: []
        },
        expected: false
      },
      {
        state: {
          Relations: ['Mother'],
          List: []
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new RelativesValidator(test.state, null).validRelations()).toBe(test.expected)
    })
  })

  it('validate relative relationship', () => {
    const tests = [
      {
        state: {
          Relations: []
        },
        expected: false
      },
      {
        state: {
          Relations: ['Mother']
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new RelativeValidator(test.state, null).validRelations()).toBe(test.expected)
    })
  })

  it('validate relative name', () => {
    const tests = [
      {
        state: {
        },
        expected: false
      },
      {
        state: {
          Name: {}
        },
        expected: false
      },
      {
        state: {
          Name: {
            first: 'Foo',
            firstInitialOnly: false,
            middle: 'J',
            middleInitialOnly: true,
            noMiddleName: false,
            last: 'Bar',
            lastInitialOnly: false,
            suffix: 'Jr'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new RelativeValidator(test.state, null).validName()).toBe(test.expected)
    })
  })

  it('validate relative birth date', () => {
    const tests = [
      {
        state: {
        },
        expected: false
      },
      {
        state: {
          Birthdate: {}
        },
        expected: false
      },
      {
        state: {
          Birthdate: {
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
      expect(new RelativeValidator(test.state, null).validBirthdate()).toBe(test.expected)
    })
  })

  it('validate relative birth place', () => {
    const tests = [
      {
        state: {
        },
        expected: false
      },
      {
        state: {
          Birthplace: {}
        },
        expected: false
      },
      {
        state: {
          Birthplace: {
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
      expect(new RelativeValidator(test.state, null).validBirthplace()).toBe(test.expected)
    })
  })

  it('validate relative citizenship', () => {
    const tests = [
      {
        state: {
        },
        expected: false
      },
      {
        state: {
          Citizenship: []
        },
        expected: false
      },
      {
        state: {
          Citizenship: ['United States']
        },
        expected: true
      },
      {
        state: {
          Citizenship: ['United States', 'Germany']
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new RelativeValidator(test.state, null).validCitizenship()).toBe(test.expected)
    })
  })

  it('validate relative maiden name', () => {
    const tests = [
      {
        state: {
        },
        expected: false
      },
      {
        state: {
          MaidenName: {}
        },
        expected: false
      },
      {
        state: {
          MaidenName: {
            value: 'Nunyabusiness'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new RelativeValidator(test.state, null).validMaidenName()).toBe(test.expected)
    })
  })

  it('validate aliases', () => {
    const tests = [
      {
        state: {
        },
        expected: false
      },
      {
        state: {
          Aliases: []
        },
        expected: false
      },
      {
        state: {
          Aliases: [
            {
              Has: 'No'
            }
          ]
        },
        expected: true
      },
      {
        state: {
          Aliases: [
            {
              Has: 'Yes'
            }
          ]
        },
        expected: false
      },
      {
        state: {
          Aliases: [
            {
              Has: 'Yes',
              Item: {
                Name: {
                  first: 'Foo',
                  firstInitialOnly: false,
                  middle: 'J',
                  middleInitialOnly: true,
                  noMiddleName: false,
                  last: 'Bar',
                  lastInitialOnly: false,
                  suffix: 'Jr'
                },
                MaidenName: 'No',
                Dates: {
                  from: {
                    date: new Date('1/1/2010')
                  },
                  to: {
                    date: new Date('1/1/2012')
                  },
                  present: false
                }
              }
            }
          ]
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new RelativeValidator(test.state, null).validAliases()).toBe(test.expected)
    })
  })

  it('validate relative is deceased', () => {
    const tests = [
      {
        state: {
        },
        expected: false
      },
      {
        state: {
          IsDeceased: ''
        },
        expected: false
      },
      {
        state: {
          IsDeceased: 'No'
        },
        expected: true
      },
      {
        state: {
          IsDeceased: 'Yes'
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new RelativeValidator(test.state, null).validIsDeceased()).toBe(test.expected)
    })
  })

  it('validate relative is not deceased and has address', () => {
    const tests = [
      {
        state: {
        },
        expected: false
      },
      {
        state: {
          IsDeceased: 'No'
        },
        expected: true
      },
      {
        state: {
          IsDeceased: 'Yes',
          Address: {}
        },
        expected: false
      },
      {
        state: {
          IsDeceased: 'Yes',
          Address: {
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
      expect(new RelativeValidator(test.state, null).validAddress()).toBe(test.expected)
    })
  })

  it('validate relative requires citizenship documentation abroad', () => {
    const tests = [
      {
        state: {
          Relations: ['Father'],
          IsDeceased: 'Yes'
        },
        expected: true
      },
      {
        state: {
          Relations: ['Father'],
          IsDeceased: 'No'
        },
        expected: true
      },
      {
        state: {
          Relations: ['Father'],
          Citizenship: ['United States'],
          Birthplace: {
            addressType: 'United States',
            address: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202'
          },
          IsDeceased: 'No',
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
          Relations: ['Father'],
          Citizenship: ['United States'],
          Birthplace: {
            addressType: 'International',
            address: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany'
          },
          IsDeceased: 'No',
          Address: {
            addressType: 'International',
            address: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany'
          },
          Abroad: ''
        },
        expected: false
      },
      {
        state: {
          Relations: ['Father'],
          Citizenship: ['United States'],
          Birthplace: {
            addressType: 'International',
            address: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany'
          },
          IsDeceased: 'No',
          Address: {
            addressType: 'International',
            address: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany'
          },
          Abroad: 'FS'
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new RelativeValidator(test.state, null).validAbroad()).toBe(test.expected)
    })
  })

  it('validate relative requires citizenship documentation naturalization', () => {
    const tests = [
      {
        state: {
          Relations: ['Father'],
          IsDeceased: 'Yes'
        },
        expected: true
      },
      {
        state: {
          Relations: ['Father'],
          IsDeceased: 'No'
        },
        expected: true
      },
      {
        state: {
          Relations: ['Father'],
          Citizenship: ['United States'],
          Birthplace: {
            addressType: 'United States',
            address: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202'
          },
          IsDeceased: 'No',
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
          Relations: ['Father'],
          Citizenship: ['United States'],
          Birthplace: {
            addressType: 'International',
            address: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany'
          },
          IsDeceased: 'No',
          Address: {
            addressType: 'International',
            address: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany'
          },
          Naturalized: ''
        },
        expected: false
      },
      {
        state: {
          Relations: ['Father'],
          Citizenship: ['United States'],
          Birthplace: {
            addressType: 'International',
            address: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany'
          },
          IsDeceased: 'No',
          Address: {
            addressType: 'International',
            address: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany'
          },
          Naturalized: 'Alien'
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new RelativeValidator(test.state, null).validNaturalized()).toBe(test.expected)
    })
  })

  it('validate relative requires citizenship documentation derived', () => {
    const tests = [
      {
        state: {
          Relations: ['Father'],
          IsDeceased: 'Yes'
        },
        expected: true
      },
      {
        state: {
          Relations: ['Father'],
          IsDeceased: 'No'
        },
        expected: true
      },
      {
        state: {
          Relations: ['Father'],
          Citizenship: ['United States'],
          Birthplace: {
            addressType: 'United States',
            address: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202'
          },
          IsDeceased: 'No',
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
          Relations: ['Father'],
          Citizenship: ['United States'],
          Birthplace: {
            addressType: 'International',
            address: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany'
          },
          IsDeceased: 'No',
          Address: {
            addressType: 'International',
            address: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany'
          },
          Derived: ''
        },
        expected: false
      },
      {
        state: {
          Relations: ['Father'],
          Citizenship: ['United States'],
          Birthplace: {
            addressType: 'International',
            address: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany'
          },
          IsDeceased: 'No',
          Address: {
            addressType: 'International',
            address: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany'
          },
          Derived: 'Alien'
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new RelativeValidator(test.state, null).validDerived()).toBe(test.expected)
    })
  })

  it('validate relative requires citizenship documentation document number', () => {
    const tests = [
      {
        state: {
          Relations: ['Father'],
          IsDeceased: 'Yes'
        },
        expected: true
      },
      {
        state: {
          Relations: ['Father'],
          IsDeceased: 'No'
        },
        expected: true
      },
      {
        state: {
          Relations: ['Father'],
          Citizenship: ['United States'],
          Birthplace: {
            addressType: 'United States',
            address: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202'
          },
          IsDeceased: 'No',
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
          Relations: ['Father'],
          Citizenship: ['United States'],
          Birthplace: {
            addressType: 'International',
            address: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany'
          },
          IsDeceased: 'No',
          Address: {
            addressType: 'International',
            address: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany'
          },
          DocumentNumber: {}
        },
        expected: false
      },
      {
        state: {
          Relations: ['Father'],
          Citizenship: ['United States'],
          Birthplace: {
            addressType: 'International',
            address: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany'
          },
          IsDeceased: 'No',
          Address: {
            addressType: 'International',
            address: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany'
          },
          DocumentNumber: {
            value: '0000000000000'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new RelativeValidator(test.state, null).validDocumentNumber()).toBe(test.expected)
    })
  })

  it('validate relative requires citizenship documentation court name', () => {
    const tests = [
      {
        state: {
          Relations: ['Father'],
          IsDeceased: 'Yes'
        },
        expected: true
      },
      {
        state: {
          Relations: ['Father'],
          IsDeceased: 'No'
        },
        expected: true
      },
      {
        state: {
          Relations: ['Father'],
          IsDeceased: 'No',
          Citizenship: ['United States'],
          Birthplace: {
            addressType: 'United States',
            address: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202'
          },
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
          Relations: ['Father'],
          Citizenship: ['United States'],
          Birthplace: {
            addressType: 'International',
            address: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany'
          },
          IsDeceased: 'No',
          Address: {
            addressType: 'International',
            address: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany'
          },
          CourtName: {}
        },
        expected: false
      },
      {
        state: {
          Relations: ['Father'],
          Citizenship: ['United States'],
          Birthplace: {
            addressType: 'International',
            address: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany'
          },
          IsDeceased: 'No',
          Address: {
            addressType: 'International',
            address: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany'
          },
          CourtName: {
            value: 'Court name'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new RelativeValidator(test.state, null).validCourtName()).toBe(test.expected)
    })
  })

  it('validate relative requires citizenship documentation court address', () => {
    const tests = [
      {
        state: {
          Relations: ['Father'],
          IsDeceased: 'Yes'
        },
        expected: true
      },
      {
        state: {
          Relations: ['Father'],
          IsDeceased: 'No'
        },
        expected: true
      },
      {
        state: {
          Relations: ['Father'],
          Citizenship: ['United States'],
          Birthplace: {
            addressType: 'United States',
            address: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202'
          },
          IsDeceased: 'No',
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
          Relations: ['Father'],
          Citizenship: ['United States'],
          Birthplace: {
            addressType: 'International',
            address: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany'
          },
          IsDeceased: 'No',
          Address: {
            addressType: 'International',
            address: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany'
          },
          CourtAddress: {}
        },
        expected: false
      },
      {
        state: {
          Relations: ['Father'],
          Citizenship: ['United States'],
          Birthplace: {
            addressType: 'International',
            address: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany'
          },
          IsDeceased: 'No',
          Address: {
            addressType: 'International',
            address: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany'
          },
          CourtAddress: {
            addressType: 'International',
            address: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new RelativeValidator(test.state, null).validCourtAddress()).toBe(test.expected)
    })
  })

  it('validate relative not a citizen and has document', () => {
    const tests = [
      {
        state: {
          Relations: ['Father'],
          IsDeceased: 'Yes'
        },
        expected: true
      },
      {
        state: {
          Relations: ['Father'],
          Citizenship: ['United States'],
          IsDeceased: 'No'
        },
        expected: true
      },
      {
        state: {
          Relations: ['Father'],
          Citizenship: ['Germany'],
          IsDeceased: 'No',
          Document: ''
        },
        expected: false
      },
      {
        state: {
          Relations: ['Father'],
          Citizenship: ['Germany'],
          IsDeceased: 'No',
          Document: 'Employment'
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new RelativeValidator(test.state, null).validDocument()).toBe(test.expected)
    })
  })

  it('validate relative not a citizen and has residence document number', () => {
    const tests = [
      {
        state: {
          Relations: ['Father'],
          IsDeceased: 'Yes'
        },
        expected: true
      },
      {
        state: {
          Relations: ['Father'],
          Citizenship: ['United States'],
          IsDeceased: 'No'
        },
        expected: true
      },
      {
        state: {
          Relations: ['Father'],
          Citizenship: ['Germany'],
          IsDeceased: 'No',
          ResidenceDocumentNumber: {}
        },
        expected: false
      },
      {
        state: {
          Relations: ['Father'],
          Citizenship: ['Germany'],
          IsDeceased: 'No',
          ResidenceDocumentNumber: {
            value: '000000000'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new RelativeValidator(test.state, null).validResidenceDocumentNumber()).toBe(test.expected)
    })
  })

  it('validate relative not a citizen and has expiration', () => {
    const tests = [
      {
        state: {
          Relations: ['Father'],
          IsDeceased: 'Yes'
        },
        expected: true
      },
      {
        state: {
          Relations: ['Father'],
          Citizenship: ['United States'],
          IsDeceased: 'No'
        },
        expected: true
      },
      {
        state: {
          Relations: ['Father'],
          Citizenship: ['Germany'],
          IsDeceased: 'No',
          Expiration: {}
        },
        expected: false
      },
      {
        state: {
          Relations: ['Father'],
          Citizenship: ['Germany'],
          IsDeceased: 'No',
          Expiration: {
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
      expect(new RelativeValidator(test.state, null).validExpiration()).toBe(test.expected)
    })
  })

  it('validate relative does not live within the U.S. first contact', () => {
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
          Address: {
            addressType: 'International',
            address: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany'
          },
          FirstContact: {}
        },
        expected: false
      },
      {
        state: {
          Address: {
            addressType: 'International',
            address: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany'
          },
          FirstContact: {
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
      expect(new RelativeValidator(test.state, null).validFirstContact()).toBe(test.expected)
    })
  })

  it('validate relative does not live within the U.S. last contact', () => {
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
          Address: {
            addressType: 'International',
            address: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany'
          },
          LastContact: {}
        },
        expected: false
      },
      {
        state: {
          Address: {
            addressType: 'International',
            address: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany'
          },
          LastContact: {
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
      expect(new RelativeValidator(test.state, null).validLastContact()).toBe(test.expected)
    })
  })

  it('validate relative does not live within the U.S. correspondence methods', () => {
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
          Address: {
            addressType: 'International',
            address: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany'
          },
          Methods: []
        },
        expected: false
      },
      {
        state: {
          Address: {
            addressType: 'International',
            address: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany'
          },
          Methods: ['In person', 'Electronic']
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new RelativeValidator(test.state, null).validMethods()).toBe(test.expected)
    })
  })

  it('validate relative does not live within the U.S. correspondence frequency', () => {
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
          Address: {
            addressType: 'International',
            address: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany'
          },
          Frequency: ''
        },
        expected: false
      },
      {
        state: {
          Address: {
            addressType: 'International',
            address: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany'
          },
          Frequency: 'Daily'
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new RelativeValidator(test.state, null).validFrequency()).toBe(test.expected)
    })
  })

  it('validate relative does not live within the U.S. employer name', () => {
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
          Address: {
            addressType: 'International',
            address: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany'
          },
          Employer: {}
        },
        expected: false
      },
      {
        state: {
          Address: {
            addressType: 'International',
            address: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany'
          },
          Employer: {
            value: 'ACME'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new RelativeValidator(test.state, null).validEmployer()).toBe(test.expected)
    })
  })

  it('validate relative does not live within the U.S. employer address', () => {
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
          Address: {
            addressType: 'International',
            address: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany'
          },
          EmployerAddress: {}
        },
        expected: false
      },
      {
        state: {
          Address: {
            addressType: 'International',
            address: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany'
          },
          EmployerAddress: {
            addressType: 'International',
            address: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new RelativeValidator(test.state, null).validEmployerAddress()).toBe(test.expected)
    })
  })

  it('validate relative does not live within the U.S. employer relationship', () => {
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
          Address: {
            addressType: 'International',
            address: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany'
          },
          HasAffiliation: ''
        },
        expected: false
      },
      {
        state: {
          Address: {
            addressType: 'International',
            address: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany'
          },
          HasAffiliation: 'No'
        },
        expected: true
      },
      {
        state: {
          Address: {
            addressType: 'International',
            address: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany'
          },
          HasAffiliation: 'Yes',
          EmployerRelationship: {}
        },
        expected: false
      },
      {
        state: {
          Address: {
            addressType: 'International',
            address: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany'
          },
          HasAffiliation: 'Yes',
          EmployerRelationship: {
            value: 'Associate'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new RelativeValidator(test.state, null).validEmployerRelationship()).toBe(test.expected)
    })
  })

  it('in its entirety', () => {
    const tests = [
      {
        state: {
          Relations: ['Mother'],
          List: [
            {
              Item: {
                Relations: ['Mother'],
                Name: {
                  first: 'Foo',
                  firstInitialOnly: false,
                  middle: 'J',
                  middleInitialOnly: true,
                  noMiddleName: false,
                  last: 'Bar',
                  lastInitialOnly: false,
                  suffix: 'Jr'
                },
                Birthdate: {
                  day: '1',
                  month: '1',
                  year: '2016',
                  date: new Date('1/1/2016')
                },
                Birthplace: {
                  addressType: 'United States',
                  address: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'Virginia',
                  zipcode: '22202'
                },
                Citizenship: ['United States'],
                MaidenName: {
                  value: 'Nunyabusiness'
                },
                Aliases: [
                  {
                    Has: 'Yes',
                    Item: {
                      Name: {
                        first: 'Foo',
                        firstInitialOnly: false,
                        middle: 'J',
                        middleInitialOnly: true,
                        noMiddleName: false,
                        last: 'Bar',
                        lastInitialOnly: false,
                        suffix: 'Jr'
                      },
                      MaidenName: 'No',
                      Dates: {
                        from: {
                          date: new Date('1/1/2010')
                        },
                        to: {
                          date: new Date('1/1/2012')
                        },
                        present: false
                      }
                    }
                  }
                ],
                IsDeceased: 'No',
                Address: {
                  addressType: 'United States',
                  address: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'Virginia',
                  zipcode: '22202'
                }
              }
            }
          ]
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      console.log('yo', test.state)
      expect(new RelativesValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
