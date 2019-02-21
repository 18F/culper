import HistoryEmploymentValidator, { EmploymentValidator } from './employment'
import Location from '../components/Form/Location'

describe('Employment component validation', function() {
  it('should validate active military, national guard and USPHS', function() {
    const tests = [
      {
        data: {
          EmploymentActivity: {
            value: 'ActiveMilitary'
          },
          Dates: {
            from: {
              month: '1',
              day: '1',
              year: '2010'
            },
            to: {
              month: '1',
              day: '1',
              year: '2016'
            },
            present: false
          },
          Status: {
            value: 'FullTime'
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
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS
          },
          Telephone: {
            noNumber: '',
            number: '2028675309',
            numberType: '',
            type: 'Domestic',
            timeOfDay: 'Day'
          },
          Supervisor: {
            Address: {
              country: { value: 'United States' },
              street: '1234 Some Rd',
              city: 'Arlington',
              state: 'VA',
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
              numberType: '',
              timeOfDay: 'Day',
              type: 'Domestic'
            },
            Title: {
              value: 'The Foo'
            }
          },
          ReasonLeft: {
            ReasonDescription: { value: 'Because' },
            Reasons: {
              items: [
                {
                  Item: {
                    Has: { value: 'No' },
                    Reason: { value: 'Fired' },
                    Date: {
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
            items: [
              {
                Item: {
                  Has: { value: 'No' },
                  Date: {
                    month: '1',
                    day: '1',
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
        expected: true
      },
      {
        data: {
          EmploymentActivity: {
            value: 'NationalGuard'
          },
          Dates: {
            from: {
              month: '1',
              day: '1',
              year: '2010'
            },
            to: {
              month: '1',
              day: '1',
              year: '2016'
            },
            present: false
          },
          Status: {
            value: 'FullTime'
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
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS
          },
          Telephone: {
            noNumber: '',
            number: '2028675309',
            numberType: '',
            type: 'Domestic',
            timeOfDay: 'Day'
          },
          Supervisor: {
            Address: {
              country: { value: 'United States' },
              street: '1234 Some Rd',
              city: 'Arlington',
              state: 'VA',
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
              numberType: '',
              type: 'Domestic',
              timeOfDay: 'Day'
            },
            Title: {
              value: 'The Foo'
            }
          },
          ReasonLeft: {
            ReasonDescription: { value: 'Because' },
            Reasons: {
              items: [
                {
                  Item: {
                    Has: { value: 'No' },
                    Reason: { value: 'Fired' },
                    Date: {
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
            items: [
              {
                Item: {
                  Has: { value: 'No' },
                  Date: {
                    month: '1',
                    day: '1',
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
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new EmploymentValidator(test.data).isValid()).toBe(test.expected)
    })
  })

  it('should validate federal employment, state government, federal contractor, non-government and other', function() {
    const tests = [
      {
        data: {
          EmploymentActivity: {
            value: 'FederalContractor'
          },
          Dates: {
            from: {
              month: '1',
              day: '1',
              year: '2010'
            },
            to: {
              month: '1',
              day: '1',
              year: '2016'
            },
            present: false
          },
          Status: {
            value: 'FullTime'
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
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS
          },
          PhysicalAddress: {
            HasDifferentAddress: { value: 'Yes' },
            Address: {
              country: { value: 'United States' },
              street: '1234 Some Rd',
              city: 'Arlington',
              state: 'VA',
              zipcode: '22202',
              layout: Location.ADDRESS
            }
          },
          Additional: { items: [{ Item: { Has: { value: 'No' } } }] },
          Telephone: {
            noNumber: '',
            number: '2028675309',
            numberType: '',
            type: 'Domestic',
            timeOfDay: 'Day'
          },
          Supervisor: {
            Address: {
              country: { value: 'United States' },
              street: '1234 Some Rd',
              city: 'Arlington',
              state: 'VA',
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
              numberType: '',
              type: 'Domestic',
              timeOfDay: 'Day'
            },
            Title: {
              value: 'The Foo'
            }
          },
          ReasonLeft: {
            ReasonDescription: { value: 'Because' },
            Reasons: {
              items: [
                {
                  Item: {
                    Has: { value: 'No' },
                    Reason: { value: 'Fired' },
                    Date: {
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
            items: [
              {
                Item: {
                  Has: { value: 'No' },
                  Date: {
                    month: '1',
                    day: '1',
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
        expected: true
      },
      {
        data: {
          EmploymentActivity: {
            value: 'StateGovernment'
          },
          Dates: {
            from: {
              month: '1',
              day: '1',
              year: '2010'
            },
            to: {
              month: '1',
              day: '1',
              year: '2016'
            },
            present: false
          },
          Status: {
            value: 'FullTime'
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
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS
          },
          PhysicalAddress: {
            HasDifferentAddress: { value: 'Yes' },
            Address: {
              country: { value: 'United States' },
              street: '1234 Some Rd',
              city: 'Arlington',
              state: 'VA',
              zipcode: '22202',
              layout: Location.ADDRESS
            }
          },
          Telephone: {
            noNumber: '',
            number: '2028675309',
            numberType: '',
            type: 'Domestic',
            timeOfDay: 'Day'
          },
          Supervisor: {
            Address: {
              country: { value: 'United States' },
              street: '1234 Some Rd',
              city: 'Arlington',
              state: 'VA',
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
              numberType: '',
              type: 'Domestic',
              timeOfDay: 'Day'
            },
            Title: {
              value: 'The Foo'
            }
          },
          ReasonLeft: {
            ReasonDescription: { value: 'Because' },
            Reasons: {
              items: [
                {
                  Item: {
                    Has: { value: 'No' },
                    Reason: { value: 'Fired' },
                    Date: {
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
            items: [
              {
                Item: {
                  Has: { value: 'No' },
                  Date: {
                    month: '1',
                    day: '1',
                    year: '2015'
                  },
                  Text: {
                    value: 'Foo'
                  }
                }
              }
            ]
          },
          Additional: {
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
                      month: '1',
                      day: '1',
                      year: '2011'
                    },
                    to: {
                      month: '3',
                      day: '1',
                      year: '2011'
                    },
                    present: false
                  }
                }
              }
            ]
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new EmploymentValidator(test.data).isValid()).toBe(test.expected)
    })
  })

  it('should validate self employment', function() {
    const tests = [
      {
        data: {
          EmploymentActivity: {
            value: 'SelfEmployment'
          },
          Dates: {
            from: {
              month: '1',
              day: '1',
              year: '2010'
            },
            to: {
              month: '1',
              day: '1',
              year: '2016'
            },
            present: false
          },
          Status: {
            value: 'FullTime'
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
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS
          },
          PhysicalAddress: {
            HasDifferentAddress: { value: 'Yes' },
            Address: {
              country: { value: 'United States' },
              street: '1234 Some Rd',
              city: 'Arlington',
              state: 'VA',
              zipcode: '22202',
              layout: Location.ADDRESS
            }
          },
          Telephone: {
            noNumber: '',
            number: '2028675309',
            numberType: '',
            type: 'Domestic',
            timeOfDay: 'Day'
          },
          ReasonLeft: {
            ReasonDescription: { value: 'Because' },
            Reasons: {
              items: [
                {
                  Item: {
                    Has: { value: 'No' },
                    Reason: { value: 'Fired' },
                    Date: {
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
          ReferenceName: {
            first: 'Foo',
            firstInitialOnly: false,
            noMiddleName: false,
            last: 'Bar',
            suffix: 'Jr'
          },
          ReferencePhone: {
            noNumber: '',
            number: '7031112222',
            type: 'Domestic',
            timeOfDay: 'Both',
            extension: ''
          },
          ReferenceAddress: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS
          },
          Reprimand: {
            items: [
              {
                Item: {
                  Has: { value: 'No' },
                  Date: {
                    month: '1',
                    day: '1',
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
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new EmploymentValidator(test.data).isValid()).toBe(test.expected)
    })
  })

  it('should validate unemployment', function() {
    const tests = [
      {
        data: {
          EmploymentActivity: {
            value: 'Unemployment'
          },
          Dates: {
            from: {
              month: '1',
              day: '1',
              year: '2010'
            },
            to: {
              month: '1',
              day: '1',
              year: '2016'
            },
            present: false
          },
          ReasonLeft: {
            ReasonDescription: { value: 'Gained employment again' },
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
          ReferenceName: {
            first: 'Foo',
            firstInitialOnly: false,
            noMiddleName: false,
            last: 'Bar',
            suffix: 'Jr'
          },
          ReferencePhone: {
            noNumber: '',
            number: '7031112222',
            timeOfDay: 'Both',
            type: 'Domestic',
            extension: ''
          },
          ReferenceAddress: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new EmploymentValidator(test.data).isValid()).toBe(test.expected)
    })
  })

  it('should validate additional activity', function() {
    const tests = [
      {
        data: {
          EmploymentActivity: {
            value: 'SelfEmployed'
          },
          Additional: null
        },
        expected: false
      },
      {
        data: {
          EmploymentActivity: {
            value: 'SelfEmployed'
          },
          Additional: { items: [{ Item: { Has: { value: 'Yes' } } }] }
        },
        expected: false
      },
      {
        data: {
          EmploymentActivity: {
            value: 'SelfEmployed'
          },
          Additional: {
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
                      month: '1',
                      day: '1',
                      year: '2011'
                    },
                    to: {
                      month: '3',
                      day: '1',
                      year: '2011'
                    },
                    present: false
                  }
                }
              }
            ]
          }
        },
        expected: true
      },
      {
        data: {
          EmploymentActivity: {
            value: 'SelfEmployed'
          },
          Additional: {
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
                      month: '1',
                      day: '1',
                      year: '2011'
                    },
                    to: {
                      month: '3',
                      day: '1',
                      year: '2011'
                    },
                    present: false
                  }
                }
              }
            ]
          }
        },
        expected: false
      },
      {
        data: {
          EmploymentActivity: {
            value: 'SelfEmployed'
          },
          Additional: {
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
                    month: '1',
                    day: '1',
                    year: '2011'
                  },
                  to: {
                    month: '3',
                    day: '1',
                    year: '2011'
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
      expect(new EmploymentValidator(test.data).validAdditionalActivity()).toBe(
        test.expected
      )
    })
  })

  it('can validate physical address', () => {
    const tests = [
      {
        data: {
          EmploymentActivity: {
            value: 'ActiveMilitary'
          },
          PhysicalAddress: {
            HasDifferentAddress: { value: 'Yes' },
            Address: {
              country: { value: 'United States' },
              street: '1234 Some Rd',
              city: 'Arlington',
              state: 'VA',
              zipcode: '22202',
              layout: Location.ADDRESS
            }
          }
        },
        expected: true
      },
      {
        data: {
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
        data: {
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
      expect(new EmploymentValidator(test.data).validPhysicalAddress()).toBe(
        test.expected
      )
    })
  })

  it('can validate address', () => {
    const tests = [
      {
        data: {
          EmploymentActivity: {
            value: 'ActiveMilitary'
          },
          Address: {
            country: { value: 'United States' },
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'VA',
            zipcode: '22202',
            layout: Location.ADDRESS
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new EmploymentValidator(test.data).validAddress()).toBe(
        test.expected
      )
    })
  })

  it('can validate title', () => {
    const tests = [
      {
        data: {
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
        data: {
          Title: {
            value: 'Dev'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new EmploymentValidator(test.data).validTitle()).toBe(
        test.expected
      )
    })
  })

  it('can validate status', () => {
    const tests = [
      {
        data: {
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
      expect(new EmploymentValidator(test.data).validStatus()).toBe(
        test.expected
      )
    })
  })

  it('can validate telephone', () => {
    const tests = [
      {
        data: {
          Telephone: {
            noNumber: '',
            number: '2028675309',
            numberType: '',
            type: 'Domestic',
            timeOfDay: 'Day'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new EmploymentValidator(test.data).validTelephone()).toBe(
        test.expected
      )
    })
  })
  it('can validate supervisor', () => {
    const tests = [
      {
        data: {
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
              state: 'VA',
              zipcode: '22202',
              layout: Location.ADDRESS
            },
            Telephone: {
              noNumber: '',
              number: '2028675309',
              numberType: '',
              type: 'Domestic',
              timeOfDay: 'Day'
            }
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new EmploymentValidator(test.data).validSupervisor()).toBe(
        test.expected
      )
    })
  })

  it('can validate reasons left entries', () => {
    const tests = [
      {
        data: {
          Dates: {
            from: {
              month: '1',
              day: '1',
              year: '2010'
            },
            to: {
              month: '1',
              day: '1',
              year: '2016'
            },
            present: false
          },
          EmploymentActivity: {
            value: 'ActiveMilitary'
          },
          ReasonLeft: {
            ReasonDescription: { value: 'Because' },
            Reasons: {
              items: [
                {
                  Item: {
                    Has: { value: 'No' },
                    Reason: { value: 'Fired' },
                    Date: {
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
        data: {
          Dates: {
            from: {
              month: '1',
              day: '1',
              year: '2010'
            },
            to: {
              month: '1',
              day: '1',
              year: '2016'
            },
            present: false
          },
          EmploymentActivity: {
            value: 'ActiveMilitary'
          },
          ReasonLeft: {
            ReasonDescription: { value: 'Because' },
            Reasons: {
              items: [
                {
                  Item: {
                    Has: { value: 'Yes' },
                    Reason: {},
                    Date: {
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
        data: {
          Dates: {
            from: {
              month: '1',
              day: '1',
              year: '2010'
            },
            to: {
              month: '1',
              day: '1',
              year: '2016'
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
        data: {
          Dates: {
            from: {
              month: '1',
              day: '1',
              year: '2010'
            },
            to: {
              month: '1',
              day: '1',
              year: '2016'
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
        data: {
          Dates: {
            from: {
              month: '1',
              day: '1',
              year: '2010'
            },
            to: {
              month: '1',
              day: '1',
              year: '2016'
            },
            present: false
          },
          EmploymentActivity: {
            value: 'ActiveMilitary'
          },
          ReasonLeft: {
            ReasonDescription: { value: 'Because' },
            Reasons: {
              items: [
                {
                  Item: {
                    Has: { value: 'Yes' },
                    Reason: { value: 'Fired' },
                    Date: {
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
        data: {
          Dates: {
            from: {
              month: '1',
              day: '1',
              year: '2010'
            },
            to: {
              month: '1',
              day: '1',
              year: '2016'
            },
            present: false
          },
          EmploymentActivity: {
            value: 'ActiveMilitary'
          },
          ReasonLeft: {
            ReasonDescription: { value: 'Because' },
            Reasons: {
              items: [{ Item: { Has: { value: 'No' } } }]
            }
          }
        },
        expected: true
      },
      {
        data: {
          Dates: {
            from: {
              month: '1',
              day: '1',
              year: '2010'
            },
            to: {
              month: '1',
              day: '1',
              year: '2016'
            },
            present: false
          },
          EmploymentActivity: {
            value: 'ActiveMilitary'
          },
          ReasonLeft: {
            ReasonDescription: { value: 'Because' },
            Reasons: {
              items: [
                {
                  Item: {
                    Has: { value: 'Yes' },
                    Reason: { value: 'Fired' },
                    Date: {
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
      expect(new EmploymentValidator(test.data).validReasonLeft()).toBe(
        test.expected
      )
    })
  })

  it('can validate reprimand entries', () => {
    const tests = [
      {
        data: {
          Dates: {
            from: {
              month: '1',
              day: '1',
              year: '2010'
            },
            to: {
              month: '1',
              day: '1',
              year: '2016'
            },
            present: false
          },
          EmploymentActivity: {
            value: 'ActiveMilitary'
          },
          Reprimand: {
            items: [
              {
                Item: {
                  Has: { value: 'Yes' },
                  Date: {
                    month: '1',
                    year: '2015'
                  },
                  Text: {
                    value: 'Foo'
                  }
                }
              },
              {
                Item: {
                  Has: { value: 'No' }
                }
              }
            ]
          }
        },
        expected: true
      },
      {
        data: {
          Dates: {
            from: {
              month: '1',
              day: '1',
              year: '2010'
            },
            to: {
              month: '1',
              day: '1',
              year: '2016'
            },
            present: false
          },
          EmploymentActivity: {
            value: 'ActiveMilitary'
          },
          Reprimand: {}
        },
        expected: false
      },
      {
        data: {
          Dates: {
            from: {
              month: '1',
              day: '1',
              year: '2010'
            },
            to: {
              month: '1',
              day: '1',
              year: '2016'
            },
            present: false
          },
          EmploymentActivity: {
            value: 'ActiveMilitary'
          },
          Reprimand: {
            items: [
              {
                Item: {
                  Has: { value: 'Yes' },
                  Date: {
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
        },
        expected: false
      },
      {
        data: {
          Dates: {
            from: {
              month: '1',
              day: '1',
              year: '2010'
            },
            to: {
              month: '1',
              day: '1',
              year: '2016'
            },
            present: false
          },
          EmploymentActivity: {
            value: 'ActiveMilitary'
          },
          Reprimand: {
            items: [
              {
                Item: {
                  Has: { value: 'Yes' },
                  Date: {
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
        },
        expected: false
      },
      {
        data: {
          Dates: {
            from: {
              month: '1',
              day: '1',
              year: '2010'
            },
            to: {
              month: '1',
              day: '1',
              year: '2016'
            },
            present: false
          },
          EmploymentActivity: {
            value: 'ActiveMilitary'
          },
          Reprimand: {
            items: [
              {
                Item: {
                  Has: { value: 'No' }
                }
              }
            ]
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new EmploymentValidator(test.data).validReprimand()).toBe(
        test.expected
      )
    })
  })

  it('should test for second branch logic involving employment record', () => {
    const list = {
      items: [
        {
          Item: {
            EmploymentActivity: {
              value: 'NationalGuard'
            },
            Dates: {
              from: {
                month: '1',
                day: '1',
                year: '2010'
              },
              to: {
                month: '1',
                day: '1',
                year: '2016'
              },
              present: false
            },
            Status: {
              value: 'FullTime'
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
              state: 'VA',
              zipcode: '22202',
              layout: Location.ADDRESS
            },
            Telephone: {
              noNumber: '',
              number: '2028675309',
              numberType: '',
              type: 'Domestic',
              timeOfDay: 'Day'
            },
            Supervisor: {
              Address: {
                country: { value: 'United States' },
                street: '1234 Some Rd',
                city: 'Arlington',
                state: 'VA',
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
                numberType: '',
                type: 'Domestic',
                timeOfDay: 'Day'
              },
              Title: {
                value: 'The Foo'
              }
            },
            ReasonLeft: {
              ReasonDescription: { value: 'Because' },
              Reasons: {
                items: [
                  {
                    Item: {
                      Has: { value: 'No' },
                      Reason: { value: 'Fired' },
                      Date: {
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
              items: [
                {
                  Item: {
                    Has: { value: 'No' },
                    Date: {
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
        }
      ],
      branch: {
        value: 'No'
      }
    }

    const tests = [
      {
        data: {
          List: list,
          EmploymentRecord: {
            value: ''
          }
        },
        expected: false
      },
      {
        data: {
          List: list,
          EmploymentRecord: {
            value: 'Yes'
          }
        },
        expected: false
      },
      {
        data: {
          List: list,
          EmploymentRecord: {
            value: 'No'
          }
        },
        expected: true
      },
      {
        data: {
          List: {
            ...list,
            branch: {
              value: ''
            }
          },
          EmploymentRecord: {
            value: 'No'
          }
        },
        expected: false
      },
      {
        data: {
          List: {
            ...list,
            branch: {
              value: 'Yes'
            }
          },
          EmploymentRecord: {
            value: 'No'
          }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new HistoryEmploymentValidator(test.data).isValid()).toBe(
        test.expected
      )
    })
  })
})
