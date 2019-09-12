import { validateModel } from 'models/validate'
import foreignContact from '../foreignContact'

describe('The foreignContact model', () => {
  it('Name is required', () => {
    const testData = {}
    const expectedErrors = ['Name.presence.REQUIRED']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Name must be a valid name', () => {
    const testData = {
      Name: 'My name',
    }
    const expectedErrors = [
      'Name.model.first.presence.REQUIRED',
      'Name.model.middle.presence.REQUIRED',
      'Name.model.last.presence.REQUIRED',
    ]
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if Name is not applicable', () => {
    it('Name is not required', () => {
      const testData = {
        NameNotApplicable: { applicable: false },
      }
      const expectedErrors = ['Name.presence.REQUIRED']
      expect(validateModel(testData, foreignContact))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('NameExplanation is required', () => {
      const testData = {
        NameNotApplicable: { applicable: false },
      }
      const expectedErrors = ['NameExplanation.presence.REQUIRED']
      expect(validateModel(testData, foreignContact))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('NameExplanation must have a value', () => {
      const testData = {
        NameNotApplicable: { applicable: false },
        NameExplanation: 'something',
      }
      const expectedErrors = ['NameExplanation.hasValue.MISSING_VALUE']
      expect(validateModel(testData, foreignContact))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  it('FirstContact is required', () => {
    const testData = {}
    const expectedErrors = ['FirstContact.presence.REQUIRED']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('FirstContact must be a valid date', () => {
    const testData = {
      FirstContact: '2000/1/2',
    }
    const expectedErrors = [
      'FirstContact.date.day.presence.REQUIRED',
      'FirstContact.date.month.presence.REQUIRED',
      'FirstContact.date.year.presence.REQUIRED',
    ]
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('FirstContact cannot be before applicant birthdate', () => {
    const applicantBirthdate = { month: 1, day: 2, year: 1980 }
    const testData = {
      Birthdate: { month: 1, year: 1985, day: 2 },
      FirstContact: { month: 1, year: 1970, day: 2 },
    }

    const expectedErrors = [
      'FirstContact.date.date.datetime.DATE_TOO_EARLY',
    ]

    expect(validateModel(testData, foreignContact, {
      applicantBirthdate,
    }))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('FirstContact cannot be before person’s birthdate', () => {
    const applicantBirthdate = { month: 1, day: 2, year: 1980 }
    const testData = {
      Birthdate: { month: 1, year: 1985, day: 2 },
      FirstContact: { month: 1, year: 1983, day: 2 },
    }

    const expectedErrors = [
      'FirstContact.date.date.datetime.DATE_TOO_EARLY',
    ]

    expect(validateModel(testData, foreignContact, {
      applicantBirthdate,
    }))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('FirstContact cannot be in the future', () => {
    const testData = {
      FirstContact: { month: 1, year: 2050, day: 2 },
    }

    const expectedErrors = [
      'FirstContact.date.date.datetime.DATE_TOO_LATE',
    ]

    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('LastContact is required', () => {
    const testData = {}
    const expectedErrors = ['LastContact.presence.REQUIRED']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('LastContact must be a valid date', () => {
    const testData = {
      LastContact: { year: 2000, month: 2 },
    }
    const expectedErrors = [
      'LastContact.date.day.presence.REQUIRED',
    ]
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('LastContact cannot be before FirstContact', () => {
    const testData = {
      FirstContact: { year: 2003, month: 5, day: 2 },
      LastContact: { year: 2000, month: 2, day: 5 },
    }
    const expectedErrors = ['LastContact.date.date.datetime.DATE_TOO_EARLY']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Methods is required', () => {
    const testData = {}
    const expectedErrors = ['Methods.presence.REQUIRED']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Methods needs at least one value', () => {
    const testData = {
      Methods: { values: [] },
    }
    const expectedErrors = ['Methods.array.array.length.LENGTH_TOO_SHORT']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Methods values must be valid', () => {
    const testData = {
      Methods: { values: ['Invalid', 'Testing', 'Telephone'] },
    }
    const expectedErrors = [
      'Methods.array.0.value.inclusion.INCLUSION',
      'Methods.array.1.value.inclusion.INCLUSION',
    ]
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if any Methods values are Other', () => {
    it('MethodsExplanation is required', () => {
      const testData = {
        Methods: { values: ['Other', 'Telephone'] },
      }
      const expectedErrors = ['MethodsExplanation.presence.REQUIRED']
      expect(validateModel(testData, foreignContact))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('MethodsExplanation must have a value', () => {
      const testData = {
        Methods: { values: ['Other', 'Telephone'] },
        MethodsExplanation: true,
      }
      const expectedErrors = ['MethodsExplanation.hasValue.MISSING_VALUE']
      expect(validateModel(testData, foreignContact))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  it('Frequency is required', () => {
    const testData = {}
    const expectedErrors = ['Frequency.presence.REQUIRED']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Frequency must be valid', () => {
    const testData = {
      Frequency: { value: 'Invalid' },
    }
    const expectedErrors = ['Frequency.hasValue.value.inclusion.INCLUSION']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if Frequency is Other', () => {
    it('FrequencyExplanation is required', () => {
      const testData = {
        Frequency: { value: 'Other' },
      }
      const expectedErrors = ['FrequencyExplanation.presence.REQUIRED']
      expect(validateModel(testData, foreignContact))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('FrequencyExplanation must have a value', () => {
      const testData = {
        Frequency: { value: 'Other' },
        FrequencyExplanation: true,
      }
      const expectedErrors = ['FrequencyExplanation.hasValue.MISSING_VALUE']
      expect(validateModel(testData, foreignContact))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  it('Relationship is required', () => {
    const testData = {}
    const expectedErrors = ['Relationship.presence.REQUIRED']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Relationship needs at least one value', () => {
    const testData = {
      Relationship: { values: [] },
    }
    const expectedErrors = ['Relationship.array.array.length.LENGTH_TOO_SHORT']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Relationship must have valid values', () => {
    const testData = {
      Relationship: { values: ['Testing'] },
    }
    const expectedErrors = ['Relationship.array.0.value.inclusion.INCLUSION']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if any Relationships values are Obligation or Other', () => {
    it('RelationshipExplanation is required', () => {
      const testData = {
        Relationship: { values: ['Other'] },
      }
      const expectedErrors = ['RelationshipExplanation.presence.REQUIRED']
      expect(validateModel(testData, foreignContact))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('RelationshipExplanation must have a value', () => {
      const testData = {
        Relationship: { values: ['Obligation'] },
        RelationshipExplanation: 12345,
      }
      const expectedErrors = ['RelationshipExplanation.hasValue.MISSING_VALUE']
      expect(validateModel(testData, foreignContact))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  it('Aliases is required', () => {
    const testData = {}
    const expectedErrors = ['Aliases.presence.REQUIRED']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Aliases must be a valid branch collection', () => {
    const testData = {
      Aliases: {
        items: [
          {
            Item: { Alias: 'some name' },
          },
        ],
      },
    }
    const expectedErrors = ['Aliases.branchCollection.INCOMPLETE_COLLECTION']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Citizenship is required', () => {
    const testData = {}
    const expectedErrors = ['Citizenship.presence.REQUIRED']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Citizenship must have at least one value', () => {
    const testData = {
      Citizenship: { value: [] },
    }
    const expectedErrors = ['Citizenship.country.INVALID_COUNTRY']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Citizenship must have valid values', () => {
    const testData = {
      Citizenship: { value: ['United Kingdom', 'invalid'] },
    }
    const expectedErrors = ['Citizenship.country.INVALID_COUNTRY']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Birthdate is required', () => {
    const testData = {}
    const expectedErrors = ['Birthdate.presence.REQUIRED']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Birthdate must be a valid date', () => {
    const testData = {
      Birthdate: 'invalid date',
    }
    const expectedErrors = [
      'Birthdate.date.day.presence.REQUIRED',
      'Birthdate.date.month.presence.REQUIRED',
      'Birthdate.date.year.presence.REQUIRED',
    ]
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Birthdate must not be more than 200 years ago', () => {
    const testData = {
      Birthdate: { day: 2, month: 12, year: 1800 },
    }
    const expectedErrors = ['Birthdate.date.date.datetime.DATE_TOO_EARLY']

    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Birthdate must not be in the future', () => {
    const testData = {
      Birthdate: { day: 2, month: 12, year: 3000 },
    }
    const expectedErrors = ['Birthdate.date.date.datetime.DATE_TOO_LATE']

    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if Birthdate is not applicable', () => {
    it('Birthdate is not required', () => {
      const testData = {
        BirthdateNotApplicable: { applicable: false },
      }
      const expectedErrors = ['Birthdate.presence.REQUIRED']
      expect(validateModel(testData, foreignContact))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  it('Birthplace is required', () => {
    const testData = {}
    const expectedErrors = ['Birthplace.presence.REQUIRED']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Birthplace must be a valid location', () => {
    const testData = {
      Birthplace: 'invalid date',
    }
    const expectedErrors = [
      'Birthplace.location.city.presence.REQUIRED',
      'Birthplace.location.country.presence.REQUIRED',
    ]
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if Birthplace is not applicable', () => {
    it('Birthplace is not required', () => {
      const testData = {
        BirthplaceNotApplicable: { applicable: false },
      }
      const expectedErrors = ['Birthplace.presence.REQUIRED']
      expect(validateModel(testData, foreignContact))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  it('Address is required', () => {
    const testData = {}
    const expectedErrors = ['Address.presence.REQUIRED']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Address must be a valid location', () => {
    const testData = {
      Address: 'invalid date',
    }
    const expectedErrors = [
      'Address.location.street.presence.REQUIRED',
      'Address.location.city.presence.REQUIRED',
      'Address.location.country.presence.REQUIRED',
    ]
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if Address is not applicable', () => {
    it('Address is not required', () => {
      const testData = {
        AddressNotApplicable: { applicable: false },
      }
      const expectedErrors = ['Address.presence.REQUIRED']
      expect(validateModel(testData, foreignContact))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  it('AlternateAddress is required', () => {
    const testData = {}
    const expectedErrors = ['AlternateAddress.presence.REQUIRED']

    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('AlternateAddress must be a valid physical address', () => {
    const testData = {
      AlternateAddress: {
        HasDifferentAddress: false,
      },
    }
    const expectedErrors = [
      'AlternateAddress.model.HasDifferentAddress.hasValue.MISSING_VALUE',
    ]

    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('AlternateAddress must be a military address', () => {
    const testData = {
      AlternateAddress: {
        HasDifferentAddress: { value: 'Yes' },
        Address: {
          street: '123 Main ST',
          city: 'New York',
          state: 'NY',
          zipcode: '10003',
          country: 'United States',
        },
      },
    }
    const expectedErrors = [
      'AlternateAddress.model.Address.location.country.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Employer is required', () => {
    const testData = {}
    const expectedErrors = ['Employer.presence.REQUIRED']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Employer must have a value', () => {
    const testData = {
      Employer: 'employer',
    }
    const expectedErrors = ['Employer.hasValue.MISSING_VALUE']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if Employer is not applicable', () => {
    it('Employer is not required', () => {
      const testData = {
        EmployerNotApplicable: { applicable: false },
      }
      const expectedErrors = ['Employer.presence.REQUIRED']
      expect(validateModel(testData, foreignContact))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  it('EmployerAddress is required', () => {
    const testData = {}
    const expectedErrors = ['EmployerAddress.presence.REQUIRED']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('EmployerAddress must be a valid location', () => {
    const testData = {
      EmployerAddress: 'invalid date',
    }
    const expectedErrors = [
      'EmployerAddress.location.street.presence.REQUIRED',
      'EmployerAddress.location.city.presence.REQUIRED',
      'EmployerAddress.location.country.presence.REQUIRED',
    ]
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if EmployerAddress is not applicable', () => {
    it('EmployerAddress is not required', () => {
      const testData = {
        EmployerAddressNotApplicable: { applicable: false },
      }
      const expectedErrors = ['EmployerAddress.presence.REQUIRED']
      expect(validateModel(testData, foreignContact))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  it('HasAffiliations is required', () => {
    const testData = {}
    const expectedErrors = ['HasAffiliations.presence.REQUIRED']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasAffiliations must be a valid value', () => {
    const testData = {
      HasAffiliations: { value: 'invalid' },
    }
    const expectedErrors = ['HasAffiliations.hasValue.value.inclusion.INCLUSION']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if HasAffiliations is "Yes"', () => {
    it('Affiliations is required', () => {
      const testData = {
        HasAffiliations: { value: 'Yes' },
      }
      const expectedErrors = ['Affiliations.presence.REQUIRED']
      expect(validateModel(testData, foreignContact))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Affiliations must have a value', () => {
      const testData = {
        HasAffiliations: { value: 'Yes' },
        Affiliations: 'something',
      }
      const expectedErrors = ['Affiliations.hasValue.MISSING_VALUE']
      expect(validateModel(testData, foreignContact))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  it('passes a valid foreign contact', () => {
    const testData = {
      Name: { first: 'Person', middle: 'Foreign', last: 'Contact' },
      FirstContact: { year: 2010, month: 2, day: 2 },
      LastContact: { year: 2015, month: 1, day: 20 },
      Methods: { values: ['Telephone'] },
      Frequency: { value: 'Daily' },
      Relationship: { values: ['Personal'] },
      Aliases: { items: [{ Item: { Has: { value: 'No' } } }] },
      Citizenship: { value: ['United Kingdom', 'United States'] },
      Birthdate: { year: 1980, month: 10, day: 12 },
      Birthplace: { city: 'London', country: 'United Kingdom' },
      AddressNotApplicable: { applicable: false },
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
      Employer: { value: 'Something' },
      EmployerAddressNotApplicable: { applicable: false },
      HasAffiliations: { value: 'No' },
    }

    expect(validateModel(testData, foreignContact)).toEqual(true)
  })
})
