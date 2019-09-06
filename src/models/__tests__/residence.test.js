import { validateModel } from 'models/validate'
import residence from 'models/residence'

describe('The residence model', () => {
  it('the Dates field is required', () => {
    const testData = {}
    const expectedErrors = ['Dates.presence.REQUIRED']

    expect(validateModel(testData, residence))
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

    expect(validateModel(testData, residence))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('From date cannot be before applicant birthdate', () => {
    const applicantBirthdate = { month: 1, day: 2, year: 1980 }
    const testData = {
      Dates: {
        from: { month: 1, year: 1970, day: 2 },
      },
    }
    const expectedErrors = [
      'Dates.daterange.from.date.date.datetime.DATE_TOO_EARLY',
    ]

    expect(validateModel(testData, residence, { applicantBirthdate }))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('To date cannot be in the future', () => {
    const testData = {
      Dates: {
        to: { month: 1, year: 2050, day: 2 },
      },
    }
    const expectedErrors = [
      'Dates.daterange.to.date.date.datetime.DATE_TOO_LATE',
    ]

    expect(validateModel(testData, residence))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Address field is required', () => {
    const testData = {}
    const expectedErrors = ['Address.presence.REQUIRED']

    expect(validateModel(testData, residence))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Address field must be a valid address', () => {
    const testData = {
      Address: 'Not a valid address',
    }

    const expectedErrors = [
      'Address.location.street.presence.REQUIRED',
      'Address.location.city.presence.REQUIRED',
      'Address.location.country.presence.REQUIRED',
    ]

    expect(validateModel(testData, residence))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Address field cannot be a PO box', () => {
    const testData = {
      Address: {
        street: 'PO Box 123',
        city: 'New York',
        state: 'NY',
        zipcode: '10002',
        country: 'United States',
      },
    }

    const expectedErrors = ['Address.location.street.format.INVALID_FORMAT']

    expect(validateModel(testData, residence))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if the Address field is international', () => {
    it('AlternateAddress is required', () => {
      const testData = {
        Address: {
          street: '123 Test St',
          city: 'London',
          country: { value: 'United Kingdom' },
        },
      }

      const expectedErrors = ['AlternateAddress.presence.REQUIRED']

      expect(validateModel(testData, residence))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    describe('if HasDifferentAddress is "Yes"', () => {
      it('AlternateAddress must be a PO address', () => {
        const testData = {
          Address: {
            street: '123 Test St',
            city: 'London',
            country: { value: 'United Kingdom' },
          },
          AlternateAddress: {
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
          'AlternateAddress.model.Address.location.country.inclusion.INCLUSION',
        ]

        expect(validateModel(testData, residence))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('AlternateAddress may not be a PO box', () => {
        const testData = {
          Address: {
            street: '123 Test St',
            city: 'London',
            country: { value: 'United Kingdom' },
          },
          AlternateAddress: {
            HasDifferentAddress: { value: 'Yes' },
            Address: {
              street: 'P.O. Box 234',
              city: 'FPO',
              state: 'AA',
              zipcode: '34035',
              country: 'POSTOFFICE',
            },
          },
          Dates: {
            from: { year: 2000, month: 1, day: 1 },
            to: { year: 2001, month: 1, day: 1 },
          },
          Role: { value: 'Own' },
        }

        const expectedErrors = ['AlternateAddress.model.Address.location.street.format.INVALID_FORMAT']

        expect(validateModel(testData, residence))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('passes a valid residence with an alternate address', () => {
        const testData = {
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
          Dates: {
            from: { year: 2000, month: 1, day: 1 },
            to: { year: 2001, month: 1, day: 1 },
          },
          Role: { value: 'Own' },
        }

        expect(validateModel(testData, residence)).toEqual(true)
      })
    })

    describe('if HasDifferentAddress is "No"', () => {
      it('passes a valid residence with an alternate address', () => {
        const testData = {
          Address: {
            street: '123 Test St',
            city: 'London',
            country: { value: 'United Kingdom' },
          },
          AlternateAddress: {
            HasDifferentAddress: { value: 'No' },
          },
          Dates: {
            from: { year: 2000, month: 1, day: 1 },
            to: { year: 2001, month: 1, day: 1 },
          },
          Role: { value: 'Own' },
        }

        expect(validateModel(testData, residence)).toEqual(true)
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

      expect(validateModel(testData, residence))
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

      expect(validateModel(testData, residence))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('AlternateAddress may not be a PO box', () => {
      const testData = {
        Address: {
          street: '123 Main ST',
          city: 'FPO',
          state: 'AA',
          zipcode: '34035',
          country: 'POSTOFFICE',
        },
        AlternateAddress: {
          Address: {
            street: 'PO Box 123',
            city: 'New York',
            state: 'NY',
            zipcode: '10003',
            country: 'United States',
          },
        },
        Dates: {
          from: { year: 2000, month: 1, day: 1 },
          to: { year: 2001, month: 1, day: 1 },
        },
        Role: { value: 'Own' },
      }

      const expectedErrors = [
        'AlternateAddress.model.Address.location.street.format.INVALID_FORMAT',
      ]

      expect(validateModel(testData, residence))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid residence with an alternate address', () => {
      const testData = {
        Address: {
          street: '123 Main ST',
          city: 'FPO',
          state: 'AA',
          zipcode: '34035',
          country: 'POSTOFFICE',
        },
        AlternateAddress: {
          Address: {
            street: '123 Main ST',
            city: 'New York',
            state: 'NY',
            zipcode: '10003',
            country: 'United States',
          },
        },
        Dates: {
          from: { year: 2000, month: 1, day: 1 },
          to: { year: 2001, month: 1, day: 1 },
        },
        Role: { value: 'Own' },
      }

      expect(validateModel(testData, residence)).toEqual(true)
    })
  })

  it('the Role field is required', () => {
    const testData = { Role: '' }
    const expectedErrors = ['Role.presence.REQUIRED']

    expect(validateModel(testData, residence))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Role field must be a valid role', () => {
    const testData = {
      Role: { value: 'Blah' },
    }

    const expectedErrors = ['Role.hasValue.value.inclusion.INCLUSION']

    expect(validateModel(testData, residence))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the RoleOther field is required if Role is "Other"', () => {
    const testData = {
      Role: { value: 'Other' },
      RoleOther: undefined,
    }

    const expectedErrors = ['RoleOther.presence.REQUIRED']

    expect(validateModel(testData, residence))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the RoleOther field must have a value if Role is "Other"', () => {
    const testData = {
      Role: { value: 'Other' },
      RoleOther: { value: null },
    }

    const expectedErrors = ['RoleOther.hasValue.MISSING_VALUE']

    expect(validateModel(testData, residence))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if the date range is not within the last 3 years', () => {
    it('none of the Reference fields are required', () => {
      const testData = {
        Dates: {
          from: { year: 2000, month: 1, day: 1 },
          to: { year: 2001, month: 1, day: 1 },
        },
      }

      const expectedErrors = ['ReferenceName.presence.REQUIRED']

      expect(validateModel(testData, residence))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid Residence item', () => {
      const testData = {
        Dates: {
          from: { year: 2000, month: 1, day: 1 },
          to: { year: 2001, month: 1, day: 1 },
        },
        Address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipcode: '10002',
          country: 'United States',
        },
        Role: { value: 'Own' },
      }

      expect(validateModel(testData, residence)).toEqual(true)
    })
  })

  describe('if the date range is within the last 3 years', () => {
    it('the Reference fields are required', () => {
      const testData = {
        Dates: {
          from: { year: 2015, month: 1, day: 1 },
          present: true,
        },
        Address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipcode: '10002',
          country: 'United States',
        },
        Role: { value: 'Own' },
      }

      const expectedErrors = [
        'ReferenceName.presence.REQUIRED',
        'ReferenceLastContact.presence.REQUIRED',
        'ReferencePhoneEvening.presence.REQUIRED',
        'ReferencePhoneDay.presence.REQUIRED',
        'ReferencePhoneMobile.presence.REQUIRED',
        'ReferenceRelationship.presence.REQUIRED',
        'ReferenceEmail.presence.REQUIRED',
        'ReferenceAddress.presence.REQUIRED',
      ]

      expect(validateModel(testData, residence))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('ReferenceName must be a valid name', () => {
      const testData = {
        Dates: {
          from: { year: 2015, month: 1, day: 1 },
          present: true,
        },
        ReferenceName: {
          last: 'Lastname',
        },
      }

      const expectedErrors = [
        'ReferenceName.model.first.presence.REQUIRED',
        'ReferenceName.model.middle.presence.REQUIRED',
      ]
      expect(validateModel(testData, residence))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('ReferenceLastContact must be a valid date', () => {
      const testData = {
        Dates: {
          from: { year: 2015, month: 1, day: 1 },
          present: true,
        },
        ReferenceLastContact: ['not', 'a', 'date'],
      }

      const expectedErrors = [
        'ReferenceLastContact.date.day.presence.REQUIRED',
        'ReferenceLastContact.date.month.presence.REQUIRED',
        'ReferenceLastContact.date.year.presence.REQUIRED',
      ]
      expect(validateModel(testData, residence))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('ReferencePhoneEvening must be a valid phone', () => {
      const testData = {
        Dates: {
          from: { year: 2015, month: 1, day: 1 },
          present: true,
        },
        ReferencePhoneEvening: {
          number: '1234567890',
        },
      }

      const expectedErrors = [
        'ReferencePhoneEvening.model.timeOfDay.presence.REQUIRED',
      ]
      expect(validateModel(testData, residence))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('ReferencePhoneDay must be a valid phone', () => {
      const testData = {
        Dates: {
          from: { year: 2015, month: 1, day: 1 },
          present: true,
        },
        ReferencePhoneDay: {
          number: '1234567890',
        },
      }

      const expectedErrors = ['ReferencePhoneDay.model.timeOfDay.presence.REQUIRED']
      expect(validateModel(testData, residence))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('ReferencePhoneMobile must be a valid phone', () => {
      const testData = {
        Dates: {
          from: { year: 2015, month: 1, day: 1 },
          present: true,
        },
        ReferencePhoneMobile: {
          number: '1234567890',
        },
      }

      const expectedErrors = ['ReferencePhoneMobile.model.timeOfDay.presence.REQUIRED']
      expect(validateModel(testData, residence))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('ReferenceRelationship must have at least one value', () => {
      const testData = {
        Dates: {
          from: { year: 2015, month: 1, day: 1 },
          present: true,
        },
        ReferenceRelationship: { values: [] },
      }

      const expectedErrors = ['ReferenceRelationship.array.array.length.LENGTH_TOO_SHORT']
      expect(validateModel(testData, residence))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('ReferenceRelationship must have valid values', () => {
      const testData = {
        Dates: {
          from: { year: 2015, month: 1, day: 1 },
          present: true,
        },
        ReferenceRelationship: { values: ['blah', 'test', 'x'] },
      }

      const expectedErrors = [
        'ReferenceRelationship.array.0.value.inclusion.INCLUSION',
        'ReferenceRelationship.array.1.value.inclusion.INCLUSION',
        'ReferenceRelationship.array.2.value.inclusion.INCLUSION',
      ]
      expect(validateModel(testData, residence))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('ReferenceRelationshipOther is not required if ReferenceRelationship does not include "Other"', () => {
      const testData = {
        Dates: {
          from: { year: 2015, month: 1, day: 1 },
          present: true,
        },
        ReferenceRelationship: { values: ['Neighbor', 'Friend'] },
      }

      const expectedErrors = ['ReferenceRelationshipOther.presence.REQUIRED']
      expect(validateModel(testData, residence))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('ReferenceRelationshipOther is required if ReferenceRelationship includes "Other"', () => {
      const testData = {
        Dates: {
          from: { year: 2015, month: 1, day: 1 },
          present: true,
        },
        ReferenceRelationship: { values: ['Neighbor', 'Other'] },
      }

      const expectedErrors = ['ReferenceRelationshipOther.presence.REQUIRED']
      expect(validateModel(testData, residence))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('ReferenceRelationshipOther must have a value', () => {
      const testData = {
        Dates: {
          from: { year: 2015, month: 1, day: 1 },
          present: true,
        },
        ReferenceRelationship: { values: ['Neighbor', 'Other'] },
        ReferenceRelationshipOther: { value: '' },
      }

      const expectedErrors = ['ReferenceRelationshipOther.hasValue.MISSING_VALUE']
      expect(validateModel(testData, residence))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('ReferenceEmail must be a valid email', () => {
      const testData = {
        Dates: {
          from: { year: 2015, month: 1, day: 1 },
          present: true,
        },
        ReferenceEmail: 'notanemail',
      }

      const expectedErrors = ['ReferenceEmail.model.value.presence.REQUIRED']
      expect(validateModel(testData, residence))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    describe('with ReferenceEmailNotApplicable set to false', () => {
      it('ReferenceEmail is required', () => {
        const testData = {
          Dates: {
            from: { year: 2015, month: 1, day: 1 },
            present: true,
          },
          ReferenceEmailNotApplicable: { applicable: true },
        }

        const expectedErrors = ['ReferenceEmail.presence.REQUIRED']
        expect(validateModel(testData, residence))
          .toEqual(expect.arrayContaining(expectedErrors))
      })
    })

    describe('with ReferenceEmailNotApplicable set to true', () => {
      it('ReferenceEmail is not required', () => {
        const testData = {
          Dates: {
            from: { year: 2015, month: 1, day: 1 },
            present: true,
          },
          ReferenceEmailNotApplicable: { applicable: false },
        }

        const expectedErrors = ['ReferenceEmail.presence.REQUIRED']
        expect(validateModel(testData, residence))
          .not.toEqual(expect.arrayContaining(expectedErrors))
      })
    })

    it('ReferenceAddress must be a valid address', () => {
      const testData = {
        Dates: {
          from: { year: 2015, month: 1, day: 1 },
          present: true,
        },
        ReferenceAddress: 'Not a valid address',
      }

      const expectedErrors = [
        'ReferenceAddress.location.street.presence.REQUIRED',
        'ReferenceAddress.location.city.presence.REQUIRED',
        'ReferenceAddress.location.country.presence.REQUIRED',
      ]

      expect(validateModel(testData, residence))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid Residence item', () => {
      const testData = {
        Dates: {
          from: { year: 2015, month: 1, day: 1 },
          present: true,
        },
        Address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipcode: '10002',
          country: 'United States',
        },
        Role: { value: 'Own' },
        ReferenceName: {
          first: 'Person',
          noMiddleName: true,
          last: 'Name',
        },
        ReferenceLastContact: { year: '2019', month: '01', day: '01' },
        ReferencePhoneEvening: { number: '1234567890', type: 'Domestic', timeOfDay: 'NA' },
        ReferencePhoneDay: { noNumber: true },
        ReferencePhoneMobile: { number: '1234567890', type: 'Domestic', timeOfDay: 'NA' },
        ReferenceRelationship: { values: ['Friend', 'Neighbor'] },
        ReferenceEmail: { value: 'myfriend@gmail.com' },
        ReferenceAddress: {
          street: '456 Main St',
          city: 'New York',
          state: 'NY',
          zipcode: '10002',
          country: 'United States',
        },
      }

      expect(validateModel(testData, residence)).toEqual(true)
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

        expect(validateModel(testData, residence))
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

          expect(validateModel(testData, residence))
            .toEqual(expect.arrayContaining(expectedErrors))
        })

        it('passes a valid residence with an alternate address', () => {
          const testData = {
            Dates: {
              from: { year: 2015, month: 1, day: 1 },
              present: true,
            },
            Address: {
              street: '123 Main St',
              city: 'New York',
              state: 'NY',
              zipcode: '10002',
              country: 'United States',
            },
            Role: { value: 'Own' },
            ReferenceName: {
              first: 'Person',
              noMiddleName: true,
              last: 'Name',
            },
            ReferenceLastContact: { year: '2019', month: '01', day: '01' },
            ReferencePhoneEvening: { number: '1234567890', type: 'Domestic', timeOfDay: 'NA' },
            ReferencePhoneDay: { noNumber: true },
            ReferencePhoneMobile: { number: '1234567890', type: 'Domestic', timeOfDay: 'NA' },
            ReferenceRelationship: { values: ['Friend', 'Neighbor'] },
            ReferenceEmail: { value: 'myfriend@gmail.com' },
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

          expect(validateModel(testData, residence)).toEqual(true)
        })
      })

      describe('if HasDifferentAddress is "No"', () => {
        it('passes a valid residence with an alternate address', () => {
          const testData = {
            Dates: {
              from: { year: 2015, month: 1, day: 1 },
              present: true,
            },
            Address: {
              street: '123 Main St',
              city: 'New York',
              state: 'NY',
              zipcode: '10002',
              country: 'United States',
            },
            Role: { value: 'Own' },
            ReferenceName: {
              first: 'Person',
              noMiddleName: true,
              last: 'Name',
            },
            ReferenceLastContact: { year: '2019', month: '01', day: '01' },
            ReferencePhoneEvening: { number: '1234567890', type: 'Domestic', timeOfDay: 'NA' },
            ReferencePhoneDay: { noNumber: true },
            ReferencePhoneMobile: { number: '1234567890', type: 'Domestic', timeOfDay: 'NA' },
            ReferenceRelationship: { values: ['Friend', 'Neighbor'] },
            ReferenceEmail: { value: 'myfriend@gmail.com' },
            ReferenceAddress: {
              street: '123 Test St',
              city: 'London',
              country: { value: 'United Kingdom' },
            },
            ReferenceAlternateAddress: {
              HasDifferentAddress: { value: 'No' },
              Address: {
                street: '123 Main ST',
                city: 'FPO',
                state: 'AA',
                zipcode: '34035',
                country: 'POSTOFFICE',
              },
            },
          }

          expect(validateModel(testData, residence)).toEqual(true)
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

        expect(validateModel(testData, residence))
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

        expect(validateModel(testData, residence))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('passes a valid residence with an alternate address', () => {
        const testData = {
          Dates: {
            from: { year: 2015, month: 1, day: 1 },
            present: true,
          },
          Address: {
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            zipcode: '10002',
            country: 'United States',
          },
          Role: { value: 'Own' },
          ReferenceName: {
            first: 'Person',
            noMiddleName: true,
            last: 'Name',
          },
          ReferenceLastContact: { year: '2019', month: '01', day: '01' },
          ReferencePhoneEvening: { number: '1234567890', type: 'Domestic', timeOfDay: 'NA' },
          ReferencePhoneDay: { noNumber: true },
          ReferencePhoneMobile: { number: '1234567890', type: 'Domestic', timeOfDay: 'NA' },
          ReferenceRelationship: { values: ['Friend', 'Neighbor'] },
          ReferenceEmail: { value: 'myfriend@gmail.com' },
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

        expect(validateModel(testData, residence)).toEqual(true)
      })
    })
  })
})
