import HospitalizationValidator from './hospitalization'

describe('Hospitalization validation', function () {
  it('should validate admission', function () {
    const tests = [
      {
        state: {
          Admission: {
            value: 'Voluntary'
          },
          Explanation: {
            value: 'Because I can'
          }
        },
        expected: true
      },
      {
        state: {
          Admission: {
            value: 'Foo'
          },
          Explanation: {
            value: 'Because I can'
          }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new HospitalizationValidator(test.state, null).validAdmission()).toBe(test.expected)
    })
  })

  it('should validate hospitalization', function () {
    const tests = [
      {
        state: {
          Facility: {
            value: 'Place 1'
          },
          FacilityAddress: {
            addressType: 'United States',
            address: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202'
          },
          TreatmentDate: {
            from: {
              date: new Date('1/1/2010')
            },
            to: {
              date: new Date('1/1/2012')
            },
            present: false
          },
          Admission: {
            value: 'Voluntary'
          },
          Explanation: {
            value: 'Because I can'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new HospitalizationValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
