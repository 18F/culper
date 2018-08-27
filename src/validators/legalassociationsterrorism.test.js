import LegalAssociationsTerrorismValidator from './legalassociationsterrorism'
import { battery } from './helpers'

describe('Legal associations terrrorism component validation', function() {
  it('validate associations in terrorism', () => {
    const tests = [
      {
        props: {},
        expected: false
      },
      {
        props: {
          HasTerrorism: { value: 'No' }
        },
        expected: true
      },
      {
        props: {
          HasTerrorism: { value: 'Yes' },
          Explanation: {}
        },
        expected: false
      },
      {
        props: {
          HasTerrorism: { value: 'Yes' },
          Explanation: {
            value: 'this is the explanation'
          }
        },
        expected: true
      }
    ]

    battery(tests, LegalAssociationsTerrorismValidator, 'isValid')
  })
})
