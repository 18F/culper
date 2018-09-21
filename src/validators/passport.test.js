import PassportValidator from './passport'

describe('Passport component validation', function() {
  it('should validate has passport branch', function() {
    const tests = [
      {
        data: {
          HasPassports: { value: 'Yes' }
        },
        expected: true
      },
      {
        data: {
          HasPassports: { value: 'No' }
        },
        expected: true
      },
      {
        data: {
          HasPassports: { value: '' }
        },
        expected: false
      },
      {
        data: {
          HasPassports: { value: 'Nope' }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new PassportValidator(test.data, null).validHasPassports()).toBe(
        test.expected
      )
    })
  })

  it('should validate passport number', function() {
    const tests = [
      {
        data: {
          Number: '',
          Card: 'Book'
        },
        expected: false
      },
      {
        data: {
          Issued: {
            date: new Date('1/1/2015'),
            day: '1',
            month: '1',
            year: '2015',
            estimated: false
          },
          Number: '',
          Card: 'Book'
        },
        expected: false
      },
      {
        data: {
          Issued: {
            date: new Date('1/1/1989'),
            day: '1',
            month: '1',
            year: '1989',
            estimated: false
          },
          Number: '',
          Card: 'Book'
        },
        expected: false
      },
      {
        data: {
          Issued: {
            date: new Date('1/1/2015'),
            day: '1',
            month: '1',
            year: '2015',
            estimated: false
          },
          Number: {
            value: '123456789abcdefg'
          },
          Card: 'Book'
        },
        expected: false
      },
      {
        data: {
          Issued: {
            date: new Date('1/1/2015'),
            day: '1',
            month: '1',
            year: '2015',
            estimated: false
          },
          Number: {
            value: '123456789'
          },
          Card: 'Book'
        },
        expected: true
      },
      {
        data: {
          Issued: {
            date: new Date('1/1/1989'),
            day: '1',
            month: '1',
            year: '1989',
            estimated: false
          },
          Number: {
            value: '123456789abcdefg'
          },
          Card: 'Book'
        },
        expected: true
      },
    ]

    tests.forEach(test => {
      expect(new PassportValidator(test.data, null).validPassportNumber()).toBe(
        test.expected
      )
    })
  })

  it('should validate passport issue and expiration dates', function() {
    const tests = [
      {
        data: {
          Issued: {
            date: new Date('1/1/2015'),
            day: '1',
            month: '1',
            year: '2015',
            estimated: false
          },
          Expiration: {
            date: new Date('1/1/2016'),
            day: '1',
            month: '1',
            year: '2016',
            estimated: false
          }
        },
        expected: true
      },
      {
        data: {
          Issued: {
            date: new Date('1/1/2015'),
            day: '1',
            month: '1',
            year: '2015',
            estimated: false
          },
          Expiration: {
            date: new Date('1/1/2016'),
            day: '32',
            month: '1',
            year: '2016',
            estimated: false
          }
        },
        expected: false
      },
      {
        data: {
          Issued: {
            date: new Date('1/1/2015'),
            day: '1',
            month: '-1',
            year: '2015',
            estimated: false
          }
        },
        expected: false
      },
      {
        data: {
          Issued: null
        },
        expected: false
      },
      {
        data: {
          Issued: {
            date: new Date('1/1/2015'),
            day: '1',
            month: '1',
            year: '2015',
            estimated: false
          }
        },
        expected: false
      },
      {
        data: {
          Issued: {
            date: new Date('1/1/2015'),
            day: '1',
            month: '1',
            year: '0',
            estimated: false
          }
        },
        expected: false
      },
      {
        data: {
          Issued: {
            date: new Date('1/1/2015'),
            day: '1',
            month: '1',
            year: '2015',
            estimated: false
          },
          Expiration: {
            date: new Date('1/1/2016'),
            day: '1',
            month: '1',
            year: '2016',
            estimated: false
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new PassportValidator(test.data, null).validDates()).toBe(
        test.expected
      )
    })
  })

  it('should validate full passport information', function() {
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
            lastInitialOnly: false,
            suffix: 'Jr'
          },
          HasPassports: { value: 'Yes' },
          Number: {
            value: '123456789'
          },
          Card: 'Book',
          Issued: {
            date: new Date('1/1/2015'),
            day: '1',
            month: '1',
            year: '2015',
            estimated: false
          },
          Expiration: {
            date: new Date('1/1/2016'),
            day: '1',
            month: '1',
            year: '2016',
            estimated: false
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new PassportValidator(test.data, null).isValid()).toBe(
        test.expected
      )
    })
  })
})
