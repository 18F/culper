import RelativesValidator, { RelativeValidator } from './relatives'
import Location from '../components/Form/Location'

describe('Relatives validation', function () {
  it('validate relative relationship', () => {
    const tests = [
      {
        state: {
          Relation: {
            value: ''
          }
        },
        expected: false
      },
      {
        state: {
          Relation: {
            value: 'Mother'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new RelativeValidator(test.state, null).validRelation()).toBe(test.expected)
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

  it('validate relative documentation', () => {
    const tests = [
      {
        state: {
          IsDeceased: { value: 'No' },
          Document: {
            value: 'Permanent'
          }
        },
        expected: true
      },
      {
        state: {
          IsDeceased: { value: 'No' },
          Document: {
            value: 'Other'
          },
          OtherDocument: {
            value: 'Other stuff'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new RelativeValidator(test.state, null).validDocument()).toBe(test.expected)
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
          Citizenship: {}
        },
        expected: false
      },
      {
        state: {
          Citizenship: {
            value: ['United States']
          }
        },
        expected: true
      },
      {
        state: {
          Citizenship: {
            value: ['United States', 'Germany']
          }
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
          Relation: {
            value: 'Mother'
          }
        },
        expected: false
      },
      {
        state: {
          Relation: {
            value: 'Mother'
          },
          MaidenName: {}
        },
        expected: false
      },
      {
        state: {
          MaidenSameAsListed: { value: 'Yes' },
          MaidenName: {}
        },
        expected: true
      },
      {
        state: {
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
      expect(new RelativeValidator(test.state, null).validMaidenName()).toBe(test.expected)
    })
  })

  it('validate aliases', () => {
    const tests = [
      {
        state: {
        },
        props: {
          hideMaiden: false
        },
        expected: false
      },
      {
        state: {
          Aliases: {
            items: []
          }
        },
        props: {
          hideMaiden: false
        },
        expected: false
      },
      {
        state: {
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
        props: {
          hideMaiden: false
        },
        expected: true
      },
      {
        state: {
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
        props: {
          hideMaiden: false
        },
        expected: false
      },
      {
        state: {
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
                      date: new Date('1/1/2010')
                    },
                    to: {
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
        props: {
          hideMaiden: false
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new RelativeValidator(test.state, test.props).validAliases()).toBe(test.expected)
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
          IsDeceased: { value: '' }
        },
        expected: false
      },
      {
        state: {
          IsDeceased: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          IsDeceased: { value: 'Yes' }
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
          IsDeceased: { value: 'Yes' }
        },
        expected: true
      },
      {
        state: {
          IsDeceased: { value: 'No' },
          Address: {}
        },
        expected: false
      },
      {
        state: {
          IsDeceased: { value: 'No' },
          Address: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202',
            layout: Location.ADDRESS
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
        state: {
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
            state: 'Virginia',
            zipcode: '22202',
            layout: Location.ADDRESS
          }
        },
        expected: true
      },
      {
        state: {
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
        state: {
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
        state: {
          Citizenship: {
            value: ['United States']
          }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new RelativeValidator(test.state, null).requiresCitizenshipDocumentation()).toBe(test.expected)
    })
  })

  it('validate relative requires citizenship documentation', () => {
    const tests = [
      {
        state: {
          Relation: {
            value: 'Father'
          },
          IsDeceased: { value: 'Yes' }
        },
        expected: true
      },
      {
        state: {
          Relation: {
            value: 'Father'
          },
          IsDeceased: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
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
            state: 'Virginia',
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
        state: {
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
        state: {
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
        state: {
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
      expect(new RelativeValidator(test.state, null).validCitizenshipDocumentation()).toBe(test.expected)
    })
  })

  it('validate relative requires citizenship documentation document number', () => {
    const tests = [
      {
        state: {
          Relation: {
            value: 'Father'
          },
          IsDeceased: { value: 'Yes' }
        },
        expected: true
      },
      {
        state: {
          Relation: {
            value: 'Father'
          },
          IsDeceased: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          Relation: {
            value: 'Father'
          },
          Citizenship: {
            value: ['United States']
          },
          Birthplace: {
            city: 'Arlington',
            state: 'Virginia',
            country: { value: 'United States' },
            layout: Location.BIRTHPLACE_WITHOUT_COUNTY
          },
          IsDeceased: { value: 'No' },
          Address: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202',
            layout: Location.ADDRESS
          }
        },
        expected: true
      },
      {
        state: {
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
        state: {
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
      expect(new RelativeValidator(test.state, null).validDocumentNumber()).toBe(test.expected)
    })
  })

  it('validate relative requires citizenship documentation court name', () => {
    const tests = [
      {
        state: {
          Relation: {
            value: 'Father'
          },
          IsDeceased: { value: 'Yes' }
        },
        expected: true
      },
      {
        state: {
          Relation: {
            value: 'Father'
          },
          IsDeceased: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          Relation: {
            value: 'Father'
          },
          IsDeceased: { value: 'No' },
          Citizenship: {
            value: ['United States']
          },
          Birthplace: {
            city: 'Arlington',
            state: 'Virginia',
            country: { value: 'United States' },
            layout: Location.BIRTHPLACE_WITHOUT_COUNTY
          },
          Address: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202',
            layout: Location.ADDRESS
          }
        },
        expected: true
      },
      {
        state: {
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
        state: {
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
      expect(new RelativeValidator(test.state, null).validCourtName()).toBe(test.expected)
    })
  })

  it('validate relative requires citizenship documentation court address', () => {
    const tests = [
      {
        state: {
          Relation: {
            value: 'Father'
          },
          IsDeceased: { value: 'Yes' }
        },
        expected: true
      },
      {
        state: {
          Relation: {
            value: 'Father'
          },
          IsDeceased: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          Relation: {
            value: 'Father'
          },
          Citizenship: {
            value: ['United States']
          },
          Birthplace: {
            city: 'Arlington',
            state: 'Virginia',
            country: { value: 'United States' },
            layout: Location.BIRTHPLACE_WITHOUT_COUNTY
          },
          IsDeceased: { value: 'No' },
          Address: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202',
            layout: Location.ADDRESS
          }
        },
        expected: true
      },
      {
        state: {
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
        state: {
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
            state: 'Virginia',
            country: { value: 'United States' },
            layout: Location.US_ADDRESS
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
          Relation: {
            value: 'Father'
          },
          IsDeceased: { value: 'Yes' }
        },
        expected: true
      },
      {
        state: {
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
        state: {
          Relation: {
            value: 'Father'
          },
          Citizenship: {
            value: ['Germany']
          },
          IsDeceased: { value: 'No' },
          Document: {
            value: ''
          }
        },
        expected: false
      },
      {
        state: {
          Relation: {
            value: 'Father'
          },
          Citizenship: {
            value: ['Germany']
          },
          IsDeceased: { value: 'No' },
          Document: {
            value: 'Employment'
          }
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
          Relation: {
            value: 'Father'
          },
          IsDeceased: { value: 'Yes' }
        },
        expected: true
      },
      {
        state: {
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
        state: {
          Relation: {
            value: 'Father'
          },
          Citizenship: {
            value: ['Germany']
          },
          IsDeceased: { value: 'No' },
          ResidenceDocumentNumber: {}
        },
        expected: false
      },
      {
        state: {
          Relation: {
            value: 'Father'
          },
          Citizenship: {
            value: ['Germany']
          },
          IsDeceased: { value: 'No' },
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
          Relation: {
            value: 'Father'
          },
          IsDeceased: { value: 'Yes' }
        },
        expected: true
      },
      {
        state: {
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
        state: {
          Relation: {
            value: 'Father'
          },
          Citizenship: {
            value: ['Germany']
          },
          IsDeceased: { value: 'No' },
          Expiration: {}
        },
        expected: false
      },
      {
        state: {
          Relation: {
            value: 'Father'
          },
          Citizenship: {
            value: ['Germany']
          },
          IsDeceased: { value: 'No' },
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
          IsDeceased: { value: 'No' },
          Address: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202',
            layout: Location.ADDRESS
          }
        },
        expected: true
      },
      {
        state: {
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
        state: {
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
      expect(new RelativeValidator(test.state, null).validFirstContact()).toBe(test.expected)
    })
  })

  it('validate relative does not live within the U.S. last contact', () => {
    const tests = [
      {
        state: {
          IsDeceased: { value: 'No' },
          Address: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202',
            layout: Location.ADDRESS
          }
        },
        expected: true
      },
      {
        state: {
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
        state: {
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
      expect(new RelativeValidator(test.state, null).validLastContact()).toBe(test.expected)
    })
  })

  it('validate relative does not live within the U.S. correspondence methods', () => {
    const tests = [
      {
        state: {
          IsDeceased: { value: 'No' },
          Address: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202',
            layout: Location.ADDRESS
          }
        },
        expected: true
      },
      {
        state: {
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
        state: {
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
      expect(new RelativeValidator(test.state, null).validMethods()).toBe(test.expected)
    })
  })

  it('validate relative does not live within the U.S. correspondence frequency', () => {
    const tests = [
      {
        state: {
          IsDeceased: { value: 'No' },
          Address: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202',
            layout: Location.ADDRESS
          }
        },
        expected: true
      },
      {
        state: {
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
        state: {
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
          IsDeceased: { value: 'No' },
          Address: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202',
            layout: Location.ADDRESS
          }
        },
        expected: true
      },
      {
        state: {
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
        state: {
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
      expect(new RelativeValidator(test.state, null).validEmployer()).toBe(test.expected)
    })
  })

  it('validate relative does not live within the U.S. employer address', () => {
    const tests = [
      {
        state: {
          IsDeceased: { value: 'No' },
          Address: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202',
            layout: Location.ADDRESS
          }
        },
        expected: true
      },
      {
        state: {
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
        state: {
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
            state: 'Virginia',
            zipcode: '22202',
            layout: Location.ADDRESS
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
          Citizenship: {
            value: [ 'Germany' ]
          },
          IsDeceased: { value: 'No' },
          Address: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202',
            layout: Location.ADDRESS
          }
        },
        expected: true
      },
      {
        state: {
          Citizenship: {
            value: [ 'Germany' ]
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
        state: {
          Citizenship: {
            value: [ 'Germany' ]
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
        state: {
          Citizenship: {
            value: [ 'Germany' ]
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
        state: {
          Citizenship: {
            value: [ 'Germany' ]
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
      expect(new RelativeValidator(test.state, null).validEmployerRelationship()).toBe(test.expected)
    })
  })

  it('in its entirety', () => {
    const tests = [
      {
        state: {
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
        state: {
          List: {
            branch: { value: 'Nope' },
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
        state: {
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
                    state: 'Virginia',
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
                              date: new Date('1/1/2010')
                            },
                            to: {
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
                    state: 'Virginia',
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
      expect(new RelativesValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
