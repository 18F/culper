import EmploymentValidator from './employment'

describe('Employment component validation', function () {
  it('should validate active military, national guard and USPHS', function () {
    const tests = [
      {
        state: {
          EmploymentActivity: {
            value: 'ActiveMilitary'
          },
          Dates: {
            from: {
              date: new Date('1/1/2010')
            },
            to: {
              date: new Date('1/1/2016')
            },
            present: false
          },
          Status: {
            value: 'Fulltime'
          },
          Title: {
            value: 'IT Support'
          },
          DutyStation: {
            value: 'Station 1'
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
          },
          Supervisor: {
            Address: {
              addressType: 'United States',
              address: '1234 Some Rd',
              city: 'Arlington',
              state: 'Virginia',
              zipcode: '22202'
            },
            Email: {
              value: 'foo@local.dev'
            },
            SupervisorName: {
              value: 'John Doe'
            },
            Telephone: {
              noNumber: '',
              number: '2021112222',
              numberType: 'Cell',
              timeOfDay: 'Day'
            },
            Title: {
              value: 'The Foo'
            }
          },
          ReasonLeft: {
            Reasons: [
              {
                Has: 'Yes',
                Reason: 'Fired',
                Date: {
                  date: new Date('1/1/2016'),
                  day: '1',
                  month: '1',
                  year: '2016'
                },
                Text: {
                  value: 'Some excuse'
                }
              }
            ]
          },
          Reprimand: {
            Reasons: [
              {
                Date: {
                  date: new Date('1/1/2015'),
                  month: '1',
                  year: '2015'
                },
                Has: 'Yes',
                Text: {
                  value: 'Foo'
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
            value: 'NationalGuard'
          },
          Dates: {
            from: {
              date: new Date('1/1/2010')
            },
            to: {
              date: new Date('1/1/2016')
            },
            present: false
          },
          Status: {
            value: 'Fulltime'
          },
          Title: {
            value: 'IT Support'
          },
          DutyStation: {
            value: 'Station 1'
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
          },
          Supervisor: {
            Address: {
              addressType: 'United States',
              address: '1234 Some Rd',
              city: 'Arlington',
              state: 'Virginia',
              zipcode: '22202'
            },
            Email: {
              value: 'foo@local.dev'
            },
            SupervisorName: {
              value: 'John Doe'
            },
            Telephone: {
              noNumber: '',
              number: '2021112222',
              numberType: 'Cell',
              timeOfDay: 'Day'
            },
            Title: {
              value: 'The Foo'
            }
          },
          ReasonLeft: {
            Reasons: [
              {
                Has: 'Yes',
                Reason: 'Fired',
                Date: {
                  date: new Date('1/1/2016'),
                  day: '1',
                  month: '1',
                  year: '2016'
                },
                Text: {
                  value: 'Some excuse'
                }
              }
            ]
          },
          Reprimand: {
            Reasons: [
              {
                Date: {
                  date: new Date('1/1/2015'),
                  month: '1',
                  year: '2015'
                },
                Has: 'Yes',
                Text: {
                  value: 'Foo'
                }
              }
            ]
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new EmploymentValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })

  it('should validate federal employment, state government, federal contractor, non-government and other', function () {
    const tests = [
      {
        state: {
          EmploymentActivity: {
            value: 'FederalContractor'
          },
          Dates: {
            from: {
              date: new Date('1/1/2010')
            },
            to: {
              date: new Date('1/1/2016')
            },
            present: false
          },
          Status: {
            value: 'Fulltime'
          },
          Employment: {
            value: 'LM'
          },
          Title: {
            value: 'IT Support'
          },
          Address: {
            addressType: 'United States',
            address: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202'
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
          Supervisor: {
            Address: {
              addressType: 'United States',
              address: '1234 Some Rd',
              city: 'Arlington',
              state: 'Virginia',
              zipcode: '22202'
            },
            Email: {
              value: 'foo@local.dev'
            },
            SupervisorName: {
              value: 'John Doe'
            },
            Telephone: {
              noNumber: '',
              number: '2021112222',
              numberType: 'Cell',
              timeOfDay: 'Day'
            },
            Title: {
              value: 'The Foo'
            }
          },
          ReasonLeft: {
            Reasons: [
              {
                Has: 'Yes',
                Reason: 'Fired',
                Date: {
                  date: new Date('1/1/2016'),
                  day: '1',
                  month: '1',
                  year: '2016'
                },
                Text: {
                  value: 'Some excuse'
                }
              }
            ]
          },
          Reprimand: {
            Reasons: [
              {
                Date: {
                  date: new Date('1/1/2015'),
                  month: '1',
                  year: '2015'
                },
                Has: 'Yes',
                Text: {
                  value: 'Foo'
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
            value: 'StateGovernment'
          },
          Dates: {
            from: {
              date: new Date('1/1/2010')
            },
            to: {
              date: new Date('1/1/2016')
            },
            present: false
          },
          Status: {
            value: 'Fulltime'
          },
          Title: {
            value: 'IT Support'
          },
          Employment: {
            value: 'US'
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
          },
          Supervisor: {
            Address: {
              addressType: 'United States',
              address: '1234 Some Rd',
              city: 'Arlington',
              state: 'Virginia',
              zipcode: '22202'
            },
            Email: {
              value: 'foo@local.dev'
            },
            SupervisorName: {
              value: 'John Doe'
            },
            Telephone: {
              noNumber: '',
              number: '2021112222',
              numberType: 'Cell',
              timeOfDay: 'Day'
            },
            Title: {
              value: 'The Foo'
            }
          },
          ReasonLeft: {
            Reasons: [
              {
                Has: 'Yes',
                Reason: 'Fired',
                Date: {
                  date: new Date('1/1/2016'),
                  day: '1',
                  month: '1',
                  year: '2016'
                },
                Text: {
                  value: 'Some excuse'
                }
              }
            ]
          },
          Reprimand: {
            Reasons: [
              {
                Date: {
                  date: new Date('1/1/2015'),
                  month: '1',
                  year: '2015'
                },
                Has: 'Yes',
                Text: {
                  value: 'Foo'
                }
              }
            ]
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
                  from: {
                    date: new Date('1/1/2011')
                  },
                  to: {
                    date: new Date('3/1/2011')
                  },
                  present: false
                }
              }
            ]
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new EmploymentValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })

  it('should validate self employment', function () {
    const tests = [
      {
        state: {
          EmploymentActivity: {
            value: 'SelfEmployment'
          },
          Dates: {
            from: {
              date: new Date('1/1/2010')
            },
            to: {
              date: new Date('1/1/2016')
            },
            present: false
          },
          Status: {
            value: 'Fulltime'
          },
          Employment: {
            value: 'Self Enterprises'
          },
          Title: {
            value: 'Boss'
          },
          Address: {
            addressType: 'United States',
            address: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202'
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
          },
          Telephone: {
            noNumber: '',
            number: '2028675309',
            numberType: 'Cell',
            timeOfDay: 'Day'
          },
          ReasonLeft: {
            Reasons: [
              {
                Has: 'Yes',
                Reason: 'Fired',
                Date: {
                  date: new Date('1/1/2016'),
                  day: '1',
                  month: '1',
                  year: '2016'
                },
                Text: {
                  value: 'Some excuse'
                }
              }
            ]
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
            Relationship: ['Friend'],
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
          },
          Reprimand: {
            Reasons: [
              {
                Date: {
                  date: new Date('1/1/2015'),
                  month: '1',
                  year: '2015'
                },
                Has: 'Yes',
                Text: {
                  value: 'Foo'
                }
              }
            ]
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new EmploymentValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })

  it('should validate unemployment', function () {
    const tests = [
      {
        state: {
          EmploymentActivity: {
            value: 'Unemployment'
          },
          Dates: {
            from: {
              date: new Date('1/1/2010')
            },
            to: {
              date: new Date('1/1/2016')
            },
            present: false
          },
          ReasonLeft: {
            ReasonDescription: 'Gained employment again',
            Reasons: [
              {
                Has: 'No'
              }
            ]
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
            Relationship: ['Friend'],
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
                  from: {
                    date: new Date('1/1/2011')
                  },
                  to: {
                    date: new Date('3/1/2011')
                  },
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
                  from: {
                    date: new Date('1/1/2011')
                  },
                  to: {
                    date: new Date('3/1/2011')
                  },
                  present: false
                }
              }
            ]
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
            HasAdditionalActivity: 'Foo',
            List: [
              {
                Position: {
                  value: ''
                },
                Supervisor: {
                  value: 'Homer'
                },
                DatesEmployed: {
                  from: {
                    date: new Date('1/1/2011')
                  },
                  to: {
                    date: new Date('3/1/2011')
                  },
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
      },
      {
        state: {
          EmploymentActivity: {
            value: 'ActiveMilitary'
          },
          PhysicalAddress: {
            HasDifferentAddress: 'No'
          }
        },
        expected: true
      },
      {
        state: {
          EmploymentActivity: {
            value: 'ActiveMilitary'
          },
          PhysicalAddress: {
            HasDifferentAddress: 'Nope'
          }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new EmploymentValidator(test.state, null).validPhysicalAddress()).toBe(test.expected)
    })
  })

  it('can validate address', () => {
    const tests = [
      {
        state: {
          EmploymentActivity: {
            value: 'ActiveMilitary'
          },
          Address: {
            addressType: 'United States',
            address: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new EmploymentValidator(test.state, null).validAddress()).toBe(test.expected)
    })
  })

  it('can validate title', () => {
    const tests = [
      {
        state: {
          EmploymentActivity: {
            value: 'ActiveMilitary'
          },
          Title: {
            value: 'Dev'
          }
        },
        expected: true
      },
      {
        state: {
          Title: {
            value: 'Dev'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new EmploymentValidator(test.state, null).validTitle()).toBe(test.expected)
    })
  })

  it('can validate status', () => {
    const tests = [
      {
        state: {
          EmploymentActivity: {
            value: 'ActiveMilitary'
          },
          Status: {
            value: 'Foo'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new EmploymentValidator(test.state, null).validStatus()).toBe(test.expected)
    })
  })

  it('can validate telephone', () => {
    const tests = [
      {
        state: {
          Telephone: {
            noNumber: '',
            number: '2028675309',
            numberType: 'Cell',
            timeOfDay: 'Day'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new EmploymentValidator(test.state, null).validTelephone()).toBe(test.expected)
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

  it('can validate reasons left entries', () => {
    const tests = [
      {
        state: {
          Dates: {
            from: {
              date: new Date('1/1/2010')
            },
            to: {
              date: new Date('1/1/2016')
            },
            present: false
          },
          EmploymentActivity: {
            value: 'ActiveMilitary'
          },
          ReasonLeft: {
            Reasons: [
              {
                Has: 'Yes',
                Reason: 'Fired',
                Date: {
                  date: new Date('1/1/2016'),
                  day: '1',
                  month: '1',
                  year: '2016'
                },
                Text: {
                  value: 'Some excuse'
                }
              }
            ]
          }
        },
        expected: true
      },
      {
        state: {
          Dates: {
            from: {
              date: new Date('1/1/2010')
            },
            to: {
              date: new Date('1/1/2016')
            },
            present: false
          },
          EmploymentActivity: {
            value: 'ActiveMilitary'
          },
          ReasonLeft: {
            Reasons: [
              {
                Has: 'Yes',
                Reason: null,
                Date: {
                  date: new Date('1/1/2016'),
                  day: '1',
                  month: '1',
                  year: '2016'
                },
                Text: {
                  value: 'Some excuse'
                }
              }
            ]
          }
        },
        expected: false
      },
      {
        state: {
          Dates: {
            from: {
              date: new Date('1/1/2010')
            },
            to: {
              date: new Date('1/1/2016')
            },
            present: false
          },
          EmploymentActivity: {
            value: 'ActiveMilitary'
          },
          ReasonLeft: {}
        },
        expected: false
      },
      {
        state: {
          Dates: {
            from: {
              date: new Date('1/1/2010')
            },
            to: {
              date: new Date('1/1/2016')
            },
            present: false
          },
          EmploymentActivity: {
            value: 'ActiveMilitary'
          },
          ReasonLeft: null
        },
        expected: false
      },
      {
        state: {
          Dates: {
            from: {
              date: new Date('1/1/2010')
            },
            to: {
              date: new Date('1/1/2016')
            },
            present: false
          },
          EmploymentActivity: {
            value: 'ActiveMilitary'
          },
          ReasonLeft: {
            Reasons: [
              {
                Has: 'Yes',
                Reason: 'Fired',
                Date: {
                  date: new Date('1/1/2016'),
                  day: '1',
                  month: null,
                  year: '2016'
                },
                Text: {
                  value: 'Some excuse'
                }
              }
            ]
          }
        },
        expected: false
      },
      {
        state: {
          Dates: {
            from: {
              date: new Date('1/1/2010')
            },
            to: {
              date: new Date('1/1/2016')
            },
            present: false
          },
          EmploymentActivity: {
            value: 'ActiveMilitary'
          },
          ReasonLeft: {
            Reasons: [{Has: 'No'}]
          }
        },
        expected: true
      },
      {
        state: {
          Dates: {
            from: {
              date: new Date('1/1/2010')
            },
            to: {
              date: new Date('1/1/2016')
            },
            present: false
          },
          EmploymentActivity: {
            value: 'ActiveMilitary'
          },
          ReasonLeft: {
            Reasons: [
              {
                Has: 'Yes',
                Reason: 'Fired',
                Date: {
                  date: new Date('1/1/2016'),
                  day: '1',
                  month: '1',
                  year: '2016'
                },
                Text: {
                  value: null
                }
              }
            ]
          }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new EmploymentValidator(test.state, null).validReasonLeft()).toBe(test.expected)
    })
  })

  it('can validate reprimand entries', () => {
    const tests = [
      {
        state: {
          Dates: {
            from: {
              date: new Date('1/1/2010')
            },
            to: {
              date: new Date('1/1/2016')
            },
            present: false
          },
          EmploymentActivity: {
            value: 'ActiveMilitary'
          },
          Reprimand: {
            Reasons: [
              {
                Date: {
                  date: new Date('1/1/2015'),
                  month: '1',
                  year: '2015'
                },
                Has: 'Yes',
                Text: {
                  value: 'Foo'
                }
              }
            ]
          }
        },
        expected: true
      },
      {
        state: {
          Dates: {
            from: {
              date: new Date('1/1/2010')
            },
            to: {
              date: new Date('1/1/2016')
            },
            present: false
          },
          EmploymentActivity: {
            value: 'ActiveMilitary'
          },
          Reprimand: {
          }
        },
        expected: false
      },
      {
        state: {
          Dates: {
            from: {
              date: new Date('1/1/2010')
            },
            to: {
              date: new Date('1/1/2016')
            },
            present: false
          },
          EmploymentActivity: {
            value: 'ActiveMilitary'
          },
          Reprimand: {
            Reasons: [
              {
                Date: {
                  date: new Date('1/1/2015'),
                  month: '1',
                  year: '2015'
                },
                Has: 'Yes',
                Text: {
                  value: null
                }
              }
            ]
          }
        },
        expected: false
      },
      {
        state: {
          Dates: {
            from: {
              date: new Date('1/1/2010')
            },
            to: {
              date: new Date('1/1/2016')
            },
            present: false
          },
          EmploymentActivity: {
            value: 'ActiveMilitary'
          },
          Reprimand: {
            Reasons: [
              {
                Date: {
                  date: new Date('1/1/2015'),
                  month: '1',
                  year: null
                },
                Has: 'Yes',
                Text: {
                  value: 'Hello'
                }
              }
            ]
          }
        },
        expected: false
      },
      {
        state: {
          Dates: {
            from: {
              date: new Date('1/1/2010')
            },
            to: {
              date: new Date('1/1/2016')
            },
            present: false
          },
          EmploymentActivity: {
            value: 'ActiveMilitary'
          },
          Reprimand: {
            Reasons: [
              {
                Has: 'No'
              }
            ]
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new EmploymentValidator(test.state, null).validReprimand()).toBe(test.expected)
    })
  })
})
