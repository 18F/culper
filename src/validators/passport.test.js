import PassportValidator, {
  hasUsPassport,
} from './passport'

describe('Passport component validation', () => {
  it('should validate is the applicant has a passport', () => {
    expect(hasUsPassport('Yes')).toBe(true)
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
