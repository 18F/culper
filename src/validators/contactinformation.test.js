import ContactInformationValidator from './contactinformation'

describe('Contact Information validation', function () {
  it('should validate emails', function () {
    const tests = [
      {
        state: {
          Emails: [
            {
              Email: {
                value: 'foobar@local.dev'
              }
            },
            {
              Email: {
                value: 'foobar@local.dev'
              }
            }
          ]
        },
        expected: true
      },
      {
        state: {
          Emails: [
            {
              Email: {
                value: 'foobar@local.dev'
              }
            }
          ]
        },
        expected: false
      },
      {
        state: {
          Emails: [
            {
              Email: null
            },
            {
              Email: {
                value: 'foobar@local.dev'
              }
            }
          ]
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new ContactInformationValidator(test.state, null).validEmails()).toBe(test.expected)
    })
  })

  it('should validate phone numbers', function () {
    const tests = [
      {
        state: {
          PhoneNumbers: [
            {
              Telephone: {
                value: '1112234555'
              }
            },
            {
              Telephone: {
                value: '1112234555'
              }
            }
          ]
        },
        expected: true
      },
      {
        state: {
          PhoneNumbers: [
            {
              Telephone: {
                value: '1112234555'
              }
            }
          ]
        },
        expected: false
      },
      {
        state: {
          PhoneNumbers: [
            {
              Telephone: {
                value: '5551234567'
              }
            },
            {
              Telephone: null
            }
          ]
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new ContactInformationValidator(test.state, null).validPhoneNumbers()).toBe(test.expected)
    })
  })

  it('should validate contact information', function () {
    const tests = [
      {
        state: {
          Emails: [
            {
              Email: {
                value: 'foobar@local.dev'
              }
            },
            {
              Email: {
                value: 'foobar2@local.dev'
              }
            }
          ],
          PhoneNumbers: [
            {
              Telephone: {
                value: '1112234555'
              }
            },
            {
              Telephone: {
                value: '1112234555'
              }
            }
          ]
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new ContactInformationValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
