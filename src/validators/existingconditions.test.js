import ExistingConditionsValidator from './existingconditions'
import Location from '../components/Form/Location'

describe('Diagnosis validation', function () {
  it('validates received treatment', () => {
    const tests = [
      {
        state: {
          ReceivedTreatment: 'Yes',
          Explanation: null
        },
        expected: true
      },
      {
        state: {
          ReceivedTreatment: 'Decline',
          Explanation: null
        },
        expected: true
      },
      {
        state: {
          ReceivedTreatment: 'No',
          Explanation: {
            value: 'The explanation'
          }
        },
        expected: true
      },
      {
        state: {
          ReceivedTreatment: 'Nope'
        },
        expected: false
      },
      {
        state: {
          ReceivedTreatment: 'No',
          Explanation: null
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new ExistingConditionsValidator(test.state, null).validReceivedTreatment()).toBe(test.expected)
    })
  })

  it('validates did not follow', () => {
    const tests = [
      {
        state: {
          DidNotFollow: 'Yes',
          DidNotFollowExplanation: {
            value: 'Stuff'
          }
        },
        expected: true
      },
      {
        state: {
          DidNotFollow: 'No'
        },
        expected: true
      },
      {
        state: {
          DidNotFollow: 'Nope'
        },
        expected: false
      },
      {
        state: {
          DidNotFollow: 'Yes',
          DidNotFollowExplanation: {
            value: null
          }
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new ExistingConditionsValidator(test.state, null).validDidNotFollow()).toBe(test.expected)
    })
  })

  it('validates treatment list', () => {
    const tests = [
      {
        state: {
          ReceivedTreatment: 'Yes',
          TreatmentList: [
            {
              Treatment: {
                Condition: 'Test',
                Effective: 'Yes',
                Explanation: {
                  value: null
                },
                Diagnosed: {
                  from: {
                    date: new Date('1/1/2010')
                  },
                  to: {
                    date: new Date('1/1/2012')
                  },
                  present: false
                },
                Treatment: {
                  Name: {
                    value: 'Circuit Court'
                  },
                  Address: {
                    country: 'United States',
                    street: '1234 Some Rd',
                    city: 'Arlington',
                    state: 'Virginia',
                    zipcode: '22202',
                    layout: Location.ADDRESS
                  },
                  Phone: {
                    noNumber: '',
                    number: '7031112222',
                    numberType: 'Home',
                    timeOfDay: 'Both',
                    extension: ''
                  }
                },
                TreatmentFacility: {
                  Name: {
                    value: 'Circuit Court'
                  },
                  Address: {
                    country: 'United States',
                    street: '1234 Some Rd',
                    city: 'Arlington',
                    state: 'Virginia',
                    zipcode: '22202',
                    layout: Location.ADDRESS
                  },
                  Phone: {
                    noNumber: '',
                    number: '7031112222',
                    numberType: 'Home',
                    timeOfDay: 'Both',
                    extension: ''
                  }
                }
              }
            }
          ],
          TreatmentListBranch: 'No'
        },
        expected: true
      },
      {
        state: {
          ReceivedTreatment: 'No'
        },
        expected: true
      },
      {
        state: {
          ReceivedTreatment: 'Yes'
        },
        expected: false
      },
      {
        state: {
          ReceivedTreatment: 'Yes',
          TreatmentList: [{Treatment: {}}],
          TreatmentListBranch: 'No'
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new ExistingConditionsValidator(test.state, null).validTreatmentList()).toBe(test.expected)
    })
  })

  it('validates diagnosis', () => {
    const tests = [
      {
        state: {
          HasCondition: 'No',
          ReceivedTreatment: 'Yes',
          DidNotFollow: 'No',
          DidNotFollowExplanation: {
            value: 'Stuff'
          },
          Explanation: null,
          TreatmentList: [
            {
              Treatment: {
                Condition: {
                  value: 'Test'
                },
                Effective: 'Yes',
                Explanation: {
                  value: null
                },
                Diagnosed: {
                  from: {
                    date: new Date('1/1/2010')
                  },
                  to: {
                    date: new Date('1/1/2012')
                  },
                  present: false
                },
                Treatment: {
                  Name: {
                    value: 'Circuit Court'
                  },
                  Address: {
                    country: 'United States',
                    street: '1234 Some Rd',
                    city: 'Arlington',
                    state: 'Virginia',
                    zipcode: '22202',
                    layout: Location.ADDRESS
                  },
                  Phone: {
                    noNumber: '',
                    number: '7031112222',
                    numberType: 'Home',
                    timeOfDay: 'Both',
                    extension: ''
                  }
                },
                TreatmentFacility: {
                  Name: {
                    value: 'Circuit Court'
                  },
                  Address: {
                    country: 'United States',
                    street: '1234 Some Rd',
                    city: 'Arlington',
                    state: 'Virginia',
                    zipcode: '22202',
                    layout: Location.ADDRESS
                  },
                  Phone: {
                    noNumber: '',
                    number: '7031112222',
                    numberType: 'Home',
                    timeOfDay: 'Both',
                    extension: ''
                  }
                }
              }
            }
          ],
          TreatmentListBranch: 'No'
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new ExistingConditionsValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
