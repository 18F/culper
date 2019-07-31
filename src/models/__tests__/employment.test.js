import { validateModel } from 'models/validate'
import employment from 'models/employment'

describe('The employment model', () => {
  it('the EmploymentActivity field is required', () => {
    const testData = {}
    const expectedErrors = ['EmploymentActivity.presence.REQUIRED']

    expect(validateModel(testData, employment))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('EmploymentActivity must be a valid value', () => {
    const testData = {
      EmploymentActivity: 'Some other thing',
    }
    const expectedErrors = ['EmploymentActivity.model.value.presence.REQUIRED']

    expect(validateModel(testData, employment))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if EmploymentActivity value is "Other"', () => {
    it('EmploymentActivity.otherExplanation is required', () => {
      const testData = {
        EmploymentActivity: { value: 'Other' },
      }
      const expectedErrors = ['EmploymentActivity.model.otherExplanation.presence.REQUIRED']
      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  it('the Dates field is required', () => {
    const testData = {}
    const expectedErrors = ['Dates.presence.REQUIRED']

    expect(validateModel(testData, employment))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Dates field must be a valid date range', () => {
    const testData = {
      Dates: {
        to: { year: 1990, month: 5, day: 12 },
        from: { year: 2000, month: 12, day: 1 },
        present: false,
      },
    }

    const expectedErrors = ['Dates.daterange.INVALID_DATE_RANGE']

    expect(validateModel(testData, employment))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if EmploymentActivity is Unemployment', () => {
    it('the Reference fields are required', () => {
      const testData = {
        EmploymentActivity: { value: 'Unemployment' },
      }

      const expectedErrors = [
        'ReferenceName.presence.REQUIRED',
        'ReferencePhone.presence.REQUIRED',
        'ReferenceAddress.presence.REQUIRED',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('ReferenceName must be a valid name', () => {
      const testData = {
        EmploymentActivity: { value: 'Unemployment' },
        ReferenceName: {
          last: 'Lastname',
        },
      }

      const expectedErrors = [
        'ReferenceName.model.first.presence.REQUIRED',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('ReferencePhone must be a valid phone', () => {
      const testData = {
        EmploymentActivity: { value: 'Unemployment' },
        ReferencePhone: {
          number: 'abcde',
        },
      }

      const expectedErrors = [
        'ReferencePhone.model.timeOfDay.presence.REQUIRED',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the ReferencePhone must exist', () => {
      const testData = {
        EmploymentActivity: { value: 'Unemployment' },
        ReferencePhone: { noNumber: true },
      }

      const expectedErrors = [
        'ReferencePhone.model.number.presence.REQUIRED',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('ReferenceAddress must be a valid address', () => {
      const testData = {
        EmploymentActivity: { value: 'Unemployment' },
        ReferenceAddress: 'Not an address',
      }

      const expectedErrors = [
        'ReferenceAddress.location.street.presence.REQUIRED',
        'ReferenceAddress.location.city.presence.REQUIRED',
        'ReferenceAddress.location.country.presence.REQUIRED',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    describe('if there is no ReferenceAddress', () => {
      it('ReferenceAlternateAddress is not required', () => {
        const testData = {
          ReferenceAddress: {},
          ReferenceAlternateAddress: {
            HasDifferentAddress: {},
            Address: {},
            Telephone: {},
          },
        }

        const expectedErrors = ['ReferenceAlternateAddress.model']

        expect(validateModel(testData, employment))
          .not.toEqual(expect.arrayContaining(expectedErrors))
      })
    })

    describe('if the ReferenceAddress field is international', () => {
      it('ReferenceAlternateAddress is required', () => {
        const testData = {
          ReferenceAddress: {
            street: '123 Test St',
            city: 'London',
            country: { value: 'United Kingdom' },
          },
        }

        const expectedErrors = ['ReferenceAlternateAddress.presence.REQUIRED']

        expect(validateModel(testData, employment))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      describe('if HasDifferentAddress is "Yes"', () => {
        it('ReferenceAlternateAddress must be a PO address', () => {
          const testData = {
            ReferenceAddress: {
              street: '123 Test St',
              city: 'London',
              country: { value: 'United Kingdom' },
            },
            ReferenceAlternateAddress: {
              HasDifferentAddress: { value: 'Yes' },
              Address: {
                street: '123 Main St',
                city: 'New York',
                state: 'NY',
                zipcode: '10002',
                country: 'United States',
              },
            },
          }

          const expectedErrors = [
            'ReferenceAlternateAddress.model.Address.location.country.inclusion.INCLUSION',
          ]

          expect(validateModel(testData, employment))
            .toEqual(expect.arrayContaining(expectedErrors))
        })

        it('passes a valid employment with a reference alternate address', () => {
          const testData = {
            EmploymentActivity: { value: 'Unemployment' },
            Dates: {
              from: { year: 1990, month: 5, day: 12 },
              to: { year: 2000, month: 12, day: 1 },
              present: false,
            },
            ReferenceName: {
              first: 'Person',
              noMiddleName: true,
              last: 'Name',
            },
            ReferencePhone: {
              number: '1234567890',
              type: 'Domestic',
              timeOfDay: 'Both',
            },
            ReferenceAddress: {
              street: '123 Test St',
              city: 'London',
              country: { value: 'United Kingdom' },
            },
            ReferenceAlternateAddress: {
              HasDifferentAddress: { value: 'Yes' },
              Address: {
                street: '123 Main ST',
                city: 'FPO',
                state: 'AA',
                zipcode: '34035',
                country: 'POSTOFFICE',
              },
            },
          }

          expect(validateModel(testData, employment)).toEqual(true)
        })
      })

      describe('if HasDifferentAddress is "No"', () => {
        it('passes a valid employment with a reference alternate address', () => {
          const testData = {
            EmploymentActivity: { value: 'Unemployment' },
            Dates: {
              from: { year: 1990, month: 5, day: 12 },
              to: { year: 2000, month: 12, day: 1 },
              present: false,
            },
            ReferenceName: {
              first: 'Person',
              noMiddleName: true,
              last: 'Name',
            },
            ReferencePhone: {
              number: '1234567890',
              type: 'Domestic',
              timeOfDay: 'Both',
            },
            ReferenceAddress: {
              street: '123 Test St',
              city: 'London',
              country: { value: 'United Kingdom' },
            },
            ReferenceAlternateAddress: {
              HasDifferentAddress: { value: 'No' },
            },
          }

          expect(validateModel(testData, employment)).toEqual(true)
        })
      })
    })

    describe('if the ReferenceAddress field is a military address', () => {
      it('ReferenceAlternateAddress is required', () => {
        const testData = {
          ReferenceAddress: {
            street: '123 Main ST',
            city: 'FPO',
            state: 'AA',
            zipcode: '34035',
            country: 'POSTOFFICE',
          },
        }

        const expectedErrors = ['ReferenceAlternateAddress.presence.REQUIRED']

        expect(validateModel(testData, employment))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('ReferenceAlternateAddress must not be a PO address', () => {
        const testData = {
          ReferenceAddress: {
            street: '123 Main ST',
            city: 'FPO',
            state: 'AA',
            zipcode: '34035',
            country: 'POSTOFFICE',
          },
          ReferenceAlternateAddress: {
            HasDifferentAddress: { value: 'Yes' },
            Address: {
              street: '123 Main ST',
              city: 'FPO',
              state: 'AA',
              zipcode: '34035',
              country: 'POSTOFFICE',
            },
          },
        }

        const expectedErrors = [
          'ReferenceAlternateAddress.model.Address.location.country.exclusion.EXCLUSION',
        ]

        expect(validateModel(testData, employment))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('passes a valid employment with a reference alternate address', () => {
        const testData = {
          EmploymentActivity: { value: 'Unemployment' },
          Dates: {
            from: { year: 1990, month: 5, day: 12 },
            to: { year: 2000, month: 12, day: 1 },
            present: false,
          },
          ReferenceName: {
            first: 'Person',
            noMiddleName: true,
            last: 'Name',
          },
          ReferencePhone: {
            number: '1234567890',
            type: 'Domestic',
            timeOfDay: 'Both',
          },
          ReferenceAddress: {
            street: '123 Main ST',
            city: 'FPO',
            state: 'AA',
            zipcode: '34035',
            country: 'POSTOFFICE',
          },
          ReferenceAlternateAddress: {
            Address: {
              street: '123 Main ST',
              city: 'New York',
              state: 'NY',
              zipcode: '10003',
              country: 'United States',
            },
          },
        }

        expect(validateModel(testData, employment)).toEqual(true)
      })
    })

    it('passes a valid Employment item', () => {
      const testData = {
        EmploymentActivity: { value: 'Unemployment' },
        Dates: {
          from: { year: 1990, month: 5, day: 12 },
          to: { year: 2000, month: 12, day: 1 },
          present: false,
        },
        ReferenceName: {
          first: 'Person',
          noMiddleName: true,
          last: 'Name',
        },
        ReferencePhone: {
          number: '1234567890',
          type: 'Domestic',
          timeOfDay: 'Both',
        },
        ReferenceAddress: {
          street: '1 Main St',
          city: 'New York',
          state: 'NY',
          zipcode: '10001',
          country: 'United States',
        },
      }

      expect(validateModel(testData, employment)).toBe(true)
    })
  })

  describe('if EmploymentActivity is not Unemployment', () => {
    describe('if the activity is not within the last 7 years', () => {
      it('the Reprimand field is not required', () => {
        const testData = {
          EmploymentActivity: { value: 'Other' },
          Dates: {
            from: { year: 1990, month: 1, day: 1 },
            to: { year: 1991, month: 10, day: 30 },
          },
        }

        const expectedErrors = ['Reprimand.presence.REQUIRED']

        expect(validateModel(testData, employment))
          .not.toEqual(expect.arrayContaining(expectedErrors))
      })
    })

    describe('if the activity is within the last 7 years', () => {
      it('the Reprimand field is required', () => {
        const testData = {
          EmploymentActivity: { value: 'Other' },
          Dates: {
            from: { year: 2010, month: 1, day: 1 },
            present: true,
          },
        }

        const expectedErrors = ['Reprimand.presence.REQUIRED']

        expect(validateModel(testData, employment))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('the Reprimand field must be valid', () => {
        const testData = {
          EmploymentActivity: { value: 'Other' },
          Dates: {
            from: { year: 2010, month: 1, day: 1 },
            present: true,
          },
          Reprimand: 'invalid',
        }

        const expectedErrors = ['Reprimand.branchCollection.MISSING_ITEMS']

        expect(validateModel(testData, employment))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('passes if no reprimands', () => {
        const testData = {
          EmploymentActivity: { value: 'Other' },
          Dates: {
            from: { year: 2010, month: 1, day: 1 },
            present: true,
          },
          Reprimand: {
            items: [
              { Item: { Has: { value: 'No' } } },
            ],
          },
        }

        const expectedErrors = ['Reprimand.branchCollection.MISSING_ITEMS']

        expect(validateModel(testData, employment))
          .not.toEqual(expect.arrayContaining(expectedErrors))
      })


      describe('if there are reprimands', () => {
        it('the reprimand items must be valid', () => {
          const testData = {
            EmploymentActivity: { value: 'Other' },
            Dates: {
              from: { year: 2010, month: 1, day: 1 },
              present: true,
            },
            Reprimand: {
              items: [
                { Item: { Has: { value: 'Yes' } } },
                { Item: { Has: { value: 'No' } } },
              ],
            },
          }

          const expectedErrors = [
            'Reprimand.branchCollection.0.Text.presence.REQUIRED',
            'Reprimand.branchCollection.0.Date.presence.REQUIRED',
          ]

          expect(validateModel(testData, employment))
            .toEqual(expect.arrayContaining(expectedErrors))
        })

        it('passes if valid reprimands', () => {
          const testData = {
            EmploymentActivity: { value: 'Other' },
            Dates: {
              from: { year: 2010, month: 1, day: 1 },
              present: true,
            },
            Reprimand: {
              items: [
                {
                  Item: {
                    Has: { value: 'Yes' },
                    Text: { value: 'Reasons' },
                    Date: { year: 2015, month: 2 },
                  },
                },
                { Item: { Has: { value: 'No' } } },
              ],
            },
          }

          const expectedErrors = ['Reprimand.branchCollection.MISSING_ITEMS']

          expect(validateModel(testData, employment))
            .not.toEqual(expect.arrayContaining(expectedErrors))
        })
      })
    })

    describe('if the date range extends to the present', () => {
      it('the ReasonLeft field is not required', () => {
        const testData = {
          EmploymentActivity: { value: 'Other' },
          Dates: {
            from: { year: 2015, month: 2, day: 5 },
            present: true,
          },
        }

        const expectedErrors = ['ReasonLeft.presence.REQUIRED']

        expect(validateModel(testData, employment))
          .not.toEqual(expect.arrayContaining(expectedErrors))
      })
    })

    describe('if the date range does not extend to the present', () => {
      it('the ReasonLeft field is required', () => {
        const testData = {
          EmploymentActivity: { value: 'Other' },
          Dates: {
            from: { year: 2015, month: 2, day: 5 },
            to: { year: 2018, month: 10, day: 20 },
            present: false,
          },
        }

        const expectedErrors = ['ReasonLeft.presence.REQUIRED']

        expect(validateModel(testData, employment))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('the ReasonLeft field must be valid', () => {
        const testData = {
          EmploymentActivity: { value: 'Other' },
          Dates: {
            from: { year: 2015, month: 2, day: 5 },
            to: { year: 2018, month: 10, day: 20 },
            present: false,
          },
          ReasonLeft: {
            ReasonDescription: 'invalid',
          },
        }

        const expectedErrors = [
          'ReasonLeft.model.ReasonDescription.hasValue.MISSING_VALUE',
          'ReasonLeft.model.Reasons.presence.REQUIRED',
        ]

        expect(validateModel(testData, employment))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      describe('if the date range is not within the last 7 years', () => {
        it('the ReasonLeft field does not require reasons', () => {
          const testData = {
            EmploymentActivity: { value: 'Other' },
            Dates: {
              from: { year: 2000, month: 2, day: 5 },
              to: { year: 2005, month: 10, day: 20 },
              present: false,
            },
            ReasonLeft: {
              ReasonDescription: { value: 'My reason' },
            },
          }

          const expectedErrors = ['ReasonLeft.model.Reasons.presence.REQUIRED']

          expect(validateModel(testData, employment))
            .not.toEqual(expect.arrayContaining(expectedErrors))
        })
      })

      describe('if the date range is within the last 7 years', () => {
        it('the ReasonLeft field requires reasons', () => {
          const testData = {
            EmploymentActivity: { value: 'Other' },
            Dates: {
              from: { year: 2017, month: 2, day: 5 },
              to: { year: 2018, month: 10, day: 20 },
              present: false,
            },
            ReasonLeft: {
              ReasonDescription: { value: 'My reason' },
            },
          }

          const expectedErrors = ['ReasonLeft.model.Reasons.presence.REQUIRED']

          expect(validateModel(testData, employment))
            .toEqual(expect.arrayContaining(expectedErrors))
        })

        it('the ReasonLeft Reasons must be valid', () => {
          const testData = {
            EmploymentActivity: { value: 'Other' },
            Dates: {
              from: { year: 2017, month: 2, day: 5 },
              to: { year: 2018, month: 10, day: 20 },
              present: false,
            },
            ReasonLeft: {
              ReasonDescription: { value: 'My reason' },
              Reasons: {
                items: [
                  { Item: { test: 'testing' } },
                ],
              },
            },
          }

          const expectedErrors = [
            'ReasonLeft.model.Reasons.branchCollection.INCOMPLETE_COLLECTION',
          ]

          expect(validateModel(testData, employment))
            .toEqual(expect.arrayContaining(expectedErrors))
        })

        it('passes valid ReasonLeft Reasons', () => {
          const testData = {
            EmploymentActivity: { value: 'Other' },
            Dates: {
              from: { year: 2017, month: 2, day: 5 },
              to: { year: 2018, month: 10, day: 20 },
              present: false,
            },
            ReasonLeft: {
              ReasonDescription: { value: 'My reason' },
              Reasons: {
                items: [
                  {
                    Item: {
                      Has: { value: 'Yes' },
                      Reason: { value: 'My reason' },
                      Text: { value: 'Some explanation' },
                      Date: { year: 2018, month: 9, day: 30 },
                    },
                  },
                  { Item: { Has: { value: 'No' } } },
                ],
              },
            },
          }

          const expectedErrors = [
            'ReasonLeft.model.Reasons.branchCollection.INCOMPLETE_COLLECTION',
          ]

          expect(validateModel(testData, employment))
            .not.toEqual(expect.arrayContaining(expectedErrors))
        })
      })
    })
  })

  describe('if EmploymentActivity is SelfEmployment', () => {
    it('the Title field is required', () => {
      const testData = {
        EmploymentActivity: { value: 'SelfEmployment' },
      }

      const expectedErrors = [
        'Title.presence.REQUIRED',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Status field is required', () => {
      const testData = {
        EmploymentActivity: { value: 'SelfEmployment' },
      }

      const expectedErrors = [
        'Status.presence.REQUIRED',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Address field is required', () => {
      const testData = {
        EmploymentActivity: { value: 'SelfEmployment' },
      }

      const expectedErrors = [
        'Address.presence.REQUIRED',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Address field must be a valid address', () => {
      const testData = {
        EmploymentActivity: { value: 'SelfEmployment' },
        Address: 'Not a valid address',
      }

      const expectedErrors = [
        'Address.location.street.presence.REQUIRED',
        'Address.location.city.presence.REQUIRED',
        'Address.location.country.presence.REQUIRED',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    describe('if the Address field is international', () => {
      it('AlternateAddress is required', () => {
        const testData = {
          EmploymentActivity: { value: 'SelfEmployment' },
          Address: {
            street: '123 Test St',
            city: 'London',
            country: { value: 'United Kingdom' },
          },
        }

        const expectedErrors = ['AlternateAddress.presence.REQUIRED']

        expect(validateModel(testData, employment))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      describe('if HasDifferentAddress is "Yes"', () => {
        it('AlternateAddress must be a PO address', () => {
          const testData = {
            EmploymentActivity: { value: 'SelfEmployment' },
            Address: {
              street: '123 Test St',
              city: 'London',
              country: { value: 'United Kingdom' },
            },
            AlternateAddress: {
              HasDifferentAddress: { value: 'Yes' },
              Address: {
                street: '123 Test St',
                city: 'London',
                country: { value: 'United Kingdom' },
              },
            },
          }

          const expectedErrors = [
            'AlternateAddress.model.Address.location.country.inclusion.INCLUSION',
          ]

          expect(validateModel(testData, employment))
            .toEqual(expect.arrayContaining(expectedErrors))
        })

        it('passes a valid employment item with an alternate address', () => {
          const testData = {
            EmploymentActivity: { value: 'SelfEmployment' },
            Dates: {
              from: { year: 1990, month: 5, day: 12 },
              present: true,
            },
            Title: 'Manager',
            Status: 'Full-time',
            Address: {
              street: '123 Test St',
              city: 'London',
              country: { value: 'United Kingdom' },
            },
            AlternateAddress: {
              HasDifferentAddress: { value: 'Yes' },
              Address: {
                street: '123 Main ST',
                city: 'FPO',
                state: 'AA',
                zipcode: '34035',
                country: 'POSTOFFICE',
              },
            },
            PhysicalAddress: {
              HasDifferentAddress: { value: 'No' },
            },
            Telephone: {
              number: '1234567890',
              type: 'Domestic',
              timeOfDay: 'Day',
            },
            Employment: 'Company',
            ReferenceName: {
              first: 'Person',
              noMiddleName: true,
              last: 'Name',
            },
            ReferencePhone: {
              number: '1234567890',
              type: 'Domestic',
              timeOfDay: 'Both',
            },
            ReferenceAddress: {
              street: '123 Test St',
              city: 'London',
              country: { value: 'United Kingdom' },
            },
            ReferenceAlternateAddress: {
              HasDifferentAddress: { value: 'No' },
            },
            Reprimand: {
              items: [
                { Item: { Has: { value: 'No' } } },
              ],
            },
          }

          expect(validateModel(testData, employment)).toEqual(true)
        })
      })

      describe('if HasDifferentAddress is "No"', () => {
        it('passes a valid employment item with an alternate address', () => {
          const testData = {
            EmploymentActivity: { value: 'SelfEmployment' },
            Dates: {
              from: { year: 1990, month: 5, day: 12 },
              present: true,
            },
            Title: 'Manager',
            Status: 'Full-time',
            Address: {
              street: '123 Test St',
              city: 'London',
              country: { value: 'United Kingdom' },
            },
            AlternateAddress: {
              HasDifferentAddress: { value: 'No' },
            },
            PhysicalAddress: {
              HasDifferentAddress: { value: 'No' },
            },
            Telephone: {
              number: '1234567890',
              type: 'Domestic',
              timeOfDay: 'Day',
            },
            Employment: 'Company',
            ReferenceName: {
              first: 'Person',
              noMiddleName: true,
              last: 'Name',
            },
            ReferencePhone: {
              number: '1234567890',
              type: 'Domestic',
              timeOfDay: 'Both',
            },
            ReferenceAddress: {
              street: '123 Test St',
              city: 'London',
              country: { value: 'United Kingdom' },
            },
            ReferenceAlternateAddress: {
              HasDifferentAddress: { value: 'No' },
            },
            Reprimand: {
              items: [
                { Item: { Has: { value: 'No' } } },
              ],
            },
          }

          expect(validateModel(testData, employment)).toEqual(true)
        })
      })
    })

    it('the PhysicalAddress field is required', () => {
      const testData = {
        EmploymentActivity: { value: 'SelfEmployment' },
      }

      const expectedErrors = [
        'PhysicalAddress.presence.REQUIRED',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the PhysicalAddress field must be a valid physical address', () => {
      const testData = {
        EmploymentActivity: { value: 'SelfEmployment' },
        PhysicalAddress: {
          HasDifferentAddress: 'blah',
        },
      }

      const expectedErrors = [
        'PhysicalAddress.model.HasDifferentAddress.hasValue.MISSING_VALUE',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    describe('if the PhysicalAddress field is international', () => {
      it('PhysicalAlternateAddress is required', () => {
        const testData = {
          EmploymentActivity: { value: 'SelfEmployment' },
          PhysicalAddress: {
            HasDifferentAddress: { value: 'Yes' },
            Address: {
              street: '123 Test St',
              city: 'London',
              country: { value: 'United Kingdom' },
            },
          },
        }

        const expectedErrors = ['PhysicalAlternateAddress.presence.REQUIRED']

        expect(validateModel(testData, employment))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      describe('if HasDifferentAddress is "Yes"', () => {
        it('PhysicalAlternateAddress must be a PO address', () => {
          const testData = {
            EmploymentActivity: { value: 'SelfEmployment' },
            PhysicalAddress: {
              HasDifferentAddress: { value: 'Yes' },
              Address: {
                street: '123 Test St',
                city: 'London',
                country: { value: 'United Kingdom' },
              },
            },
            PhysicalAlternateAddress: {
              HasDifferentAddress: { value: 'Yes' },
              Address: {
                street: '123 Test St',
                city: 'London',
                country: { value: 'United Kingdom' },
              },
            },
          }

          const expectedErrors = [
            'PhysicalAlternateAddress.model.Address.location.country.inclusion.INCLUSION',
          ]

          expect(validateModel(testData, employment))
            .toEqual(expect.arrayContaining(expectedErrors))
        })

        it('passes a valid employment item with an alternate physical address', () => {
          const testData = {
            EmploymentActivity: { value: 'SelfEmployment' },
            Dates: {
              from: { year: 1990, month: 5, day: 12 },
              present: true,
            },
            Title: 'Manager',
            Status: 'Full-time',
            Address: {
              street: '123 Test St',
              city: 'London',
              country: { value: 'United Kingdom' },
            },
            AlternateAddress: {
              HasDifferentAddress: { value: 'No' },
            },
            PhysicalAddress: {
              HasDifferentAddress: { value: 'Yes' },
              Address: {
                street: '123 Test St',
                city: 'London',
                country: { value: 'United Kingdom' },
              },
            },
            PhysicalAlternateAddress: {
              HasDifferentAddress: { value: 'Yes' },
              Address: {
                street: '123 Main ST',
                city: 'FPO',
                state: 'AA',
                zipcode: '34035',
                country: 'POSTOFFICE',
              },
            },
            Telephone: {
              number: '1234567890',
              type: 'Domestic',
              timeOfDay: 'Day',
            },
            Employment: 'Company',
            ReferenceName: {
              first: 'Person',
              noMiddleName: true,
              last: 'Name',
            },
            ReferencePhone: {
              number: '1234567890',
              type: 'Domestic',
              timeOfDay: 'Both',
            },
            ReferenceAddress: {
              street: '123 Test St',
              city: 'London',
              country: { value: 'United Kingdom' },
            },
            ReferenceAlternateAddress: {
              HasDifferentAddress: { value: 'No' },
            },
            Reprimand: {
              items: [
                { Item: { Has: { value: 'No' } } },
              ],
            },
          }

          expect(validateModel(testData, employment)).toEqual(true)
        })
      })

      describe('if HasDifferentAddress is "No"', () => {
        it('passes a valid employment item with an alternate physical address', () => {
          const testData = {
            EmploymentActivity: { value: 'SelfEmployment' },
            Dates: {
              from: { year: 1990, month: 5, day: 12 },
              present: true,
            },
            Title: 'Manager',
            Status: 'Full-time',
            Address: {
              street: '123 Test St',
              city: 'London',
              country: { value: 'United Kingdom' },
            },
            AlternateAddress: {
              HasDifferentAddress: { value: 'No' },
            },
            PhysicalAddress: {
              HasDifferentAddress: { value: 'Yes' },
              Address: {
                street: '123 Test St',
                city: 'London',
                country: { value: 'United Kingdom' },
              },
            },
            PhysicalAlternateAddress: {
              HasDifferentAddress: { value: 'No' },
            },
            Telephone: {
              number: '1234567890',
              type: 'Domestic',
              timeOfDay: 'Day',
            },
            Employment: 'Company',
            ReferenceName: {
              first: 'Person',
              noMiddleName: true,
              last: 'Name',
            },
            ReferencePhone: {
              number: '1234567890',
              type: 'Domestic',
              timeOfDay: 'Both',
            },
            ReferenceAddress: {
              street: '123 Test St',
              city: 'London',
              country: { value: 'United Kingdom' },
            },
            ReferenceAlternateAddress: {
              HasDifferentAddress: { value: 'No' },
            },
            Reprimand: {
              items: [
                { Item: { Has: { value: 'No' } } },
              ],
            },
          }

          expect(validateModel(testData, employment)).toEqual(true)
        })
      })
    })

    describe('if the PhysicalAddress field is a military address', () => {
      it('PhysicalAlternateAddress is required', () => {
        const testData = {
          EmploymentActivity: { value: 'SelfEmployment' },
          PhysicalAddress: {
            HasDifferentAddress: { value: 'Yes' },
            Address: {
              street: '123 Main ST',
              city: 'FPO',
              state: 'AA',
              zipcode: '34035',
              country: 'POSTOFFICE',
            },
          },
        }

        const expectedErrors = ['PhysicalAlternateAddress.presence.REQUIRED']

        expect(validateModel(testData, employment))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('PhysicalAlternateAddress must not be a PO address', () => {
        const testData = {
          EmploymentActivity: { value: 'SelfEmployment' },
          PhysicalAddress: {
            HasDifferentAddress: { value: 'Yes' },
            Address: {
              street: '123 Main ST',
              city: 'FPO',
              state: 'AA',
              zipcode: '34035',
              country: 'POSTOFFICE',
            },
          },
          PhysicalAlternateAddress: {
            HasDifferentAddress: { value: 'Yes' },
            Address: {
              street: '123 Main ST',
              city: 'FPO',
              state: 'AA',
              zipcode: '34035',
              country: 'POSTOFFICE',
            },
          },
        }

        const expectedErrors = [
          'PhysicalAlternateAddress.model.Address.location.country.exclusion.EXCLUSION',
        ]

        expect(validateModel(testData, employment))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('passes a valid employment item with an alternate physical address', () => {
        const testData = {
          EmploymentActivity: { value: 'SelfEmployment' },
          Dates: {
            from: { year: 1990, month: 5, day: 12 },
            present: true,
          },
          Title: 'Manager',
          Status: 'Full-time',
          Address: {
            street: '123 Test St',
            city: 'London',
            country: { value: 'United Kingdom' },
          },
          AlternateAddress: {
            HasDifferentAddress: { value: 'No' },
          },
          PhysicalAddress: {
            HasDifferentAddress: { value: 'Yes' },
            Address: {
              street: '123 Main ST',
              city: 'FPO',
              state: 'AA',
              zipcode: '34035',
              country: 'POSTOFFICE',
            },
          },
          PhysicalAlternateAddress: {
            Address: {
              street: '123 Test St',
              city: 'London',
              country: { value: 'United Kingdom' },
            },
          },
          Telephone: {
            number: '1234567890',
            type: 'Domestic',
            timeOfDay: 'Day',
          },
          Employment: 'Company',
          ReferenceName: {
            first: 'Person',
            noMiddleName: true,
            last: 'Name',
          },
          ReferencePhone: {
            number: '1234567890',
            type: 'Domestic',
            timeOfDay: 'Both',
          },
          ReferenceAddress: {
            street: '123 Test St',
            city: 'London',
            country: { value: 'United Kingdom' },
          },
          ReferenceAlternateAddress: {
            HasDifferentAddress: { value: 'No' },
          },
          Reprimand: {
            items: [
              { Item: { Has: { value: 'No' } } },
            ],
          },
        }

        expect(validateModel(testData, employment)).toEqual(true)
      })
    })

    it('the Telephone field is required', () => {
      const testData = {
        EmploymentActivity: { value: 'SelfEmployment' },
      }

      const expectedErrors = [
        'Telephone.presence.REQUIRED',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Telephone field must exist', () => {
      const testData = {
        EmploymentActivity: { value: 'SelfEmployment' },
        Telephone: { noNumber: true },
      }

      const expectedErrors = [
        'Telephone.model.number.presence.REQUIRED',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Telephone field must be a valid phone', () => {
      const testData = {
        EmploymentActivity: { value: 'SelfEmployment' },
        Telephone: {
          number: 'notvalid',
        },
      }

      const expectedErrors = [
        'Telephone.model.timeOfDay.presence.REQUIRED',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Employment field is required', () => {
      const testData = {
        EmploymentActivity: { value: 'SelfEmployment' },
      }

      const expectedErrors = [
        'Employment.presence.REQUIRED',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Reference fields are required', () => {
      const testData = {
        EmploymentActivity: { value: 'SelfEmployment' },
      }

      const expectedErrors = [
        'ReferenceName.presence.REQUIRED',
        'ReferencePhone.presence.REQUIRED',
        'ReferenceAddress.presence.REQUIRED',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('ReferenceName must be a valid name', () => {
      const testData = {
        EmploymentActivity: { value: 'SelfEmployment' },
        ReferenceName: {
          last: 'Lastname',
        },
      }

      const expectedErrors = [
        'ReferenceName.model.first.presence.REQUIRED',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('ReferencePhone must be a valid phone', () => {
      const testData = {
        EmploymentActivity: { value: 'SelfEmployment' },
        ReferencePhone: {
          number: 'abcde',
        },
      }

      const expectedErrors = [
        'ReferencePhone.model.timeOfDay.presence.REQUIRED',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('ReferenceAddress must be a valid address', () => {
      const testData = {
        EmploymentActivity: { value: 'SelfEmployment' },
        ReferenceAddress: 'Not an address',
      }

      const expectedErrors = [
        'ReferenceAddress.location.street.presence.REQUIRED',
        'ReferenceAddress.location.city.presence.REQUIRED',
        'ReferenceAddress.location.country.presence.REQUIRED',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    describe('if the ReferenceAddress field is international', () => {
      it('ReferenceAlternateAddress is required', () => {
        const testData = {
          EmploymentActivity: { value: 'SelfEmployment' },
          ReferenceAddress: {
            street: '123 Test St',
            city: 'London',
            country: { value: 'United Kingdom' },
          },
        }

        const expectedErrors = ['ReferenceAlternateAddress.presence.REQUIRED']

        expect(validateModel(testData, employment))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      describe('if HasDifferentAddress is "Yes"', () => {
        it('ReferenceAlternateAddress must be a PO address', () => {
          const testData = {
            EmploymentActivity: { value: 'SelfEmployment' },
            ReferenceAddress: {
              street: '123 Test St',
              city: 'London',
              country: { value: 'United Kingdom' },
            },
            ReferenceAlternateAddress: {
              HasDifferentAddress: { value: 'Yes' },
              Address: {
                street: '123 Main St',
                city: 'New York',
                state: 'NY',
                zipcode: '10002',
                country: 'United States',
              },
            },
          }

          const expectedErrors = [
            'ReferenceAlternateAddress.model.Address.location.country.inclusion.INCLUSION',
          ]

          expect(validateModel(testData, employment))
            .toEqual(expect.arrayContaining(expectedErrors))
        })

        it('passes a valid employment with a reference alternate address', () => {
          const testData = {
            EmploymentActivity: { value: 'SelfEmployment' },
            Dates: {
              from: { year: 1990, month: 5, day: 12 },
              present: true,
            },
            Title: 'Manager',
            Status: 'Full-time',
            Address: {
              street: '40 Office St',
              city: 'New York',
              state: 'NY',
              zipcode: '10001',
              country: 'United States',
            },
            PhysicalAddress: {
              HasDifferentAddress: { value: 'No' },
            },
            Telephone: {
              number: '1234567890',
              type: 'Domestic',
              timeOfDay: 'Day',
            },
            Employment: 'Company',
            ReferenceName: {
              first: 'Person',
              noMiddleName: true,
              last: 'Name',
            },
            ReferencePhone: {
              number: '1234567890',
              type: 'Domestic',
              timeOfDay: 'Both',
            },
            ReferenceAddress: {
              street: '123 Test St',
              city: 'London',
              country: { value: 'United Kingdom' },
            },
            ReferenceAlternateAddress: {
              HasDifferentAddress: { value: 'Yes' },
              Address: {
                street: '123 Main ST',
                city: 'FPO',
                state: 'AA',
                zipcode: '34035',
                country: 'POSTOFFICE',
              },
            },
            Reprimand: {
              items: [
                { Item: { Has: { value: 'No' } } },
              ],
            },
          }

          expect(validateModel(testData, employment)).toEqual(true)
        })
      })

      describe('if HasDifferentAddress is "No"', () => {
        it('passes a valid employment with a reference alternate address', () => {
          const testData = {
            EmploymentActivity: { value: 'SelfEmployment' },
            Dates: {
              from: { year: 1990, month: 5, day: 12 },
              present: true,
            },
            Title: 'Manager',
            Status: 'Full-time',
            Address: {
              street: '40 Office St',
              city: 'New York',
              state: 'NY',
              zipcode: '10001',
              country: 'United States',
            },
            PhysicalAddress: {
              HasDifferentAddress: { value: 'No' },
            },
            Telephone: {
              number: '1234567890',
              type: 'Domestic',
              timeOfDay: 'Day',
            },
            Employment: 'Company',
            ReferenceName: {
              first: 'Person',
              noMiddleName: true,
              last: 'Name',
            },
            ReferencePhone: {
              number: '1234567890',
              type: 'Domestic',
              timeOfDay: 'Both',
            },
            ReferenceAddress: {
              street: '123 Test St',
              city: 'London',
              country: { value: 'United Kingdom' },
            },
            ReferenceAlternateAddress: {
              HasDifferentAddress: { value: 'No' },
            },
            Reprimand: {
              items: [
                { Item: { Has: { value: 'No' } } },
              ],
            },
          }

          expect(validateModel(testData, employment)).toEqual(true)
        })
      })
    })

    describe('if the ReferenceAddress field is a military address', () => {
      it('ReferenceAlternateAddress is required', () => {
        const testData = {
          EmploymentActivity: { value: 'SelfEmployment' },
          ReferenceAddress: {
            street: '123 Main ST',
            city: 'FPO',
            state: 'AA',
            zipcode: '34035',
            country: 'POSTOFFICE',
          },
        }

        const expectedErrors = ['ReferenceAlternateAddress.presence.REQUIRED']

        expect(validateModel(testData, employment))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('ReferenceAlternateAddress must not be a PO address', () => {
        const testData = {
          EmploymentActivity: { value: 'SelfEmployment' },
          ReferenceAddress: {
            street: '123 Main ST',
            city: 'FPO',
            state: 'AA',
            zipcode: '34035',
            country: 'POSTOFFICE',
          },
          ReferenceAlternateAddress: {
            HasDifferentAddress: { value: 'Yes' },
            Address: {
              street: '123 Main ST',
              city: 'FPO',
              state: 'AA',
              zipcode: '34035',
              country: 'POSTOFFICE',
            },
          },
        }

        const expectedErrors = [
          'ReferenceAlternateAddress.model.Address.location.country.exclusion.EXCLUSION',
        ]

        expect(validateModel(testData, employment))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('passes a valid employment with a reference alternate address', () => {
        const testData = {
          EmploymentActivity: { value: 'SelfEmployment' },
          Dates: {
            from: { year: 1990, month: 5, day: 12 },
            present: true,
          },
          Title: 'Manager',
          Status: 'Full-time',
          Address: {
            street: '40 Office St',
            city: 'New York',
            state: 'NY',
            zipcode: '10001',
            country: 'United States',
          },
          PhysicalAddress: {
            HasDifferentAddress: { value: 'No' },
          },
          Telephone: {
            number: '1234567890',
            type: 'Domestic',
            timeOfDay: 'Day',
          },
          Employment: 'Company',
          ReferenceName: {
            first: 'Person',
            noMiddleName: true,
            last: 'Name',
          },
          ReferencePhone: {
            number: '1234567890',
            type: 'Domestic',
            timeOfDay: 'Both',
          },
          Reprimand: {
            items: [
              { Item: { Has: { value: 'No' } } },
            ],
          },
          ReferenceAddress: {
            street: '123 Main ST',
            city: 'FPO',
            state: 'AA',
            zipcode: '34035',
            country: 'POSTOFFICE',
          },
          ReferenceAlternateAddress: {
            Address: {
              street: '123 Main ST',
              city: 'New York',
              state: 'NY',
              zipcode: '10003',
              country: 'United States',
            },
          },
        }

        expect(validateModel(testData, employment)).toEqual(true)
      })
    })

    it('passes a valid Employment item', () => {
      const testData = {
        EmploymentActivity: { value: 'SelfEmployment' },
        Dates: {
          from: { year: 1990, month: 5, day: 12 },
          present: true,
        },
        Title: 'Manager',
        Status: 'Full-time',
        Address: {
          street: '40 Office St',
          city: 'New York',
          state: 'NY',
          zipcode: '10001',
          country: 'United States',
        },
        PhysicalAddress: {
          HasDifferentAddress: { value: 'No' },
        },
        Telephone: {
          number: '1234567890',
          type: 'Domestic',
          timeOfDay: 'Day',
        },
        Employment: 'Company',
        ReferenceName: {
          first: 'Person',
          noMiddleName: true,
          last: 'Name',
        },
        ReferencePhone: {
          number: '1234567890',
          type: 'Domestic',
          timeOfDay: 'Both',
        },
        ReferenceAddress: {
          street: '1 Main St',
          city: 'New York',
          state: 'NY',
          zipcode: '10001',
          country: 'United States',
        },
        Reprimand: {
          items: [
            { Item: { Has: { value: 'No' } } },
          ],
        },
      }

      expect(validateModel(testData, employment)).toBe(true)
    })

    it('passes a valid Employment item requiring a physical address', () => {
      const testData = {
        EmploymentActivity: { value: 'SelfEmployment' },
        Dates: {
          from: { year: 1990, month: 5, day: 12 },
          present: true,
        },
        Title: 'Manager',
        Status: 'Full-time',
        Address: {
          street: '40 Office St',
          city: 'New York',
          state: 'NY',
          zipcode: '10001',
          country: 'United States',
        },
        PhysicalAddress: {
          HasDifferentAddress: { value: 'Yes' },
          Address: {
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            zipcode: '10003',
            country: 'United States',
          },
          Telephone: {
            number: '1234567890',
            type: 'Domestic',
            timeOfDay: 'Both',
          },
        },
        Telephone: {
          number: '1234567890',
          type: 'Domestic',
          timeOfDay: 'Day',
        },
        Employment: 'Company',
        ReferenceName: {
          first: 'Person',
          noMiddleName: true,
          last: 'Name',
        },
        ReferencePhone: {
          number: '1234567890',
          type: 'Domestic',
          timeOfDay: 'Both',
        },
        ReferenceAddress: {
          street: '1 Main St',
          city: 'New York',
          state: 'NY',
          zipcode: '10001',
          country: 'United States',
        },
        Reprimand: {
          items: [
            { Item: { Has: { value: 'No' } } },
          ],
        },
      }

      expect(validateModel(testData, employment)).toBe(true)
    })
  })

  describe('if EmploymentActivity is military', () => {
    it('the Title field is required', () => {
      const testData = {
        EmploymentActivity: { value: 'ActiveMilitary' },
      }

      const expectedErrors = [
        'Title.presence.REQUIRED',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the DutyStation field is required', () => {
      const testData = {
        EmploymentActivity: { value: 'ActiveMilitary' },
      }

      const expectedErrors = [
        'DutyStation.presence.REQUIRED',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Status field is required', () => {
      const testData = {
        EmploymentActivity: { value: 'NationalGuard' },
      }

      const expectedErrors = [
        'Status.presence.REQUIRED',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Address field is required', () => {
      const testData = {
        EmploymentActivity: { value: 'USPHS' },
      }

      const expectedErrors = [
        'Address.presence.REQUIRED',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Address field must be a valid address', () => {
      const testData = {
        EmploymentActivity: { value: 'ActiveMilitary' },
        Address: 'Not a valid address',
      }

      const expectedErrors = [
        'Address.location.street.presence.REQUIRED',
        'Address.location.city.presence.REQUIRED',
        'Address.location.country.presence.REQUIRED',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    describe('if the Address field is international', () => {
      it('AlternateAddress is required', () => {
        const testData = {
          EmploymentActivity: { value: 'ActiveMilitary' },
          Address: {
            street: '123 Test St',
            city: 'London',
            country: { value: 'United Kingdom' },
          },
        }

        const expectedErrors = ['AlternateAddress.presence.REQUIRED']

        expect(validateModel(testData, employment))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      describe('if HasDifferentAddress is "Yes"', () => {
        it('AlternateAddress must be a PO address', () => {
          const testData = {
            EmploymentActivity: { value: 'ActiveMilitary' },
            Address: {
              street: '123 Test St',
              city: 'London',
              country: { value: 'United Kingdom' },
            },
            AlternateAddress: {
              HasDifferentAddress: { value: 'Yes' },
              Address: {
                street: '123 Test St',
                city: 'London',
                country: { value: 'United Kingdom' },
              },
            },
          }

          const expectedErrors = [
            'AlternateAddress.model.Address.location.country.inclusion.INCLUSION',
          ]

          expect(validateModel(testData, employment))
            .toEqual(expect.arrayContaining(expectedErrors))
        })

        it('passes a valid employment item with an alternate address', () => {
          const testData = {
            EmploymentActivity: { value: 'ActiveMilitary' },
            Dates: {
              from: { year: 1990, month: 5, day: 12 },
              present: true,
            },
            Title: 'Manager',
            DutyStation: 'Something',
            Status: 'Full-time',
            Address: {
              street: '123 Test St',
              city: 'London',
              country: { value: 'United Kingdom' },
            },
            AlternateAddress: {
              HasDifferentAddress: { value: 'Yes' },
              Address: {
                street: '123 Main ST',
                city: 'FPO',
                state: 'AA',
                zipcode: '34035',
                country: 'POSTOFFICE',
              },
            },
            Telephone: {
              number: '1234567890',
              type: 'Domestic',
              timeOfDay: 'Day',
            },
            Supervisor: {
              SupervisorName: { value: 'Person Supervisor' },
              Title: { value: 'VP' },
              EmailNotApplicable: { applicable: false },
              Address: {
                street: '40 Office St',
                city: 'New York',
                state: 'NY',
                zipcode: '10001',
                country: 'United States',
              },
              Telephone: {
                number: '1234567890',
                type: 'Domestic',
                timeOfDay: 'Day',
              },
            },
            Reprimand: {
              items: [
                { Item: { Has: { value: 'No' } } },
              ],
            },
          }

          expect(validateModel(testData, employment)).toEqual(true)
        })
      })

      describe('if HasDifferentAddress is "No"', () => {
        it('passes a valid employment item with an alternate address', () => {
          const testData = {
            EmploymentActivity: { value: 'ActiveMilitary' },
            Dates: {
              from: { year: 1990, month: 5, day: 12 },
              present: true,
            },
            Title: 'Manager',
            DutyStation: 'Something',
            Status: 'Full-time',
            Address: {
              street: '123 Test St',
              city: 'London',
              country: { value: 'United Kingdom' },
            },
            AlternateAddress: {
              HasDifferentAddress: { value: 'No' },
            },
            Telephone: {
              number: '1234567890',
              type: 'Domestic',
              timeOfDay: 'Day',
            },
            Supervisor: {
              SupervisorName: { value: 'Person Supervisor' },
              Title: { value: 'VP' },
              EmailNotApplicable: { applicable: false },
              Address: {
                street: '40 Office St',
                city: 'New York',
                state: 'NY',
                zipcode: '10001',
                country: 'United States',
              },
              Telephone: {
                number: '1234567890',
                type: 'Domestic',
                timeOfDay: 'Day',
              },
            },
            Reprimand: {
              items: [
                { Item: { Has: { value: 'No' } } },
              ],
            },
          }

          expect(validateModel(testData, employment)).toEqual(true)
        })
      })
    })

    describe('if the Address field is a military address', () => {
      it('AlternateAddress is required', () => {
        const testData = {
          Address: {
            street: '123 Main ST',
            city: 'FPO',
            state: 'AA',
            zipcode: '34035',
            country: 'POSTOFFICE',
          },
        }

        const expectedErrors = ['AlternateAddress.presence.REQUIRED']

        expect(validateModel(testData, employment))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('AlternateAddress must not be a PO address', () => {
        const testData = {
          Address: {
            street: '123 Main ST',
            city: 'FPO',
            state: 'AA',
            zipcode: '34035',
            country: 'POSTOFFICE',
          },
          AlternateAddress: {
            HasDifferentAddress: { value: 'Yes' },
            Address: {
              street: '123 Main ST',
              city: 'FPO',
              state: 'AA',
              zipcode: '34035',
              country: 'POSTOFFICE',
            },
          },
        }

        const expectedErrors = [
          'AlternateAddress.model.Address.location.country.exclusion.EXCLUSION',
        ]

        expect(validateModel(testData, employment))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('passes a valid employment item with an alternate address', () => {
        const testData = {
          EmploymentActivity: { value: 'ActiveMilitary' },
          Dates: {
            from: { year: 1990, month: 5, day: 12 },
            present: true,
          },
          Title: 'Manager',
          DutyStation: 'Something',
          Status: 'Full-time',
          Address: {
            street: '123 Main ST',
            city: 'FPO',
            state: 'AA',
            zipcode: '34035',
            country: 'POSTOFFICE',
          },
          AlternateAddress: {
            Address: {
              street: '123 Test St',
              city: 'London',
              country: { value: 'United Kingdom' },
            },
          },
          Telephone: {
            number: '1234567890',
            type: 'Domestic',
            timeOfDay: 'Day',
          },
          Supervisor: {
            SupervisorName: { value: 'Person Supervisor' },
            Title: { value: 'VP' },
            EmailNotApplicable: { applicable: false },
            Address: {
              street: '40 Office St',
              city: 'New York',
              state: 'NY',
              zipcode: '10001',
              country: 'United States',
            },
            Telephone: {
              number: '1234567890',
              type: 'Domestic',
              timeOfDay: 'Day',
            },
          },
          Reprimand: {
            items: [
              { Item: { Has: { value: 'No' } } },
            ],
          },
        }

        expect(validateModel(testData, employment)).toEqual(true)
      })
    })

    it('the Telephone field is required', () => {
      const testData = {
        EmploymentActivity: { value: 'NationalGuard' },
      }

      const expectedErrors = [
        'Telephone.presence.REQUIRED',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Telephone field must exist', () => {
      const testData = {
        EmploymentActivity: { value: 'USPHS' },
        Telephone: { noNumber: true },
      }

      const expectedErrors = [
        'Telephone.model.number.presence.REQUIRED',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Telephone field must be a valid phone', () => {
      const testData = {
        EmploymentActivity: { value: 'USPHS' },
        Telephone: {
          number: 'notvalid',
        },
      }

      const expectedErrors = [
        'Telephone.model.timeOfDay.presence.REQUIRED',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Supervisor field is required', () => {
      const testData = {
        EmploymentActivity: { value: 'NationalGuard' },
      }

      const expectedErrors = [
        'Supervisor.presence.REQUIRED',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Supervisor field must be a valid supervisor', () => {
      const testData = {
        EmploymentActivity: { value: 'NationalGuard' },
        Supervisor: {
          SupervisorName: 'something',
        },
      }

      const expectedErrors = [
        'Supervisor.model.SupervisorName.hasValue.MISSING_VALUE',
        'Supervisor.model.Title.presence.REQUIRED',
        'Supervisor.model.Email.presence.REQUIRED',
        'Supervisor.model.Address.presence.REQUIRED',
        'Supervisor.model.Telephone.presence.REQUIRED',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Supervisor must have a phone number', () => {
      const testData = {
        EmploymentActivity: { value: 'NationalGuard' },
        Supervisor: {
          SupervisorName: { value: 'Person Supervisor' },
          Title: { value: 'VP' },
          EmailNotApplicable: { applicable: false },
          Address: {
            street: '40 Office St',
            city: 'New York',
            state: 'NY',
            zipcode: '10001',
            country: 'United States',
          },
          Telephone: {
            noNumber: true,
          },
        },
      }

      const expectedErrors = [
        'Supervisor.model.Telephone.model.number.presence.REQUIRED',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid Employment item', () => {
      const testData = {
        EmploymentActivity: { value: 'ActiveMilitary' },
        Dates: {
          from: { year: 1990, month: 5, day: 12 },
          present: true,
        },
        Title: 'Manager',
        DutyStation: 'Something',
        Status: 'Full-time',
        Address: {
          street: '40 Office St',
          city: 'New York',
          state: 'NY',
          zipcode: '10001',
          country: 'United States',
        },
        Telephone: {
          number: '1234567890',
          type: 'Domestic',
          timeOfDay: 'Day',
        },
        Supervisor: {
          SupervisorName: { value: 'Person Supervisor' },
          Title: { value: 'VP' },
          EmailNotApplicable: { applicable: false },
          Address: {
            street: '40 Office St',
            city: 'New York',
            state: 'NY',
            zipcode: '10001',
            country: 'United States',
          },
          Telephone: {
            number: '1234567890',
            type: 'Domestic',
            timeOfDay: 'Day',
          },
        },
        Reprimand: {
          items: [
            { Item: { Has: { value: 'No' } } },
          ],
        },
      }

      expect(validateModel(testData, employment)).toBe(true)
    })
  })

  describe('if EmploymentActivity is other', () => {
    it('the Title field is required', () => {
      const testData = {
        EmploymentActivity: { value: 'OtherFederal' },
      }

      const expectedErrors = [
        'Title.presence.REQUIRED',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Employment field is required', () => {
      const testData = {
        EmploymentActivity: { value: 'StateGovernment' },
      }

      const expectedErrors = [
        'Employment.presence.REQUIRED',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Status field is required', () => {
      const testData = {
        EmploymentActivity: { value: 'StateGovernment' },
      }

      const expectedErrors = [
        'Status.presence.REQUIRED',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Address field is required', () => {
      const testData = {
        EmploymentActivity: { value: 'FederalContractor' },
      }

      const expectedErrors = [
        'Address.presence.REQUIRED',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Address field must be a valid address', () => {
      const testData = {
        EmploymentActivity: { value: 'NonGovernment' },
        Address: 'Not a valid address',
      }

      const expectedErrors = [
        'Address.location.street.presence.REQUIRED',
        'Address.location.city.presence.REQUIRED',
        'Address.location.country.presence.REQUIRED',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    describe('if the Address field is international', () => {
      it('AlternateAddress is required', () => {
        const testData = {
          EmploymentActivity: { value: 'NonGovernment' },
          Address: {
            street: '123 Test St',
            city: 'London',
            country: { value: 'United Kingdom' },
          },
        }

        const expectedErrors = ['AlternateAddress.presence.REQUIRED']

        expect(validateModel(testData, employment))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      describe('if HasDifferentAddress is "Yes"', () => {
        it('AlternateAddress must be a PO address', () => {
          const testData = {
            EmploymentActivity: { value: 'NonGovernment' },
            Address: {
              street: '123 Test St',
              city: 'London',
              country: { value: 'United Kingdom' },
            },
            AlternateAddress: {
              HasDifferentAddress: { value: 'Yes' },
              Address: {
                street: '123 Test St',
                city: 'London',
                country: { value: 'United Kingdom' },
              },
            },
          }

          const expectedErrors = [
            'AlternateAddress.model.Address.location.country.inclusion.INCLUSION',
          ]

          expect(validateModel(testData, employment))
            .toEqual(expect.arrayContaining(expectedErrors))
        })

        it('passes a valid employment item with an alternate address', () => {
          const testData = {
            EmploymentActivity: { value: 'NonGovernment' },
            Dates: {
              from: { year: 1990, month: 5, day: 12 },
              present: true,
            },
            Title: 'Manager',
            Employment: 'My Company',
            Status: 'Full-time',
            Address: {
              street: '123 Test St',
              city: 'London',
              country: { value: 'United Kingdom' },
            },
            AlternateAddress: {
              HasDifferentAddress: { value: 'Yes' },
              Address: {
                street: '123 Main ST',
                city: 'FPO',
                state: 'AA',
                zipcode: '34035',
                country: 'POSTOFFICE',
              },
            },
            PhysicalAddress: {
              HasDifferentAddress: { value: 'No' },
            },
            Telephone: {
              number: '1234567890',
              type: 'Domestic',
              timeOfDay: 'Day',
            },
            Supervisor: {
              SupervisorName: { value: 'Person Supervisor' },
              Title: { value: 'VP' },
              EmailNotApplicable: { applicable: false },
              Address: {
                street: '40 Office St',
                city: 'New York',
                state: 'NY',
                zipcode: '10001',
                country: 'United States',
              },
              Telephone: {
                number: '1234567890',
                type: 'Domestic',
                timeOfDay: 'Day',
              },
            },
            Reprimand: {
              items: [
                { Item: { Has: { value: 'No' } } },
              ],
            },
          }

          expect(validateModel(testData, employment)).toEqual(true)
        })
      })

      describe('if HasDifferentAddress is "No"', () => {
        it('passes a valid employment item with an alternate address', () => {
          const testData = {
            EmploymentActivity: { value: 'NonGovernment' },
            Dates: {
              from: { year: 1990, month: 5, day: 12 },
              present: true,
            },
            Title: 'Manager',
            Employment: 'My Company',
            Status: 'Full-time',
            Address: {
              street: '123 Test St',
              city: 'London',
              country: { value: 'United Kingdom' },
            },
            AlternateAddress: {
              HasDifferentAddress: { value: 'No' },
            },
            PhysicalAddress: {
              HasDifferentAddress: { value: 'No' },
            },
            Telephone: {
              number: '1234567890',
              type: 'Domestic',
              timeOfDay: 'Day',
            },
            Supervisor: {
              SupervisorName: { value: 'Person Supervisor' },
              Title: { value: 'VP' },
              EmailNotApplicable: { applicable: false },
              Address: {
                street: '40 Office St',
                city: 'New York',
                state: 'NY',
                zipcode: '10001',
                country: 'United States',
              },
              Telephone: {
                number: '1234567890',
                type: 'Domestic',
                timeOfDay: 'Day',
              },
            },
            Reprimand: {
              items: [
                { Item: { Has: { value: 'No' } } },
              ],
            },
          }

          expect(validateModel(testData, employment)).toEqual(true)
        })
      })
    })

    describe('if the Address field is a military address', () => {
      it('AlternateAddress is required', () => {
        const testData = {
          EmploymentActivity: { value: 'NonGovernment' },
          Address: {
            street: '123 Main ST',
            city: 'FPO',
            state: 'AA',
            zipcode: '34035',
            country: 'POSTOFFICE',
          },
        }

        const expectedErrors = ['AlternateAddress.presence.REQUIRED']

        expect(validateModel(testData, employment))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('AlternateAddress must not be a PO address', () => {
        const testData = {
          EmploymentActivity: { value: 'NonGovernment' },
          Address: {
            street: '123 Main ST',
            city: 'FPO',
            state: 'AA',
            zipcode: '34035',
            country: 'POSTOFFICE',
          },
          AlternateAddress: {
            HasDifferentAddress: { value: 'Yes' },
            Address: {
              street: '123 Main ST',
              city: 'FPO',
              state: 'AA',
              zipcode: '34035',
              country: 'POSTOFFICE',
            },
          },
        }

        const expectedErrors = [
          'AlternateAddress.model.Address.location.country.exclusion.EXCLUSION',
        ]

        expect(validateModel(testData, employment))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('passes a valid employment item with an alternate address', () => {
        const testData = {
          EmploymentActivity: { value: 'NonGovernment' },
          Dates: {
            from: { year: 1990, month: 5, day: 12 },
            present: true,
          },
          Title: 'Manager',
          Employment: 'My Company',
          Status: 'Full-time',
          Address: {
            street: '123 Main ST',
            city: 'FPO',
            state: 'AA',
            zipcode: '34035',
            country: 'POSTOFFICE',
          },
          AlternateAddress: {
            Address: {
              street: '40 Office St',
              city: 'New York',
              state: 'NY',
              zipcode: '10001',
              country: 'United States',
            },
          },
          PhysicalAddress: {
            HasDifferentAddress: { value: 'No' },
          },
          Telephone: {
            number: '1234567890',
            type: 'Domestic',
            timeOfDay: 'Day',
          },
          Supervisor: {
            SupervisorName: { value: 'Person Supervisor' },
            Title: { value: 'VP' },
            EmailNotApplicable: { applicable: false },
            Address: {
              street: '40 Office St',
              city: 'New York',
              state: 'NY',
              zipcode: '10001',
              country: 'United States',
            },
            Telephone: {
              number: '1234567890',
              type: 'Domestic',
              timeOfDay: 'Day',
            },
          },
          Reprimand: {
            items: [
              { Item: { Has: { value: 'No' } } },
            ],
          },
        }

        expect(validateModel(testData, employment)).toEqual(true)
      })
    })

    it('the Telephone field is required', () => {
      const testData = {
        EmploymentActivity: { value: 'Other' },
      }

      const expectedErrors = [
        'Telephone.presence.REQUIRED',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Telephone field must exist', () => {
      const testData = {
        Telephone: { noNumber: true },
      }
      const expectedErrors = [
        'Telephone.model.number.presence.REQUIRED',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Telephone field must be a valid phone', () => {
      const testData = {
        EmploymentActivity: { value: 'OtherFederal' },
        Telephone: {
          number: 'notvalid',
        },
      }

      const expectedErrors = [
        'Telephone.model.timeOfDay.presence.REQUIRED',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Supervisor field is required', () => {
      const testData = {
        EmploymentActivity: { value: 'StateGovernment' },
      }

      const expectedErrors = [
        'Supervisor.presence.REQUIRED',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Supervisor field must be a valid supervisor', () => {
      const testData = {
        EmploymentActivity: { value: 'FederalContractor' },
        Supervisor: {
          SupervisorName: 'something',
        },
      }

      const expectedErrors = [
        'Supervisor.model.SupervisorName.hasValue.MISSING_VALUE',
        'Supervisor.model.Title.presence.REQUIRED',
        'Supervisor.model.Email.presence.REQUIRED',
        'Supervisor.model.Address.presence.REQUIRED',
        'Supervisor.model.Telephone.presence.REQUIRED',
      ]

      expect(validateModel(testData, employment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid Employment item', () => {
      const testData = {
        EmploymentActivity: {
          value: 'Other',
          otherExplanation: 'Test job',
        },
        Dates: {
          from: { year: 1990, month: 5, day: 12 },
          present: true,
        },
        Title: 'Manager',
        Employment: 'My Company',
        Status: 'Full-time',
        Address: {
          street: '40 Office St',
          city: 'New York',
          state: 'NY',
          zipcode: '10001',
          country: 'United States',
        },
        PhysicalAddress: {
          HasDifferentAddress: { value: 'No' },
        },
        Telephone: {
          number: '1234567890',
          type: 'Domestic',
          timeOfDay: 'Day',
        },
        Supervisor: {
          SupervisorName: { value: 'Person Supervisor' },
          Title: { value: 'VP' },
          EmailNotApplicable: { applicable: false },
          Address: {
            street: '40 Office St',
            city: 'New York',
            state: 'NY',
            zipcode: '10001',
            country: 'United States',
          },
          Telephone: {
            number: '1234567890',
            type: 'Domestic',
            timeOfDay: 'Day',
          },
        },
        Reprimand: {
          items: [
            { Item: { Has: { value: 'No' } } },
          ],
        },
      }

      expect(validateModel(testData, employment)).toBe(true)
    })

    describe('if additional activities are included', () => {
      it('additional activities must be valid', () => {
        const testData = {
          EmploymentActivity: { value: 'StateGovernment' },
          Additional: {
            items: [
              { test: 'invalid' },
            ],
          },
        }

        const expectedErrors = ['Additional.branchCollection.INCOMPLETE_COLLECTION']

        expect(validateModel(testData, employment))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('passes a valid Employment item', () => {
        const testData = {
          EmploymentActivity: { value: 'NonGovernment' },
          Dates: {
            from: { year: 1990, month: 5, day: 12 },
            present: true,
          },
          Title: 'Manager',
          Employment: 'My Company',
          Status: 'Full-time',
          Address: {
            street: '40 Office St',
            city: 'New York',
            state: 'NY',
            zipcode: '10001',
            country: 'United States',
          },
          PhysicalAddress: {
            HasDifferentAddress: { value: 'No' },
          },
          Telephone: {
            number: '1234567890',
            type: 'Domestic',
            timeOfDay: 'Day',
          },
          Supervisor: {
            SupervisorName: { value: 'Person Supervisor' },
            Title: { value: 'VP' },
            EmailNotApplicable: { applicable: false },
            Address: {
              street: '40 Office St',
              city: 'New York',
              state: 'NY',
              zipcode: '10001',
              country: 'United States',
            },
            Telephone: {
              number: '1234567890',
              type: 'Domestic',
              timeOfDay: 'Day',
            },
          },
          Reprimand: {
            items: [
              { Item: { Has: { value: 'No' } } },
            ],
          },
          Additional: {
            items: [
              {
                Item: {
                  Has: { value: 'Yes' },
                  Position: { value: 'Something' },
                  Supervisor: { value: 'Someone' },
                  DatesEmployed: {
                    from: { year: 2005, month: 1, day: 1 },
                    to: { year: 2006, month: 5, day: 10 },
                  },
                },
              },
              { Item: { Has: { value: 'No' } } },
            ],
          },
        }

        expect(validateModel(testData, employment)).toBe(true)
      })
    })
  })
})
