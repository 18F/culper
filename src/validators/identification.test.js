import IdentificationValidator from './identification'

describe('Identification validations', function() {
  it('should set completion status', function() {
    const tests = [
      {
        data: {
          Completed: {
            name: {
              status: true
            },
            birthplace: {
              status: true
            },
            birthdate: {
              status: true
            },
            contacts: {
              status: true
            },
            ssn: {
              status: true
            },
            physical: {
              status: true
            },
            othernames: {
              status: true
            }
          }
        },
        status: {
          name: {
            status: true
          }
        },
        expected: 'complete'
      },
      {
        data: {
          Completed: {
            name: {
              status: false
            }
          }
        },
        status: {
          name: {
            status: false
          }
        },
        expected: 'incomplete'
      },
      {
        data: {
          Completed: {}
        },
        status: {
          name: {}
        },
        expected: 'neutral'
      }
    ]

    tests.forEach(test => {
      expect(
        new IdentificationValidator(test.data).completionStatus(test.status)
      ).toBe(test.expected)
    })
  })
})
