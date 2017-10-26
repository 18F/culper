import CitizenshipValidator from './citizenship'
import Location from '../components/Form/Location'

describe('citizenship component validation', function () {
  it('can validate status', () => {
    const tests = [
      {
        state: {
          CitizenshipStatus: { value: '' }
        },
        expected: false
      },
      {
        state: {
          CitizenshipStatus: { value: 'Yuppers' }
        },
        expected: false
      },
      {
        state: {
          CitizenshipStatus: { value: 'Citizen' }
        },
        expected: true
      },
      {
        state: {
          CitizenshipStatus: { value: 'ForeignBorn' }
        },
        expected: true
      },
      {
        state: {
          CitizenshipStatus: { value: 'Naturalized' }
        },
        expected: true
      },
      {
        state: {
          CitizenshipStatus: { value: 'Derived' }
        },
        expected: true
      },
      {
        state: {
          CitizenshipStatus: { value: 'NotCitizen' }
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
          AbroadDocumentation: { value: '' }
        },
        expected: false
      },
      {
        state: {
          AbroadDocumentation: { value: 'Yuppers' }
        },
        expected: false
      },
      {
        state: {
          AbroadDocumentation: { value: 'FS-240' }
        },
        expected: true
      },
      {
        state: {
          AbroadDocumentation: { value: 'Other' },
          Explanation: null
        },
        expected: false
      },
      {
        state: {
          AbroadDocumentation: { value: 'Other' },
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
          BornOnMilitaryInstallation: { value: '' }
        },
        expected: false
      },
      {
        state: {
          BornOnMilitaryInstallation: { value: 'Yuppers' }
        },
        expected: false
      },
      {
        state: {
          BornOnMilitaryInstallation: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          BornOnMilitaryInstallation: { value: 'Yes' },
          MilitaryBase: null
        },
        expected: false
      },
      {
        state: {
          BornOnMilitaryInstallation: { value: 'Yes' },
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
          HasAlienRegistration: { value: '' }
        },
        expected: false
      },
      {
        state: {
          HasAlienRegistration: { value: 'Yuppers' }
        },
        expected: false
      },
      {
        state: {
          HasAlienRegistration: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          HasAlienRegistration: { value: 'Yes' },
          AlienRegistrationNumber: null
        },
        expected: false
      },
      {
        state: {
          HasAlienRegistration: { value: 'Yes' },
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
          Basis: { value: '' }
        },
        expected: false
      },
      {
        state: {
          Basis: { value: 'Some othe option' }
        },
        expected: true
      },
      {
        state: {
          Basis: { value: 'Other' },
          Explanation: null
        },
        expected: false
      },
      {
        state: {
          Basis: { value: 'Other' },
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
          DocumentType: { value: '' }
        },
        expected: false
      },
      {
        state: {
          DocumentType: { value: 'Yuppers' }
        },
        expected: false
      },
      {
        state: {
          DocumentType: { value: 'I-94' }
        },
        expected: true
      },
      {
        state: {
          DocumentType: { value: 'Other' },
          Explanation: null
        },
        expected: false
      },
      {
        state: {
          DocumentType: { value: 'Other' },
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
          CitizenshipStatus: { value: 'Citizen' }
        },
        expected: true
      },
      {
        state: {
          CitizenshipStatus: { value: 'ForeignBorn' },
          AbroadDocumentation: { value: 'Other' },
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
            layout: Location.CITY_STATE_COUNTRY,
            country: { value: 'United States' },
            city: 'Arlington',
            state: 'Virginia'
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
          BornOnMilitaryInstallation: { value: 'Yes' },
          MilitaryBase: {
            value: 'Camp Pendleton'
          }
        },
        expected: true
      },
      {
        state: {
          CitizenshipStatus: { value: 'Naturalized' },
          EntryDate: {
            day: '1',
            month: '1',
            year: '2016',
            date: new Date('1/1/2016')
          },
          EntryLocation: {
            country: { value: 'United States' },
            city: 'Arlington',
            state: 'Virginia',
            layout: Location.CITY_STATE
          },
          PriorCitizenship: {
            value: ['Germany']
          },
          HasAlienRegistration: { value: 'Yes' },
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
            country: 'United States',
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202',
            layout: Location.US_ADDRESS
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
          Basis: { value: 'Other' },
          Explanation: {
            value: 'Explanation'
          }
        },
        expected: true
      },
      {
        state: {
          CitizenshipStatus: { value: 'Derived' },
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
          Basis: { value: 'Other' },
          Explanation: {
            value: 'Explanation'
          }
        },
        expected: true
      },
      {
        state: {
          CitizenshipStatus: { value: 'NotCitizen' },
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
            city: 'Arlington',
            state: 'Virginia',
            country: { value: 'United States' },
            layout: Location.CITY_STATE
          },
          PriorCitizenship: {
            value: ['Germany']
          },
          AlienRegistrationNumber: {
            value: 'number'
          },
          AlienRegistrationExpiration: {
            day: '1',
            month: '1',
            year: '2016',
            date: new Date('1/1/2016')
          },
          DocumentType: { value: 'Other' },
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
