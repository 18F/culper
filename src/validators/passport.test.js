import PassportValidator, {
  hasValidUSPassport,
} from './passport'

describe('Passport component validation', () => {
  describe('hasValidUSPassport function', () => {
    it('should fail if the applicant does not have a passport', () => {
      const testData = {
        HasPassports: { value: 'No' },
      }

      expect(hasValidUSPassport(testData)).toBe(false)
    })

    it('should fail if the data is invalid', () => {
      const testData = {}

      expect(hasValidUSPassport(testData)).toBe(false)
    })

    it('should fail if the passport is invalid', () => {
      const testData = {
        HasPassports: { value: 'No' },
      }

      expect(hasValidUSPassport(testData)).toBe(false)
    })

    it('should pass if the applicant has a valid passport', () => {
      const testData = {
        HasPassports: { value: 'Yes' },
        Name: {
          first: 'Foo',
          firstInitialOnly: false,
          middle: 'J',
          middleInitialOnly: true,
          noMiddleName: false,
          last: 'Bar',
          suffix: 'Jr',
        },
        Number: {
          value: '123456789',
        },
        Issued: {
          day: '1',
          month: '1',
          year: '2015',
          estimated: false,
        },
        Expiration: {
          day: '1',
          month: '1',
          year: '2016',
          estimated: false,
        },
      }

      expect(hasValidUSPassport(testData)).toBe(true)
    })
  })

  it('should validate full passport information', () => {
    const tests = [
      {
        data: {
          Name: {
            first: 'Foo',
            firstInitialOnly: false,
            middle: 'J',
            middleInitialOnly: true,
            noMiddleName: false,
            last: 'Bar',
            suffix: 'Jr',
          },
          HasPassports: { value: 'Yes' },
          Number: {
            value: '123456789',
          },
          Card: 'Book',
          Issued: {
            day: '1',
            month: '1',
            year: '2015',
            estimated: false,
          },
          Expiration: {
            day: '1',
            month: '1',
            year: '2016',
            estimated: false,
          },
        },
        expected: true,
      },
    ]

    tests.forEach((test) => {
      expect(new PassportValidator(test.data, null).isValid()).toBe(
        test.expected
      )
    })
  })
})
