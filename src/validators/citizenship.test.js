import {
  isCertificateRequired,
  isDocumentRequired,
} from './citizenship'

describe('citizenship component validation', () => {
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
      expect(isDocumentRequired(expected, true)).toBe(true)
    })

    it('returns true if document not provided', () => {
      const expected = {
        CitizenshipStatus: { value: 'ForeignBorn' },
      }
      expect(isDocumentRequired(expected, true)).toBe(true)
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
      expect(isDocumentRequired(expected, true)).toBe(true)
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
      expect(isDocumentRequired(expected, true)).toBe(false)
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
      expect(isCertificateRequired(expected, true)).toBe(true)
    })
    it('returns true if certificate not provided', () => {
      const expected = {
        CitizenshipStatus: { value: 'ForeignBorn' },
      }
      expect(isCertificateRequired(expected, true)).toBe(true)
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
      expect(isCertificateRequired(expected, true)).toBe(true)
    })
    it('returns false if document is provided', () => {
      const expected = {
        CitizenshipStatus: { value: 'ForeignBorn' },
        AbroadDocumentation: { value: 'Other' },
        Explanation: { value: 'I have a different document' },
      }
      expect(isCertificateRequired(expected, true)).toBe(false)
    })
  })
})
