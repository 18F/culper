import CitizenshipValidator, {
  isCertificatePartial,
  isDocumentationPartial,
  validateAbroadDocumentation,
  validateBornOnMilitaryInstallation,
  validateForeignBorn,
  validateDocumentation,
  validateCertificate,
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

  describe('validateAbroadDocumentation', () => {
    it('returns false if nothing is set', () => {
      expect(validateAbroadDocumentation({ abroadDocumentation: '', explanation: { value: '' } })).toBe(false)
    })
    it('returns true if FS-240, DS-1350, or FS-545 is set', () => {
      ['FS-240', 'DS-1350', 'FS-545'].forEach(form => expect(validateAbroadDocumentation({ abroadDocumentation: form, explanation: { value: '' } })).toBe(true))
    })
    it('returns false if Other is set but no explanation', () => {
      expect(validateAbroadDocumentation({ abroadDocumentation: 'Other', explanation: { value: '' } })).toBe(false)
    })
    it('returns true if Other is set with explanation', () => {
      expect(validateAbroadDocumentation({ abroadDocumentation: 'Other', explanation: { value: 'Inducted as a spy' } })).toBe(true)
    })
  })

  describe('validateBornOnMilitaryInstallation', () => {
    it('returns false if nothing is selected', () => {
      expect(validateBornOnMilitaryInstallation({ bornOnMilitaryInstallation: '', militaryBase: '' })).toBe(false)
    })

    it('returns true if No is selected', () => {
      expect(validateBornOnMilitaryInstallation({ bornOnMilitaryInstallation: 'No', militaryBase: '' })).toBe(true)
    })

    it('returns true if Yes is selected with base', () => {
      expect(validateBornOnMilitaryInstallation({ bornOnMilitaryInstallation: 'Yes', militaryBase: { value: 'Secret base in a foreign country' } })).toBe(true)
    })

    it('returns false if Yes is selected without base', () => {
      expect(validateBornOnMilitaryInstallation({ bornOnMilitaryInstallation: 'Yes', militaryBase: '' })).toBe(false)
    })
  })

  describe('validateDocumentation', () => {
    it('returns false if abroadDocumentation is missing', () => {
      const data = {
        abroadDocumentation: '',
        explanation: {
          value: '',
        },
        documentNumber: {
          value: 'document number',
        },
        documentIssued: {
          day: '1',
          month: '1',
          year: '2016',
        },
        placeIssued: {
          layout: Location.CITY_STATE_COUNTRY,
          country: { value: 'United States' },
          city: 'Arlington',
          state: 'VA',
        },
        documentName: {
          first: 'Foo',
          firstInitialOnly: false,
          middle: 'J',
          middleInitialOnly: true,
          noMiddleName: false,
          last: 'Bar',
          suffix: 'Jr',
        },
      }

      expect(validateDocumentation(data)).toBe(false)
    })
    it('returns false if documentNumber is missing', () => {
      const data = {
        abroadDocumentation: 'FS-545',
        explanation: {
          value: '',
        },
        documentNumber: {
          value: '',
        },
        documentIssued: {
          day: '1',
          month: '1',
          year: '2016',
        },
        placeIssued: {
          layout: Location.CITY_STATE_COUNTRY,
          country: { value: 'United States' },
          city: 'Arlington',
          state: 'VA',
        },
        documentName: {
          first: 'Foo',
          firstInitialOnly: false,
          middle: 'J',
          middleInitialOnly: true,
          noMiddleName: false,
          last: 'Bar',
          suffix: 'Jr',
        },
      }

      expect(validateDocumentation(data)).toBe(false)
    })
    it('returns false if documentIssued is missing', () => {
      const data = {
        abroadDocumentation: 'FS-545',
        explanation: {
          value: '',
        },
        documentNumber: {
          value: 'document number',
        },
        documentIssued: {},
        placeIssued: {
          layout: Location.CITY_STATE_COUNTRY,
          country: { value: 'United States' },
          city: 'Arlington',
          state: 'VA',
        },
        documentName: {
          first: 'Foo',
          firstInitialOnly: false,
          middle: 'J',
          middleInitialOnly: true,
          noMiddleName: false,
          last: 'Bar',
          suffix: 'Jr',
        },
      }

      expect(validateDocumentation(data)).toBe(false)
    })
    it('returns false if placedIssue is missing', () => {
      const data = {
        abroadDocumentation: 'FS-545',
        explanation: {
          value: '',
        },
        documentNumber: {
          value: 'document number',
        },
        documentIssued: {
          day: '1',
          month: '1',
          year: '2016',
        },
        placeIssued: {},
        documentName: {
          first: 'Foo',
          firstInitialOnly: false,
          middle: 'J',
          middleInitialOnly: true,
          noMiddleName: false,
          last: 'Bar',
          suffix: 'Jr',
        },
      }

      expect(validateDocumentation(data)).toBe(false)
    })
    it('returns false if documentName is missing', () => {
      const data = {
        abroadDocumentation: 'FS-545',
        explanation: {
          value: '',
        },
        documentNumber: {
          value: 'document number',
        },
        documentIssued: {
          day: '1',
          month: '1',
          year: '2016',
        },
        placeIssued: {
          layout: Location.CITY_STATE_COUNTRY,
          country: { value: 'United States' },
          city: 'Arlington',
          state: 'VA',
        },
        documentName: {},
      }

      expect(validateDocumentation(data)).toBe(false)
    })
    it('returns true if data is filled in properly', () => {
      const data = {
        abroadDocumentation: 'Other',
        explanation: {
          value: 'Explanation',
        },
        documentNumber: {
          value: 'document number',
        },
        documentIssued: {
          day: '1',
          month: '1',
          year: '2016',
        },
        placeIssued: {
          layout: Location.CITY_STATE_COUNTRY,
          country: { value: 'United States' },
          city: 'Arlington',
          state: 'VA',
        },
        documentName: {
          first: 'Foo',
          firstInitialOnly: false,
          middle: 'J',
          middleInitialOnly: true,
          noMiddleName: false,
          last: 'Bar',
          suffix: 'Jr',
        },
      }

      expect(validateDocumentation(data)).toBe(true)
    })
  })

  describe('validateCertificate', () => {
    it('returns false certificateIssued is not filled in', () => {
      const data = {
        certificateNumber: {
          value: 'certificate number',
        },
        certificateIssued: {},
        certificateName: {
          first: 'Foo',
          firstInitialOnly: false,
          middle: 'J',
          middleInitialOnly: true,
          noMiddleName: false,
          last: 'Bar',
          suffix: 'Jr',
        },
      }
      expect(validateCertificate(data)).toBe(false)
    })
    it('returns false when certificate number is missing', () => {
      const data = {
        certificateNumber: {
          value: '',
        },
        certificateIssued: {
          day: '1',
          month: '1',
          year: '2016',
        },
        certificateName: {
          first: 'Foo',
          firstInitialOnly: false,
          middle: 'J',
          middleInitialOnly: true,
          noMiddleName: false,
          last: 'Bar',
          suffix: 'Jr',
        },
      }
      expect(validateCertificate(data)).toBe(false)
    })
    it('returns false when certificate name is missing', () => {
      const data = {
        certificateNumber: {
          value: 'certificate number',
        },
        certificateIssued: {
          day: '1',
          month: '1',
          year: '2016',
        },
        certificateName: {},
      }
      expect(validateCertificate(data)).toBe(false)
    })
    it('validates when all certificate data is passed', () => {
      const data = {
        certificateNumber: {
          value: 'certificate number',
        },
        certificateIssued: {
          day: '1',
          month: '1',
          year: '2016',
        },
        certificateName: {
          first: 'Foo',
          firstInitialOnly: false,
          middle: 'J',
          middleInitialOnly: true,
          noMiddleName: false,
          last: 'Bar',
          suffix: 'Jr',
        },
      }
      expect(validateCertificate(data)).toBe(true)
    })
  })

  describe('isCertificatePartial', () => {
    it('returns true if certificate name is filled in', () => {
      const dataSets = [
        {
          citizenshipStatus: 'ForeignBorn',
          certificateNumber: { },
          certificateIssued: { },
          certificateName: {
            first: 'Foo',
            firstInitialOnly: false,
            middle: '',
            middleInitialOnly: false,
            noMiddleName: false,
            last: '',
            suffix: '',
          },
        },
        {
          citizenshipStatus: 'ForeignBorn',
          certificateNumber: { },
          certificateIssued: { },
          certificateName: {
            first: '',
            firstInitialOnly: true,
            middle: '',
            middleInitialOnly: false,
            noMiddleName: false,
            last: '',
            suffix: '',
          },
        },
        {
          citizenshipStatus: 'ForeignBorn',
          certificateNumber: { },
          certificateIssued: { },
          certificateName: {
            first: '',
            firstInitialOnly: false,
            middle: 'Jay',
            middleInitialOnly: false,
            noMiddleName: false,
            last: '',
            suffix: '',
          },
        },
        {
          citizenshipStatus: 'ForeignBorn',
          certificateNumber: { },
          certificateIssued: { },
          certificateName: {
            first: '',
            firstInitialOnly: false,
            middle: '',
            middleInitialOnly: true,
            noMiddleName: false,
            last: '',
            suffix: '',
          },
        },
        {
          citizenshipStatus: 'ForeignBorn',
          certificateNumber: { },
          certificateIssued: { },
          certificateName: {
            first: '',
            firstInitialOnly: false,
            middle: '',
            middleInitialOnly: false,
            noMiddleName: true,
            last: '',
            suffix: '',
          },
        },
        {
          citizenshipStatus: 'ForeignBorn',
          certificateNumber: { },
          certificateIssued: { },
          certificateName: {
            first: '',
            firstInitialOnly: false,
            middle: '',
            middleInitialOnly: false,
            noMiddleName: false,
            last: 'Bar',
            suffix: '',
          },
        },
        {
          citizenshipStatus: 'ForeignBorn',
          certificateNumber: { },
          certificateIssued: { },
          certificateName: {
            first: '',
            firstInitialOnly: false,
            middle: '',
            middleInitialOnly: false,
            noMiddleName: false,
            last: '',
            suffix: 'Jr',
          },
        },
      ]

      dataSets.forEach(data => expect(isCertificatePartial(data)).toBe(true))
    })
    it('returns true if certificate issued is filled in', () => {
      const dataSets = [
        {
          citizenshipStatus: 'ForeignBorn',
          certificateNumber: { },
          certificateIssued: {
            day: '1',
            month: '',
            year: '',
          },
          certificateName: { },
        },
        {
          citizenshipStatus: 'ForeignBorn',
          certificateNumber: { },
          certificateIssued: {
            day: '',
            month: '1',
            year: '',
          },
          certificateName: { },
        },
        {
          citizenshipStatus: 'ForeignBorn',
          certificateNumber: { },
          certificateIssued: {
            day: '',
            month: '',
            year: '2016',
          },
          certificateName: { },
        },
      ]

      dataSets.forEach(data => expect(isCertificatePartial(data)).toBe(true))
    })
    it('returns true if certificate number is filled in', () => {
      const data = {
        citizenshipStatus: 'ForeignBorn',
        certificateNumber: {
          value: 'certificate number',
        },
        certificateIssued: { },
        certificateName: { },
      }

      expect(isCertificatePartial(data)).toBe(true)
    })
    it('returns false if certificate is not filled in', () => {
      const data = {
        citizenshipStatus: 'ForeignBorn',
        certificateNumber: { },
        certificateIssued: { },
        certificateName: { },
      }

      expect(isCertificatePartial(data)).toBe(false)
    })
  })
  describe('isDocumentationPartial', () => {
    it('returns true if document name is filled in', () => {
      const dataSets = [
        {
          citizenshipStatus: 'ForeignBorn',
          abroadDocumentation: '',
          explanation: { },
          documentNumber: { },
          documentIssued: { },
          placeIssued: { },
          documentName: {
            first: 'Foo',
            firstInitialOnly: false,
            middle: '',
            middleInitialOnly: false,
            noMiddleName: false,
            last: '',
            suffix: '',
          },
        },
        {
          citizenshipStatus: 'ForeignBorn',
          abroadDocumentation: '',
          explanation: { },
          documentNumber: { },
          documentIssued: { },
          placeIssued: { },
          documentName: {
            first: '',
            firstInitialOnly: true,
            middle: '',
            middleInitialOnly: false,
            noMiddleName: false,
            last: '',
            suffix: '',
          },
        },
        {
          citizenshipStatus: 'ForeignBorn',
          abroadDocumentation: '',
          explanation: { },
          documentNumber: { },
          documentIssued: { },
          placeIssued: { },
          documentName: {
            first: '',
            firstInitialOnly: false,
            middle: 'Jay',
            middleInitialOnly: false,
            noMiddleName: false,
            last: '',
            suffix: '',
          },
        },
        {
          citizenshipStatus: 'ForeignBorn',
          abroadDocumentation: '',
          explanation: { },
          documentNumber: { },
          documentIssued: { },
          placeIssued: { },
          documentName: {
            first: '',
            firstInitialOnly: false,
            middle: '',
            middleInitialOnly: true,
            noMiddleName: false,
            last: '',
            suffix: '',
          },
        },
        {
          citizenshipStatus: 'ForeignBorn',
          abroadDocumentation: '',
          explanation: { },
          documentNumber: { },
          documentIssued: { },
          placeIssued: { },
          documentName: {
            first: '',
            firstInitialOnly: false,
            middle: '',
            middleInitialOnly: false,
            noMiddleName: true,
            last: '',
            suffix: '',
          },
        },
        {
          citizenshipStatus: 'ForeignBorn',
          abroadDocumentation: '',
          explanation: { },
          documentNumber: { },
          documentIssued: { },
          placeIssued: { },
          documentName: {
            first: '',
            firstInitialOnly: false,
            middle: '',
            middleInitialOnly: false,
            noMiddleName: false,
            last: 'Bar',
            suffix: '',
          },
        },
        {
          citizenshipStatus: 'ForeignBorn',
          abroadDocumentation: '',
          explanation: { },
          documentNumber: { },
          documentIssued: { },
          placeIssued: { },
          documentName: {
            first: '',
            firstInitialOnly: false,
            middle: '',
            middleInitialOnly: false,
            noMiddleName: false,
            last: '',
            suffix: 'Jr',
          },
        },
      ]

      dataSets.forEach(data => expect(isDocumentationPartial(data)).toBe(true))
    })
    it('returns true if place issued is filled in', () => {
      const dataSets = [
        {
          citizenshipStatus: 'ForeignBorn',
          abroadDocumentation: '',
          explanation: { },
          documentNumber: { },
          documentIssued: { },
          placeIssued: {
            layout: Location.CITY_STATE_COUNTRY,
            country: { value: 'United States' },
            city: '',
            state: '',
          },
          documentName: { },
        },
        {
          citizenshipStatus: 'ForeignBorn',
          abroadDocumentation: '',
          explanation: { },
          documentNumber: { },
          documentIssued: { },
          placeIssued: {
            layout: Location.CITY_STATE_COUNTRY,
            country: { },
            city: 'Arlington',
            state: '',
          },
          documentName: { },
        },
        {
          citizenshipStatus: 'ForeignBorn',
          abroadDocumentation: '',
          explanation: { },
          documentNumber: { },
          documentIssued: { },
          placeIssued: {
            layout: Location.CITY_STATE_COUNTRY,
            country: { },
            city: '',
            state: 'VA',
          },
          documentName: { },
        },
      ]

      dataSets.forEach(data => expect(isDocumentationPartial(data)).toBe(true))
    })
    it('returns true if document issued date is filled in', () => {
      const dataSets = [
        {
          citizenshipStatus: 'ForeignBorn',
          abroadDocumentation: '',
          explanation: { },
          documentNumber: { },
          documentIssued: {
            day: '1',
            month: '',
            year: '',
          },
          placeIssued: { },
          documentName: {
          },
        },
        {
          citizenshipStatus: 'ForeignBorn',
          abroadDocumentation: '',
          explanation: { },
          documentNumber: { },
          documentIssued: {
            day: '',
            month: '1',
            year: '',
          },
          placeIssued: { },
          documentName: {
          },
        },
        {
          citizenshipStatus: 'ForeignBorn',
          abroadDocumentation: '',
          explanation: { },
          documentNumber: { },
          documentIssued: {
            day: '',
            month: '',
            year: '2016',
          },
          placeIssued: { },
          documentName: {
          },
        },
      ]

      dataSets.forEach(data => expect(isDocumentationPartial(data)).toBe(true))
    })
    it('returns true if document number is filled in', () => {
      const data = {
        citizenshipStatus: 'ForeignBorn',
        abroadDocumentation: '',
        explanation: { },
        documentNumber: {
          value: 'document number',
        },
        documentIssued: { },
        placeIssued: { },
        documentName: { },
      }

      expect(isDocumentationPartial(data)).toBe(true)
    })
    it('returns true if explanation is filled in', () => {
      const data = {
        citizenshipStatus: 'ForeignBorn',
        abroadDocumentation: '',
        explanation: {
          value: 'Explanation',
        },
        documentNumber: { },
        documentIssued: { },
        placeIssued: { },
        documentName: { },
      }

      expect(isDocumentationPartial(data)).toBe(true)
    })
    it('returns true if abroadDocumentation is filled in', () => {
      const data = {
        citizenshipStatus: 'ForeignBorn',
        abroadDocumentation: 'Other',
        explanation: { },
        documentNumber: { },
        documentIssued: { },
        placeIssued: { },
        documentName: { },
      }

      expect(isDocumentationPartial(data)).toBe(true)
    })
    it('returns false if nothing is filled in', () => {
      const data = {
        citizenshipStatus: 'ForeignBorn',
        abroadDocumentation: '',
        explanation: {},
        documentNumber: { },
        documentIssued: { },
        placeIssued: { },
        documentName: { },
      }

      expect(isDocumentationPartial(data)).toBe(false)
    })
  })

  describe('validateForeignBorn', () => {
    it('returns true if not ForeignBorn', () => {
      const data = { citizenshipStatus: 'NotCitizen' }
      expect(validateForeignBorn(data)).toBe(true)
    })
    it('returns false if bornOnMilitaryInstallation data missing', () => {
      const data = {
        citizenshipStatus: 'ForeignBorn',
        abroadDocumentation: 'Other',
        explanation: {
          value: 'Explanation',
        },
        documentNumber: {
          value: 'document number',
        },
        documentIssued: {
          day: '1',
          month: '1',
          year: '2016',
        },
        placeIssued: {
          layout: Location.CITY_STATE_COUNTRY,
          country: { value: 'United States' },
          city: 'Arlington',
          state: 'VA',
        },
        documentName: {
          first: 'Foo',
          firstInitialOnly: false,
          middle: 'J',
          middleInitialOnly: true,
          noMiddleName: false,
          last: 'Bar',
          suffix: 'Jr',
        },
        certificateNumber: {
          value: 'certificate number',
        },
        certificateIssued: {
          day: '1',
          month: '1',
          year: '2016',
        },
        certificateName: {
          first: 'Foo',
          firstInitialOnly: false,
          middle: 'J',
          middleInitialOnly: true,
          noMiddleName: false,
          last: 'Bar',
          suffix: 'Jr',
        },
        bornOnMilitaryInstallation: '',
        militaryBase: {},
      }

      expect(validateForeignBorn(data)).toBe(false)
    })
    it('returns false if document or certificate data NOT provided', () => {
      const data = {
        citizenshipStatus: 'ForeignBorn',
        abroadDocumentation: '',
        explanation: { },
        documentNumber: { },
        documentIssued: { },
        placeIssued: { },
        documentName: { },
        certificateNumber: { },
        certificateIssued: { },
        certificateName: { },
        bornOnMilitaryInstallation: 'Yes',
        militaryBase: { value: 'Avengers Flying Aircraft Carrier' },
      }

      expect(validateForeignBorn(data)).toBe(false)
    })
    it('returns true if document provided', () => {
      const data = {
        citizenshipStatus: 'ForeignBorn',
        abroadDocumentation: 'Other',
        explanation: {
          value: 'Explanation',
        },
        documentNumber: {
          value: 'document number',
        },
        documentIssued: {
          day: '1',
          month: '1',
          year: '2016',
        },
        placeIssued: {
          layout: Location.CITY_STATE_COUNTRY,
          country: { value: 'United States' },
          city: 'Arlington',
          state: 'VA',
        },
        documentName: {
          first: 'Foo',
          firstInitialOnly: false,
          middle: 'J',
          middleInitialOnly: true,
          noMiddleName: false,
          last: 'Bar',
          suffix: 'Jr',
        },
        certificateNumber: { },
        certificateIssued: { },
        certificateName: { },
        bornOnMilitaryInstallation: 'Yes',
        militaryBase: { value: 'Avengers Flying Aircraft Carrier' },
      }

      expect(validateForeignBorn(data)).toBe(true)
    })
    it('returns true if certificate data provided', () => {
      const data = {
        citizenshipStatus: 'ForeignBorn',
        abroadDocumentation: '',
        explanation: {},
        documentNumber: {},
        documentIssued: { },
        placeIssued: {},
        documentName: {},
        certificateNumber: {
          value: 'certificate number',
        },
        certificateIssued: {
          day: '1',
          month: '1',
          year: '2016',
        },
        certificateName: {
          first: 'Foo',
          firstInitialOnly: false,
          middle: 'J',
          middleInitialOnly: true,
          noMiddleName: false,
          last: 'Bar',
          suffix: 'Jr',
        },
        bornOnMilitaryInstallation: 'Yes',
        militaryBase: { value: 'Avengers Flying Aircraft Carrier' },
      }

      expect(validateForeignBorn(data)).toBe(true)
    })
    it('returns false if document is partially completed', () => {
      const data = {
        citizenshipStatus: 'ForeignBorn',
        abroadDocumentation: 'Other',
        explanation: { },
        documentNumber: { },
        documentIssued: { },
        placeIssued: { },
        documentName: { },
        certificateNumber: {
          value: 'certificate number',
        },
        certificateIssued: {
          day: '1',
          month: '1',
          year: '2016',
        },
        certificateName: {
          first: 'Foo',
          firstInitialOnly: false,
          middle: 'J',
          middleInitialOnly: true,
          noMiddleName: false,
          last: 'Bar',
          suffix: 'Jr',
        },
        bornOnMilitaryInstallation: 'Yes',
        militaryBase: { value: 'Avengers Flying Aircraft Carrier' },
      }

      expect(validateForeignBorn(data)).toBe(false)
    })
    it('returns false if certificate is partially completed', () => {
      const data = {
        citizenshipStatus: 'ForeignBorn',
        abroadDocumentation: 'Other',
        explanation: {
          value: 'Explanation',
        },
        documentNumber: {
          value: 'document number',
        },
        documentIssued: {
          day: '1',
          month: '1',
          year: '2016',
        },
        placeIssued: {
          layout: Location.CITY_STATE_COUNTRY,
          country: { value: 'United States' },
          city: 'Arlington',
          state: 'VA',
        },
        documentName: {
          first: 'Foo',
          firstInitialOnly: false,
          middle: 'J',
          middleInitialOnly: true,
          noMiddleName: false,
          last: 'Bar',
          suffix: 'Jr',
        },
        certificateNumber: { },
        certificateIssued: { },
        certificateName: {
          first: 'Foo',
          firstInitialOnly: false,
          middle: 'J',
          middleInitialOnly: true,
          noMiddleName: false,
          last: 'Bar',
          suffix: 'Jr',
        },
        bornOnMilitaryInstallation: 'Yes',
        militaryBase: { value: 'Avengers Flying Aircraft Carrier' },
      }

      expect(validateForeignBorn(data)).toBe(false)
    })
    it('returns true if all data provided', () => {
      const data = {
        citizenshipStatus: 'ForeignBorn',
        abroadDocumentation: 'Other',
        explanation: {
          value: 'Explanation',
        },
        documentNumber: {
          value: 'document number',
        },
        documentIssued: {
          day: '1',
          month: '1',
          year: '2016',
        },
        placeIssued: {
          layout: Location.CITY_STATE_COUNTRY,
          country: { value: 'United States' },
          city: 'Arlington',
          state: 'VA',
        },
        documentName: {
          first: 'Foo',
          firstInitialOnly: false,
          middle: 'J',
          middleInitialOnly: true,
          noMiddleName: false,
          last: 'Bar',
          suffix: 'Jr',
        },
        certificateNumber: {
          value: 'certificate number',
        },
        certificateIssued: {
          day: '1',
          month: '1',
          year: '2016',
        },
        certificateName: {
          first: 'Foo',
          firstInitialOnly: false,
          middle: 'J',
          middleInitialOnly: true,
          noMiddleName: false,
          last: 'Bar',
          suffix: 'Jr',
        },
        bornOnMilitaryInstallation: 'Yes',
        militaryBase: { value: 'Avengers Flying Aircraft Carrier' },
      }

      expect(validateForeignBorn(data)).toBe(true)
    })
  })

  it('can validate abroad documentation', () => {
    const tests = [
      {
        data: {
          AbroadDocumentation: { value: '' },
        },
        expected: false,
      },
      {
        data: {
          AbroadDocumentation: { value: 'Yuppers' },
        },
        expected: false,
      },
      {
        data: {
          AbroadDocumentation: { value: 'FS-240' },
        },
        expected: true,
      },
      {
        data: {
          AbroadDocumentation: { value: 'Other' },
          Explanation: null,
        },
        expected: false,
      },
      {
        data: {
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
          BornOnMilitaryInstallation: { value: '' },
        },
        expected: false,
      },
      {
        data: {
          BornOnMilitaryInstallation: { value: 'Yuppers' },
        },
        expected: false,
      },
      {
        data: {
          BornOnMilitaryInstallation: { value: 'No' },
        },
        expected: true,
      },
      {
        data: {
          BornOnMilitaryInstallation: { value: 'Yes' },
          MilitaryBase: null,
        },
        expected: false,
      },
      {
        data: {
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
          HasAlienRegistration: { value: '' },
        },
        expected: false,
      },
      {
        data: {
          HasAlienRegistration: { value: 'Yuppers' },
        },
        expected: false,
      },
      {
        data: {
          HasAlienRegistration: { value: 'No' },
        },
        expected: true,
      },
      {
        data: {
          HasAlienRegistration: { value: 'Yes' },
          AlienRegistrationNumber: null,
        },
        expected: false,
      },
      {
        data: {
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
          Basis: { value: '' },
        },
        expected: false,
      },
      {
        data: {
          Basis: { value: 'Some othe option' },
        },
        expected: true,
      },
      {
        data: {
          Basis: { value: 'Other' },
          Explanation: null,
        },
        expected: false,
      },
      {
        data: {
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
          DocumentType: { value: '' },
        },
        expected: false,
      },
      {
        data: {
          DocumentType: { value: 'Yuppers' },
        },
        expected: false,
      },
      {
        data: {
          DocumentType: { value: 'I-94' },
        },
        expected: true,
      },
      {
        data: {
          DocumentType: { value: 'Other' },
          Explanation: null,
        },
        expected: false,
      },
      {
        data: {
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
