import BirthPlaceValidator from './birthplace'

describe('Birthplace component validation', function () {
  it('should validate domestic information', function () {
    const tests = [
      {
        state: {
          country: 'United States',
          city: 'Arlington',
          county: 'Arlington',
          state: 'VA'
        },
        expected: true
      },
      {
        state: {
          country: 'United States',
          city: '',
          county: 'Arlington',
          state: 'VA'
        },
        expected: false
      },
      {
        state: {
          country: 'United States',
          city: 'Arlington',
          county: '',
          state: 'VA'
        },
        expected: false
      },
      {
        state: {
          country: 'United States',
          city: 'Arlington',
          county: 'Arlington',
          state: ''
        },
        expected: false
      },
      {
        state: {
          country: 'Germany',
          city: 'Arlington',
          county: 'Arlington',
          state: ''
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new BirthPlaceValidator(test.state, null).validDomestic()).toBe(test.expected)
    })
  })

  it('should validate international information', function () {
    const tests = [
      {
        state: {
          country: 'Germany',
          city: 'Munich'
        },
        expected: true
      },
      {
        state: {
          country: 'United States'
        },
        expected: false
      },
      {
        state: {
          country: 'Germany',
          city: ''
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new BirthPlaceValidator(test.state, null).validInternational()).toBe(test.expected)
    })
  })

  it('should validate birth place information', function () {
    const tests = [
      {
        state: {
          domestic: false,
          country: 'Germany',
          city: 'Munich'
        },
        expected: true
      },
      {
        state: {
          domestic: 'Yes',
          country: 'United States',
          city: 'Arlington',
          county: 'Arlington',
          state: 'VA'
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new BirthPlaceValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
