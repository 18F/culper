import { validateModel } from 'models/validate'
import cohabitant, { otherName } from '../cohabitant'

describe('The otherName model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'OtherName.presence.REQUIRED',
      'MaidenName.presence.REQUIRED',
      'DatesUsed.presence.REQUIRED',
    ]

    expect(validateModel(testData, otherName))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('OtherName must be a valid name', () => {
    const testData = {
      OtherName: { first: 'P' },
    }
    const expectedErrors = [
      'OtherName.model.first.length.LENGTH_TOO_SHORT',
      'OtherName.model.middle.presence.REQUIRED',
      'OtherName.model.last.presence.REQUIRED',
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
    const expectedErrors = [
      'DatesUsed.daterange.to.presence.REQUIRED',
    ]

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
      OtherName: { first: 'Someone', noMiddleName: true, last: 'Else' },
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

describe('The cohabitant model', () => {
  it('name is required', () => {
    const testData = {}
    const expectedErrors = ['Name.presence.REQUIRED']

    expect(validateModel(testData, cohabitant))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('name must be a valid name', () => {
    const testData = {
      Name: { first: 'P' },
    }
    const expectedErrors = [
      'Name.model.first.length.LENGTH_TOO_SHORT',
      'Name.model.middle.presence.REQUIRED',
      'Name.model.last.presence.REQUIRED',
    ]

    expect(validateModel(testData, cohabitant))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('birthdate is required', () => {
    const testData = {}
    const expectedErrors = ['Birthdate.presence.REQUIRED']

    expect(validateModel(testData, cohabitant))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('birthdate must be a valid date', () => {
    const testData = {
      Birthdate: { year: 3000 },
    }
    const expectedErrors = [
      'Birthdate.date.day.presence.REQUIRED',
      'Birthdate.date.month.presence.REQUIRED',
    ]

    expect(validateModel(testData, cohabitant))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Birthdate must not be more than 200 years ago', () => {
    const testData = {
      Birthdate: { day: 2, month: 12, year: 1800 },
    }
    const expectedErrors = ['Birthdate.date.date.datetime.DATE_TOO_EARLY']

    expect(validateModel(testData, cohabitant))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Birthdate must not be in the future', () => {
    const testData = {
      Birthdate: { day: 2, month: 12, year: 3000 },
    }
    const expectedErrors = ['Birthdate.date.date.datetime.DATE_TOO_LATE']

    expect(validateModel(testData, cohabitant))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the birthplace field is required', () => {
    const testData = {}
    const expectedErrors = ['BirthPlace.presence.REQUIRED']

    expect(validateModel(testData, cohabitant))
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

    expect(validateModel(testData, cohabitant))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the SSN field is required', () => {
    const testData = {}
    const expectedErrors = ['SSN.presence.REQUIRED']

    expect(validateModel(testData, cohabitant))
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

    expect(validateModel(testData, cohabitant))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Citizenship field is required', () => {
    const testData = {}
    const expectedErrors = ['Citizenship.presence.REQUIRED']

    expect(validateModel(testData, cohabitant))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Citizenship field must have a valid value', () => {
    const testData = {
      Citizenship: { value: ['United States', 'invalid'] },
    }
    const expectedErrors = ['Citizenship.country.INVALID_COUNTRY']

    expect(validateModel(testData, cohabitant))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the OtherNames field is required', () => {
    const testData = {}
    const expectedErrors = ['OtherNames.presence.REQUIRED']

    expect(validateModel(testData, cohabitant))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the OtherNames field must be valid', () => {
    const testData = {
      OtherNames: true,
    }
    const expectedErrors = ['OtherNames.branchCollection.MISSING_ITEMS']

    expect(validateModel(testData, cohabitant))
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
      'OtherNames.branchCollection.0.OtherName.presence.REQUIRED',
      'OtherNames.branchCollection.0.MaidenName.presence.REQUIRED',
      'OtherNames.branchCollection.0.DatesUsed.presence.REQUIRED',
    ]

    expect(validateModel(testData, cohabitant))
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
              OtherName: { first: 'Someone', noMiddleName: true, last: 'Else' },
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

    expect(validateModel(testData, cohabitant))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('CohabitationBegan is required', () => {
    const testData = {}
    const expectedErrors = ['CohabitationBegan.presence.REQUIRED']

    expect(validateModel(testData, cohabitant))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('CohabitationBegan must be a valid date', () => {
    const testData = {
      CohabitationBegan: { year: 3000 },
    }
    const expectedErrors = [
      'CohabitationBegan.date.day.presence.REQUIRED',
      'CohabitationBegan.date.month.presence.REQUIRED',
    ]

    expect(validateModel(testData, cohabitant))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a valid cohabitant', () => {
    const testData = {
      Name: { first: 'Person', noMiddleName: true, last: 'Name' },
      Birthdate: { day: 5, month: 2, year: 1980 },
      BirthPlace: {
        city: 'New York', state: 'NY', country: 'United States',
      },
      SSN: { first: '234', middle: '12', last: '3490' },
      Citizenship: { value: ['United States'] },
      CohabitationBegan: { day: 2, month: 10, year: 2000 },
      OtherNames: {
        items: [
          {
            Item: {
              Has: { value: 'Yes' },
              OtherName: { first: 'Person', noMiddleName: true, last: 'Oldname' },
              MaidenName: { value: 'Yes' },
              DatesUsed: {
                from: { year: 1980, month: 2, day: 5 },
                to: { year: 2000, month: 10, day: 14 },
              },
            },
          },
          { Item: { Has: { value: 'No' } } },
        ],
      },
    }

    expect(validateModel(testData, cohabitant)).toEqual(true)
  })

  describe('if birthplace is outside the US', () => {
    it('foreign born document is required', () => {
      const testData = {
        BirthPlace: { country: 'Canada' },
      }
      const expectedErrors = ['ForeignBornDocument.presence.REQUIRED']

      expect(validateModel(testData, cohabitant))
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
      const options = {
        requireForeignBornDocExpiration: true,
      }

      expect(validateModel(testData, cohabitant, options))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid cohabitant', () => {
      const testData = {
        Name: { first: 'Person', noMiddleName: true, last: 'Name' },
        Birthdate: { day: 5, month: 2, year: 1980 },
        BirthPlace: {
          city: 'Toronto', country: 'Canada',
        },
        SSN: { first: '234', middle: '12', last: '3490' },
        Citizenship: { value: ['United States'] },
        CohabitationBegan: { day: 2, month: 10, year: 2000 },
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

      expect(validateModel(testData, cohabitant)).toEqual(true)
    })
  })
})
