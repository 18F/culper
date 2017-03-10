import OffenseValidator from './offense'

describe('Offense validation', function () {
  it('validates date', () => {
    const tests = [
      {
        state: {
          Date: {
            day: '1',
            month: '1',
            year: '2016',
            date: new Date('1/1/2016')
          }
        },
        expected: true
      },
      {
        state: {
          Date: null
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new OffenseValidator(test.state, null).validDate()).toBe(test.expected)
    })
  })

  it('validates description', () => {
    const tests = [
      {
        state: {
          Description: {
            value: 'Some description'
          }
        },
        expected: true
      },
      {
        state: {
          Description: {
            value: ''
          }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new OffenseValidator(test.state, null).validDescription()).toBe(test.expected)
    })
  })

  it('validates violence involvement', () => {
    const tests = [
      {
        state: {
          InvolvedViolence: 'No'
        },
        expected: true
      },
      {
        state: {
          InvolvedViolence: 'Yes'
        },
        expected: true
      },
      {
        state: {
          InvolvedViolence: null
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new OffenseValidator(test.state, null).validViolence()).toBe(test.expected)
    })
  })

  it('validates firearms involvement', () => {
    const tests = [
      {
        state: {
          InvolvedFirearms: 'No'
        },
        expected: true
      },
      {
        state: {
          InvolvedFirearms: 'Yes'
        },
        expected: true
      },
      {
        state: {
          InvolvedFirearms: null
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new OffenseValidator(test.state, null).validFirearms()).toBe(test.expected)
    })
  })

  it('validates substances involvement', () => {
    const tests = [
      {
        state: {
          InvolvedSubstances: 'No'
        },
        expected: true
      },
      {
        state: {
          InvolvedSubstances: 'Yes'
        },
        expected: true
      },
      {
        state: {
          InvolvedSubstances: null
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new OffenseValidator(test.state, null).validSubstances()).toBe(test.expected)
    })
  })

  it('validates address', () => {
    const tests = [
      {
        state: {
          Address: {
            addressType: 'United States',
            address: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202'
          }
        },
        expected: true
      },
      {
        state: {
          Address: null
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new OffenseValidator(test.state, null).validAddress()).toBe(test.expected)
    })
  })

  it('validates if was cited', () => {
    const tests = [
      {
        state: {
          WasCited: 'No'
        },
        expected: true
      },
      {
        state: {
          WasCited: 'Yes'
        },
        expected: true
      },
      {
        state: {
          WasCited: null
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new OffenseValidator(test.state, null).validCited()).toBe(test.expected)
    })
  })

  it('validate offense object', () => {
    const tests = [
      {
        state: {
          Date: {
            day: '1',
            month: '1',
            year: '2016',
            date: new Date('1/1/2016')
          },
          Description: {
            value: 'Some description'
          },
          InvolvedViolence: 'No',
          InvolvedFirearms: 'Yes',
          InvolvedSubstances: 'No',
          Address: {
            addressType: 'United States',
            address: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202'
          },
          WasCited: 'No'
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new OffenseValidator(test.state, null).validAddress()).toBe(test.expected)
    })
  })
})
