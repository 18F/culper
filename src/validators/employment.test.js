import EmploymentValidator from './employment'

describe('Employment component validation', function () {
  it('should validate employment entry', function () {
    const tests = [
      {
        state: {
          EmploymentActivity: {
            value: 'Contractor'
          },
          Dates: {
            from: new Date('1/1/2010'),
            to: new Date('1/1/2012'),
            present: false
          },
          Employment: {
            value: 'SW'
          },
          Status: {
            value: 'Some status'
          },
          Title: {
            value: 'Dev'
          },
          Address: {
            addressType: 'United States',
            address: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202'
          },
          PhysicalAddress: {
            HasDifferentAddress: 'No'
          },
          Additional: {
            HasAdditionalActivity: 'No',
            List: []
          },
          Telephone: {
            noNumber: '',
            number: '2028675309',
            numberType: 'Cell',
            timeOfDay: 'Day'
          },
          ReasonLeft: {
            Reason: 'Fired',
            Date: {
              date: new Date('1/1/2012')
            },
            Text: {
              value: 'Some excuse'
            }
          },
          Reference: {
            FullName: {
              first: 'Foo',
              firstInitialOnly: false,
              middle: 'J',
              middleInitialOnly: true,
              noMiddleName: false,
              last: 'Bar',
              lastInitialOnly: false,
              suffix: 'Jr'
            },
            LastContact: {
              day: '1',
              month: '1',
              year: '2016',
              date: new Date('1/1/2016')
            },
            Relationship: 'Friend',
            Phone: {
              noNumber: '',
              number: '7031112222',
              numberType: 'Home',
              timeOfDay: 'Both',
              extension: ''
            },
            Email: {
              value: 'user@local.dev'
            },
            Address: {
              addressType: 'United States',
              address: '1234 Some Rd',
              city: 'Arlington',
              state: 'Virginia',
              zipcode: '22202'
            }
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new EmploymentValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })

  it('should validate additional activity', function () {
    const tests = [
      {
        state: {
          EmploymentActivity: {
            value: 'SelfEmployed'
          },
          Additional: null
        },
        expected: false
      },
      {
        state: {
          EmploymentActivity: {
            value: 'SelfEmployed'
          },
          Additional: {
            HasAdditionalActivity: 'Yes',
            List: []
          }
        },
        expected: false
      },
      {
        state: {
          EmploymentActivity: {
            value: 'SelfEmployed'
          },
          Additional: {
            HasAdditionalActivity: 'Yes',
            List: [
              {
                Position: {
                  value: 'Dev1'
                },
                Supervisor: {
                  value: 'Homer'
                },
                DatesEmployed: {
                  from: new Date('1/1/2011'),
                  to: new Date('3/1/2011'),
                  present: false
                }
              }
            ]
          }
        },
        expected: true
      },
      {
        state: {
          EmploymentActivity: {
            value: 'SelfEmployed'
          },
          Additional: {
            HasAdditionalActivity: 'Yes',
            List: [
              {
                Position: {
                  value: ''
                },
                Supervisor: {
                  value: 'Homer'
                },
                DatesEmployed: {
                  from: new Date('1/1/2011'),
                  to: new Date('3/1/2011'),
                  present: false
                }
              }
            ]
          }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new EmploymentValidator(test.state, null).validAdditionalActivity()).toBe(test.expected)
    })
  })

  it('can validate physical address', () => {
    const tests = [
      {
        state: {
          EmploymentActivity: {
            value: 'ActiveMilitary'
          },
          PhysicalAddress: {
            HasDifferentAddress: 'Yes',
            Address: {
              addressType: 'United States',
              address: '1234 Some Rd',
              city: 'Arlington',
              state: 'Virginia',
              zipcode: '22202'
            }
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new EmploymentValidator(test.state, null).validPhysicalAddress()).toBe(test.expected)
    })
  })

  it('can validate supervisor', () => {
    const tests = [
      {
        state: {
          EmploymentActivity: {
            value: 'ActiveMilitary'
          },
          Supervisor: {
            SupervisorName: {
              value: 'Homer'
            },
            Title: {
              value: 'Nuclear Plan Engineer'
            },
            Email: {
              value: 'homer@simpson.com'
            },
            Address: {
              addressType: 'United States',
              address: '1234 Some Rd',
              city: 'Arlington',
              state: 'Virginia',
              zipcode: '22202'
            },
            Telephone: {
              noNumber: '',
              number: '2028675309',
              numberType: 'Cell',
              timeOfDay: 'Day'
            }
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new EmploymentValidator(test.state, null).validSupervisor()).toBe(test.expected)
    })
  })
})
