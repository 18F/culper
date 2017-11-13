import { EmploymentValidator } from './employment'
import Location from '../components/Form/Location'

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
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202',
            layout: Location.ADDRESS
          },
          Telephone: {
            noNumber: '',
            number: '2028675309',
            numberType: 'Cell',
            type: 'Domestic',
            timeOfDay: 'Day'
          },
          Supervisor: {
            Address: {
              country: { value: 'United States' },
              street: '1234 Some Rd',
              city: 'Arlington',
              state: 'Virginia',
              zipcode: '22202',
              layout: Location.ADDRESS
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
              timeOfDay: 'Day',
              type: 'Domestic'
            },
            Title: {
              value: 'The Foo'
            }
          },
          ReasonLeft: {
            Reasons: {
              items: [
                {
                  Item: {
                    Has: { value: 'No' },
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
                }
              ]
            }
          },
          Reprimand: {
            Reasons: {
              items: [
                {
                  Item: {
                    Has: { value: 'No' },
                    Date: {
                      date: new Date('1/1/2015'),
                      month: '1',
                      year: '2015'
                    },
                    Text: {
                      value: 'Foo'
                    }
                  }
                }
              ]
            }
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
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202',
            layout: Location.ADDRESS
          },
          Telephone: {
            noNumber: '',
            number: '2028675309',
            numberType: 'Cell',
            type: 'Domestic',
            timeOfDay: 'Day'
          },
          Supervisor: {
            Address: {
              country: { value: 'United States' },
              street: '1234 Some Rd',
              city: 'Arlington',
              state: 'Virginia',
              zipcode: '22202',
              layout: Location.ADDRESS
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
              type: 'Domestic',
              timeOfDay: 'Day'
            },
            Title: {
              value: 'The Foo'
            }
          },
          ReasonLeft: {
            Reasons: {
              items: [
                {
                  Item: {
                    Has: { value: 'No' },
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
                }
              ]
            }
          },
          Reprimand: {
            Reasons: {
              items: [
                {
                  Item: {
                    Has: { value: 'No' },
                    Date: {
                      date: new Date('1/1/2015'),
                      month: '1',
                      year: '2015'
                    },
                    Text: {
                      value: 'Foo'
                    }
                  }
                }
              ]
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
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202',
            layout: Location.ADDRESS
          },
          PhysicalAddress: {
            HasDifferentAddress: { value: 'Yes' },
            Address: {
              country: { value: 'United States' },
              street: '1234 Some Rd',
              city: 'Arlington',
              state: 'Virginia',
              zipcode: '22202',
              layout: Location.ADDRESS
            }
          },
          Additional: {
            List: {
              items: [{ Item: { Has: { value: 'No' } } }]
            }
          },
          Telephone: {
            noNumber: '',
            number: '2028675309',
            numberType: 'Cell',
            type: 'Domestic',
            timeOfDay: 'Day'
          },
          Supervisor: {
            Address: {
              country: { value: 'United States' },
              street: '1234 Some Rd',
              city: 'Arlington',
              state: 'Virginia',
              zipcode: '22202',
              layout: Location.ADDRESS
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
              type: 'Domestic',
              timeOfDay: 'Day'
            },
            Title: {
              value: 'The Foo'
            }
          },
          ReasonLeft: {
            Reasons: {
              items: [
                {
                  Item: {
                    Has: { value: 'No' },
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
                }
              ]
            }
          },
          Reprimand: {
            Reasons: {
              items: [
                {
                  Item: {
                    Has: { value: 'No' },
                    Date: {
                      date: new Date('1/1/2015'),
                      month: '1',
                      year: '2015'
                    },
                    Text: {
                      value: 'Foo'
                    }
                  }
                }
              ]
            }
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
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202',
            layout: Location.ADDRESS
          },
          PhysicalAddress: {
            HasDifferentAddress: { value: 'Yes' },
            Address: {
              country: { value: 'United States' },
              street: '1234 Some Rd',
              city: 'Arlington',
              state: 'Virginia',
              zipcode: '22202',
              layout: Location.ADDRESS
            }
          },
          Telephone: {
            noNumber: '',
            number: '2028675309',
            numberType: 'Cell',
            type: 'Domestic',
            timeOfDay: 'Day'
          },
          Supervisor: {
            Address: {
              country: { value: 'United States' },
              street: '1234 Some Rd',
              city: 'Arlington',
              state: 'Virginia',
              zipcode: '22202',
              layout: Location.ADDRESS
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
              type: 'Domestic',
              timeOfDay: 'Day'
            },
            Title: {
              value: 'The Foo'
            }
          },
          ReasonLeft: {
            Reasons: {
              items: [
                {
                  Item: {
                    Has: { value: 'No' },
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
                }
              ]
            }
          },
          Reprimand: {
            Reasons: {
              items: [
                {
                  Item: {
                    Has: { value: 'No' },
                    Date: {
                      date: new Date('1/1/2015'),
                      month: '1',
                      year: '2015'
                    },
                    Text: {
                      value: 'Foo'
                    }
                  }
                }
              ]
            }
          },
          Additional: {
            List: {
              items: [
                {
                  Item: {
                    Has: { value: 'No' },
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
                }
              ]
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
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202',
            layout: Location.ADDRESS
          },
          PhysicalAddress: {
            HasDifferentAddress: { value: 'Yes' },
            Address: {
              country: { value: 'United States' },
              street: '1234 Some Rd',
              city: 'Arlington',
              state: 'Virginia',
              zipcode: '22202',
              layout: Location.ADDRESS
            }
          },
          Telephone: {
            noNumber: '',
            number: '2028675309',
            numberType: 'Cell',
            type: 'Domestic',
            timeOfDay: 'Day'
          },
          ReasonLeft: {
            Reasons: {
              items: [
                {
                  Item: {
                    Has: { value: 'No' },
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
                }
              ]
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
            Relationship: ['Friend'],
            Phone: {
              noNumber: '',
              number: '7031112222',
              numberType: 'Home',
              type: 'Domestic',
              timeOfDay: 'Both',
              extension: ''
            },
            Email: {
              value: 'user@local.dev'
            },
            Address: {
              country: { value: 'United States' },
              street: '1234 Some Rd',
              city: 'Arlington',
              state: 'Virginia',
              zipcode: '22202',
              layout: Location.ADDRESS
            }
          },
          Reprimand: {
            Reasons: {
              items: [
                {
                  Item: {
                    Has: { value: 'No' },
                    Date: {
                      date: new Date('1/1/2015'),
                      month: '1',
                      year: '2015'
                    },
                    Text: {
                      value: 'Foo'
                    }
                  }
                }
              ]
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
            Reasons: {
              items: [
                {
                  Item: {
                    Has: { value: 'No' }
                  }
                }
              ]
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
            Relationship: ['Friend'],
            Phone: {
              noNumber: '',
              number: '7031112222',
              numberType: 'Home',
              timeOfDay: 'Both',
              type: 'Domestic',
              extension: ''
            },
            Email: {
              value: 'user@local.dev'
            },
            Address: {
              country: { value: 'United States' },
              street: '1234 Some Rd',
              city: 'Arlington',
              state: 'Virginia',
              zipcode: '22202',
              layout: Location.ADDRESS
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
            List: {
              items: [{ Item: { Has: { value: 'Yes' } } }]
            }
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
            List: {
              items: [
                {
                  Item: {
                    Has: { value: 'Yes' },
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
                }
              ]
            }
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
            List: {
              items: [
                {
                  Item: {
                    Has: { value: 'Yes' },
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
                }
              ]
            }
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
            List: {
              items: [
                {
                  Has: { value: 'Foo' },
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
            HasDifferentAddress: { value: 'Yes' },
            Address: {
              country: { value: 'United States' },
              street: '1234 Some Rd',
              city: 'Arlington',
              state: 'Virginia',
              zipcode: '22202',
              layout: Location.ADDRESS
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
            HasDifferentAddress: { value: 'No' }
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
            HasDifferentAddress: { value: 'Nope' }
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
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202',
            layout: Location.ADDRESS
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
            type: 'Domestic',
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
              country: { value: 'United States' },
              street: '1234 Some Rd',
              city: 'Arlington',
              state: 'Virginia',
              zipcode: '22202',
              layout: Location.ADDRESS
            },
            Telephone: {
              noNumber: '',
              number: '2028675309',
              numberType: 'Cell',
              type: 'Domestic',
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
            Reasons: {
              items: [
                {
                  Item: {
                    Has: { value: 'No' },
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
                }
              ]
            }
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
            Reasons: {
              items: [
                {
                  Item: {
                    Has: { value: 'Yes' },
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
                }
              ]
            }
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
            Reasons: {
              items: [
                {
                  Item: {
                    Has: { value: 'Yes' },
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
                }
              ]
            }
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
            Reasons: {
              items: [{ Item: { Has: { value: 'No' } } }]
            }
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
            Reasons: {
              items: [
                {
                  Item: {
                    Has: { value: 'Yes' },
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
                }
              ]
            }
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
            Reasons: {
              items: [
                {
                  Item: {
                    Has: { value: 'Yes' },
                    Date: {
                      date: new Date('1/1/2015'),
                      month: '1',
                      year: '2015'
                    },
                    Text: {
                      value: 'Foo'
                    }
                  }
                }
              ]
            }
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
            Reasons: {
              items: [
                {
                  Item: {
                    Has: { value: 'Yes' },
                    Date: {
                      date: new Date('1/1/2015'),
                      month: '1',
                      year: '2015'
                    },
                    Text: {
                      value: null
                    }
                  }
                }
              ]
            }
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
            Reasons: {
              items: [
                {
                  Item: {
                    Has: { value: 'Yes' },
                    Date: {
                      date: new Date('1/1/2015'),
                      month: '1',
                      year: null
                    },
                    Text: {
                      value: 'Hello'
                    }
                  }
                }
              ]
            }
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
            Reasons: {
              items: [
                {
                  Item: {
                    Has: { value: 'No' }
                  }
                }
              ]
            }
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
