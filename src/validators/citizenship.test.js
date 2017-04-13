import CitizenshipValidator from './citizenship'

describe('citizenship component validation', function () {
  it('can validate foreign born branching', () => {
    const tests = [
      {
        state: {
          IsForeignBorn: ''
        },
        expected: false
      },
      {
        state: {
          IsForeignBorn: 'Yuppers'
        },
        expected: false
      },
      {
        state: {
          IsForeignBorn: 'No'
        },
        expected: true
      },
      {
        state: {
          IsForeignBorn: 'Yes'
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new CitizenshipValidator(test.state, null).validIsForeignBorn()).toBe(test.expected)
    })
  })

  it('can validate naturalized branching', () => {
    const tests = [
      {
        state: {
          IsNaturalized: ''
        },
        expected: false
      },
      {
        state: {
          IsNaturalized: 'Yuppers'
        },
        expected: false
      },
      {
        state: {
          IsNaturalized: 'No'
        },
        expected: true
      },
      {
        state: {
          IsNaturalized: 'Yes'
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new CitizenshipValidator(test.state, null).validIsNaturalized()).toBe(test.expected)
    })
  })

  it('can validate derived branching', () => {
    const tests = [
      {
        state: {
          IsDerived: ''
        },
        expected: false
      },
      {
        state: {
          IsDerived: 'Yuppers'
        },
        expected: false
      },
      {
        state: {
          IsDerived: 'No'
        },
        expected: true
      },
      {
        state: {
          IsDerived: 'Yes'
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new CitizenshipValidator(test.state, null).validIsDerived()).toBe(test.expected)
    })
  })

  it('can validate not citizen branching', () => {
    const tests = [
      {
        state: {
          IsNotCitizen: ''
        },
        expected: false
      },
      {
        state: {
          IsNotCitizen: 'Yuppers'
        },
        expected: false
      },
      {
        state: {
          IsNotCitizen: 'No'
        },
        expected: true
      },
      {
        state: {
          IsNotCitizen: 'Yes'
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new CitizenshipValidator(test.state, null).validIsNotCitizen()).toBe(test.expected)
    })
  })

  it('can validate', () => {
    const tests = [
      {
        state: {
          IsForeignBorn: 'Yes',
          IsNaturalized: 'Yes',
          IsDerived: 'Yes',
          IsNotCitizen: 'Yes'
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new CitizenshipValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
