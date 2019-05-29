import { validateModel } from 'models/validate'
import person from '../person'

describe('The person model', () => {
  it('the name field is required', () => {
    const testData = {}
    const expectedErrors = ['Name.required']

    expect(validateModel(testData, person))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the name field must be a valid name', () => {
    const testData = {
      Name: { first: 'P' },
    }
    const expectedErrors = ['Name.model']

    expect(validateModel(testData, person))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Dates field is required', () => {
    const testData = {}
    const expectedErrors = ['Dates.required']

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
    const expectedErrors = ['Dates.daterange']

    expect(validateModel(testData, person))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Rank field is required', () => {
    const testData = {}
    const expectedErrors = ['Rank.required']

    expect(validateModel(testData, person))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Rank field must have a value', () => {
    const testData = {
      Rank: 'none',
    }
    const expectedErrors = ['Rank.hasValue']

    expect(validateModel(testData, person))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if Rank is not applicable', () => {
    it('the Rank field is not required', () => {
      const testData = {
        RankNotApplicable: { applicable: false },
      }
      const expectedErrors = ['Rank.required']

      expect(validateModel(testData, person))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  it('the Relationship field is required', () => {
    const testData = {}
    const expectedErrors = ['Relationship.required']

    expect(validateModel(testData, person))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Relationship field must be a valid relationship', () => {
    const testData = {
      Relationship: {
        values: ['Friend', 'invalid'],
      },
    }
    const expectedErrors = ['Relationship.array']

    expect(validateModel(testData, person))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if Relationship is "Other"', () => {
    it('the RelationshipOther field is required', () => {
      const testData = {
        Relationship: { values: ['Other'] },
      }
      const expectedErrors = ['RelationshipOther.required']

      expect(validateModel(testData, person))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('the RelationshipOther field must have a value', () => {
      const testData = {
        Relationship: { values: ['Other'] },
        RelationshipOther: 'something',
      }
      const expectedErrors = ['RelationshipOther.hasValue']

      expect(validateModel(testData, person))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  it('the MobileTelephone field must be a valid phone number', () => {
    const testData = {
      MobileTelephone: { number: 'abc' },
    }
    const expectedErrors = ['MobileTelephone.model']

    expect(validateModel(testData, person))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the OtherTelephone field must be a valid phone number', () => {
    const testData = {
      OtherTelephone: { number: 'abc' },
    }
    const expectedErrors = ['OtherTelephone.model']

    expect(validateModel(testData, person))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('at least one of the telephone fields is required', () => {
    const testData = {
      MobileTelephone: { noNumber: true },
      OtherTelephone: { noNumber: true },
    }
    const expectedErrors = ['MobileTelephone.model', 'OtherTelephone.model']

    expect(validateModel(testData, person))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Email field is required', () => {
    const testData = {}
    const expectedErrors = ['Email.required']

    expect(validateModel(testData, person))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Email field must be a valid email', () => {
    const testData = {
      Email: { value: 'myemail' },
    }
    const expectedErrors = ['Email.model']

    expect(validateModel(testData, person))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if Email is not applicable', () => {
    it('the Email field is not required', () => {
      const testData = {
        EmailNotApplicable: { applicable: false },
      }
      const expectedErrors = ['Email.required']

      expect(validateModel(testData, person))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  it('the Address field is required', () => {
    const testData = {}
    const expectedErrors = ['Address.required']

    expect(validateModel(testData, person))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Address field must be a valid address', () => {
    const testData = {
      Address: 'address',
    }
    const expectedErrors = ['Address.location']

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
