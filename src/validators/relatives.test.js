import RelativesValidator, { RelativeValidator } from './relatives'
import Location from '../components/Form/Location'

describe('Relatives validation', function () {
  it('validate relative relationship', () => {
    const tests = [
      {
        state: {
          Relation: ''
        },
        expected: false
      },
      {
        state: {
          Relation: 'Mother'
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
          IsDeceased: 'No',
          Document: 'Permanent'
        },
        expected: true
      },
      {
        state: {
          IsDeceased: 'No',
          Document: 'Other',
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
            country: 'United States',
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
            value: [
              { name: 'United States', value: 'United States' }
            ]
          }
        },
        expected: true
      },
      {
        state: {
          Citizenship: {
            value: [
              { name: 'United States', value: 'United States' },
              { name: 'Germany', value: 'Germany' }
            ]
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
          Relation: 'Mother'
        },
        expected: false
      },
      {
        state: {
          Relation: 'Mother',
          MaidenName: {}
        },
        expected: false
      },
      {
        state: {
          MaidenSameAsListed: 'Yes',
          MaidenName: {}
        },
        expected: true
      },
      {
        state: {
          Relation: 'Mother',
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
          Aliases: []
        },
        props: {
          hideMaiden: false
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
        props: {
          hideMaiden: false
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
        props: {
          hideMaiden: false
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
                },
                Reason: {
                  value: 'The reason'
                }
              }
            }
          ]
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
          IsDeceased: 'Yes'
        },
        expected: true
      },
      {
        state: {
          IsDeceased: 'No',
          Address: {}
        },
        expected: false
      },
      {
        state: {
          IsDeceased: 'No',
          Address: {
            country: 'United States',
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
          Relation: 'Father',
          Citizenship: {
            value: [
              { name: 'United States', value: 'United States' }
            ]
          },
          IsDeceased: 'Yes',
          Birthplace: {
            country: 'Germany',
            city: 'Munich',
            layout: Location.BIRTHPLACE_WITHOUT_COUNTY
          }
        },
        expected: true
      },
      {
        state: {
          Citizenship: {
            value: [
              { name: 'United States', value: 'United States' }
            ]
          },
          Birthplace: {
            country: 'Germany',
            city: 'Munich',
            layout: Location.BIRTHPLACE_WITHOUT_COUNTY
          },
          Address: {
            country: 'United States',
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
            value: [
              { name: 'United States', value: 'United States' }
            ]
          },
          Birthplace: {
            country: 'Germany',
            city: 'Munich',
            layout: Location.BIRTHPLACE_WITHOUT_COUNTY
          },
          Address: {
            country: 'POSTOFFICE',
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
            value: [
              { name: 'United States', value: 'United States' }
            ]
          },
          Birthplace: {
            country: 'Germany',
            city: 'Munich',
            layout: Location.BIRTHPLACE_WITHOUT_COUNTY
          }
        },
        expected: true
      },
      {
        state: {
          Citizenship: {
            value: [
              { name: 'United States', value: 'United States' }
            ]
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
          Relation: 'Father',
          IsDeceased: 'Yes'
        },
        expected: true
      },
      {
        state: {
          Relation: 'Father',
          IsDeceased: 'No'
        },
        expected: true
      },
      {
        state: {
          Relation: 'Father',
          Citizenship: {
            value: [
              { name: 'United States', value: 'United States' }
            ]
          },
          Birthplace: {
            country: 'United States',
            city: 'Arlington',
            state: 'VA',
            layout: Location.BIRTHPLACE_WITHOUT_COUNTY
          },
          IsDeceased: 'No',
          Address: {
            country: 'United States',
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202',
            layout: Location.ADDRESS
          },
          CitizenshipDocumentation: 'DerivedAlien'
        },
        expected: true
      },
      {
        state: {
          Relation: 'Father',
          Citizenship: {
            value: [
              { name: 'United States', value: 'United States' }
            ]
          },
          Birthplace: {
            city: 'Munich',
            country: 'Germany',
            layout: Location.BIRTHPLACE_WITHOUT_COUNTY
          },
          IsDeceased: 'No',
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany',
            layout: Location.ADDRESS
          },
          Abroad: ''
        },
        expected: false
      },
      {
        state: {
          CitizenshipDocumentation: 'Other',
          OtherCitizenshipDocumentation: {
            value: 'Other docs'
          },
          Relation: 'Father',
          Citizenship: {
            value: [
              { name: 'United States', value: 'United States' }
            ]
          },
          Birthplace: {
            city: 'Munich',
            country: 'Germany',
            layout: Location.BIRTHPLACE_WITHOUT_COUNTY
          },
          IsDeceased: 'No',
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany',
            layout: Location.ADDRESS
          },
          Abroad: ''
        },
        expected: true
      },
      {
        state: {
          CitizenshipDocumentation: 'FS',
          OtherCitizenshipDocumentation: {
            value: 'Other docs'
          },
          Relation: 'Father',
          Citizenship: {
            value: [
              { name: 'United States', value: 'United States' }
            ]
          },
          Birthplace: {
            city: 'Munich',
            country: 'Germany',
            layout: Location.BIRTHPLACE_WITHOUT_COUNTY
          },
          IsDeceased: 'No',
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany',
            layout: Location.ADDRESS
          },
          Abroad: ''
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
          Relation: 'Father',
          IsDeceased: 'Yes'
        },
        expected: true
      },
      {
        state: {
          Relation: 'Father',
          IsDeceased: 'No'
        },
        expected: true
      },
      {
        state: {
          Relation: 'Father',
          Citizenship: {
            value: [
              { name: 'United States', value: 'United States' }
            ]
          },
          Birthplace: {
            city: 'Arlington',
            state: 'Virginia',
            country: 'United States',
            layout: Location.BIRTHPLACE_WITHOUT_COUNTY
          },
          IsDeceased: 'No',
          Address: {
            country: 'United States',
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
          Relation: 'Father',
          Citizenship: {
            value: [
              { name: 'United States', value: 'United States' }
            ]
          },
          Birthplace: {
            city: 'Munich',
            country: 'Germany',
            layout: Location.BIRTHPLACE_WITHOUT_COUNTY
          },
          IsDeceased: 'No',
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany',
            layout: Location.ADDRESS
          },
          DocumentNumber: {}
        },
        expected: false
      },
      {
        state: {
          Relation: 'Father',
          Citizenship: {
            value: [
              { name: 'United States', value: 'United States' }
            ]
          },
          Birthplace: {
            city: 'Munich',
            country: 'Germany',
            layout: Location.BIRTHPLACE_WITHOUT_COUNTY
          },
          IsDeceased: 'No',
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany',
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
          Relation: 'Father',
          IsDeceased: 'Yes'
        },
        expected: true
      },
      {
        state: {
          Relation: 'Father',
          IsDeceased: 'No'
        },
        expected: true
      },
      {
        state: {
          Relation: 'Father',
          IsDeceased: 'No',
          Citizenship: {
            value: [
              { name: 'United States', value: 'United States' }
            ]
          },
          Birthplace: {
            city: 'Arlington',
            state: 'Virginia',
            country: 'United States',
            layout: Location.BIRTHPLACE_WITHOUT_COUNTY
          },
          Address: {
            country: 'United States',
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
          Relation: 'Father',
          Citizenship: {
            value: [
              { name: 'United States', value: 'United States' }
            ]
          },
          Birthplace: {
            city: 'Munich',
            country: 'Germany',
            layout: Location.BIRTHPLACE_WITHOUT_COUNTY
          },
          IsDeceased: 'No',
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany',
            layout: Location.ADDRESS
          },
          CourtName: {}
        },
        expected: false
      },
      {
        state: {
          Relation: 'Father',
          Citizenship: {
            value: [
              { name: 'United States', value: 'United States' }
            ]
          },
          Birthplace: {
            city: 'Munich',
            country: 'Germany',
            layout: Location.BIRTHPLACE_WITHOUT_COUNTY
          },
          IsDeceased: 'No',
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany',
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
          Relation: 'Father',
          IsDeceased: 'Yes'
        },
        expected: true
      },
      {
        state: {
          Relation: 'Father',
          IsDeceased: 'No'
        },
        expected: true
      },
      {
        state: {
          Relation: 'Father',
          Citizenship: {
            value: [
              { name: 'United States', value: 'United States' }
            ]
          },
          Birthplace: {
            city: 'Arlington',
            state: 'Virginia',
            country: 'United States',
            layout: Location.BIRTHPLACE_WITHOUT_COUNTY
          },
          IsDeceased: 'No',
          Address: {
            country: 'United States',
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
          Relation: 'Father',
          Citizenship: {
            value: [
              { name: 'United States', value: 'United States' }
            ]
          },
          Birthplace: {
            city: 'Munich',
            country: 'Germany',
            layout: Location.BIRTHPLACE_WITHOUT_COUNTY
          },
          IsDeceased: 'No',
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany',
            layout: Location.ADDRESS
          },
          CourtAddress: {}
        },
        expected: false
      },
      {
        state: {
          Relation: 'Father',
          Citizenship: {
            value: [
              { name: 'United States', value: 'United States' }
            ]
          },
          Birthplace: {
            city: 'Munich',
            country: 'Germany',
            layout: Location.BIRTHPLACE_WITHOUT_COUNTY
          },
          IsDeceased: 'No',
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            zipcode: '22202',
            country: 'Germany',
            layout: Location.ADDRESS
          },
          CourtAddress: {
            street: '1234 Some Rd',
            city: 'Arlington',
            zipcode: '22202',
            state: 'Virginia',
            country: 'United States',
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
          Relation: 'Father',
          IsDeceased: 'Yes'
        },
        expected: true
      },
      {
        state: {
          Relation: 'Father',
          Citizenship: {
            value: [
              { name: 'United States', value: 'United States' }
            ]
          },
          IsDeceased: 'No'
        },
        expected: true
      },
      {
        state: {
          Relation: 'Father',
          Citizenship: {
            value: [
              { name: 'Germany', value: 'Germany' }
            ]
          },
          IsDeceased: 'No',
          Document: ''
        },
        expected: false
      },
      {
        state: {
          Relation: 'Father',
          Citizenship: {
            value: [
              { name: 'Germany', value: 'Germany' }
            ]
          },
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
          Relation: 'Father',
          IsDeceased: 'Yes'
        },
        expected: true
      },
      {
        state: {
          Relation: 'Father',
          Citizenship: {
            value: [
              { name: 'United States', value: 'United States' }
            ]
          },
          IsDeceased: 'No'
        },
        expected: true
      },
      {
        state: {
          Relation: 'Father',
          Citizenship: {
            value: [
              { name: 'Germany', value: 'Germany' }
            ]
          },
          IsDeceased: 'No',
          ResidenceDocumentNumber: {}
        },
        expected: false
      },
      {
        state: {
          Relation: 'Father',
          Citizenship: {
            value: [
              { name: 'Germany', value: 'Germany' }
            ]
          },
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
          Relation: 'Father',
          IsDeceased: 'Yes'
        },
        expected: true
      },
      {
        state: {
          Relation: 'Father',
          Citizenship: {
            value: [
              { name: 'United States', value: 'United States' }
            ]
          },
          IsDeceased: 'No'
        },
        expected: true
      },
      {
        state: {
          Relation: 'Father',
          Citizenship: {
            value: [
              { name: 'Germany', value: 'Germany' }
            ]
          },
          IsDeceased: 'No',
          Expiration: {}
        },
        expected: false
      },
      {
        state: {
          Relation: 'Father',
          Citizenship: {
            value: [
              { name: 'Germany', value: 'Germany' }
            ]
          },
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
          IsDeceased: 'No',
          Address: {
            country: 'United States',
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
          IsDeceased: 'No',
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany',
            layout: Location.ADDRESS
          },
          FirstContact: {}
        },
        expected: false
      },
      {
        state: {
          IsDeceased: 'No',
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany',
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
          IsDeceased: 'No',
          Address: {
            country: 'United States',
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
          IsDeceased: 'No',
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany',
            layout: Location.ADDRESS
          },
          LastContact: {}
        },
        expected: false
      },
      {
        state: {
          IsDeceased: 'No',
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany',
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
          IsDeceased: 'No',
          Address: {
            country: 'United States',
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
          IsDeceased: 'No',
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany',
            layout: Location.ADDRESS
          },
          Methods: []
        },
        expected: false
      },
      {
        state: {
          IsDeceased: 'No',
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany',
            layout: Location.ADDRESS
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
          IsDeceased: 'No',
          Address: {
            country: 'United States',
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
          IsDeceased: 'No',
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany',
            layout: Location.ADDRESS
          },
          Frequency: ''
        },
        expected: false
      },
      {
        state: {
          IsDeceased: 'No',
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany',
            layout: Location.ADDRESS
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
          IsDeceased: 'No',
          Address: {
            country: 'United States',
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
          IsDeceased: 'No',
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany',
            layout: Location.ADDRESS
          },
          Employer: {}
        },
        expected: false
      },
      {
        state: {
          IsDeceased: 'No',
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany',
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
          IsDeceased: 'No',
          Address: {
            country: 'United States',
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
          IsDeceased: 'No',
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany',
            layout: Location.ADDRESS
          },
          EmployerAddress: {}
        },
        expected: false
      },
      {
        state: {
          IsDeceased: 'No',
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany',
            layout: Location.ADDRESS
          },
          EmployerAddress: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: 'United States',
            layout: Location.STREET_CITY
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
          Citizenship: [ 'Germany' ],
          IsDeceased: 'No',
          Address: {
            country: 'United States',
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
          Citizenship: [ 'Germany' ],
          IsDeceased: 'No',
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany',
            layout: Location.ADDRESS
          },
          HasAffiliation: ''
        },
        expected: false
      },
      {
        state: {
          Citizenship: [ 'Germany' ],
          IsDeceased: 'No',
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany',
            layout: Location.ADDRESS
          },
          HasAffiliation: 'No'
        },
        expected: true
      },
      {
        state: {
          Citizenship: [ 'Germany' ],
          IsDeceased: 'No',
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany',
            layout: Location.ADDRESS
          },
          HasAffiliation: 'Yes',
          EmployerRelationship: {}
        },
        expected: false
      },
      {
        state: {
          Citizenship: [ 'Germany' ],
          IsDeceased: 'No',
          Address: {
            street: '1234 Some Rd',
            city: 'Munich',
            country: 'Germany',
            layout: Location.ADDRESS
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
          List: [
            {
              Item: {
                Relation: 'Mother'
              }
            }
          ],
          ListBranch: 'No'
        },
        expected: false
      },
      {
        state: {
          List: [
            {
              Item: {
                Relation: 'Mother'
              }
            }
          ],
          ListBranch: 'Nope'
        },
        expected: false
      },
      {
        state: {
          List: [
            {
              Item: {
                Relation: 'Mother',
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
                  country: 'United States',
                  layout: Location.BIRTHPLACE_WITHOUT_COUNTY
                },
                Citizenship: {
                  value: [
                    { name: 'United States', value: 'United States' }
                  ]
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
                      },
                      Reason: {
                        value: 'The reason'
                      }
                    }
                  }
                ],
                IsDeceased: 'No',
                Address: {
                  country: 'United States',
                  street: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'Virginia',
                  zipcode: '22202',
                  layout: Location.ADDRESS
                }
              }
            }
          ],
          ListBranch: 'No'
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new RelativesValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
