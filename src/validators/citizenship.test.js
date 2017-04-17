import CitizenshipValidator from './citizenship'

describe('citizenship component validation', function () {
  it('can validate status', () => {
    const tests = [
      {
        state: {
          CitizenshipStatus: ''
        },
        expected: false
      },
      {
        state: {
          CitizenshipStatus: 'Yuppers'
        },
        expected: false
      },
      {
        state: {
          CitizenshipStatus: 'Citizen'
        },
        expected: true
      },
      {
        state: {
          CitizenshipStatus: 'ForeignBorn'
        },
        expected: true
      },
      {
        state: {
          CitizenshipStatus: 'Naturalized'
        },
        expected: true
      },
      {
        state: {
          CitizenshipStatus: 'Derived'
        },
        expected: true
      },
      {
        state: {
          CitizenshipStatus: 'NotCitizen'
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new CitizenshipValidator(test.state, null).validCitizenshipStatus()).toBe(test.expected)
    })
  })

  it('can validate abroad documentation', () => {
    const tests = [
      {
        state: {
          AbroadDocumentation: ''
        },
        expected: false
      },
      {
        state: {
          AbroadDocumentation: 'Yuppers'
        },
        expected: false
      },
      {
        state: {
          AbroadDocumentation: 'FS-240'
        },
        expected: true
      },
      {
        state: {
          AbroadDocumentation: 'Other',
          Explanation: null
        },
        expected: false
      },
      {
        state: {
          AbroadDocumentation: 'Other',
          Explanation: {
            value: 'Explanation'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new CitizenshipValidator(test.state, null).validAbroadDocumentation()).toBe(test.expected)
    })
  })

  it('can validate born on military installation', () => {
    const tests = [
      {
        state: {
          BornOnMilitaryInstallation: ''
        },
        expected: false
      },
      {
        state: {
          BornOnMilitaryInstallation: 'Yuppers'
        },
        expected: false
      },
      {
        state: {
          BornOnMilitaryInstallation: 'No'
        },
        expected: true
      },
      {
        state: {
          BornOnMilitaryInstallation: 'Yes',
          MilitaryBase: null
        },
        expected: false
      },
      {
        state: {
          BornOnMilitaryInstallation: 'Yes',
          MilitaryBase: {
            value: 'Camp Pendleton'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new CitizenshipValidator(test.state, null).validBornOnMilitaryInstallation()).toBe(test.expected)
    })
  })

  it('can validate alien registration', () => {
    const tests = [
      {
        state: {
          HasAlienRegistration: ''
        },
        expected: false
      },
      {
        state: {
          HasAlienRegistration: 'Yuppers'
        },
        expected: false
      },
      {
        state: {
          HasAlienRegistration: 'No'
        },
        expected: true
      },
      {
        state: {
          HasAlienRegistration: 'Yes',
          AlienRegistrationNumber: null
        },
        expected: false
      },
      {
        state: {
          HasAlienRegistration: 'Yes',
          AlienRegistrationNumber: {
            value: 'number'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new CitizenshipValidator(test.state, null).validAlienRegistration()).toBe(test.expected)
    })
  })

  it('can validate basis', () => {
    const tests = [
      {
        state: {
          Basis: ''
        },
        expected: false
      },
      {
        state: {
          Basis: 'Some othe option'
        },
        expected: true
      },
      {
        state: {
          Basis: 'Other',
          Explanation: null
        },
        expected: false
      },
      {
        state: {
          Basis: 'Other',
          Explanation: {
            value: 'Explanation'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new CitizenshipValidator(test.state, null).validBasis()).toBe(test.expected)
    })
  })

  it('can validate document types', () => {
    const tests = [
      {
        state: {
          DocumentType: ''
        },
        expected: false
      },
      {
        state: {
          DocumentType: 'Yuppers'
        },
        expected: false
      },
      {
        state: {
          DocumentType: 'I-94'
        },
        expected: true
      },
      {
        state: {
          DocumentType: 'Other',
          Explanation: null
        },
        expected: false
      },
      {
        state: {
          DocumentType: 'Other',
          Explanation: {
            value: 'Explanation'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new CitizenshipValidator(test.state, null).validDocumentType()).toBe(test.expected)
    })
  })

  it('can validate', () => {
    const tests = [
      {
        state: {
          CitizenshipStatus: 'Citizen'
        },
        expected: true
      },
      {
        state: {
          CitizenshipStatus: 'ForeignBorn',
          AbroadDocumentation: 'Other',
          Explanation: {
            value: 'Explanation'
          },
          DocumentNumber: {
            value: 'document number'
          },
          DocumentIssued: {
            day: '1',
            month: '1',
            year: '2016',
            date: new Date('1/1/2016')
          },
          PlaceIssued: {
            addressType: 'United States',
            address: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202'
          },
          DocumentName: {
            first: 'Foo',
            firstInitialOnly: false,
            middle: 'J',
            middleInitialOnly: true,
            noMiddleName: false,
            last: 'Bar',
            lastInitialOnly: false,
            suffix: 'Jr'
          },
          CertificateNumber: {
            value: 'certificate number'
          },
          CertificateIssued: {
            day: '1',
            month: '1',
            year: '2016',
            date: new Date('1/1/2016')
          },
          CertificateName: {
            first: 'Foo',
            firstInitialOnly: false,
            middle: 'J',
            middleInitialOnly: true,
            noMiddleName: false,
            last: 'Bar',
            lastInitialOnly: false,
            suffix: 'Jr'
          },
          BornOnMilitaryInstallation: 'Yes',
          MilitaryBase: {
            value: 'Camp Pendleton'
          }
        },
        expected: true
      },
      {
        state: {
          CitizenshipStatus: 'Naturalized',
          EntryDate: {
            day: '1',
            month: '1',
            year: '2016',
            date: new Date('1/1/2016')
          },
          EntryLocation: {
            addressType: 'United States',
            address: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202'
          },
          PriorCitizenship: ['Germany'],
          HasAlienRegistration: 'Yes',
          AlienRegistrationNumber: {
            value: 'number'
          },
          CertificateNumber: {
            value: 'certificate number'
          },
          CertificateCourtName: {
            value: 'court name'
          },
          CertificateCourtAddress: {
            addressType: 'United States',
            address: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202'
          },
          CertificateIssued: {
            day: '1',
            month: '1',
            year: '2016',
            date: new Date('1/1/2016')
          },
          CertificateName: {
            first: 'Foo',
            firstInitialOnly: false,
            middle: 'J',
            middleInitialOnly: true,
            noMiddleName: false,
            last: 'Bar',
            lastInitialOnly: false,
            suffix: 'Jr'
          },
          Basis: 'Other',
          Explanation: {
            value: 'Explanation'
          }
        },
        expected: true
      },
      {
        state: {
          CitizenshipStatus: 'Derived',
          AlienRegistrationNumber: {
            value: 'number'
          },
          PermanentResidentCardNumber: {
            value: 'number'
          },
          CertificateNumber: {
            value: 'certificate number'
          },
          CertificateName: {
            first: 'Foo',
            firstInitialOnly: false,
            middle: 'J',
            middleInitialOnly: true,
            noMiddleName: false,
            last: 'Bar',
            lastInitialOnly: false,
            suffix: 'Jr'
          },
          CertificateIssued: {
            day: '1',
            month: '1',
            year: '2016',
            date: new Date('1/1/2016')
          },
          Basis: 'Other',
          Explanation: {
            value: 'Explanation'
          }
        },
        expected: true
      },
      {
        state: {
          CitizenshipStatus: 'NotCitizen',
          ResidenceStatus: {
            value: 'status'
          },
          EntryDate: {
            day: '1',
            month: '1',
            year: '2016',
            date: new Date('1/1/2016')
          },
          EntryLocation: {
            addressType: 'United States',
            address: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202'
          },
          PriorCitizenship: ['Germany'],
          AlienRegistrationNumber: {
            value: 'number'
          },
          AlienRegistrationExpiration: {
            day: '1',
            month: '1',
            year: '2016',
            date: new Date('1/1/2016')
          },
          DocumentType: 'Other',
          Explanation: {
            value: 'Explanation'
          },
          DocumentNumber: {
            value: 'document number'
          },
          DocumentName: {
            first: 'Foo',
            firstInitialOnly: false,
            middle: 'J',
            middleInitialOnly: true,
            noMiddleName: false,
            last: 'Bar',
            lastInitialOnly: false,
            suffix: 'Jr'
          },
          DocumentIssued: {
            day: '1',
            month: '1',
            year: '2016',
            date: new Date('1/1/2016')
          },
          DocumentExpiration: {
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
      expect(new CitizenshipValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
