import ForeignBornDocumentValidator from './foreignborndocument'

describe('Foreign Born Document Validator', () => {
  it('should validate document types', () => {
    const tests = [
      {
        data: {
          DocumentType: { value: 'FS240' },
        },
        expected: true,
      },
      {
        data: {
          DocumentType: { value: 'What' },
        },
        expected: false,
      },
    ]

    tests.forEach((test) => {
      expect(
        new ForeignBornDocumentValidator(test.data).validDocumentType()
      ).toBe(test.expected)
    })
  })

  it('should validate document explanation', () => {
    const tests = [
      {
        data: {
          DocumentType: { value: 'FS240' },
        },
        expected: true,
      },
      {
        data: {
          DocumentType: { value: 'Other' },
          OtherExplanation: {
            value: 'Cool',
          },
        },
        expected: true,
      },
      {
        data: {
          DocumentType: { value: 'Other' },
          OtherExplanation: {
            value: null,
          },
        },
        expected: false,
      },
    ]

    tests.forEach((test) => {
      expect(
        new ForeignBornDocumentValidator(test.data).validDocumentExplanation()
      ).toBe(test.expected)
    })
  })

  it('should validate document expiration', () => {
    const tests = [
      {
        data: {
          DocumentExpirationNotApplicable: { applicable: false },
        },
        expected: true,
      },
      {
        data: {
          DocumentExpirationNotApplicable: { applicable: true },
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
      expect(
        new ForeignBornDocumentValidator(test.data).validDocumentExpiration()
      ).toBe(test.expected)
    })
  })

  it('should validate entire document', () => {
    const tests = [
      {
        data: {
          DocumentType: { value: 'FS240' },
          DocumentExpirationNotApplicable: { applicable: false },
          DocumentNumber: {
            value: 'A1234',
          },
        },
        expected: true,
      },
    ]

    tests.forEach((test) => {
      expect(new ForeignBornDocumentValidator(test.data).isValid()).toBe(
        test.expected
      )
    })
  })
})
