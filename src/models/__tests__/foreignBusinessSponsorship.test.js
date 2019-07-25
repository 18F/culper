import { validateModel } from 'models/validate'
import foreignBusinessSponsorship from '../foreignBusinessSponsorship'

describe('The foreignBusinessSponsorship model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'Name.presence.REQUIRED',
      'Birthdate.presence.REQUIRED',
      'Birthplace.presence.REQUIRED',
      'Address.presence.REQUIRED',
      'Citizenship.presence.REQUIRED',
      'Dates.presence.REQUIRED',
      'Residence.presence.REQUIRED',
      'Organization.presence.REQUIRED',
      'OrganizationAddress.presence.REQUIRED',
      'Stay.presence.REQUIRED',
      'Sponsorship.presence.REQUIRED',
    ]
    expect(validateModel(testData, foreignBusinessSponsorship))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Name must be a valid name', () => {
    const testData = {
      Name: 'Persons Name',
    }
    const expectedErrors = [
      'Name.model.first.presence.REQUIRED',
      'Name.model.middle.presence.REQUIRED',
      'Name.model.last.presence.REQUIRED',
    ]
    expect(validateModel(testData, foreignBusinessSponsorship))
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
    expect(validateModel(testData, foreignBusinessSponsorship))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Birthdate must not be more than 200 years ago', () => {
    const testData = {
      Birthdate: { day: 2, month: 12, year: 1800 },
    }
    const expectedErrors = ['Birthdate.date']

    expect(validateModel(testData, foreignBusinessSponsorship))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Birthdate must not be in the future', () => {
    const testData = {
      Birthdate: { day: 2, month: 12, year: 3000 },
    }
    const expectedErrors = ['Birthdate.date']

    expect(validateModel(testData, foreignBusinessSponsorship))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if Birthdate is not applicable', () => {
    it('Birthdate is not required', () => {
      const testData = {
        BirthdateNotApplicable: { applicable: false },
      }
      const expectedErrors = ['Birthdate.presence.REQUIRED']
      expect(validateModel(testData, foreignBusinessSponsorship))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  it('Birthplace must be a valid location', () => {
    const testData = {
      Birthplace: 'Place',
    }
    const expectedErrors = [
      'Birthplace.location.city.presence.REQUIRED',
      'Birthplace.location.country.presence.REQUIRED',
    ]
    expect(validateModel(testData, foreignBusinessSponsorship))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Address must be a valid location', () => {
    const testData = {
      Address: 'Place',
    }
    const expectedErrors = [
      'Address.location.street.presence.REQUIRED',
      'Address.location.city.presence.REQUIRED',
      'Address.location.country.presence.REQUIRED',
    ]
    expect(validateModel(testData, foreignBusinessSponsorship))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Citizenship must have at least one value', () => {
    const testData = {
      Citizenship: { value: [] },
    }
    const expectedErrors = ['Citizenship.country.INVALID_COUNTRY']
    expect(validateModel(testData, foreignBusinessSponsorship))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Citizenship must have valid values', () => {
    const testData = {
      Citizenship: { value: ['not a country', 'Germany'] },
    }
    const expectedErrors = ['Citizenship.country.INVALID_COUNTRY']
    expect(validateModel(testData, foreignBusinessSponsorship))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Dates must be a valid date range', () => {
    const testData = {
      Dates: 'invalid date',
    }
    const expectedErrors = [
      'Dates.daterange.from.presence.REQUIRED',
      'Dates.daterange.to.presence.REQUIRED',
    ]
    expect(validateModel(testData, foreignBusinessSponsorship))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Residence must be a valid location', () => {
    const testData = {
      Residence: 'Place',
    }
    const expectedErrors = [
      'Residence.location.street.presence.REQUIRED',
      'Residence.location.city.presence.REQUIRED',
      'Residence.location.country.presence.REQUIRED',
    ]
    expect(validateModel(testData, foreignBusinessSponsorship))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Organization must have a value', () => {
    const testData = {
      Organization: { values: 'test' },
    }
    const expectedErrors = ['Organization.hasValue.MISSING_VALUE']
    expect(validateModel(testData, foreignBusinessSponsorship))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if Organization is not applicable', () => {
    it('Organization is not required', () => {
      const testData = {
        OrganizationNotApplicable: { applicable: false },
      }
      const expectedErrors = ['Organization.presence.REQUIRED']
      expect(validateModel(testData, foreignBusinessSponsorship))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  it('OrganizationAddress must be a valid location', () => {
    const testData = {
      OrganizationAddress: 'Place',
    }
    const expectedErrors = [
      'OrganizationAddress.location.street.presence.REQUIRED',
      'OrganizationAddress.location.city.presence.REQUIRED',
      'OrganizationAddress.location.country.presence.REQUIRED',
    ]
    expect(validateModel(testData, foreignBusinessSponsorship))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if OrganizationAddress is not applicable', () => {
    it('OrganizationAddress is not required', () => {
      const testData = {
        OrganizationAddressNotApplicable: { applicable: false },
      }
      const expectedErrors = ['OrganizationAddress.presence.REQUIRED']
      expect(validateModel(testData, foreignBusinessSponsorship))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  it('Stay must have a value', () => {
    const testData = {
      Stay: { values: 'test' },
    }
    const expectedErrors = ['Stay.hasValue.MISSING_VALUE']
    expect(validateModel(testData, foreignBusinessSponsorship))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Sponsorship must have a value', () => {
    const testData = {
      Sponsorship: { values: 'test' },
    }
    const expectedErrors = ['Sponsorship.hasValue.MISSING_VALUE']
    expect(validateModel(testData, foreignBusinessSponsorship))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a valid foreign business contact', () => {
    const testData = {
      Name: { first: 'My', middle: 'Foreign', last: 'Sponsorship' },
      Birthdate: { year: 2004, month: 8, day: 12 },
      Birthplace: { city: 'Paris', country: 'France' },
      Address: {
        street: '123 Street St',
        street2: 'Apt 2',
        city: 'New York',
        state: 'NY',
        zipcode: '10002',
        country: 'United States',
      },
      Citizenship: { value: ['France', 'United Kingdom'] },
      Dates: {
        from: { year: 2017, month: 9, day: 18 },
        present: true,
      },
      Residence: {
        street: '123 Street St',
        street2: 'Apt 2',
        city: 'New York',
        state: 'NY',
        zipcode: '10002',
        country: 'United States',
      },
      Organization: { value: 'Test org' },
      OrganizationAddressNotApplicable: { applicable: false },
      Stay: { value: 'for school' },
      Sponsorship: { value: 'Study abroad' },
    }
    expect(validateModel(testData, foreignBusinessSponsorship)).toEqual(true)
  })
})
