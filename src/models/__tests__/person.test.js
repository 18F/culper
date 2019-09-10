import { validateModel } from 'models/validate'
import person from '../person'

describe('The person model', () => {
  it('the name field is required', () => {
    const testData = {}
    const expectedErrors = ['Name.presence.REQUIRED']

    expect(validateModel(testData, person))
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

    expect(validateModel(testData, person))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Dates field is required', () => {
    const testData = {}
    const expectedErrors = ['Dates.presence.REQUIRED']

    expect(validateModel(testData, person))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Dates field must be a valid date range', () => {
    const testData = {
      Dates: {
        from: '2/5/1990',
        to: { year: 2005, month: '07', day: 2 },
        present: true,
      },
    }
    const expectedErrors = [
      'Dates.daterange.from.date.day.presence.REQUIRED',
      'Dates.daterange.from.date.month.presence.REQUIRED',
      'Dates.daterange.from.date.year.presence.REQUIRED',
    ]

    expect(validateModel(testData, person))
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

    expect(validateModel(testData, person, { applicantBirthdate }))
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

    expect(validateModel(testData, person))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Rank field is required', () => {
    const testData = {}
    const expectedErrors = ['Rank.presence.REQUIRED']

    expect(validateModel(testData, person))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Rank field must have a value', () => {
    const testData = {
      Rank: 'none',
    }
    const expectedErrors = ['Rank.hasValue.MISSING_VALUE']

    expect(validateModel(testData, person))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if Rank is not applicable', () => {
    it('the Rank field is not required', () => {
      const testData = {
        RankNotApplicable: { applicable: false },
      }
      const expectedErrors = ['Rank.presence.REQUIRED']

      expect(validateModel(testData, person))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  it('the Relationship field is required', () => {
    const testData = {}
    const expectedErrors = ['Relationship.presence.REQUIRED']

    expect(validateModel(testData, person))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Relationship field must be a valid relationship', () => {
    const testData = {
      Relationship: {
        values: ['Friend', 'invalid'],
      },
    }
    const expectedErrors = [
      'Relationship.array.1.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, person))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if Relationship is "Other"', () => {
    it('the RelationshipOther field is required', () => {
      const testData = {
        Relationship: { values: ['Other'] },
      }
      const expectedErrors = ['RelationshipOther.presence.REQUIRED']

      expect(validateModel(testData, person))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the RelationshipOther field must have a value', () => {
      const testData = {
        Relationship: { values: ['Other'] },
        RelationshipOther: 'something',
      }
      const expectedErrors = ['RelationshipOther.hasValue.MISSING_VALUE']

      expect(validateModel(testData, person))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  it('the MobileTelephone field must be a valid phone number', () => {
    const testData = {
      MobileTelephone: { number: 'abc' },
    }
    const expectedErrors = ['MobileTelephone.model.timeOfDay.presence.REQUIRED']

    expect(validateModel(testData, person))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the OtherTelephone field must be a valid phone number', () => {
    const testData = {
      OtherTelephone: { number: 'abc' },
    }
    const expectedErrors = ['OtherTelephone.model.timeOfDay.presence.REQUIRED']

    expect(validateModel(testData, person))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('at least one of the telephone fields is required', () => {
    const testData = {
      MobileTelephone: { noNumber: true },
      OtherTelephone: { noNumber: true },
    }
    const expectedErrors = [
      'MobileTelephone.model.noNumber.inclusion.INCLUSION',
      'OtherTelephone.model.noNumber.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, person))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Email field is required', () => {
    const testData = {}
    const expectedErrors = ['Email.presence.REQUIRED']

    expect(validateModel(testData, person))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Email field must be a valid email', () => {
    const testData = {
      Email: { value: 'myemail' },
    }
    const expectedErrors = ['Email.model.value.email.INVALID_EMAIL']

    expect(validateModel(testData, person))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if Email is not applicable', () => {
    it('the Email field is not required', () => {
      const testData = {
        EmailNotApplicable: { applicable: false },
      }
      const expectedErrors = ['Email.presence.REQUIRED']

      expect(validateModel(testData, person))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  it('the Address field is required', () => {
    const testData = {}
    const expectedErrors = ['Address.presence.REQUIRED']

    expect(validateModel(testData, person))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Address field must be a valid address', () => {
    const testData = {
      Address: 'address',
    }
    const expectedErrors = [
      'Address.location.street.presence.REQUIRED',
      'Address.location.city.presence.REQUIRED',
      'Address.location.country.presence.REQUIRED',
    ]

    expect(validateModel(testData, person))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a valid person', () => {
    const testData = {
      Name: {
        first: 'Someone', middle: 'I', middleInitialOnly: true, last: 'Know',
      },
      Dates: {
        from: { year: 2010, month: 7, day: 12 },
        present: true,
      },
      RankNotApplicable: { applicable: false },
      Relationship: {
        values: ['Friend', 'Other'],
      },
      RelationshipOther: { value: 'Something else' },
      MobileTelephone: { number: '1234567890', type: 'Domestic', timeOfDay: 'Both' },
      OtherTelephone: { noNumber: true },
      Email: { value: 'friend@gmail.com' },
      Address: {
        street: '9 Friend St.',
        street2: 'Apt 1',
        city: 'New york',
        state: 'NY',
        country: { value: 'United States' },
        zipcode: '10011',
      },
    }

    expect(validateModel(testData, person)).toEqual(true)
  })
})
