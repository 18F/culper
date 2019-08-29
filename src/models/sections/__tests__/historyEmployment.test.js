import { validateModel } from 'models/validate'
import historyEmployment from 'models/sections/historyEmployment'

describe('Thie history employment subsection', () => {
  describe('EmploymentRecord', () => {
    it('must have a value', () => {
      const testData = {
        EmploymentRecord: {},
        List: {},
      }
      const expectedErrors = [
        'EmploymentRecord.presence.REQUIRED',
        'EmploymentRecord.hasValue.MISSING_VALUE',
      ]

      expect(validateModel(testData, historyEmployment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('must have a valid value', () => {
      const testData = {
        EmploymentRecord: { value: 'Invalid' },
        List: {},
      }
      const expectedErrors = ['EmploymentRecord.hasValue.value.inclusion.INCLUSION']

      expect(validateModel(testData, historyEmployment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('validates a valid value', () => {
      const testData = {
        EmploymentRecord: { value: 'No' },
        List: {},
      }

      expect(validateModel(testData, { EmploymentRecord: historyEmployment.EmploymentRecord }))
        .toEqual(true)
    })
  })

  describe('List', () => {
    it('should fail an empty list', () => {
      const testData = {}
      const expectedErrors = ['List.presence.REQUIRED']

      expect(validateModel(testData, historyEmployment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('should validate federal employment, state government, federal contractor, non-government and other', () => {
      const testData = {
        EmploymentRecord: { value: 'No' },
        List: {
          branch: { value: 'No' },
          items: [
            {
              Item: {
                EmploymentActivity: {
                  value: 'FederalContractor',
                },
                Dates: {
                  from: {
                    month: '1',
                    day: '1',
                    year: '2010',
                  },
                  to: {
                    month: '1',
                    day: '1',
                    year: '2016',
                  },
                  present: false,
                },
                Status: {
                  value: 'FullTime',
                },
                Employment: {
                  value: 'LM',
                },
                Title: {
                  value: 'IT Support',
                },
                Address: {
                  country: { value: 'United States' },
                  street: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'VA',
                  zipcode: '22202',
                  layout: Location.ADDRESS,
                },
                PhysicalAddress: {
                  HasDifferentAddress: { value: 'Yes' },
                  Address: {
                    country: { value: 'United States' },
                    street: '1234 Some Rd',
                    city: 'Arlington',
                    state: 'VA',
                    zipcode: '22202',
                    layout: Location.ADDRESS,
                  },
                },
                Additional: { items: [{ Item: { Has: { value: 'No' } } }] },
                Telephone: {
                  noNumber: '',
                  number: '2028675309',
                  numberType: '',
                  type: 'Domestic',
                  timeOfDay: 'Day',
                },
                Supervisor: {
                  Address: {
                    country: { value: 'United States' },
                    street: '1234 Some Rd',
                    city: 'Arlington',
                    state: 'VA',
                    zipcode: '22202',
                    layout: Location.ADDRESS,
                  },
                  Email: {
                    value: 'foo@local.dev',
                  },
                  SupervisorName: {
                    value: 'John Doe',
                  },
                  Telephone: {
                    noNumber: '',
                    number: '2021112222',
                    numberType: '',
                    type: 'Domestic',
                    timeOfDay: 'Day',
                  },
                  Title: {
                    value: 'The Foo',
                  },
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
                            year: '2016',
                          },
                          Text: {
                            value: 'Some excuse',
                          },
                        },
                      },
                    ],
                  },
                },
                Reprimand: {
                  items: [
                    {
                      Item: {
                        Has: { value: 'No' },
                        Date: {
                          month: '1',
                          day: '1',
                          year: '2015',
                        },
                        Text: {
                          value: 'Foo',
                        },
                      },
                    },
                  ],
                },
              },
            },
            {
              Item: {
                EmploymentActivity: {
                  value: 'NationalGuard',
                },
                Dates: {
                  from: {
                    month: '1',
                    day: '1',
                    year: '2010',
                  },
                  to: {
                    month: '1',
                    day: '1',
                    year: '2016',
                  },
                  present: false,
                },
                Status: {
                  value: 'FullTime',
                },
                Title: {
                  value: 'IT Support',
                },
                DutyStation: {
                  value: 'Station 1',
                },
                Address: {
                  country: { value: 'United States' },
                  street: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'VA',
                  zipcode: '22202',
                  layout: Location.ADDRESS,
                },
                Telephone: {
                  noNumber: '',
                  number: '2028675309',
                  numberType: '',
                  type: 'Domestic',
                  timeOfDay: 'Day',
                },
                Supervisor: {
                  Address: {
                    country: { value: 'United States' },
                    street: '1234 Some Rd',
                    city: 'Arlington',
                    state: 'VA',
                    zipcode: '22202',
                    layout: Location.ADDRESS,
                  },
                  Email: {
                    value: 'foo@local.dev',
                  },
                  SupervisorName: {
                    value: 'John Doe',
                  },
                  Telephone: {
                    noNumber: '',
                    number: '2021112222',
                    numberType: '',
                    type: 'Domestic',
                    timeOfDay: 'Day',
                  },
                  Title: {
                    value: 'The Foo',
                  },
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
                            year: '2016',
                          },
                          Text: {
                            value: 'Some excuse',
                          },
                        },
                      },
                    ],
                  },
                },
                Reprimand: {
                  items: [
                    {
                      Item: {
                        Has: { value: 'No' },
                        Date: {
                          month: '1',
                          day: '1',
                          year: '2015',
                        },
                        Text: {
                          value: 'Foo',
                        },
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
      }

      expect(validateModel(testData, historyEmployment)).toEqual(true)
    })

    it('should validate self employment', () => {
      const testData = {
        EmploymentRecord: { value: 'No' },
        List: {
          branch: { value: 'No' },
          items: [
            {
              Item: {

                EmploymentActivity: {
                  value: 'SelfEmployment',
                },
                Dates: {
                  from: {
                    month: '1',
                    day: '1',
                    year: '2010',
                  },
                  to: {
                    month: '1',
                    day: '1',
                    year: '2016',
                  },
                  present: false,
                },
                Status: {
                  value: 'FullTime',
                },
                Employment: {
                  value: 'Self Enterprises',
                },
                Title: {
                  value: 'Boss',
                },
                Address: {
                  country: { value: 'United States' },
                  street: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'VA',
                  zipcode: '22202',
                  layout: Location.ADDRESS,
                },
                PhysicalAddress: {
                  HasDifferentAddress: { value: 'Yes' },
                  Address: {
                    country: { value: 'United States' },
                    street: '1234 Some Rd',
                    city: 'Arlington',
                    state: 'VA',
                    zipcode: '22202',
                    layout: Location.ADDRESS,
                  },
                },
                Telephone: {
                  noNumber: '',
                  number: '2028675309',
                  numberType: '',
                  type: 'Domestic',
                  timeOfDay: 'Day',
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
                            year: '2016',
                          },
                          Text: {
                            value: 'Some excuse',
                          },
                        },
                      },
                    ],
                  },
                },
                ReferenceName: {
                  first: 'Foo',
                  firstInitialOnly: false,
                  noMiddleName: false,
                  last: 'Bar',
                  suffix: 'Jr',
                },
                ReferencePhone: {
                  noNumber: '',
                  number: '7031112222',
                  type: 'Domestic',
                  timeOfDay: 'Both',
                  extension: '',
                },
                ReferenceAddress: {
                  country: { value: 'United States' },
                  street: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'VA',
                  zipcode: '22202',
                  layout: Location.ADDRESS,
                },
                Reprimand: {
                  items: [
                    {
                      Item: {
                        Has: { value: 'No' },
                        Date: {
                          month: '1',
                          day: '1',
                          year: '2015',
                        },
                        Text: {
                          value: 'Foo',
                        },
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
      }

      expect(validateModel(testData, historyEmployment)).toEqual(true)
    })

    it('should validate additional activity', () => {
      const testData = {
        EmploymentRecord: { value: 'No' },
        List: {
          branch: { value: 'No' },
          items: [
            {
              Item: {
                EmploymentActivity: {
                  value: 'StateGovernment',
                },
                Additional: {
                  items: [
                    {
                      Item: {
                        Has: { value: 'Yes' },
                        Position: {
                          value: 'Dev1',
                        },
                        Supervisor: {
                          value: 'Homer',
                        },
                        DatesEmployed: {
                          from: {
                            month: '1',
                            day: '1',
                            year: '2011',
                          },
                          to: {
                            month: '3',
                            day: '1',
                            year: '2011',
                          },
                          present: false,
                        },
                      },
                    },
                    {
                      Item: { Has: { value: 'No' } },
                    },
                  ],
                },
              },
            },
          ],
        },
      }

      expect(validateModel(testData, { AdditionalActivity: historyEmployment.AdditionalActivity }))
        .toEqual(true)
    })

    it('can validate physical address', () => {
      const testData = {
        EmploymentRecord: { value: 'No' },
        List: {
          branch: { value: 'No' },
          items: [
            {
              Item: {
                EmploymentActivity: {
                  value: 'Other',
                },
                PhysicalAddress: {
                  HasDifferentAddress: { value: 'Yes' },
                  Address: {
                    country: { value: 'United States' },
                    street: '1234 Some Rd',
                    city: 'Arlington',
                    state: 'VA',
                    zipcode: '22202',
                    layout: Location.ADDRESS,
                  },
                },
              },
            },
          ],
        },
      }

      expect(validateModel(testData, { PhysicalAddress: historyEmployment.PhysicalAddress }))
        .toEqual(true)
    })

    it('can validate address', () => {
      const testData = {
        EmploymentRecord: { value: 'No' },
        List: {
          branch: { value: 'No' },
          items: [
            {
              Item: {
                EmploymentActivity: {
                  value: 'ActiveMilitary',
                },
                Address: {
                  country: { value: 'United States' },
                  street: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'VA',
                  zipcode: '22202',
                  layout: Location.ADDRESS,
                },
              },
            },
          ],
        },
      }

      expect(validateModel(testData, { Address: historyEmployment.Address })).toEqual(true)
    })

    it('can validate title', () => {
      const testData = {
        EmploymentRecord: { value: 'No' },
        List: {
          branch: { value: 'No' },
          items: [
            {
              Item: {
                EmploymentActivity: {
                  value: 'ActiveMilitary',
                },
                Title: {
                  value: 'Dev',
                },
              },
            },
          ],
        },
      }

      expect(validateModel(testData, { Title: historyEmployment.Title })).toEqual(true)
    })

    it('can validate status', () => {
      const testData = {
        EmploymentRecord: { value: 'No' },
        List: {
          branch: { value: 'No' },
          items: [
            {
              Item: {
                EmploymentActivity: {
                  value: 'ActiveMilitary',
                },
                Status: {
                  value: 'Foo',
                },
              },
            },
          ],
        },
      }

      expect(validateModel(testData, { Status: historyEmployment.Status })).toEqual(true)
    })

    it('can validate telephone', () => {
      const testData = {
        EmploymentRecord: { value: 'No' },
        List: {
          branch: { value: 'No' },
          items: [
            {
              Item: {
                Telephone: {
                  noNumber: '',
                  number: '2028675309',
                  numberType: '',
                  type: 'Domestic',
                  timeOfDay: 'Day',
                },
              },
            },
          ],
        },
      }

      expect(validateModel(testData, { Telephone: historyEmployment.Telephone })).toEqual(true)
    })

    it('can validate supervisor', () => {
      const testData = {
        EmploymentRecord: { value: 'No' },
        List: {
          branch: { value: 'No' },
          items: [
            {
              Item: {
                EmploymentActivity: {
                  value: 'ActiveMilitary',
                },
                Supervisor: {
                  SupervisorName: {
                    value: 'Homer',
                  },
                  Title: {
                    value: 'Nuclear Plan Engineer',
                  },
                  Email: {
                    value: 'homer@simpson.com',
                  },
                  Address: {
                    country: { value: 'United States' },
                    street: '1234 Some Rd',
                    city: 'Arlington',
                    state: 'VA',
                    zipcode: '22202',
                    layout: Location.ADDRESS,
                  },
                  Telephone: {
                    noNumber: '',
                    number: '2028675309',
                    numberType: '',
                    type: 'Domestic',
                    timeOfDay: 'Day',
                  },
                },
              },
            },
          ],
        },
      }

      expect(validateModel(testData, { Supervisor: historyEmployment.Supervisor })).toEqual(true)
    })

    it('can validate reasons left entries', () => {
      const testData = {
        EmploymentRecord: { value: 'No' },
        List: {
          branch: { value: 'No' },
          items: [
            {
              Item: {
                Dates: {
                  from: {
                    month: '1',
                    day: '1',
                    year: '2010',
                  },
                  to: {
                    month: '1',
                    day: '1',
                    year: '2016',
                  },
                  present: false,
                },
                EmploymentActivity: {
                  value: 'ActiveMilitary',
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
                            year: '2016',
                          },
                          Text: {
                            value: 'Some excuse',
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
      }

      expect(validateModel(testData, { Supervisor: historyEmployment.Supervisor })).toEqual(true)
    })

    it('can validate reprimand entries', () => {
      const testData = {
        EmploymentRecord: { value: 'No' },
        List: {
          branch: { value: 'No' },
          items: [
            {
              Item: {
                Dates: {
                  from: {
                    month: '1',
                    day: '1',
                    year: '2010',
                  },
                  to: {
                    month: '1',
                    day: '1',
                    year: '2016',
                  },
                  present: false,
                },
                EmploymentActivity: {
                  value: 'ActiveMilitary',
                },
                Reprimand: {
                  items: [
                    {
                      Item: {
                        Has: { value: 'Yes' },
                        Date: {
                          month: '1',
                          year: '2015',
                        },
                        Text: {
                          value: 'Foo',
                        },
                      },
                    },
                    {
                      Item: {
                        Has: { value: 'No' },
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
      }

      expect(validateModel(testData, { Reprimand: historyEmployment.Reprimand })).toEqual(true)
    })
  })
})
