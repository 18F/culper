import DomesticViolence, { DomesticViolenceItem } from './domesticviolence'

describe('Domestic Violence validation', function () {
  it('can validate DomesticViolenceItem', () => {
    const tests = [
      {
        state: {
          CourtName: {
            value: '4th Circuit Court'
          },
          CourtAddress: {
            addressType: 'United States',
            address: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202'
          },
          Explanation: {
            value: 'Some content'
          },
          Issued: {
            month: '1',
            year: '2009'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new DomesticViolenceItem(test.state, null).isValid()).toBe(test.expected)
    })
  })

  it('can validate DomesticViolence', () => {
    const tests = [
      {
        state: [
          {
            Has: 'Yes',
            domestic: {
              CourtName: {
                value: '4th Circuit Court'
              },
              CourtAddress: {
                addressType: 'United States',
                address: '1234 Some Rd',
                city: 'Arlington',
                state: 'Virginia',
                zipcode: '22202'
              },
              Explanation: {
                value: 'Some content'
              },
              Issued: {
                month: '1',
                year: '2009'
              }
            }
          }
        ],
        expected: true
      },
      {
        state: null,
        expected: false
      },
      {
        state: [],
        expected: false
      },
      {
        state: [{ Has: 'No' }],
        expected: true
      },
      {
        state: [{ Has: 'Yes' }],
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new DomesticViolence(test.state, null).isValid()).toBe(test.expected)
    })
  })
})

