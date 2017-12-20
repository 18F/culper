import ForeignBornDocumentValidator from './foreignborndocument'

describe('Foreign Born Document Validator', function () {
  it('should validate document types', function () {
    const tests = [
      {
        state: {
          DocumentType: { value: 'FS240' }
        },
        expected: true
      },
      {
        state: {
          DocumentType: { value: 'What' }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new ForeignBornDocumentValidator(test.state, null).validDocumentType()).toBe(test.expected)
    })
  })

  it('should validate document explanation', function () {
    const tests = [
      {
        state: {
          DocumentType: { value: 'FS240' }
        },
        expected: true
      },
      {
        state: {
          DocumentType: { value: 'Other' },
          OtherExplanation: {
            value: 'Cool'
          }
        },
        expected: true
      },
      {
        state: {
          DocumentType: { value: 'Other' },
          OtherExplanation: {
            value: null
          }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new ForeignBornDocumentValidator(test.state, null).validDocumentExplanation()).toBe(test.expected)
    })
  })

  it('should validate document expiration', function () {
    const tests = [
      {
        state: {
          DocumentExpirationNotApplicable: { applicable: true }
        },
        expected: true
      },
      {
        state: {
          DocumentExpirationNotApplicable: { applicable: false },
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
      expect(new ForeignBornDocumentValidator(test.state, null).validDocumentExpiration()).toBe(test.expected)
    })
  })

  it('should validate entire document', function () {
    const tests = [
      {
        state: {
          DocumentType: { value: 'FS240' },
          DocumentExpirationNotApplicable: { applicable: true },
          DocumentNumber: {
            value: 'A1234'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new ForeignBornDocumentValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
