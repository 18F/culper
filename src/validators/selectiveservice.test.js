import SelectiveServiceValidator, { hideSelectiveService } from './selectiveservice'

describe('Selective service validation', function () {
  it('', () => {
    const tests = [
      {
        store: {},
        expected: false
      },
      {
        store: {
          Identification: {
            ApplicantBirthDate: {
              date: null
            }
          }
        },
        expected: false
      },
      {
        store: {
          Identification: {
            ApplicantBirthDate: {
              date: new Date('Invalid date')
            }
          }
        },
        expected: false
      },
      {
        store: {
          Identification: {
            ApplicantBirthDate: {
              date: new Date()
            }
          }
        },
        expected: false
      },
      {
        store: {
          Identification: {
            ApplicantBirthDate: {
              date: new Date(1940, 1, 1)
            }
          }
        },
        expected: true
      },
      {
        store: {
          Identification: {
            ApplicantBirthDate: {
              date: new Date(1959, 11, 31)
            }
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(hideSelectiveService(test.store)).toBe(test.expected)
    })
  })

  it('handle whether subject was born after a date', () => {
    const tests = [
      {
        state: {
          WasBornAfter: ''
        },
        expected: false
      },
      {
        state: {
          WasBornAfter: 'No'
        },
        expected: true
      },
      {
        state: {
          WasBornAfter: 'Yes'
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new SelectiveServiceValidator(test.state, null).validBornAfter()).toBe(test.expected)
    })
  })

  it('handle whether subject has registered', () => {
    const tests = [
      {
        state: {
          WasBornAfter: 'Yes',
          HasRegistered: ''
        },
        expected: false
      },
      {
        state: {
          WasBornAfter: 'Yes',
          HasRegistered: 'No'
        },
        expected: true
      },
      {
        state: {
          WasBornAfter: 'Yes',
          HasRegistered: 'Yes'
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new SelectiveServiceValidator(test.state, null).validRegistered()).toBe(test.expected)
    })
  })

  it('handle whether subject has registration number', () => {
    const tests = [
      {
        state: {
          WasBornAfter: 'Yes',
          HasRegistered: 'Yes',
          RegistrationNumber: null
        },
        expected: false
      },
      {
        state: {
          WasBornAfter: 'Yes',
          HasRegistered: 'Yes',
          RegistrationNumber: {
            value: ''
          }
        },
        expected: false
      },
      {
        state: {
          WasBornAfter: 'Yes',
          HasRegistered: 'Yes',
          RegistrationNumber: {
            value: '1234567890'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new SelectiveServiceValidator(test.state, null).validRegistrationNumber()).toBe(test.expected)
    })
  })

  it('handle whether subject has explanation', () => {
    const tests = [
      {
        state: {
          WasBornAfter: 'Yes',
          HasRegistered: 'No',
          Explanation: null
        },
        expected: false
      },
      {
        state: {
          WasBornAfter: 'Yes',
          HasRegistered: 'No',
          Explanation: {
            value: ''
          }
        },
        expected: false
      },
      {
        state: {
          WasBornAfter: 'Yes',
          HasRegistered: 'No',
          Explanation: {
            value: 'Never knew about it'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new SelectiveServiceValidator(test.state, null).validExplanation()).toBe(test.expected)
    })
  })

  it('handle entire state', () => {
    const tests = [
      {
        state: {
          WasBornAfter: 'Yes',
          HasRegistered: 'Yes',
          RegistrationNumber: {
            value: '1234567890'
          }
        },
        expected: true
      },
      {
        state: {
          WasBornAfter: 'Yes',
          HasRegistered: 'No',
          Explanation: {
            value: 'Never knew about it'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new SelectiveServiceValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
