import LegalAssociationsTerrorismValidator from './legalassociationsterrorism'
import { battery } from './helpers'

describe('Legal associations terrrorism component validation', function () {
  it('validate associations in terrorism', () => {
    const tests = [
      {
        props: {},
        expected: false
      },
      {
        props: {
          HasTerrorism: 'No'
        },
        expected: true
      },
      {
        props: {
          HasTerrorism: 'Yes',
          Explanation: {}
        },
        expected: false
      },
      {
        props: {
          HasTerrorism: 'Yes',
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
