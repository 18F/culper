import { validateModel } from 'models/validate'
import civilUnion, { otherName } from '../civilUnion'

describe('The otherName model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'Name.presence.REQUIRED',
      'MaidenName.presence.REQUIRED',
      'DatesUsed.presence.REQUIRED',
    ]

    expect(validateModel(testData, otherName))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Name must be a valid name', () => {
    const testData = {
      Name: { first: 'P' },
    }
    const expectedErrors = [
      'Name.model.first.length.LENGTH_TOO_SHORT',
      'Name.model.middle.presence.REQUIRED',
      'Name.model.last.presence.REQUIRED',
    ]

    expect(validateModel(testData, otherName))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('MaidenName must have a value', () => {
    const testData = {
      MaidenName: 'true',
    }
    const expectedErrors = ['MaidenName.hasValue.MISSING_VALUE']

    expect(validateModel(testData, otherName))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('DatesUsed must be a valid date range', () => {
    const testData = {
      DatesUsed: {
        from: { year: 2010, month: 2, day: 2 },
        present: false,
      },
    }
    const expectedErrors = ['DatesUsed.daterange.to.presence.REQUIRED']

    expect(validateModel(testData, otherName))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('DatesUsed must be within the given limits', () => {
    const testData = {
      DatesUsed: {
        from: { year: 2001, month: 2, day: 2 },
        to: { year: 2030, month: 1, day: 2 },
      },
    }
    const dateLimits = {
      earliest: { year: 2005, month: 1, day: 4 },
      latest: { year: 2015, month: 2, day: 3 },
    }
    const expectedErrors = [
      'DatesUsed.daterange.from.date.date.datetime.DATE_TOO_EARLY',
      'DatesUsed.daterange.to.date.date.datetime.DATE_TOO_LATE',
    ]

    expect(validateModel(testData, otherName, dateLimits))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a valid otherName', () => {
    const testData = {
      Has: { value: 'Yes' },
      Name: { first: 'Someone', noMiddleName: true, last: 'Else' },
      MaidenName: { value: 'No' },
      DatesUsed: {
        from: { day: 1, month: 1, year: 2006 },
        to: { day: 5, month: 10, year: 2010 },
      },
    }

    const dateLimits = {
      earliest: { year: 2005, month: 1, day: 4 },
      latest: { year: 2015, month: 2, day: 3 },
    }

    expect(validateModel(testData, otherName, dateLimits)).toEqual(true)
  })
})

describe('The civilUnion model', () => {
  it('the name field is required', () => {
    const testData = {}
    const expectedErrors = ['Name.presence.REQUIRED']

    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the name field must be a valid name', () => {
    const testData = {
      Name: { first: 'P' },
    }
    const expectedErrors = [
      'Name.model.first.length.LENGTH_TOO_SHORT',
      'Name.model.middle.presence.REQUIRED',
      'Name.model.last.presence.REQUIRED',
    ]

    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the birthdate field is required', () => {
    const testData = {}
    const expectedErrors = ['Birthdate.presence.REQUIRED']

    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the birthdate field must be a valid date', () => {
    const testData = {
      Birthdate: { year: 3000 },
    }
    const expectedErrors = [
      'Birthdate.date.day.presence.REQUIRED',
      'Birthdate.date.month.presence.REQUIRED',
    ]

    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Birthdate must not be more than 200 years ago', () => {
    const testData = {
      Birthdate: { day: 2, month: 12, year: 1800 },
    }
    const expectedErrors = ['Birthdate.date.date.datetime.DATE_TOO_EARLY']

    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Birthdate must not be in the future', () => {
    const testData = {
      Birthdate: { day: 2, month: 12, year: 3000 },
    }
    const expectedErrors = ['Birthdate.date.date.datetime.DATE_TOO_LATE']

    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the birthplace field is required', () => {
    const testData = {}
    const expectedErrors = ['BirthPlace.presence.REQUIRED']

    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the birthplace field must be a valid location', () => {
    const testData = {
      BirthPlace: { street: 'address' },
    }
    const expectedErrors = [
      'BirthPlace.location.city.presence.REQUIRED',
      'BirthPlace.location.country.presence.REQUIRED',
    ]

    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the telephone field is required', () => {
    const testData = {}
    const expectedErrors = ['Telephone.presence.REQUIRED']

    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the civilUnion telephone field is required', () => {
    const testData = {
      Telephone: { noNumber: true },
    }

    const expectedErrors = ['Telephone.model.noNumber.inclusion.INCLUSION']

    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the telephone field must be a valid phone number', () => {
    const testData = {
      Telephone: { number: '123' },
    }
    const expectedErrors = [
      'Telephone.model.timeOfDay.presence.REQUIRED',
    ]

    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('EnteredCivilUnion is required', () => {
    const testData = {}
    const expectedErrors = ['EnteredCivilUnion.presence.REQUIRED']
    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('EnteredCivilUnion must be a valid date', () => {
    const testData = {
      EnteredCivilUnion: 'January 2',
    }
    const expectedErrors = [
      'EnteredCivilUnion.date.day.presence.REQUIRED',
      'EnteredCivilUnion.date.month.presence.REQUIRED',
      'EnteredCivilUnion.date.year.presence.REQUIRED',
    ]
    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Email is required', () => {
    const testData = {}
    const expectedErrors = ['Email.presence.REQUIRED']
    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Email must be a valid email', () => {
    const testData = {
      Email: { value: 'invalid email' },
    }
    const expectedErrors = ['Email.hasValue.value.email.INVALID_EMAIL']
    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if Email is not applicable', () => {
    it('Email is not required', () => {
      const testData = {
        EmailNotApplicable: { applicable: false },
      }
      const expectedErrors = ['Email.required']
      expect(validateModel(testData, civilUnion))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  it('the SSN field is required', () => {
    const testData = {}
    const expectedErrors = ['SSN.presence.REQUIRED']

    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the SSN field must be a valid SSN', () => {
    const testData = {
      SSN: { number: '123456789' },
    }
    const expectedErrors = [
      'SSN.ssn.first.presence.REQUIRED',
      'SSN.ssn.middle.presence.REQUIRED',
      'SSN.ssn.last.presence.REQUIRED',
    ]

    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Separated field is required', () => {
    const testData = {}
    const expectedErrors = ['Separated.presence.REQUIRED']

    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Separated field must be a valid value', () => {
    const testData = {
      Separated: true,
    }
    const expectedErrors = ['Separated.hasValue.MISSING_VALUE']

    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Address field is required', () => {
    const testData = {}
    const expectedErrors = ['Address.presence.REQUIRED']

    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Address field must be a valid location', () => {
    const testData = {
      Address: {
        street: '123 Street',
        city: 'Invalid',
      },
    }
    const expectedErrors = [
      'Address.location.country.presence.REQUIRED',
    ]

    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if UseCurrentAddress is checked', () => {
    it('the Address field is not required', () => {
      const testData = {
        UseCurrentAddress: { applicable: true },
      }

      const expectedErrors = ['Address.presence.REQUIRED']

      expect(validateModel(testData, civilUnion))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
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

      expect(validateModel(testData, civilUnion))
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

        expect(validateModel(testData, civilUnion))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('passes a valid civilUnion with an alternate address', () => {
        const testData = {
          Name: { first: 'Person', noMiddleName: true, last: 'Name' },
          Birthdate: { day: 5, month: 2, year: 1980 },
          BirthPlace: {
            city: 'Boston', state: 'MA', country: 'United States', county: 'County',
          },
          Email: { value: 'test@email.com' },
          Telephone: { number: '1234567890', type: 'Domestic', timeOfDay: 'Both' },
          SSN: { first: '234', middle: '12', last: '3490' },
          Separated: { value: 'No' },
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
          Location: {
            city: 'Boston', state: 'MA', country: 'United States', county: 'County',
          },
          Citizenship: { value: ['United States'] },
          EnteredCivilUnion: { day: 10, month: 10, year: 2001 },
          Divorced: { value: 'No' },
          OtherNames: {
            items: [
              {
                Item: {
                  Has: { value: 'Yes' },
                  Name: { first: 'Someone', noMiddleName: true, last: 'Else' },
                  MaidenName: { value: 'No' },
                  DatesUsed: {
                    from: { day: 1, month: 1, year: 1990 },
                    to: { day: 5, month: 10, year: 1995 },
                  },
                },
              },
              { Item: { Has: { value: 'No' } } },
            ],
          },
        }

        expect(validateModel(testData, civilUnion)).toEqual(true)
      })
    })

    describe('if HasDifferentAddress is "No"', () => {
      it('passes a valid civilUnion with an alternate address', () => {
        const testData = {
          Name: { first: 'Person', noMiddleName: true, last: 'Name' },
          Birthdate: { day: 5, month: 2, year: 1980 },
          BirthPlace: {
            city: 'Boston', state: 'MA', country: 'United States', county: 'County',
          },
          Email: { value: 'test@email.com' },
          Telephone: { number: '1234567890', type: 'Domestic', timeOfDay: 'Both' },
          SSN: { first: '234', middle: '12', last: '3490' },
          Separated: { value: 'No' },
          Address: {
            street: '123 Test St',
            city: 'London',
            country: { value: 'United Kingdom' },
          },
          AlternateAddress: {
            HasDifferentAddress: { value: 'No' },
          },
          Location: {
            city: 'Boston', state: 'MA', country: 'United States', county: 'County',
          },
          Citizenship: { value: ['United States'] },
          EnteredCivilUnion: { day: 10, month: 10, year: 2001 },
          Divorced: { value: 'No' },
          OtherNames: {
            items: [
              {
                Item: {
                  Has: { value: 'Yes' },
                  Name: { first: 'Someone', noMiddleName: true, last: 'Else' },
                  MaidenName: { value: 'No' },
                  DatesUsed: {
                    from: { day: 1, month: 1, year: 1990 },
                    to: { day: 5, month: 10, year: 1995 },
                  },
                },
              },
              { Item: { Has: { value: 'No' } } },
            ],
          },
        }

        expect(validateModel(testData, civilUnion)).toEqual(true)
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

      expect(validateModel(testData, civilUnion))
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

      expect(validateModel(testData, civilUnion))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid civilUnion with an alternate address', () => {
      const testData = {
        Name: { first: 'Person', noMiddleName: true, last: 'Name' },
        Birthdate: { day: 5, month: 2, year: 1980 },
        BirthPlace: {
          city: 'Boston', state: 'MA', country: 'United States', county: 'County',
        },
        Email: { value: 'test@email.com' },
        Telephone: { number: '1234567890', type: 'Domestic', timeOfDay: 'Both' },
        SSN: { first: '234', middle: '12', last: '3490' },
        Separated: { value: 'No' },
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
        Location: {
          city: 'Boston', state: 'MA', country: 'United States', county: 'County',
        },
        Citizenship: { value: ['United States'] },
        EnteredCivilUnion: { day: 10, month: 10, year: 2001 },
        Divorced: { value: 'No' },
        OtherNames: {
          items: [
            {
              Item: {
                Has: { value: 'Yes' },
                Name: { first: 'Someone', noMiddleName: true, last: 'Else' },
                MaidenName: { value: 'No' },
                DatesUsed: {
                  from: { day: 1, month: 1, year: 1990 },
                  to: { day: 5, month: 10, year: 1995 },
                },
              },
            },
            { Item: { Has: { value: 'No' } } },
          ],
        },
      }

      expect(validateModel(testData, civilUnion)).toEqual(true)
    })
  })

  it('the Location field is required', () => {
    const testData = {}
    const expectedErrors = ['Location.presence.REQUIRED']

    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Location field must be a valid location', () => {
    const testData = {
      Location: {
        city: 'Invalid',
      },
    }
    const expectedErrors = [
      'Location.location.country.presence.REQUIRED',
    ]

    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Citizenship field is required', () => {
    const testData = {}
    const expectedErrors = ['Citizenship.presence.REQUIRED']

    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Citizenship field must have a valid value', () => {
    const testData = {
      Citizenship: { value: [] },
    }
    const expectedErrors = ['Citizenship.country.INVALID_COUNTRY']

    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Divorced field is required', () => {
    const testData = {}
    const expectedErrors = ['Divorced.presence.REQUIRED']

    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Divorced field must have a value', () => {
    const testData = {
      Divorced: true,
    }
    const expectedErrors = ['Divorced.hasValue.MISSING_VALUE']

    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the OtherNames field is required', () => {
    const testData = {}
    const expectedErrors = ['OtherNames.presence.REQUIRED']

    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the OtherNames field must be valid', () => {
    const testData = {
      OtherNames: true,
    }
    const expectedErrors = ['OtherNames.branchCollection.MISSING_ITEMS']

    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('OtherNames items must be valid', () => {
    const testData = {
      OtherNames: {
        items: [
          { Item: { Has: { value: 'Yes' } } },
          { Item: { Has: { value: 'No' } } },
        ],
      },
    }
    const expectedErrors = [
      'OtherNames.branchCollection.0.Name.presence.REQUIRED',
      'OtherNames.branchCollection.0.MaidenName.presence.REQUIRED',
      'OtherNames.branchCollection.0.DatesUsed.presence.REQUIRED',
    ]

    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('OtherNames items date range must be after the Birthdate', () => {
    const testData = {
      Birthdate: { year: 2000, month: 2, day: 15 },
      OtherNames: {
        items: [
          {
            Item: {
              Has: { value: 'Yes' },
              Name: { first: 'Someone', noMiddleName: true, last: 'Else' },
              MaidenName: { value: 'No' },
              DatesUsed: {
                from: { day: 1, month: 1, year: 1990 },
                to: { day: 5, month: 10, year: 1995 },
              },
            },
          },
          { Item: { Has: { value: 'No' } } },
        ],
      },
    }

    const expectedErrors = [
      'OtherNames.branchCollection.0.DatesUsed.daterange.from.date.date.datetime.DATE_TOO_EARLY',
      'OtherNames.branchCollection.0.DatesUsed.daterange.to.date.date.datetime.DATE_TOO_EARLY',
    ]

    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if separated is "No"', () => {
    it('the Address Separated field is not required', () => {
      const testData = {
        Separated: { value: 'No' },
      }
      const expectedErrors = ['AddressSeparated.presence.REQUIRED']

      expect(validateModel(testData, civilUnion))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Date Separated field is not required', () => {
      const testData = {
        Separated: { value: 'No' },
      }
      const expectedErrors = ['DateSeparated.presence.REQUIRED']

      expect(validateModel(testData, civilUnion))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid civil union', () => {
      const testData = {
        Name: { first: 'Person', noMiddleName: true, last: 'Name' },
        Birthdate: { day: 5, month: 2, year: 1980 },
        BirthPlace: {
          city: 'Boston', state: 'MA', country: 'United States', county: 'County',
        },
        Email: { value: 'test@email.com' },
        Telephone: { number: '1234567890', type: 'Domestic', timeOfDay: 'Both' },
        SSN: { first: '234', middle: '12', last: '3490' },
        Separated: { value: 'No' },
        UseCurrentAddress: { applicable: true },
        Location: {
          city: 'Boston', state: 'MA', country: 'United States', county: 'County',
        },
        Citizenship: { value: ['United States'] },
        EnteredCivilUnion: { day: 10, month: 10, year: 2001 },
        Divorced: { value: 'No' },
        OtherNames: {
          items: [
            {
              Item: {
                Has: { value: 'Yes' },
                Name: { first: 'Someone', noMiddleName: true, last: 'Else' },
                MaidenName: { value: 'No' },
                DatesUsed: {
                  from: { day: 1, month: 1, year: 1990 },
                  to: { day: 5, month: 10, year: 1995 },
                },
              },
            },
            { Item: { Has: { value: 'No' } } },
          ],
        },
      }

      expect(validateModel(testData, civilUnion)).toEqual(true)
    })
  })

  describe('if separated is "Yes"', () => {
    it('the Address Separated field is required', () => {
      const testData = {
        Separated: { value: 'Yes' },
      }
      const expectedErrors = ['AddressSeparated.presence.REQUIRED']

      expect(validateModel(testData, civilUnion))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Address Separated field must be a valid address', () => {
      const testData = {
        Separated: { value: 'Yes' },
        AddressSeparated: {
          city: 'New York',
          state: 'MA',
        },
      }
      const expectedErrors = [
        'AddressSeparated.location.country.presence.REQUIRED',
      ]

      expect(validateModel(testData, civilUnion))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Date Separated field is required', () => {
      const testData = {
        Separated: { value: 'Yes' },
      }
      const expectedErrors = ['DateSeparated.presence.REQUIRED']

      expect(validateModel(testData, civilUnion))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Date Separated field must not be before EnteredCivilUnion', () => {
      const testData = {
        EnteredCivilUnion: { day: 5, month: 1, year: 2001 },
        Separated: { value: 'Yes' },
        DateSeparated: { day: 5, month: 10, year: 2000 },
      }
      const expectedErrors = ['DateSeparated.date.date.datetime.DATE_TOO_EARLY']

      expect(validateModel(testData, civilUnion))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Date Separated field must not be in the future', () => {
      const testData = {
        EnteredCivilUnion: { day: 5, month: 1, year: 2001 },
        Separated: { value: 'Yes' },
        DateSeparated: { day: 5, month: 10, year: 2030 },
      }
      const expectedErrors = [
        'DateSeparated.date.date.datetime.DATE_TOO_LATE',
      ]

      expect(validateModel(testData, civilUnion))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid civil union', () => {
      const testData = {
        Name: { first: 'Person', noMiddleName: true, last: 'Name' },
        Birthdate: { day: 5, month: 2, year: 1980 },
        BirthPlace: {
          city: 'Boston', state: 'MA', country: 'United States', county: 'County',
        },
        Email: { value: 'test@email.com' },
        Telephone: { number: '1234567890', type: 'Domestic', timeOfDay: 'Both' },
        SSN: { first: '234', middle: '12', last: '3490' },
        Separated: { value: 'Yes' },
        Address: {
          street: '123 Test St',
          city: 'Boston',
          state: 'MA',
          zipcode: '02421',
          country: 'United States',
          county: 'County',
        },
        Location: {
          city: 'Boston', state: 'MA', country: 'United States', county: 'County',
        },
        AddressSeparated: {
          city: 'Boston',
          state: 'MA',
          zipcode: '02421',
          country: 'United States',
          county: 'County',
        },
        DateSeparated: { day: 6, month: 7, year: 2005 },
        Citizenship: { value: ['United States'] },
        EnteredCivilUnion: { day: 10, month: 10, year: 2001 },
        Divorced: { value: 'No' },
        OtherNames: {
          items: [
            { Item: { Has: { value: 'No' } } },
          ],
        },
      }

      expect(validateModel(testData, civilUnion)).toEqual(true)
    })

    describe('if Address Separated is not applicable', () => {
      it('the Address Separated field is not required', () => {
        const testData = {
          Separated: { value: 'Yes' },
          AddressSeparatedNotApplicable: { applicable: false },
        }
        const expectedErrors = ['AddressSeparated.presence.REQUIRED']

        expect(validateModel(testData, civilUnion))
          .not.toEqual(expect.arrayContaining(expectedErrors))
      })

      it('passes a valid civil union', () => {
        const testData = {
          Name: { first: 'Person', noMiddleName: true, last: 'Name' },
          Birthdate: { day: 5, month: 2, year: 1980 },
          BirthPlace: {
            city: 'Boston', state: 'MA', country: 'United States', county: 'County',
          },
          Email: { value: 'test@email.com' },
          Telephone: { number: '1234567890', type: 'Domestic', timeOfDay: 'Both' },
          SSN: { first: '234', middle: '12', last: '3490' },
          Separated: { value: 'Yes' },
          UseCurrentAddress: { applicable: true },
          Location: {
            city: 'Boston', state: 'MA', country: 'United States', county: 'County',
          },
          AddressSeparatedNotApplicable: { applicable: false },
          DateSeparated: { day: 6, month: 7, year: 2010 },
          Citizenship: { value: ['United States'] },
          EnteredCivilUnion: { day: 10, month: 10, year: 2001 },
          Divorced: { value: 'No' },
          OtherNames: {
            items: [
              { Item: { Has: { value: 'No' } } },
            ],
          },
        }

        expect(validateModel(testData, civilUnion)).toEqual(true)
      })
    })
  })

  describe('if birthplace is outside the US', () => {
    it('foreign born document is required', () => {
      const testData = {
        BirthPlace: { country: 'Canada' },
      }
      const expectedErrors = ['ForeignBornDocument.presence.REQUIRED']

      expect(validateModel(testData, civilUnion))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('foreign born document must be valid', () => {
      const testData = {
        BirthPlace: { country: 'Canada' },
        ForeignBornDocument: 'my document',
      }
      const expectedErrors = [
        'ForeignBornDocument.model.DocumentType.presence.REQUIRED',
        'ForeignBornDocument.model.DocumentExpiration.presence.REQUIRED',
        'ForeignBornDocument.model.DocumentNumber.presence.REQUIRED',
      ]

      expect(validateModel(testData, civilUnion))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid civil union', () => {
      const testData = {
        Name: { first: 'Person', noMiddleName: true, last: 'Name' },
        Birthdate: { day: 5, month: 2, year: 1980 },
        BirthPlace: {
          city: 'Toronto', country: 'Canada',
        },
        EmailNotApplicable: { applicable: false },
        Telephone: { number: '1234567890', type: 'Domestic', timeOfDay: 'Both' },
        SSN: { first: '234', middle: '12', last: '3490' },
        Separated: { value: 'No' },
        UseCurrentAddress: { applicable: true },
        Location: {
          city: 'Boston', state: 'MA', country: 'United States', county: 'County',
        },
        Citizenship: { value: ['United States'] },
        EnteredCivilUnion: { day: 10, month: 10, year: 2001 },
        Divorced: { value: 'No' },
        OtherNames: {
          items: [
            { Item: { Has: { value: 'No' } } },
          ],
        },
        ForeignBornDocument: {
          DocumentType: { value: 'Visa' },
          DocumentExpirationNotApplicable: { applicable: false },
          DocumentNumber: { value: 'abcdef123450' },
        },
      }

      expect(validateModel(testData, civilUnion)).toEqual(true)
    })
  })
})
