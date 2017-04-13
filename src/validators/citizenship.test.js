import CitizenshipValidator from './citizenship'

describe('citizenship component validation', function () {
  it('can validate status', () => {
    const tests = [
      {
        state: {
          CitizenshipStatus: ''
        },
        expected: false
      },
      {
        state: {
          CitizenshipStatus: 'Yuppers'
        },
        expected: false
      },
      {
        state: {
          CitizenshipStatus: 'Citizen'
        },
        expected: true
      },
      {
        state: {
          CitizenshipStatus: 'ForeignBorn'
        },
        expected: true
      },
      {
        state: {
          CitizenshipStatus: 'Naturalized'
        },
        expected: true
      },
      {
        state: {
          CitizenshipStatus: 'Derived'
        },
        expected: true
      },
      {
        state: {
          CitizenshipStatus: 'NotCitizen'
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new CitizenshipValidator(test.state, null).validCitizenshipStatus()).toBe(test.expected)
    })
  })

  it('can validate', () => {
    const tests = [
      {
        state: {
          CitizenshipStatus: 'Citizen'
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new CitizenshipValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
