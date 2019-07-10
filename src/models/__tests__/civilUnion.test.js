import { validateModel } from 'models/validate'
import civilUnion, { otherName } from '../civilUnion'

describe('The otherName model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'Name.required',
      'MaidenName.required',
      'DatesUsed.required',
    ]

    expect(validateModel(testData, otherName))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Name must be a valid name', () => {
    const testData = {
      Name: { first: 'P' },
    }
    const expectedErrors = ['Name.model']

    expect(validateModel(testData, otherName))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('MaidenName must have a value', () => {
    const testData = {
      MaidenName: 'true',
    }
    const expectedErrors = ['MaidenName.hasValue']

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
    const expectedErrors = ['DatesUsed.daterange']

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
    const expectedErrors = ['DatesUsed.daterange']

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
    const expectedErrors = ['Name.required']

    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the name field must be a valid name', () => {
    const testData = {
      Name: { first: 'P' },
    }
    const expectedErrors = ['Name.model']

    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the birthdate field is required', () => {
    const testData = {}
    const expectedErrors = ['Birthdate.required']

    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the birthdate field must be a valid date', () => {
    const testData = {
      Birthdate: { year: 3000 },
    }
    const expectedErrors = ['Birthdate.date']

    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the birthplace field is required', () => {
    const testData = {}
    const expectedErrors = ['BirthPlace.required']

    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the birthplace field must be a valid location', () => {
    const testData = {
      BirthPlace: { street: 'address' },
    }
    const expectedErrors = ['BirthPlace.location']

    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the telephone field is required', () => {
    const testData = {}
    const expectedErrors = ['Telephone.required']

    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the telephone field must be a valid phone number', () => {
    const testData = {
      Telephone: { number: '123' },
    }
    const expectedErrors = ['Telephone.model']

    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the SSN field is required', () => {
    const testData = {}
    const expectedErrors = ['SSN.required']

    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the SSN field must be a valid SSN', () => {
    const testData = {
      SSN: { number: '123456789' },
    }
    const expectedErrors = ['SSN.ssn']

    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Separated field is required', () => {
    const testData = {}
    const expectedErrors = ['Separated.required']

    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Separated field must be a valid value', () => {
    const testData = {
      Separated: true,
    }
    const expectedErrors = ['Separated.hasValue']

    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Address field is required', () => {
    const testData = {}
    const expectedErrors = ['Address.required']

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
    const expectedErrors = ['Address.location']

    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if UseCurrentAddress is checked', () => {
    it('the Address field is not required', () => {
      const testData = {
        UseCurrentAddress: { applicable: true },
      }

      const expectedErrors = ['Address.required']

      expect(validateModel(testData, civilUnion))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  it('the Location field is required', () => {
    const testData = {}
    const expectedErrors = ['Location.required']

    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Location field must be a valid location', () => {
    const testData = {
      Location: {
        city: 'Invalid',
      },
    }
    const expectedErrors = ['Location.location']

    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Citizenship field is required', () => {
    const testData = {}
    const expectedErrors = ['Citizenship.required']

    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Citizenship field must have a value', () => {
    const testData = {
      Citizenship: { value: [] },
    }
    const expectedErrors = ['Citizenship.hasValue']

    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Divorced field is required', () => {
    const testData = {}
    const expectedErrors = ['Divorced.required']

    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Divorced field must have a value', () => {
    const testData = {
      Divorced: true,
    }
    const expectedErrors = ['Divorced.hasValue']

    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the OtherNames field is required', () => {
    const testData = {}
    const expectedErrors = ['OtherNames.required']

    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the OtherNames field must be valid', () => {
    const testData = {
      OtherNames: true,
    }
    const expectedErrors = ['OtherNames.branchCollection']

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
    const expectedErrors = ['OtherNames.branchCollection']

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

    const expectedErrors = ['OtherNames.branchCollection']

    expect(validateModel(testData, civilUnion))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if separated is "No"', () => {
    it('the Address Separated field is not required', () => {
      const testData = {
        Separated: { value: 'No' },
      }
      const expectedErrors = ['AddressSeparated.required']

      expect(validateModel(testData, civilUnion))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Date Separated field is not required', () => {
      const testData = {
        Separated: { value: 'No' },
      }
      const expectedErrors = ['DateSeparated.required']

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
        Telephone: { number: '1234567890', type: 'Domestic', timeOfDay: 'Both' },
        SSN: { first: '234', middle: '12', last: '3490' },
        Separated: { value: 'No' },
        UseCurrentAddress: { applicable: true },
        Location: {
          city: 'Boston', state: 'MA', country: 'United States', county: 'County',
        },
        Citizenship: { value: ['United States'] },
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
      const expectedErrors = ['AddressSeparated.required']

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
      const expectedErrors = ['AddressSeparated.location']

      expect(validateModel(testData, civilUnion))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Date Separated field is required', () => {
      const testData = {
        Separated: { value: 'Yes' },
      }
      const expectedErrors = ['DateSeparated.required']

      expect(validateModel(testData, civilUnion))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the Date Separated field must be a valid date', () => {
      const testData = {
        Separated: { value: 'Yes' },
        DateSeparated: { day: 50, month: 10, year: 3000 },
      }
      const expectedErrors = ['DateSeparated.date']

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
        DateSeparated: { day: 6, month: 7, year: 2000 },
        Citizenship: { value: ['United States'] },
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
        const expectedErrors = ['AddressSeparated.required']

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
          Telephone: { number: '1234567890', type: 'Domestic', timeOfDay: 'Both' },
          SSN: { first: '234', middle: '12', last: '3490' },
          Separated: { value: 'Yes' },
          UseCurrentAddress: { applicable: true },
          Location: {
            city: 'Boston', state: 'MA', country: 'United States', county: 'County',
          },
          AddressSeparatedNotApplicable: { applicable: false },
          DateSeparated: { day: 6, month: 7, year: 2000 },
          Citizenship: { value: ['United States'] },
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
      const expectedErrors = ['ForeignBornDocument.required']

      expect(validateModel(testData, civilUnion))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('foreign born document must be valid', () => {
      const testData = {
        BirthPlace: { country: 'Canada' },
        ForeignBornDocument: 'my document',
      }
      const expectedErrors = ['ForeignBornDocument.model']

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
        Telephone: { number: '1234567890', type: 'Domestic', timeOfDay: 'Both' },
        SSN: { first: '234', middle: '12', last: '3490' },
        Separated: { value: 'No' },
        UseCurrentAddress: { applicable: true },
        Location: {
          city: 'Boston', state: 'MA', country: 'United States', county: 'County',
        },
        Citizenship: { value: ['United States'] },
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
