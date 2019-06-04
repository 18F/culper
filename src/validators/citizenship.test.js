import CitizenshipValidator, {
  isCertificateRequired,
  isDocumentRequired,
} from './citizenship'
import Location from '../components/Form/Location'

describe('citizenship component validation', () => {
  it('can validate status', () => {
    const tests = [
      {
        data: {
          CitizenshipStatus: { value: '' },
        },
        expected: false,
      },
      {
        data: {
          CitizenshipStatus: { value: 'Yuppers' },
        },
        expected: false,
      },
      {
        data: {
          CitizenshipStatus: { value: 'Citizen' },
        },
        expected: true,
      },
      {
        data: {
          CitizenshipStatus: { value: 'ForeignBorn' },
        },
        expected: true,
      },
      {
        data: {
          CitizenshipStatus: { value: 'Naturalized' },
        },
        expected: true,
      },
      {
        data: {
          CitizenshipStatus: { value: 'Derived' },
        },
        expected: true,
      },
      {
        data: {
          CitizenshipStatus: { value: 'NotCitizen' },
        },
        expected: true,
      },
    ]

    tests.forEach((test) => {
      expect(new CitizenshipValidator(test.data).validCitizenshipStatus()).toBe(
        test.expected
      )
    })
  })

  describe('isDocumentRequired', () => {
    it('returns true if document is provided', () => {
      const expected = {
        CitizenshipStatus: { value: 'ForeignBorn' },
        AbroadDocumentation: { value: 'FS-545' },
        Explanation: { value: '' },
        DocumentNumber: { value: '12345abc' },
        DocumentIssued: {
          month: '1', day: '1', year: '1998', estimated: false,
        },
        DocumentName: {
          first: 'Henry',
          firstInitialOnly: false,
          middle: 'J',
          middleInitialOnly: true,
          noMiddleName: false,
          last: 'Simpleton',
          suffix: '',
          suffixOther: '',
        },
        DocumentExpiration: {
          month: '1', day: '1', year: '2018', estimated: false,
        },
        PlaceIssued: {
          layout: 'Birthplace without County',
          city: 'Venice',
          country: 'Italy',
        },
      }
      expect(isDocumentRequired(expected)).toBe(true)
    })
    it('returns true if document not provided', () => {
      const expected = {
        CitizenshipStatus: { value: 'ForeignBorn' },
      }
      expect(isDocumentRequired(expected)).toBe(true)
    })
    it('returns true if document is partial and certificate provided', () => {
      const expected = {
        CitizenshipStatus: { value: 'ForeignBorn' },
        AbroadDocumentation: { value: 'FS-545' },
        Explanation: { value: '' },
        DocumentNumber: { value: '' },
        DocumentIssued: {
          month: '', day: '', year: '', estimated: false,
        },
        DocumentName: {
          first: 'Henry',
          firstInitialOnly: false,
          middle: 'J',
          middleInitialOnly: true,
          noMiddleName: false,
          last: 'Simpleton',
          suffix: '',
          suffixOther: '',
        },
        DocumentExpiration: {
          month: '1', day: '1', year: '2018', estimated: false,
        },
        PlaceIssued: {
          layout: 'Birthplace without County',
          city: 'Venice',
          country: 'Italy',
        },
        CertificateNumber: { value: '12345abc' },
        CertificateIssued: {
          month: '1', day: '1', year: '1998', estimated: false,
        },
        CertificateName: {
          first: 'Henry',
          firstInitialOnly: false,
          middle: 'J',
          middleInitialOnly: true,
          noMiddleName: false,
          last: 'Simpleton',
          suffix: '',
          suffixOther: '',
        },
      }
      expect(isDocumentRequired(expected)).toBe(true)
    })
    it('returns false if certificate is provided', () => {
      const expected = {
        CitizenshipStatus: { value: 'ForeignBorn' },
        CertificateNumber: { value: '12345abc' },
        CertificateIssued: {
          month: '1', day: '1', year: '1998', estimated: false,
        },
        CertificateName: {
          first: 'Henry',
          firstInitialOnly: false,
          middle: 'J',
          middleInitialOnly: true,
          noMiddleName: false,
          last: 'Simpleton',
          suffix: '',
          suffixOther: '',
        },
      }
      expect(isDocumentRequired(expected)).toBe(false)
    })
  })
  describe('isCertificateRequired', () => {
    it('returns true if certificate is provided', () => {
      const expected = {
        CitizenshipStatus: { value: 'ForeignBorn' },
        CertificateNumber: { value: '12345abc' },
        CertificateIssued: {
          month: '1', day: '1', year: '1998', estimated: false,
        },
        CertificateName: {
          first: 'Henry',
          firstInitialOnly: false,
          middle: 'J',
          middleInitialOnly: true,
          noMiddleName: false,
          last: 'Simpleton',
          suffix: '',
          suffixOther: '',
        },
      }
      expect(isCertificateRequired(expected)).toBe(true)
    })
    it('returns true if certificate not provided', () => {
      const expected = {
        CitizenshipStatus: { value: 'ForeignBorn' },
      }
      expect(isCertificateRequired(expected)).toBe(true)
    })
    it('returns true if certificate is partial and document provided', () => {
      const expected = {
        CitizenshipStatus: { value: 'ForeignBorn' },
        AbroadDocumentation: { value: 'Other' },
        Explanation: { value: 'I have another document' },
        CertificateNumber: { value: '' },
        CertificateIssued: {
          month: '', day: '', year: '', estimated: false,
        },
        CertificateName: {
          first: 'Henry',
          firstInitialOnly: false,
          middle: 'J',
          middleInitialOnly: true,
          noMiddleName: false,
          last: 'Simpleton',
          suffix: '',
          suffixOther: '',
        },
      }
      expect(isCertificateRequired(expected)).toBe(true)
    })
    it('returns false if document is provided', () => {
      const expected = {
        CitizenshipStatus: { value: 'ForeignBorn' },
        AbroadDocumentation: { value: 'Other' },
        Explanation: { value: 'I have a different document' },
      }
      expect(isCertificateRequired(expected)).toBe(false)
    })
  })

  it('can validate abroad documentation', () => {
    const tests = [
      {
        data: {
          CitizenshipStatus: { value: 'ForeignBorn' },
          AbroadDocumentation: { value: '' },
        },
        expected: false,
      },
      {
        data: {
          CitizenshipStatus: { value: 'ForeignBorn' },
          AbroadDocumentation: { value: 'Yuppers' },
        },
        expected: false,
      },
      {
        data: {
          CitizenshipStatus: { value: 'ForeignBorn' },
          AbroadDocumentation: { value: 'FS-240' },
        },
        expected: true,
      },
      {
        data: {
          CitizenshipStatus: { value: 'ForeignBorn' },
          AbroadDocumentation: { value: 'Other' },
          Explanation: null,
        },
        expected: false,
      },
      {
        data: {
          CitizenshipStatus: { value: 'ForeignBorn' },
          AbroadDocumentation: { value: 'Other' },
          Explanation: {
            value: 'Explanation',
          },
        },
        expected: true,
      },
    ]

    tests.forEach((test) => {
      expect(
        new CitizenshipValidator(test.data).validAbroadDocumentation()
      ).toBe(test.expected)
    })
  })

  it('can validate born on military installation', () => {
    const tests = [
      {
        data: {
          CitizenshipStatus: { value: 'ForeignBorn' },
          BornOnMilitaryInstallation: { value: '' },
        },
        expected: false,
      },
      {
        data: {
          CitizenshipStatus: { value: 'ForeignBorn' },
          BornOnMilitaryInstallation: { value: 'Yuppers' },
        },
        expected: false,
      },
      {
        data: {
          CitizenshipStatus: { value: 'ForeignBorn' },
          BornOnMilitaryInstallation: { value: 'No' },
        },
        expected: true,
      },
      {
        data: {
          CitizenshipStatus: { value: 'ForeignBorn' },
          BornOnMilitaryInstallation: { value: 'Yes' },
          MilitaryBase: null,
        },
        expected: false,
      },
      {
        data: {
          CitizenshipStatus: { value: 'ForeignBorn' },
          BornOnMilitaryInstallation: { value: 'Yes' },
          MilitaryBase: {
            value: 'Camp Pendleton',
          },
        },
        expected: true,
      },
    ]

    tests.forEach((test) => {
      expect(
        new CitizenshipValidator(test.data).validBornOnMilitaryInstallation()
      ).toBe(test.expected)
    })
  })

  it('can validate alien registration', () => {
    const tests = [
      {
        data: {
          CitizenshipStatus: { value: 'Naturalized' },
          HasAlienRegistration: { value: '' },
        },
        expected: false,
      },
      {
        data: {
          CitizenshipStatus: { value: 'Naturalized' },
          HasAlienRegistration: { value: 'Yuppers' },
        },
        expected: false,
      },
      {
        data: {
          CitizenshipStatus: { value: 'Naturalized' },
          HasAlienRegistration: { value: 'No' },
        },
        expected: true,
      },
      {
        data: {
          CitizenshipStatus: { value: 'Naturalized' },
          HasAlienRegistration: { value: 'Yes' },
          AlienRegistrationNumber: null,
        },
        expected: false,
      },
      {
        data: {
          CitizenshipStatus: { value: 'Naturalized' },
          HasAlienRegistration: { value: 'Yes' },
          AlienRegistrationNumber: {
            value: 'number',
          },
        },
        expected: true,
      },
    ]

    tests.forEach((test) => {
      expect(new CitizenshipValidator(test.data).validAlienRegistration()).toBe(
        test.expected
      )
    })
  })

  it('can validate basis', () => {
    const tests = [
      {
        data: {
          CitizenshipStatus: { value: 'Naturalized' },
          Basis: { value: '' },
        },
        expected: false,
      },
      {
        data: {
          CitizenshipStatus: { value: 'Naturalized' },
          Basis: { value: 'Some othe option' },
        },
        expected: true,
      },
      {
        data: {
          CitizenshipStatus: { value: 'Naturalized' },
          Basis: { value: 'Other' },
          Explanation: null,
        },
        expected: false,
      },
      {
        data: {
          CitizenshipStatus: { value: 'Naturalized' },
          Basis: { value: 'Other' },
          Explanation: {
            value: 'Explanation',
          },
        },
        expected: true,
      },
    ]

    tests.forEach((test) => {
      expect(new CitizenshipValidator(test.data).validBasis()).toBe(
        test.expected
      )
    })
  })

  it('can validate document types', () => {
    const tests = [
      {
        data: {
          CitizenshipStatus: { value: 'NotCitizen' },
          DocumentType: { value: 'blah' },
        },
        expected: false,
      },
      {
        data: {
          CitizenshipStatus: { value: 'NotCitizen' },
          DocumentType: { value: 'Yuppers' },
        },
        expected: false,
      },
      {
        data: {
          CitizenshipStatus: { value: 'NotCitizen' },
          DocumentType: { value: 'I-94' },
        },
        expected: true,
      },
      {
        data: {
          CitizenshipStatus: { value: 'NotCitizen' },
          DocumentType: { value: 'Other' },
          Explanation: null,
        },
        expected: false,
      },
      {
        data: {
          CitizenshipStatus: { value: 'NotCitizen' },
          DocumentType: { value: 'Other' },
          Explanation: {
            value: 'Explanation',
          },
        },
        expected: true,
      },
    ]

    tests.forEach((test) => {
      expect(new CitizenshipValidator(test.data).validDocumentType()).toBe(
        test.expected
      )
    })
  })

  it('can validate', () => {
    const tests = [
      {
        data: {
          CitizenshipStatus: { value: 'Citizen' },
        },
        expected: true,
      },
      {
        data: {
          CitizenshipStatus: { value: 'ForeignBorn' },
          AbroadDocumentation: { value: 'Other' },
          Explanation: {
            value: 'Explanation',
          },
          DocumentNumber: {
            value: 'document number',
          },
          DocumentIssued: {
            day: '1',
            month: '1',
            year: '2016',
          },
          PlaceIssued: {
            layout: Location.CITY_STATE_COUNTRY,
            country: { value: 'United States' },
            city: 'Arlington',
            state: 'VA',
          },
          DocumentName: {
            first: 'Foo',
            firstInitialOnly: false,
            middle: 'J',
            middleInitialOnly: true,
            noMiddleName: false,
            last: 'Bar',
            suffix: 'Jr',
          },
          BornOnMilitaryInstallation: { value: 'No' },
        },
        expected: true,
      },
      {
        data: {
          CitizenshipStatus: { value: 'ForeignBorn' },
          CertificateNumber: {
            value: 'certificate number',
          },
          CertificateIssued: {
            day: '1',
            month: '1',
            year: '2016',
          },
          CertificateName: {
            first: 'Foo',
            firstInitialOnly: false,
            middle: 'J',
            middleInitialOnly: true,
            noMiddleName: false,
            last: 'Bar',
            suffix: 'Jr',
          },
          BornOnMilitaryInstallation: { value: 'Yes' },
          MilitaryBase: {
            value: 'Camp Pendleton',
          },
        },
        expected: true,
      },
      {
        data: {
          CitizenshipStatus: { value: 'Naturalized' },
          EntryDate: {
            day: '1',
            month: '1',
            year: '2016',
          },
          EntryLocation: {
            country: { value: 'United States' },
            city: 'Arlington',
            state: 'VA',
            layout: Location.CITY_STATE,
          },
          PriorCitizenship: {
            value: ['Germany'],
          },
          HasAlienRegistration: { value: 'Yes' },
          AlienRegistrationNumber: {
            value: 'number',
          },
          CertificateNumber: {
            value: 'certificate number',
          },
          CertificateCourtName: {
            value: 'court name',
          },
          CertificateCourtAddress: {
            country: 'United States',
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.US_ADDRESS,
          },
          CertificateIssued: {
            day: '1',
            month: '1',
            year: '2016',
          },
          CertificateName: {
            first: 'Foo',
            firstInitialOnly: false,
            middle: 'J',
            middleInitialOnly: true,
            noMiddleName: false,
            last: 'Bar',
            suffix: 'Jr',
          },
          Basis: { value: 'Other' },
          Explanation: {
            value: 'Explanation',
          },
        },
        expected: true,
      },
      {
        data: {
          CitizenshipStatus: { value: 'Derived' },
          AlienRegistrationNumber: {
            value: '',
          },
          PermanentResidentCardNumber: {
            value: '',
          },
          CertificateNumber: {
            value: '',
          },
          CertificateName: {
            first: 'Foo',
            firstInitialOnly: false,
            middle: 'J',
            middleInitialOnly: true,
            noMiddleName: false,
            last: 'Bar',
            suffix: 'Jr',
          },
          CertificateIssued: {
            day: '1',
            month: '1',
            year: '2016',
          },
          Basis: { value: 'Other' },
          Explanation: {
            value: 'Explanation',
          },
        },
        expected: false,
      },
      {
        data: {
          CitizenshipStatus: { value: 'Derived' },
          AlienRegistrationNumber: {
            value: 'number',
          },
          PermanentResidentCardNumber: {
            value: 'number',
          },
          CertificateNumber: {
            value: 'certificate number',
          },
          CertificateName: {
            first: 'Foo',
            firstInitialOnly: false,
            middle: 'J',
            middleInitialOnly: true,
            noMiddleName: false,
            last: 'Bar',
            suffix: 'Jr',
          },
          CertificateIssued: {
            day: '1',
            month: '1',
            year: '2016',
          },
          Basis: { value: 'Other' },
          Explanation: {
            value: 'Explanation',
          },
        },
        expected: true,
      },
      {
        data: {
          CitizenshipStatus: { value: 'Derived' },
          AlienRegistrationNumber: {
            value: 'number',
          },
          PermanentResidentCardNumber: {
            value: '',
          },
          CertificateNumber: {
            value: '',
          },
          CertificateName: {
            first: 'Foo',
            firstInitialOnly: false,
            middle: 'J',
            middleInitialOnly: true,
            noMiddleName: false,
            last: 'Bar',
            suffix: 'Jr',
          },
          CertificateIssued: {
            day: '1',
            month: '1',
            year: '2016',
          },
          Basis: { value: 'Other' },
          Explanation: {
            value: 'Explanation',
          },
        },
        expected: true,
      },
      {
        data: {
          CitizenshipStatus: { value: 'Derived' },
          AlienRegistrationNumber: {
            value: '',
          },
          PermanentResidentCardNumber: {
            value: 'number',
          },
          CertificateNumber: {
            value: '',
          },
          CertificateName: {
            first: 'Foo',
            firstInitialOnly: false,
            middle: 'J',
            middleInitialOnly: true,
            noMiddleName: false,
            last: 'Bar',
            suffix: 'Jr',
          },
          CertificateIssued: {
            day: '1',
            month: '1',
            year: '2016',
          },
          Basis: { value: 'Other' },
          Explanation: {
            value: 'Explanation',
          },
        },
        expected: true,
      },
      {
        data: {
          CitizenshipStatus: { value: 'Derived' },
          AlienRegistrationNumber: {
            value: 'number',
          },
          PermanentResidentCardNumber: {
            value: '',
          },
          CertificateNumber: {
            value: '',
          },
          CertificateName: {
            first: 'Foo',
            firstInitialOnly: false,
            middle: 'J',
            middleInitialOnly: true,
            noMiddleName: false,
            last: 'Bar',
            suffix: 'Jr',
          },
          CertificateIssued: {
            day: '1',
            month: '1',
            year: '2016',
          },
          Basis: { value: 'Other' },
          Explanation: {
            value: 'Explanation',
          },
        },
        expected: true,
      },
      {
        data: {
          CitizenshipStatus: { value: 'NotCitizen' },
          ResidenceStatus: {
            value: 'status',
          },
          EntryDate: {
            day: '1',
            month: '1',
            year: '2016',
          },
          EntryLocation: {
            city: 'Arlington',
            state: 'VA',
            country: { value: 'United States' },
            layout: Location.CITY_STATE,
          },
          PriorCitizenship: {
            value: ['Germany'],
          },
          AlienRegistrationNumber: {
            value: 'number',
          },
          AlienRegistrationExpiration: {
            day: '1',
            month: '1',
            year: '2016',
          },
          DocumentType: { value: 'Other' },
          Explanation: {
            value: 'Explanation',
          },
          DocumentNumber: {
            value: 'document number',
          },
          DocumentName: {
            first: 'Foo',
            firstInitialOnly: false,
            middle: 'J',
            middleInitialOnly: true,
            noMiddleName: false,
            last: 'Bar',
            suffix: 'Jr',
          },
          DocumentIssued: {
            day: '1',
            month: '1',
            year: '2016',
          },
          DocumentExpiration: {
            day: '1',
            month: '1',
            year: '2016',
          },
        },
        expected: true,
      },
    ]

    tests.forEach((test) => {
      expect(new CitizenshipValidator(test.data).isValid()).toBe(test.expected)
    })
  })
})
