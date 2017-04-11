import PassportValidator from './passport'

describe('Passport component validation', function () {
  it('should validate has passport branch', function () {
    const tests = [
      {
        state: {
          HasPassport: 'Yes'
        },
        expected: true
      },
      {
        state: {
          HasPassport: 'No'
        },
        expected: true
      },
      {
        state: {
          HasPassport: ''
        },
        expected: false
      },
      {
        state: {
          HasPassport: 'Nope'
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new PassportValidator(test.state, null).validHasPassport()).toBe(test.expected)
    })
  })

  it('should validate passport number', function () {
    const tests = [
      {
        state: {
          Number: {
            value: 'C1234567'
          },
          Card: 'Book'
        },
        expected: true
      },
      {
        state: {
          Number: {
            value: 'C12345678'
          },
          Card: 'Card'
        },
        expected: true
      },
      {
        state: {
          Number: {
            value: 'C1234567'
          },
          Card: 'Card'
        },
        expected: false
      },
      {
        state: {
          Number: '',
          Card: 'Book'
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new PassportValidator(test.state, null).validPassportNumber()).toBe(test.expected)
    })
  })

  it('should validate passport issue and expiration dates', function () {
    const tests = [
      {
        state: {
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
        state: {
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
        state: {
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
        state: {
          Issued: null
        },
        expected: false
      },
      {
        state: {
          Issued: {
            date: new Date('1/1/2015'),
            day: '-1',
            month: '1',
            year: '2015',
            estimated: false
          }
        },
        expected: false
      },
      {
        state: {
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
        state: {
          Issued: {
            date: new Date('1/1/2015'),
            day: '1',
            month: '13',
            year: '2015',
            estimated: false
          }
        },
        expected: false
      },
      {
        state: {
          Issued: {
            date: new Date('1/1/2016'),
            day: '1',
            month: '1',
            year: '2015',
            estimated: false
          },
          Expiration: {
            date: new Date('1/1/2015'),
            day: '1',
            month: '1',
            year: '2016',
            estimated: false
          }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new PassportValidator(test.state, null).validDates()).toBe(test.expected)
    })
  })

  it('should validate full passport information', function () {
    const tests = [
      {
        state: {
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
          HasPassport: 'Yes',
          Number: {
            value: 'C1234567'
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
      expect(new PassportValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
