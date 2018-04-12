import CitizenshipValidator from './citizenship'
import Location from '../components/Form/Location'

describe('citizenship component validation', function () {
  it('can validate status', () => {
    const tests = [
      {
        data: {
          CitizenshipStatus: { value: '' }
        },
        expected: false
      },
      {
        data: {
          CitizenshipStatus: { value: 'Yuppers' }
        },
        expected: false
      },
      {
        data: {
          CitizenshipStatus: { value: 'Citizen' }
        },
        expected: true
      },
      {
        data: {
          CitizenshipStatus: { value: 'ForeignBorn' }
        },
        expected: true
      },
      {
        data: {
          CitizenshipStatus: { value: 'Naturalized' }
        },
        expected: true
      },
      {
        data: {
          CitizenshipStatus: { value: 'Derived' }
        },
        expected: true
      },
      {
        data: {
          CitizenshipStatus: { value: 'NotCitizen' }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new CitizenshipValidator(test.data).validCitizenshipStatus()).toBe(test.expected)
    })
  })

  it('can validate abroad documentation', () => {
    const tests = [
      {
        data: {
          AbroadDocumentation: { value: '' }
        },
        expected: false
      },
      {
        data: {
          AbroadDocumentation: { value: 'Yuppers' }
        },
        expected: false
      },
      {
        data: {
          AbroadDocumentation: { value: 'FS-240' }
        },
        expected: true
      },
      {
        data: {
          AbroadDocumentation: { value: 'Other' },
          Explanation: null
        },
        expected: false
      },
      {
        data: {
          AbroadDocumentation: { value: 'Other' },
          Explanation: {
            value: 'Explanation'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new CitizenshipValidator(test.data).validAbroadDocumentation()).toBe(test.expected)
    })
  })

  it('can validate born on military installation', () => {
    const tests = [
      {
        data: {
          BornOnMilitaryInstallation: { value: '' }
        },
        expected: false
      },
      {
        data: {
          BornOnMilitaryInstallation: { value: 'Yuppers' }
        },
        expected: false
      },
      {
        data: {
          BornOnMilitaryInstallation: { value: 'No' }
        },
        expected: true
      },
      {
        data: {
          BornOnMilitaryInstallation: { value: 'Yes' },
          MilitaryBase: null
        },
        expected: false
      },
      {
        data: {
          BornOnMilitaryInstallation: { value: 'Yes' },
          MilitaryBase: {
            value: 'Camp Pendleton'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new CitizenshipValidator(test.data).validBornOnMilitaryInstallation()).toBe(test.expected)
    })
  })

  it('can validate alien registration', () => {
    const tests = [
      {
        data: {
          HasAlienRegistration: { value: '' }
        },
        expected: false
      },
      {
        data: {
          HasAlienRegistration: { value: 'Yuppers' }
        },
        expected: false
      },
      {
        data: {
          HasAlienRegistration: { value: 'No' }
        },
        expected: true
      },
      {
        data: {
          HasAlienRegistration: { value: 'Yes' },
          AlienRegistrationNumber: null
        },
        expected: false
      },
      {
        data: {
          HasAlienRegistration: { value: 'Yes' },
          AlienRegistrationNumber: {
            value: 'number'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new CitizenshipValidator(test.data).validAlienRegistration()).toBe(test.expected)
    })
  })

  it('can validate basis', () => {
    const tests = [
      {
        data: {
          Basis: { value: '' }
        },
        expected: false
      },
      {
        data: {
          Basis: { value: 'Some othe option' }
        },
        expected: true
      },
      {
        data: {
          Basis: { value: 'Other' },
          Explanation: null
        },
        expected: false
      },
      {
        data: {
          Basis: { value: 'Other' },
          Explanation: {
            value: 'Explanation'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new CitizenshipValidator(test.data).validBasis()).toBe(test.expected)
    })
  })

  it('can validate document types', () => {
    const tests = [
      {
        data: {
          DocumentType: { value: '' }
        },
        expected: false
      },
      {
        data: {
          DocumentType: { value: 'Yuppers' }
        },
        expected: false
      },
      {
        data: {
          DocumentType: { value: 'I-94' }
        },
        expected: true
      },
      {
        data: {
          DocumentType: { value: 'Other' },
          Explanation: null
        },
        expected: false
      },
      {
        data: {
          DocumentType: { value: 'Other' },
          Explanation: {
            value: 'Explanation'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new CitizenshipValidator(test.data).validDocumentType()).toBe(test.expected)
    })
  })

  it('can validate', () => {
    const tests = [
      {
        data: {
          CitizenshipStatus: { value: 'Citizen' }
        },
        expected: true
      },
      {
        data: {
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
            state: 'VA'
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
        data: {
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
            state: 'VA',
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
            state: 'VA',
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
        data: {
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
        data: {
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
            state: 'VA',
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
      expect(new CitizenshipValidator(test.data).isValid()).toBe(test.expected)
    })
  })
})
