import BirthPlaceValidator from './birthplace'

describe('Birthplace component validation', function() {
  it('should validate domestic information', function() {
    const tests = [
      {
        data: {
          country: { value: 'United States' },
          city: 'Arlington',
          county: 'Arlington',
          state: 'VA'
        },
        expected: true
      },
      {
        data: {
          country: { value: 'United States' },
          city: '',
          county: 'Arlington',
          state: 'VA'
        },
        expected: false
      },
      {
        data: {
          country: { value: 'United States' },
          city: 'Arlington',
          county: '',
          state: 'VA'
        },
        expected: false
      },
      {
        data: {
          country: { value: 'United States' },
          city: 'Arlington',
          county: 'Arlington',
          state: ''
        },
        expected: false
      },
      {
        data: {
          country: { value: 'Germany' },
          city: 'Arlington',
          county: 'Arlington',
          state: ''
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new BirthPlaceValidator(test.data).validDomestic()).toBe(
        test.expected
      )
    })
  })

  it('should validate international information', function() {
    const tests = [
      {
        data: {
          country: { value: 'Germany' },
          city: 'Munich'
        },
        expected: true
      },
      {
        data: {
          country: { value: 'United States' }
        },
        expected: false
      },
      {
        data: {
          country: { value: 'Germany' },
          city: ''
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new BirthPlaceValidator(test.data).validInternational()).toBe(
        test.expected
      )
    })
  })

  it('should validate birth place information', function() {
    const tests = [
      {
        data: {
          domestic: false,
          country: { value: 'Germany' },
          city: 'Munich'
        },
        expected: true
      },
      {
        data: {
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
      expect(new BirthPlaceValidator(test.data).isValid()).toBe(test.expected)
    })
  })
})
