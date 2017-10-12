import BirthPlaceValidator from './birthplace'

describe('Birthplace component validation', function () {
  it('should validate domestic information', function () {
    const tests = [
      {
        state: {
          country: { value: 'United States' },
          city: 'Arlington',
          county: 'Arlington',
          state: 'VA'
        },
        expected: true
      },
      {
        state: {
          country: { value: 'United States' },
          city: '',
          county: 'Arlington',
          state: 'VA'
        },
        expected: false
      },
      {
        state: {
          country: { value: 'United States' },
          city: 'Arlington',
          county: '',
          state: 'VA'
        },
        expected: false
      },
      {
        state: {
          country: { value: 'United States' },
          city: 'Arlington',
          county: 'Arlington',
          state: ''
        },
        expected: false
      },
      {
        state: {
          country: { value: 'Germany' },
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
          country: { value: 'Germany' },
          city: 'Munich'
        },
        expected: true
      },
      {
        state: {
          country: { value: 'United States' }
        },
        expected: false
      },
      {
        state: {
          country: { value: 'Germany' },
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
          country: { value: 'Germany' },
          city: 'Munich'
        },
        expected: true
      },
      {
        state: {
          domestic: 'Yes',
          country: { value: 'United States' },
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
