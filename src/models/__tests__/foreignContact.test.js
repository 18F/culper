import { validateModel } from 'models/validate'
import foreignContact from '../foreignContact'

describe('The foreignContact model', () => {
  it('Name is required', () => {
    const testData = {}
    const expectedErrors = ['Name.required']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Name must be a valid name', () => {
    const testData = {
      Name: 'My name',
    }
    const expectedErrors = ['Name.model']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if Name is not applicable', () => {
    it('Name is not required', () => {
      const testData = {
        NameNotApplicable: { applicable: false },
      }
      const expectedErrors = ['Name.required']
      expect(validateModel(testData, foreignContact))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('NameExplanation is required', () => {
      const testData = {
        NameNotApplicable: { applicable: false },
      }
      const expectedErrors = ['NameExplanation.required']
      expect(validateModel(testData, foreignContact))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('NameExplanation must have a value', () => {
      const testData = {
        NameNotApplicable: { applicable: false },
        NameExplanation: 'something',
      }
      const expectedErrors = ['NameExplanation.hasValue']
      expect(validateModel(testData, foreignContact))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  it('FirstContact is required', () => {
    const testData = {}
    const expectedErrors = ['FirstContact.required']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('FirstContact must be a valid date', () => {
    const testData = {
      FirstContact: '2000/1/2',
    }
    const expectedErrors = ['FirstContact.date']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('LastContact is required', () => {
    const testData = {}
    const expectedErrors = ['LastContact.required']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('LastContact must be a valid date', () => {
    const testData = {
      LastContact: { year: 2000, month: 2 },
    }
    const expectedErrors = ['LastContact.date']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Methods is required', () => {
    const testData = {}
    const expectedErrors = ['Methods.required']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Methods needs at least one value', () => {
    const testData = {
      Methods: { values: [] },
    }
    const expectedErrors = ['Methods.array']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Methods values must be valid', () => {
    const testData = {
      Methods: { values: ['Invalid', 'Testing', 'Telephone'] },
    }
    const expectedErrors = ['Methods.array']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if any Methods values are Other', () => {
    it('MethodsExplanation is required', () => {
      const testData = {
        Methods: { values: ['Other', 'Telephone'] },
      }
      const expectedErrors = ['MethodsExplanation.required']
      expect(validateModel(testData, foreignContact))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('MethodsExplanation must have a value', () => {
      const testData = {
        Methods: { values: ['Other', 'Telephone'] },
        MethodsExplanation: true,
      }
      const expectedErrors = ['MethodsExplanation.hasValue']
      expect(validateModel(testData, foreignContact))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  it('Frequency is required', () => {
    const testData = {}
    const expectedErrors = ['Frequency.required']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Frequency must be valid', () => {
    const testData = {
      Frequency: { value: 'Invalid' },
    }
    const expectedErrors = ['Frequency.hasValue']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if Frequency is Other', () => {
    it('FrequencyExplanation is required', () => {
      const testData = {
        Frequency: { value: 'Other' },
      }
      const expectedErrors = ['FrequencyExplanation.required']
      expect(validateModel(testData, foreignContact))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('FrequencyExplanation must have a value', () => {
      const testData = {
        Frequency: { value: 'Other' },
        FrequencyExplanation: true,
      }
      const expectedErrors = ['FrequencyExplanation.hasValue']
      expect(validateModel(testData, foreignContact))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  it('Relationship is required', () => {
    const testData = {}
    const expectedErrors = ['Relationship.required']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Relationship needs at least one value', () => {
    const testData = {
      Relationship: { values: [] },
    }
    const expectedErrors = ['Relationship.array']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Relationship must have valid values', () => {
    const testData = {
      Relationship: { values: ['Testing'] },
    }
    const expectedErrors = ['Relationship.array']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if any Relationships values are Obligation or Other', () => {
    it('RelationshipExplanation is required', () => {
      const testData = {
        Relationship: { values: ['Other'] },
      }
      const expectedErrors = ['RelationshipExplanation.required']
      expect(validateModel(testData, foreignContact))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('RelationshipExplanation must have a value', () => {
      const testData = {
        Relationship: { values: ['Obligation'] },
        RelationshipExplanation: 12345,
      }
      const expectedErrors = ['RelationshipExplanation.hasValue']
      expect(validateModel(testData, foreignContact))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  it('Aliases is required', () => {
    const testData = {}
    const expectedErrors = ['Aliases.required']
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
    const expectedErrors = ['Aliases.branchCollection']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Citizenship is required', () => {
    const testData = {}
    const expectedErrors = ['Citizenship.required']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Citizenship must have at least one value', () => {
    const testData = {
      Citizenship: { value: [] },
    }
    const expectedErrors = ['Citizenship.country']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Citizenship must have valid values', () => {
    const testData = {
      Citizenship: { value: ['United Kingdom', 'invalid'] },
    }
    const expectedErrors = ['Citizenship.country']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Birthdate is required', () => {
    const testData = {}
    const expectedErrors = ['Birthdate.required']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Birthdate must be a valid date', () => {
    const testData = {
      Birthdate: 'invalid date',
    }
    const expectedErrors = ['Birthdate.date']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if Birthdate is not applicable', () => {
    it('Birthdate is not required', () => {
      const testData = {
        BirthdateNotApplicable: { applicable: false },
      }
      const expectedErrors = ['Birthdate.required']
      expect(validateModel(testData, foreignContact))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  it('Birthplace is required', () => {
    const testData = {}
    const expectedErrors = ['Birthplace.required']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Birthplace must be a valid location', () => {
    const testData = {
      Birthplace: 'invalid date',
    }
    const expectedErrors = ['Birthplace.location']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if Birthplace is not applicable', () => {
    it('Birthplace is not required', () => {
      const testData = {
        BirthplaceNotApplicable: { applicable: false },
      }
      const expectedErrors = ['Birthplace.required']
      expect(validateModel(testData, foreignContact))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  it('Address is required', () => {
    const testData = {}
    const expectedErrors = ['Address.required']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Address must be a valid location', () => {
    const testData = {
      Address: 'invalid date',
    }
    const expectedErrors = ['Address.location']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if Address is not applicable', () => {
    it('Address is not required', () => {
      const testData = {
        AddressNotApplicable: { applicable: false },
      }
      const expectedErrors = ['Address.required']
      expect(validateModel(testData, foreignContact))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  it('Employer is required', () => {
    const testData = {}
    const expectedErrors = ['Employer.required']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Employer must have a value', () => {
    const testData = {
      Employer: 'employer',
    }
    const expectedErrors = ['Employer.hasValue']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if Employer is not applicable', () => {
    it('Employer is not required', () => {
      const testData = {
        EmployerNotApplicable: { applicable: false },
      }
      const expectedErrors = ['Employer.required']
      expect(validateModel(testData, foreignContact))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  it('EmployerAddress is required', () => {
    const testData = {}
    const expectedErrors = ['EmployerAddress.required']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('EmployerAddress must be a valid location', () => {
    const testData = {
      EmployerAddress: 'invalid date',
    }
    const expectedErrors = ['EmployerAddress.location']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if EmployerAddress is not applicable', () => {
    it('EmployerAddress is not required', () => {
      const testData = {
        EmployerAddressNotApplicable: { applicable: false },
      }
      const expectedErrors = ['EmployerAddress.required']
      expect(validateModel(testData, foreignContact))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  it('HasAffiliations is required', () => {
    const testData = {}
    const expectedErrors = ['HasAffiliations.required']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasAffiliations must be a valid value', () => {
    const testData = {
      HasAffiliations: { value: 'invalid' },
    }
    const expectedErrors = ['HasAffiliations.hasValue']
    expect(validateModel(testData, foreignContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if HasAffiliations is "Yes"', () => {
    it('Affiliations is required', () => {
      const testData = {
        HasAffiliations: { value: 'Yes' },
      }
      const expectedErrors = ['Affiliations.required']
      expect(validateModel(testData, foreignContact))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Affiliations must have a value', () => {
      const testData = {
        HasAffiliations: { value: 'Yes' },
        Affiliations: 'something',
      }
      const expectedErrors = ['Affiliations.hasValue']
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
      Employer: { value: 'Something' },
      EmployerAddressNotApplicable: { applicable: false },
      HasAffiliations: { value: 'No' },
    }

    expect(validateModel(testData, foreignContact)).toEqual(true)
  })
})
