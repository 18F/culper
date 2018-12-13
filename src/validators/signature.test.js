import { battery } from './helpers'
import SignatureValidator from './signature'

describe('signature validation', () => {
  it('fails with no data', () => {
    const tests = [
      {
        data: {},
        expected: false
      },
      {
        data: {
          Signature: {}
        },
        expected: false
      },
      {
        data: {
          Signature: {
            Name: {},
            Date: {}
          }
        },
        expected: false
      }
    ]

    battery(tests, SignatureValidator, 'isValid')
  })

  it('can validate signature name', () => {
    const tests = [
      {
        data: {
          Signature: {
            Name: {}
          }
        },
        expected: false
      },
      {
        data: {
          Signature: {
            Name: {
              value: ''
            }
          }
        },
        expected: false
      },
      {
        data: {
          Signature: {
            Name: {
              value: 'Foo J Bar'
            }
          }
        },
        expected: true
      }
    ]

    battery(tests, SignatureValidator, 'validSignatureName')
  })

  it('can validate signature date', () => {
    const tests = [
      {
        data: {
          Signature: {
            Date: {}
          }
        },
        expected: false
      },
      {
        data: {
          Signature: {
            Date: {
              day: '',
              month: '',
              year: ''
            }
          }
        },
        expected: false
      },
      {
        data: {
          Signature: {
            Date: {
              day: '1',
              month: '1',
              year: '2016'
            }
          }
        },
        expected: true
      }
    ]

    battery(tests, SignatureValidator, 'validSignatureDate')
  })
})
