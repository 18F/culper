import RelativesValidator, { RelativeValidator } from './relatives'
import Location from '../components/Form/Location'

describe('Relatives validation', function() {
  it('validate relative relationship', () => {
    const tests = [
      {
        data: {
          Relation: {
            value: ''
          }
        },
        expected: false
      },
      {
        data: {
          Relation: {
            value: 'Mother'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new RelativeValidator(test.data).validRelation()).toBe(
        test.expected
      )
    })
  })

  it('validate relative name', () => {
    const tests = [
      {
        data: {},
        expected: false
      },
      {
        data: {
          Name: {}
        },
        expected: false
      },
      {
        data: {
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
      expect(new RelativeValidator(test.data).validName()).toBe(test.expected)
    })
  })

  it('validate relative documentation', () => {
    const tests = [
      {
        data: {
          IsDeceased: { value: 'No' },
          Document: {
            value: 'Permanent'
          }
        },
        expected: true
      },
      {
        data: {
          IsDeceased: { value: 'No' },
          Document: {
            value: 'Other'
          },
          DocumentComments: {
            value: 'Other stuff'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new RelativeValidator(test.data).validDocument()).toBe(
        test.expected
      )
    })
  })

  it('validate relative birth date', () => {
    const tests = [
      {
        data: {},
        expected: false
      },
      {
        data: {
          Birthdate: {}
        },
        expected: false
      },
      {
        data: {
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
      expect(new RelativeValidator(test.data).validBirthdate()).toBe(
        test.expected
      )
    })
  })

  it('validate relative birth place', () => {
    const tests = [
      {
        data: {},
        expected: false
      },
      {
        data: {
          Birthplace: {}
        },
        expected: false
      },
      {
        data: {
          Birthplace: {
            country: { value: 'United States' },
            city: 'Arlington',
            state: 'VA',
            layout: Location.BIRTHPLACE_WITHOUT_COUNTY
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new RelativeValidator(test.data).validBirthplace()).toBe(
        test.expected
      )
    })
  })

  it('validate relative citizenship', () => {
    const tests = [
      {
        data: {},
        expected: false
      },
      {
        data: {
          Citizenship: {}
        },
        expected: false
      },
      {
        data: {
          Citizenship: {
            value: ['United States']
          }
        },
        expected: true
      },
      {
        data: {
          Citizenship: {
            value: ['United States', 'Germany']
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new RelativeValidator(test.data).validCitizenship()).toBe(
        test.expected
      )
    })
  })

  it('validate relative maiden name', () => {
    const tests = [
      {
        data: {
          Relation: {
            value: 'Mother'
          }
        },
        expected: false
      },
      {
        data: {
          Relation: {
            value: 'Mother'
          },
          MaidenName: {}
        },
        expected: false
      },
      {
        data: {
          MaidenSameAsListed: { value: 'Yes' },
          MaidenName: {}
        },
        expected: true
      },
      {
        data: {
          Relation: {
            value: 'Mother'
          },
          MaidenName: {
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
      expect(new RelativeValidator(test.data).validMaidenName()).toBe(
        test.expected
      )
    })
  })

  it('validate aliases', () => {
    const tests = [
      {
        data: {
          hideMaiden: false
        },
        expected: false
      },
      {
        data: {
          hideMaiden: false,
          Aliases: {
            items: []
          }
        },
        expected: false
      },
      {
        data: {
          Relation: {
            value: 'Guardian'
          },
          Aliases: {
            items: []
          }
        },
        expected: true
      },
      {
        data: {
          hideMaiden: false,
          Aliases: {
            items: [
              {
                Item: {
                  Has: {
                    value: 'No'
                  }
                }
              }
            ]
          }
        },
        expected: true
      },
      {
        data: {
          hideMaiden: false,
          Aliases: {
            items: [
              {
                Item: {
                  Has: {
                    value: 'Yes'
                  }
                }
              }
            ]
          }
        },
        expected: false
      },
      {
        data: {
          hideMaiden: false,
          Aliases: {
            items: [
              {
                Item: {
                  Has: {
                    value: 'Yes'
                  },
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
                  MaidenName: { value: 'No' },
                  Dates: {
                    from: {
                      month: '1',
                      day: '1',
                      year: '2010',
                      date: new Date('1/1/2010')
                    },
                    to: {
                      month: '1',
                      day: '1',
                      year: '2012',
                      date: new Date('1/1/2012')
                    },
                    present: false
                  },
                  Reason: {
                    value: 'The reason'
                  }
                }
              }
            ]
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new RelativeValidator(test.data).validAliases()).toBe(
        test.expected
      )
    })
  })

  it('validate relative is deceased', () => {
    const tests = [
      {
        data: {},
        expected: false
      },
      {
        data: {
          IsDeceased: { value: '' }
        },
        expected: false
      },
      {
        data: {
          IsDeceased: { value: 'No' }
        },
        expected: true
      },
      {
        data: {
          IsDeceased: { value: 'Yes' }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new RelativeValidator(test.data).validIsDeceased()).toBe(
        test.expected
      )
    })
  })

  it('validate relative is not deceased and has address', () => {
    const tests = [
      {
        data: {},
        expected: false
      },
      {
        data: {
          IsDeceased: { value: 'Yes' }
        },
        expected: true
      },
      {
        data: {
          IsDeceased: { value: 'No' },
          Address: {}
        },
        expected: false
      },
      {
        data: {
          IsDeceased: { value: 'No' },
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
      }
    ]

    tests.forEach(test => {
      expect(new RelativeValidator(test.data).validAddress()).toBe(
        test.expected
      )
    })
  })

  it('validate relative requires citizenship documentation abroad', () => {
    const tests = [
      {
        data: {
          Relation: {
            value: 'Father'
          },
          Citizenship: {
            value: ['United States']
          },
          IsDeceased: { value: 'Yes' },
          Birthplace: {
            country: { value: 'Germany' },
            city: 'Munich',
            layout: Location.BIRTHPLACE_WITHOUT_COUNTY
          }
        },
        expected: true
      },
      {
        data: {
          Citizenship: {
            value: ['United States']
          },
          Birthplace: {
            country: { value: 'Germany' },
            city: 'Munich',
            layout: Location.BIRTHPLACE_WITHOUT_COUNTY
          },
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
        data: {
          Citizenship: {
            value: ['United States']
          },
          Birthplace: {
            country: { value: 'Germany' },
            city: 'Munich',
            layout: Location.BIRTHPLACE_WITHOUT_COUNTY
          },
          Address: {
            country: { value: 'POSTOFFICE' },
            address: '1234 Some Rd',
            state: 'APO',
            city: 'APO',
            zipcode: '00000',
            layout: Location.ADDRESS
          }
        },
        expected: true
      },
      {
        data: {
          Citizenship: {
            value: ['United States']
          },
          Birthplace: {
            country: { value: 'Germany' },
            city: 'Munich',
            layout: Location.BIRTHPLACE_WITHOUT_COUNTY
          }
        },
        expected: true
      },
      {
        data: {
          Citizenship: {
            value: ['United States']
          }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(
        new RelativeValidator(test.data).requiresCitizenshipDocumentation()
      ).toBe(test.expected)
    })
  })

  it('validate relative requires citizenship documentation', () => {
    const tests = [
      {
        data: {
          Relation: {
            value: 'Father'
          },
          IsDeceased: { value: 'Yes' }
        },
        expected: true
      },
      {
        data: {
          Relation: {
            value: 'Father'
          },
          IsDeceased: { value: 'No' }
        },
        expected: true
      },
      {
        data: {
          Relation: {
            value: 'Father'
          },
          Citizenship: {
            value: ['United States']
          },
          Birthplace: {
            country: { value: 'United States' },
            city: 'Arlington',
            state: 'VA',
            layout: Location.BIRTHPLACE_WITHOUT_COUNTY
          },
          IsDeceased: { value: 'No' },
          Address: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS
          },
          CitizenshipDocumentation: {
            value: 'DerivedAlien'
          }
        },
        expected: true
      },
      {
        data: {
          Relation: {
            value: 'Father'
          },
          Citizenship: {
            value: ['United States']
          },
          Birthplace: {
            city: 'Munich',
            country: { value: 'Germany' },
            layout: Location.BIRTHPLACE_WITHOUT_COUNTY
          },
          IsDeceased: { value: 'No' },
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: { value: 'Germany' },
            layout: Location.ADDRESS
          },
          Abroad: {
            value: ''
          }
        },
        expected: false
      },
      {
        data: {
          CitizenshipDocumentation: {
            value: 'Other'
          },
          OtherCitizenshipDocumentation: {
            value: 'Other docs'
          },
          Relation: {
            value: 'Father'
          },
          Citizenship: {
            value: ['United States']
          },
          Birthplace: {
            city: 'Munich',
            country: { value: 'Germany' },
            layout: Location.BIRTHPLACE_WITHOUT_COUNTY
          },
          IsDeceased: { value: 'No' },
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: { value: 'Germany' },
            layout: Location.ADDRESS
          },
          Abroad: {
            value: ''
          }
        },
        expected: true
      },
      {
        data: {
          CitizenshipDocumentation: {
            value: 'FS'
          },
          OtherCitizenshipDocumentation: {
            value: 'Other docs'
          },
          Relation: {
            value: 'Father'
          },
          Citizenship: {
            value: ['United States']
          },
          Birthplace: {
            city: 'Munich',
            country: { value: 'Germany' },
            layout: Location.BIRTHPLACE_WITHOUT_COUNTY
          },
          IsDeceased: { value: 'No' },
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: { value: 'Germany' },
            layout: Location.ADDRESS
          },
          Abroad: {
            value: ''
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(
        new RelativeValidator(test.data).validCitizenshipDocumentation()
      ).toBe(test.expected)
    })
  })

  it('validate relative requires citizenship documentation document number', () => {
    const tests = [
      {
        data: {
          Relation: {
            value: 'Father'
          },
          IsDeceased: { value: 'Yes' }
        },
        expected: true
      },
      {
        data: {
          Relation: {
            value: 'Father'
          },
          IsDeceased: { value: 'No' }
        },
        expected: true
      },
      {
        data: {
          Relation: {
            value: 'Father'
          },
          Citizenship: {
            value: ['United States']
          },
          Birthplace: {
            city: 'Arlington',
            state: 'VA',
            country: { value: 'United States' },
            layout: Location.BIRTHPLACE_WITHOUT_COUNTY
          },
          IsDeceased: { value: 'No' },
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
        data: {
          Relation: {
            value: 'Father'
          },
          Citizenship: {
            value: ['United States']
          },
          Birthplace: {
            city: 'Munich',
            country: { value: 'Germany' },
            layout: Location.BIRTHPLACE_WITHOUT_COUNTY
          },
          IsDeceased: { value: 'No' },
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: { value: 'Germany' },
            layout: Location.ADDRESS
          },
          DocumentNumber: {}
        },
        expected: false
      },
      {
        data: {
          Relation: {
            value: 'Father'
          },
          Citizenship: {
            value: ['United States']
          },
          Birthplace: {
            city: 'Munich',
            country: { value: 'Germany' },
            layout: Location.BIRTHPLACE_WITHOUT_COUNTY
          },
          IsDeceased: { value: 'No' },
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: { value: 'Germany' },
            layout: Location.ADDRESS
          },
          DocumentNumber: {
            value: '0000000000000'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new RelativeValidator(test.data).validDocumentNumber()).toBe(
        test.expected
      )
    })
  })

  it('validate relative requires citizenship documentation court name', () => {
    const tests = [
      {
        data: {
          Relation: {
            value: 'Father'
          },
          IsDeceased: { value: 'Yes' }
        },
        expected: true
      },
      {
        data: {
          Relation: {
            value: 'Father'
          },
          IsDeceased: { value: 'No' }
        },
        expected: true
      },
      {
        data: {
          Relation: {
            value: 'Father'
          },
          IsDeceased: { value: 'No' },
          Citizenship: {
            value: ['United States']
          },
          Birthplace: {
            city: 'Arlington',
            state: 'VA',
            country: { value: 'United States' },
            layout: Location.BIRTHPLACE_WITHOUT_COUNTY
          },
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
        data: {
          Relation: {
            value: 'Father'
          },
          Citizenship: {
            value: ['United States']
          },
          Birthplace: {
            city: 'Munich',
            country: { value: 'Germany' },
            layout: Location.BIRTHPLACE_WITHOUT_COUNTY
          },
          IsDeceased: { value: 'No' },
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: { value: 'Germany' },
            layout: Location.ADDRESS
          },
          CourtName: {}
        },
        expected: false
      },
      {
        data: {
          Relation: {
            value: 'Father'
          },
          Citizenship: {
            value: ['United States']
          },
          Birthplace: {
            city: 'Munich',
            country: { value: 'Germany' },
            layout: Location.BIRTHPLACE_WITHOUT_COUNTY
          },
          IsDeceased: { value: 'No' },
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: { value: 'Germany' },
            layout: Location.ADDRESS
          },
          CourtName: {
            value: 'Court name'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new RelativeValidator(test.data).validCourtName()).toBe(
        test.expected
      )
    })
  })

  it('validate relative requires citizenship documentation court address', () => {
    const tests = [
      {
        data: {
          Relation: {
            value: 'Father'
          },
          IsDeceased: { value: 'Yes' }
        },
        expected: true
      },
      {
        data: {
          Relation: {
            value: 'Father'
          },
          IsDeceased: { value: 'No' }
        },
        expected: true
      },
      {
        data: {
          Relation: {
            value: 'Father'
          },
          Citizenship: {
            value: ['United States']
          },
          Birthplace: {
            city: 'Arlington',
            state: 'VA',
            country: { value: 'United States' },
            layout: Location.BIRTHPLACE_WITHOUT_COUNTY
          },
          IsDeceased: { value: 'No' },
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
        data: {
          Relation: {
            value: 'Father'
          },
          Citizenship: {
            value: ['United States']
          },
          Birthplace: {
            city: 'Munich',
            country: { value: 'Germany' },
            layout: Location.BIRTHPLACE_WITHOUT_COUNTY
          },
          IsDeceased: { value: 'No' },
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: { value: 'Germany' },
            layout: Location.ADDRESS
          },
          CourtAddress: {}
        },
        expected: false
      },
      {
        data: {
          Relation: {
            value: 'Father'
          },
          Citizenship: {
            value: ['United States']
          },
          Birthplace: {
            city: 'Munich',
            country: { value: 'Germany' },
            layout: Location.BIRTHPLACE_WITHOUT_COUNTY
          },
          IsDeceased: { value: 'No' },
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            zipcode: '22202',
            country: { value: 'Germany' },
            layout: Location.ADDRESS
          },
          CourtAddress: {
            street: '1234 Some Rd',
            city: 'Arlington',
            zipcode: '22202',
            state: 'VA',
            country: { value: 'United States' },
            layout: Location.US_ADDRESS
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new RelativeValidator(test.data).validCourtAddress()).toBe(
        test.expected
      )
    })
  })

  it('validate relative not a citizen and has document', () => {
    const tests = [
      {
        data: {
          Relation: {
            value: 'Father'
          },
          IsDeceased: { value: 'Yes' }
        },
        expected: true
      },
      {
        data: {
          Relation: {
            value: 'Father'
          },
          Citizenship: {
            value: ['United States']
          },
          IsDeceased: { value: 'No' }
        },
        expected: true
      },
      {
        data: {
          Relation: {
            value: 'Father'
          },
          Citizenship: {
            value: ['Germany']
          },
          IsDeceased: { value: 'No' },
          Address: {
            street: '1234 Some Rd',
            city: 'Arlington',
            zipcode: '22202',
            state: 'VA',
            country: { value: 'United States' },
            layout: Location.US_ADDRESS
          },
          Document: {
            value: ''
          }
        },
        expected: false
      },
      {
        data: {
          Relation: {
            value: 'Father'
          },
          Citizenship: {
            value: ['Germany']
          },
          IsDeceased: { value: 'No' },
          Address: {
            street: '1234 Some Rd',
            city: 'Arlington',
            zipcode: '22202',
            state: 'VA',
            country: { value: 'United States' },
            layout: Location.US_ADDRESS
          },
          Document: {
            value: 'Employment'
          }
        },
        expected: true
      },
      {
        data: {
          Relation: {
            value: 'Father'
          },
          Citizenship: {
            value: ['Germany']
          },
          IsDeceased: { value: 'No' },
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            zipcode: '22202',
            country: { value: 'Germany' },
            layout: Location.ADDRESS
          },
          Document: {}
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new RelativeValidator(test.data).validDocument()).toBe(
        test.expected
      )
    })
  })

  it('validate relative not a citizen and has residence document number', () => {
    const tests = [
      {
        data: {
          Relation: {
            value: 'Father'
          },
          IsDeceased: { value: 'Yes' }
        },
        expected: true
      },
      {
        data: {
          Relation: {
            value: 'Father'
          },
          Citizenship: {
            value: ['United States']
          },
          IsDeceased: { value: 'No' }
        },
        expected: true
      },
      {
        data: {
          Relation: {
            value: 'Father'
          },
          Citizenship: {
            value: ['Germany']
          },
          IsDeceased: { value: 'No' },
          Address: {
            street: '1234 Some Rd',
            city: 'Arlington',
            zipcode: '22202',
            state: 'VA',
            country: { value: 'United States' },
            layout: Location.US_ADDRESS
          },
          ResidenceDocumentNumber: {}
        },
        expected: false
      },
      {
        data: {
          Relation: {
            value: 'Father'
          },
          Citizenship: {
            value: ['Germany']
          },
          IsDeceased: { value: 'No' },
          Address: {
            street: '1234 Some Rd',
            city: 'Arlington',
            zipcode: '22202',
            state: 'VA',
            country: { value: 'United States' },
            layout: Location.US_ADDRESS
          },
          ResidenceDocumentNumber: {
            value: '000000000'
          }
        },
        expected: true
      },
      {
        data: {
          Relation: {
            value: 'Father'
          },
          Citizenship: {
            value: ['Germany']
          },
          IsDeceased: { value: 'No' },
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            zipcode: '22202',
            country: { value: 'Germany' },
            layout: Location.ADDRESS
          },
          ResidenceDocumentNumber: {}
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(
        new RelativeValidator(test.data).validResidenceDocumentNumber()
      ).toBe(test.expected)
    })
  })

  it('validate relative not a citizen and has expiration', () => {
    const tests = [
      {
        data: {
          Relation: {
            value: 'Father'
          },
          IsDeceased: { value: 'Yes' }
        },
        expected: true
      },
      {
        data: {
          Relation: {
            value: 'Father'
          },
          Citizenship: {
            value: ['United States']
          },
          IsDeceased: { value: 'No' }
        },
        expected: true
      },
      {
        data: {
          Relation: {
            value: 'Father'
          },
          Citizenship: {
            value: ['Germany']
          },
          IsDeceased: { value: 'No' },
          Address: {
            street: '1234 Some Rd',
            city: 'Arlington',
            zipcode: '22202',
            state: 'VA',
            country: { value: 'United States' },
            layout: Location.US_ADDRESS
          },
          Expiration: {}
        },
        expected: false
      },
      {
        data: {
          Relation: {
            value: 'Father'
          },
          Citizenship: {
            value: ['Germany']
          },
          IsDeceased: { value: 'No' },
          Address: {
            street: '1234 Some Rd',
            city: 'Arlington',
            zipcode: '22202',
            state: 'VA',
            country: { value: 'United States' },
            layout: Location.US_ADDRESS
          },
          Expiration: {
            day: '1',
            month: '1',
            year: '2016',
            date: new Date('1/1/2016')
          }
        },
        expected: true
      },
      {
        data: {
          Relation: {
            value: 'Father'
          },
          Citizenship: {
            value: ['Germany']
          },
          IsDeceased: { value: 'No' },
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            zipcode: '22202',
            country: { value: 'Germany' },
            layout: Location.ADDRESS
          },
          Expiration: {}
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new RelativeValidator(test.data).validExpiration()).toBe(
        test.expected
      )
    })
  })

  it('validate non-citizen relative first contact', () => {
    const tests = [
      {
        data: {
          IsDeceased: { value: 'No' },
          Address: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS
          },
          FirstContact: {
            day: '1',
            month: '1',
            year: '2016',
            date: new Date('1/1/2016')
          }
        },
        expected: true
      },
      {
        data: {
          IsDeceased: { value: 'No' },
          Address: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS
          }
        },
        expected: false
      },
      {
        data: {
          IsDeceased: { value: 'No' },
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: { value: 'Germany' },
            layout: Location.ADDRESS
          },
          FirstContact: {}
        },
        expected: false
      },
      {
        data: {
          IsDeceased: { value: 'No' },
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: { value: 'Germany' },
            layout: Location.ADDRESS
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
      expect(new RelativeValidator(test.data).validFirstContact()).toBe(
        test.expected
      )
    })
  })

  it('validate non-citizen relative last contact', () => {
    const tests = [
      {
        data: {
          IsDeceased: { value: 'No' },
          Address: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS
          },
          LastContact: {
            day: '1',
            month: '1',
            year: '2016',
            date: new Date('1/1/2016')
          }
        },
        expected: true
      },
      {
        data: {
          IsDeceased: { value: 'No' },
          Address: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS
          }
        },
        expected: false
      },
      {
        data: {
          IsDeceased: { value: 'No' },
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: { value: 'Germany' },
            layout: Location.ADDRESS
          },
          LastContact: {}
        },
        expected: false
      },
      {
        data: {
          IsDeceased: { value: 'No' },
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: { value: 'Germany' },
            layout: Location.ADDRESS
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
      expect(new RelativeValidator(test.data).validLastContact()).toBe(
        test.expected
      )
    })
  })

  it('validate non-citizen relative correspondence methods', () => {
    const tests = [
      {
        data: {
          IsDeceased: { value: 'No' },
          Address: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS
          }
        },
        expected: false
      },
      {
        data: {
          IsDeceased: { value: 'No' },
          Address: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS
          },
          Methods: {
            values: ['In person', 'Electronic']
          }
        },
        expected: true
      },
      {
        data: {
          IsDeceased: { value: 'No' },
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: { value: 'Germany' },
            layout: Location.ADDRESS
          },
          Methods: {
            values: []
          }
        },
        expected: false
      },
      {
        data: {
          IsDeceased: { value: 'No' },
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: { value: 'Germany' },
            layout: Location.ADDRESS
          },
          Methods: {
            values: ['In person', 'Electronic']
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new RelativeValidator(test.data).validMethods()).toBe(
        test.expected
      )
    })
  })

  it('validate non-citizen relative correspondence frequency', () => {
    const tests = [
      {
        data: {
          IsDeceased: { value: 'No' },
          Address: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS
          }
        },
        expected: false
      },
      {
        data: {
          IsDeceased: { value: 'No' },
          Address: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS
          },
          Frequency: {
            value: 'Daily'
          }
        },
        expected: true
      },
      {
        data: {
          IsDeceased: { value: 'No' },
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: { value: 'Germany' },
            layout: Location.ADDRESS
          },
          Frequency: ''
        },
        expected: false
      },
      {
        data: {
          IsDeceased: { value: 'No' },
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: { value: 'Germany' },
            layout: Location.ADDRESS
          },
          Frequency: {
            value: 'Daily'
          }
        },
        expected: true
      },
      {
        data: {
          IsDeceased: { value: 'No' },
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: { value: 'Germany' },
            layout: Location.ADDRESS
          },
          Frequency: {
            value: 'Other'
          },
          FrequencyComments: {
            value: ''
          }
        },
        expected: false
      },
      {
        data: {
          IsDeceased: { value: 'No' },
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: { value: 'Germany' },
            layout: Location.ADDRESS
          },
          Frequency: {
            value: 'Other'
          },
          FrequencyComments: {
            value: 'foo'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new RelativeValidator(test.data).validFrequency()).toBe(
        test.expected
      )
    })
  })

  it('validate relative does not live within the U.S. employer name', () => {
    const tests = [
      {
        data: {
          IsDeceased: { value: 'No' },
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
        data: {
          IsDeceased: { value: 'No' },
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: { value: 'Germany' },
            layout: Location.ADDRESS
          },
          Employer: {}
        },
        expected: false
      },
      {
        data: {
          IsDeceased: { value: 'No' },
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: { value: 'Germany' },
            layout: Location.ADDRESS
          },
          Employer: {
            value: 'ACME'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new RelativeValidator(test.data).validEmployer()).toBe(
        test.expected
      )
    })
  })

  it('validate relative does not live within the U.S. employer address', () => {
    const tests = [
      {
        data: {
          IsDeceased: { value: 'No' },
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
        data: {
          IsDeceased: { value: 'No' },
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: { value: 'Germany' },
            layout: Location.ADDRESS
          },
          EmployerAddress: {}
        },
        expected: false
      },
      {
        data: {
          IsDeceased: { value: 'No' },
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: { value: 'Germany' },
            layout: Location.ADDRESS
          },
          EmployerAddress: {
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
      expect(new RelativeValidator(test.data).validEmployerAddress()).toBe(
        test.expected
      )
    })
  })

  it('validate relative does not live within the U.S. employer relationship', () => {
    const tests = [
      {
        data: {
          Citizenship: {
            value: ['Germany']
          },
          IsDeceased: { value: 'No' },
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
        data: {
          Citizenship: {
            value: ['Germany']
          },
          IsDeceased: { value: 'No' },
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: { value: 'Germany' },
            layout: Location.ADDRESS
          },
          HasAffiliation: { value: '' }
        },
        expected: false
      },
      {
        data: {
          Citizenship: {
            value: ['Germany']
          },
          IsDeceased: { value: 'No' },
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: { value: 'Germany' },
            layout: Location.ADDRESS
          },
          HasAffiliation: { value: 'No' }
        },
        expected: true
      },
      {
        data: {
          Citizenship: {
            value: ['Germany']
          },
          IsDeceased: { value: 'No' },
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: { value: 'Germany' },
            layout: Location.ADDRESS
          },
          HasAffiliation: { value: 'Yes' },
          EmployerRelationship: {}
        },
        expected: false
      },
      {
        data: {
          Citizenship: {
            value: ['Germany']
          },
          IsDeceased: { value: 'No' },
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: { value: 'Germany' },
            layout: Location.ADDRESS
          },
          HasAffiliation: { value: 'Yes' },
          EmployerRelationship: {
            value: 'Associate'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new RelativeValidator(test.data).validEmployerRelationship()).toBe(
        test.expected
      )
    })
  })

  it('in its entirety', () => {
    const tests = [
      {
        data: {
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  Relation: {
                    value: 'Mother'
                  }
                }
              }
            ]
          }
        },
        expected: false
      },
      {
        data: {
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  Relation: {
                    value: 'Mother'
                  },
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
                    city: 'Arlington',
                    state: 'VA',
                    country: { value: ['United States'] },
                    layout: Location.BIRTHPLACE_WITHOUT_COUNTY
                  },
                  Citizenship: {
                    value: ['United States']
                  },
                  MaidenName: {
                    first: 'Foo',
                    firstInitialOnly: false,
                    middle: 'J',
                    middleInitialOnly: true,
                    noMiddleName: false,
                    last: 'Bar',
                    lastInitialOnly: false,
                    suffix: 'Jr'
                  },
                  Aliases: {
                    items: [
                      {
                        Item: {
                          Has: {
                            value: 'Yes'
                          },
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
                          MaidenName: { value: 'No' },
                          Dates: {
                            from: {
                              month: '1',
                              day: '1',
                              year: '2010',
                              date: new Date('1/1/2010')
                            },
                            to: {
                              month: '1',
                              day: '1',
                              year: '2012',
                              date: new Date('1/1/2012')
                            },
                            present: false
                          },
                          Reason: {
                            value: 'The reason'
                          }
                        }
                      }
                    ]
                  },
                  IsDeceased: { value: 'No' },
                  Address: {
                    country: { value: 'United States' },
                    street: '1234 Some Rd',
                    city: 'Arlington',
                    state: 'VA',
                    zipcode: '22202',
                    layout: Location.ADDRESS
                  }
                }
              },
              {
                Item: {
                  Relation: {
                    value: 'Father'
                  },
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
                    city: 'Arlington',
                    state: 'VA',
                    country: { value: ['United States'] },
                    layout: Location.BIRTHPLACE_WITHOUT_COUNTY
                  },
                  Citizenship: {
                    value: ['United States']
                  },
                  MaidenName: {
                    first: 'Foo',
                    firstInitialOnly: false,
                    middle: 'J',
                    middleInitialOnly: true,
                    noMiddleName: false,
                    last: 'Bar',
                    lastInitialOnly: false,
                    suffix: 'Jr'
                  },
                  Aliases: {
                    items: [
                      {
                        Item: {
                          Has: {
                            value: 'Yes'
                          },
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
                          MaidenName: { value: 'No' },
                          Dates: {
                            from: {
                              month: '1',
                              day: '1',
                              year: '2010',
                              date: new Date('1/1/2010')
                            },
                            to: {
                              month: '1',
                              day: '1',
                              year: '2012',
                              date: new Date('1/1/2012')
                            },
                            present: false
                          },
                          Reason: {
                            value: 'The reason'
                          }
                        }
                      }
                    ]
                  },
                  IsDeceased: { value: 'No' },
                  Address: {
                    country: { value: 'United States' },
                    street: '1234 Some Rd',
                    city: 'Arlington',
                    state: 'VA',
                    zipcode: '22202',
                    layout: Location.ADDRESS
                  }
                }
              }
            ]
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new RelativesValidator(test.data).isValid()).toBe(test.expected)
    })
  })

  it('validates that a mother and father have been provided', () => {
    const tests = [
      {
        data: {
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  Relation: {
                    value: 'Mother'
                  }
                }
              }
            ]
          }
        },
        expected: false
      },
      {
        data: {
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  Relation: {
                    value: 'Father'
                  }
                }
              }
            ]
          }
        },
        expected: false
      },
      {
        data: {
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  Relation: {
                    value: 'Mother'
                  }
                }
              },
              {
                Item: {
                  Relation: {
                    value: 'Father'
                  }
                }
              }
            ]
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new RelativesValidator(test.data).validMinimumRelations()).toBe(
        test.expected
      )
    })
  })

  it('validates that a mother-in-law and father-in-law have been provided if married', () => {
    const tests = [
      {
        data: {
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  Relation: {
                    value: 'Mother-in-law'
                  }
                }
              },
              {
                Item: {
                  Relation: {
                    value: 'Father-in-law'
                  }
                }
              }
            ]
          }
        },
        context: 'Married',
        expected: true
      },
      {
        data: {
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  Relation: {
                    value: 'Mother-in-law'
                  }
                }
              },
              {
                Item: {
                  Relation: {
                    value: 'Father-in-law'
                  }
                }
              }
            ]
          }
        },
        context: 'Separated',
        expected: true
      },
      {
        data: {
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  Relation: {
                    value: 'Mother-in-law'
                  }
                }
              }
            ]
          }
        },
        context: 'Married',
        expected: false
      },
      {
        data: {
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  Relation: {
                    value: 'Father-in-law'
                  }
                }
              }
            ]
          }
        },
        context: 'Separated',
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(
        new RelativesValidator(test.data).validMaritalRelations(test.context)
      ).toBe(test.expected)
    })
  })
})
