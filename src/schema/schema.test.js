import { schema, unschema } from './schema'

describe('Schema', function() {
  it('wraps top layer', function() {
    const data = { value: 'test' }
    const actual = schema('my.payload', data)
    expect(actual.type).toEqual('my.payload')
    expect(actual.props).toEqual(data)
  })

  it('wraps deep properties', function() {
    const data = { HasOtherNames: { value: 'Yes' }, List: [] }
    const actual = schema('identification.othernames', data, false)
    expect(actual.type).toEqual('identification.othernames')
    expect(actual.props.HasOtherNames.type).toEqual('branch')
    expect(actual.props.HasOtherNames.props).toEqual({ value: 'Yes' })
    expect(actual.props.List.type).toEqual('collection')
    expect(actual.props.List.props.items).toEqual(data.List)
  })

  it('can unwrap schema structure', function() {
    const tests = [
      {
        given: {
          foo: {
            bar: [0, 1, 2, 3],
            meh: 'does not affect basic JSON structures',
            bool: false,
            i: 3,
            dt: new Date('1/1/2010')
          }
        },
        expected: {
          foo: {
            bar: [0, 1, 2, 3],
            meh: 'does not affect basic JSON structures',
            bool: false,
            i: 3,
            dt: new Date('1/1/2010')
          }
        }
      },
      {
        given: {
          type: 'branch',
          props: {
            value: 'Yes'
          }
        },
        expected: {
          value: 'Yes'
        }
      },
      {
        given: {
          type: 'daterange',
          props: {
            from: {
              type: 'datecontrol',
              props: {
                month: '7',
                day: '1',
                year: '2017',
                estimated: false
              }
            },
            to: {
              type: 'datecontrol',
              props: {
                month: '7',
                day: '25',
                year: '2017',
                estimated: false
              }
            },
            present: false
          }
        },
        expected: {
          from: {
            month: '7',
            day: '1',
            year: '2017',
            estimated: false
          },
          to: {
            month: '7',
            day: '25',
            year: '2017',
            estimated: false
          },
          present: false
        }
      },
      {
        given: {
          type: 'name',
          props: {
            first: 'John',
            firstInitialOnly: false,
            last: 'Smith',
            middle: 'H',
            middleInitialOnly: true,
            noMiddleName: false,
            suffix: 'Other',
            suffixOther: 'XX'
          }
        },
        expected: {
          first: 'John',
          firstInitialOnly: false,
          last: 'Smith',
          middle: 'H',
          middleInitialOnly: true,
          noMiddleName: false,
          suffix: 'Other',
          suffixOther: 'XX'
        }
      },
      {
        given: {
          type: 'collection',
          props: {
            items: [
              {
                Item: {
                  DatesUsed: {
                    type: 'daterange',
                    props: {
                      from: {
                        type: 'datecontrol',
                        props: {
                          month: '7',
                          day: '1',
                          year: '2017',
                          estimated: false
                        }
                      },
                      to: {
                        type: 'datecontrol',
                        props: {
                          month: '7',
                          day: '25',
                          year: '2017',
                          estimated: false
                        }
                      },
                      present: false
                    }
                  },
                  MaidenName: {
                    type: 'branch',
                    props: {
                      value: 'No'
                    }
                  },
                  Name: {
                    type: 'name',
                    props: {
                      first: 'John',
                      firstInitialOnly: false,
                      last: 'Smith',
                      middle: 'H',
                      middleInitialOnly: true,
                      noMiddleName: false,
                      suffix: 'Other',
                      suffixOther: 'XX'
                    }
                  },
                  Reason: {
                    type: 'textarea',
                    props: {
                      value: 'Just another name used'
                    }
                  }
                }
              }
            ]
          }
        },
        expected: {
          items: [
            {
              Item: {
                DatesUsed: {
                  from: {
                    month: '7',
                    day: '1',
                    year: '2017',
                    estimated: false
                  },
                  to: {
                    month: '7',
                    day: '25',
                    year: '2017',
                    estimated: false
                  },
                  present: false
                },
                MaidenName: {
                  value: 'No'
                },
                Name: {
                  first: 'John',
                  firstInitialOnly: false,
                  last: 'Smith',
                  middle: 'H',
                  middleInitialOnly: true,
                  noMiddleName: false,
                  suffix: 'Other',
                  suffixOther: 'XX'
                },
                Reason: {
                  value: 'Just another name used'
                }
              }
            }
          ]
        }
      },
      {
        given: {
          type: 'identification.othernames',
          props: {
            HasOtherNames: {
              type: 'branch',
              props: {
                value: 'Yes'
              }
            },
            List: {
              type: 'collection',
              props: {
                items: [
                  {
                    Item: {
                      DatesUsed: {
                        type: 'daterange',
                        props: {
                          from: {
                            type: 'datecontrol',
                            props: {
                              month: '7',
                              day: '1',
                              year: '2017',
                              estimated: false
                            }
                          },
                          to: {
                            type: 'datecontrol',
                            props: {
                              month: '7',
                              day: '25',
                              year: '2017',
                              estimated: false
                            }
                          },
                          present: false
                        }
                      },
                      MaidenName: {
                        type: 'branch',
                        props: {
                          value: 'No'
                        }
                      },
                      Name: {
                        type: 'name',
                        props: {
                          first: 'John',
                          firstInitialOnly: false,
                          last: 'Smith',
                          middle: 'H',
                          middleInitialOnly: true,
                          noMiddleName: false,
                          suffix: 'Other',
                          suffixOther: 'XX'
                        }
                      },
                      Reason: {
                        type: 'textarea',
                        props: {
                          value: 'Just another name used'
                        }
                      }
                    }
                  }
                ]
              }
            }
          }
        },
        expected: {
          HasOtherNames: {
            value: 'Yes'
          },
          List: {
            items: [
              {
                Item: {
                  DatesUsed: {
                    from: {
                      month: '7',
                      day: '1',
                      year: '2017',
                      estimated: false
                    },
                    to: {
                      month: '7',
                      day: '25',
                      year: '2017',
                      estimated: false
                    },
                    present: false
                  },
                  MaidenName: {
                    value: 'No'
                  },
                  Name: {
                    first: 'John',
                    firstInitialOnly: false,
                    last: 'Smith',
                    middle: 'H',
                    middleInitialOnly: true,
                    noMiddleName: false,
                    suffix: 'Other',
                    suffixOther: 'XX'
                  },
                  Reason: {
                    value: 'Just another name used'
                  }
                }
              }
            ]
          }
        }
      }
    ]

    tests.forEach(test => {
      const actual = unschema(test.given)
      expect(actual).toEqual(test.expected)
    })
  })

  it('valid payload types', function() {
    const tests = [
      {
        type: 'benefit',
        data: {}
      },
      {
        type: 'branch',
        data: 'Yes'
      },
      {
        type: 'checkbox',
        data: { value: 'test' }
      },
      {
        type: 'checkboxgroup',
        data: {}
      },
      {
        type: 'clearancelevel',
        data: { value: 'test' }
      },
      {
        type: 'collection',
        data: {}
      },
      {
        type: 'contacts',
        data: {}
      },
      {
        type: 'coowners',
        data: {}
      },
      {
        type: 'country',
        data: { value: 'test' }
      },
      {
        type: 'datecontrol',
        data: {}
      },
      {
        type: 'daterange',
        data: {}
      },
      {
        type: 'email',
        data: { value: 'test' }
      },
      {
        type: 'employmentactivity',
        data: {}
      },
      {
        type: 'foreignborndocument',
        data: {}
      },
      {
        type: 'height',
        data: {}
      },
      {
        type: 'location',
        data: {}
      },
      {
        type: 'name',
        data: {}
      },
      {
        type: 'notapplicable',
        data: {}
      },
      {
        type: 'number',
        data: { value: 'test' }
      },
      {
        type: 'physicaladdress',
        data: {}
      },
      {
        type: 'radio',
        data: { value: 'test' }
      },
      {
        type: 'reasonleft',
        data: {}
      },
      {
        type: 'sentence',
        data: {}
      },
      {
        type: 'ssn',
        data: {}
      },
      {
        type: 'supervisor',
        data: {}
      },
      {
        type: 'telephone',
        data: {}
      },
      {
        type: 'text',
        data: { value: 'test' }
      },
      {
        type: 'textarea',
        data: { value: 'test' }
      },
      {
        type: 'identification.name',
        data: {}
      },
      {
        type: 'identification.contacts',
        data: {}
      },
      {
        type: 'identification.othernames',
        data: {}
      },
      {
        type: 'identification.birthdate',
        data: {}
      },
      {
        type: 'identification.birthplace',
        data: {}
      },
      {
        type: 'identification.ssn',
        data: {}
      },
      {
        type: 'identification.physical',
        data: {}
      },
      {
        type: 'financial.bankruptcy',
        data: {}
      },
      {
        type: 'financial.gambling',
        data: {}
      },
      {
        type: 'financial.taxes',
        data: {}
      },
      {
        type: 'financial.card',
        data: {}
      },
      {
        type: 'financial.credit',
        data: {}
      },
      {
        type: 'financial.delinquent',
        data: {}
      },
      {
        type: 'financial.nonpayment',
        data: {}
      },
      {
        type: 'history.education',
        data: {}
      },
      {
        type: 'history.employment',
        data: {}
      },
      {
        type: 'history.federal',
        data: {}
      },
      {
        type: 'history.residence',
        data: {}
      },
      {
        type: 'relationships.status.cohabitant',
        data: {}
      },
      {
        type: 'relationships.status.marital',
        data: {}
      },
      {
        type: 'relationships.people',
        data: {}
      },
      {
        type: 'relationships.relatives',
        data: {}
      },
      {
        type: 'citizenship.multiple',
        data: {}
      },
      {
        type: 'citizenship.passports',
        data: {}
      },
      {
        type: 'citizenship.status',
        data: {}
      },
      {
        type: 'military.selective',
        data: {}
      },
      {
        type: 'military.history',
        data: {}
      },
      {
        type: 'military.disciplinary',
        data: {}
      },
      {
        type: 'military.foreign',
        data: {}
      },
      {
        type: 'foreign.passport',
        data: {}
      },
      {
        type: 'foreign.contacts',
        data: {}
      },
      {
        type: 'foreign.travel',
        data: {}
      },
      {
        type: 'foreign.activities.benefits',
        data: {}
      },
      {
        type: 'foreign.activities.direct',
        data: {}
      },
      {
        type: 'foreign.activities.indirect',
        data: {}
      },
      {
        type: 'foreign.activities.realestate',
        data: {}
      },
      {
        type: 'foreign.activities.support',
        data: {}
      },
      {
        type: 'foreign.business.advice',
        data: {}
      },
      {
        type: 'foreign.business.conferences',
        data: {}
      },
      {
        type: 'foreign.business.contact',
        data: {}
      },
      {
        type: 'foreign.business.employment',
        data: {}
      },
      {
        type: 'foreign.business.family',
        data: {}
      },
      {
        type: 'foreign.business.political',
        data: {}
      },
      {
        type: 'foreign.business.sponsorship',
        data: {}
      },
      {
        type: 'foreign.business.ventures',
        data: {}
      },
      {
        type: 'foreign.business.voting',
        data: {}
      },
      {
        type: 'substance.alcohol.additional',
        data: {}
      },
      {
        type: 'substance.alcohol.negative',
        data: {}
      },
      {
        type: 'substance.alcohol.ordered',
        data: {}
      },
      {
        type: 'substance.alcohol.voluntary',
        data: {}
      },
      {
        type: 'substance.drugs.clearance',
        data: {}
      },
      {
        type: 'substance.drugs.misuse',
        data: {}
      },
      {
        type: 'substance.drugs.ordered',
        data: {}
      },
      {
        type: 'substance.drugs.publicsafety',
        data: {}
      },
      {
        type: 'substance.drugs.purchase',
        data: {}
      },
      {
        type: 'substance.drugs.usage',
        data: {}
      },
      {
        type: 'substance.drugs.voluntary',
        data: {}
      },
      {
        type: 'legal.associations.activities-to-overthrow',
        data: {}
      },
      {
        type: 'legal.associations.advocating',
        data: {}
      },
      {
        type: 'legal.associations.engaged-in-terrorism',
        data: {}
      },
      {
        type: 'legal.associations.membership-overthrow',
        data: {}
      },
      {
        type: 'legal.associations.membership-violence-or-force',
        data: {}
      },
      {
        type: 'legal.associations.terrorism-association',
        data: {}
      },
      {
        type: 'legal.associations.terrorist-organization',
        data: {}
      },
      {
        type: 'legal.court',
        data: {}
      },
      {
        type: 'legal.investigations.debarred',
        data: {}
      },
      {
        type: 'legal.investigations.history',
        data: {}
      },
      {
        type: 'legal.investigations.revoked',
        data: {}
      },
      {
        type: 'legal.police.additionaloffenses',
        data: {}
      },
      {
        type: 'legal.police.domesticviolence',
        data: {}
      },
      {
        type: 'legal.police.offenses',
        data: {}
      },
      {
        type: 'legal.technology.manipulating',
        data: {}
      },
      {
        type: 'legal.technology.unauthorized',
        data: {}
      },
      {
        type: 'legal.technology.unlawful',
        data: {}
      },
      {
        type: 'psychological.competence',
        data: {}
      },
      {
        type: 'psychological.consultations',
        data: {}
      },
      {
        type: 'psychological.diagnoses',
        data: {}
      },
      {
        type: 'psychological.conditions',
        data: {}
      },
      {
        type: 'psychological.hospitalizations',
        data: {}
      },
      {
        type: 'psychological.treatment',
        data: {}
      }
    ]

    tests.forEach(test => {
      const actual = schema(test.type, test.data, false)
      expect(actual.type).not.toBe('')
      expect(actual.props).not.toBe({})
    })
  })
})
