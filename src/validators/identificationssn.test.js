import IdentificationSSNValidator from './identificationssn'

describe('SSN validation', function() {
  it('should validate SSN', function() {
    const tests = [
      {
        data: {
          ssn: {
            first: '123',
            middle: '12',
            last: '1234',
            notApplicable: false
          },
          verified: true
        },
        expected: true
      },
      {
        data: {
          ssn: {
            first: '',
            middle: '',
            last: '',
            notApplicable: true
          },
          verified: false
        },
        expected: true
      },
      {
        data: {
          ssn: {
            first: '999',
            middle: '99',
            last: '9999',
            notApplicable: false
          },
          verified: true
        },
        expected: false
      },
      {
        data: {
          ssn: {
            first: '123',
            middle: '45',
            last: '6789',
            notApplicable: false
          },
          verified: true
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new IdentificationSSNValidator(test.data).isValid()).toBe(
        test.expected
      )
    })
  })
})
