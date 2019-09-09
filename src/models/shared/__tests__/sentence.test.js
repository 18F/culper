import { validateModel } from 'models/validate'
import sentence from '../sentence'

describe('The sentence model', () => {
  it('the Description field is required', () => {
    const testData = {}
    const expectedErrors = ['Description.presence.REQUIRED']

    expect(validateModel(testData, sentence))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Description field must have a value', () => {
    const testData = { Description: 'something' }
    const expectedErrors = ['Description.hasValue.MISSING_VALUE']

    expect(validateModel(testData, sentence))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the ExceedsYear field must have a valid value', () => {
    const options = { requireLegalOffenseSentenced: true }
    const testData = { ExceedsYear: { value: 'true' } }
    const expectedErrors = ['ExceedsYear.hasValue.value.inclusion.INCLUSION']

    expect(validateModel(testData, sentence, options))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Incarcerated field must have a valid value', () => {
    const options = { requireLegalOffenseIncarcerated: true }
    const testData = { Incarcerated: { value: 'false' } }
    const expectedErrors = ['Incarcerated.hasValue.value.inclusion.INCLUSION']

    expect(validateModel(testData, sentence, options))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the IncarcerationDates field is required', () => {
    const testData = {}
    const expectedErrors = ['IncarcerationDates.presence.REQUIRED']

    expect(validateModel(testData, sentence))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the IncarcerationDates field must be a valid date range', () => {
    const testData = {
      IncarcerationDates: {
        from: { year: 2000 },
        to: { year: 1990 },
      },
    }
    const expectedErrors = [
      'IncarcerationDates.daterange.from.date.day.presence.REQUIRED',
      'IncarcerationDates.daterange.from.date.month.presence.REQUIRED',
      'IncarcerationDates.daterange.to.date.day.presence.REQUIRED',
      'IncarcerationDates.daterange.to.date.month.presence.REQUIRED',
    ]

    expect(validateModel(testData, sentence))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('IncarcerationDates from date cannot be before applicant birthdate', () => {
    const applicantBirthdate = { month: 1, day: 2, year: 1980 }
    const testData = {
      IncarcerationDates: {
        from: { month: 1, year: 1970, day: 2 },
      },
    }
    const expectedErrors = [
      'IncarcerationDates.daterange.from.date.date.datetime.DATE_TOO_EARLY',
    ]

    expect(validateModel(testData, sentence, { applicantBirthdate }))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('IncarcerationDates to date cannot be in the future', () => {
    const testData = {
      IncarcerationDates: {
        to: { month: 1, year: 2050, day: 2 },
      },
    }
    const expectedErrors = [
      'IncarcerationDates.daterange.to.date.date.datetime.DATE_TOO_LATE',
    ]

    expect(validateModel(testData, sentence))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if ExceedsYear is "Yes"', () => {
    it('passes a valid sentence', () => {
      const testData = {
        Description: { value: 'Something' },
        ExceedsYear: { value: 'Yes' },
        Incarcerated: { value: 'Yes' },
        ProbationDates: {
          from: { year: 2010, month: 2, day: 10 },
          to: { year: 2013, month: 10, day: 1 },
        },
        IncarcerationDates: {
          from: { day: 5, month: 5, year: 2000 },
          to: { day: 2, month: 8, year: 2001 },
        },
      }

      expect(validateModel(testData, sentence)).toEqual(true)
    })
  })

  describe('if ExceedsYear is "No"', () => {
    it('passes a valid sentence', () => {
      const testData = {
        Description: { value: 'Something' },
        ExceedsYear: { value: 'No' },
        Incarcerated: { value: 'Yes' },
        ProbationDates: {
          from: { year: 2010, month: 2, day: 10 },
          to: { year: 2013, month: 10, day: 1 },
        },
        IncarcerationDates: {
          from: { day: 5, month: 5, year: 2000 },
          to: { day: 5, month: 5, year: 2001 },
        },
      }

      expect(validateModel(testData, sentence)).toEqual(true)
    })
  })

  describe('if Incarcerated is "Yes"', () => {
    it('IncarcerationDates must cover a duration greater than a year', () => {
      const testData = {
        Incarcerated: { value: 'Yes' },
        IncarcerationDates: {
          from: { day: 5, month: 5, year: 2000 },
          to: { day: 2, month: 8, year: 2000 },
        },
      }
      const expectedErrors = ['IncarcerationDates.daterange.DATE_RANGE_TOO_SHORT']

      expect(validateModel(testData, sentence))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if Incarcerated is "No"', () => {
    it('IncarcerationDates must cover a duration less than or equal to one year', () => {
      const testData = {
        Incarcerated: { value: 'No' },
        IncarcerationDates: {
          from: { day: 5, month: 5, year: 2000 },
          to: { day: 2, month: 8, year: 2001 },
        },
      }
      const expectedErrors = ['IncarcerationDates.daterange.DATE_RANGE_TOO_LONG']

      expect(validateModel(testData, sentence))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  it('the ProbationDates field is required', () => {
    const testData = {}
    const expectedErrors = ['ProbationDates.presence.REQUIRED']

    expect(validateModel(testData, sentence))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the ProbationDates field must be a valid date range', () => {
    const testData = {
      ProbationDates: {
        from: { year: 2000, month: 2, day: 10 },
        to: { year: 1990, month: 10, day: 1 },
      },
    }

    const expectedErrors = [
      'ProbationDates.daterange.INVALID_DATE_RANGE',
    ]

    expect(validateModel(testData, sentence))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('ProbationDates from date cannot be before applicant birthdate', () => {
    const applicantBirthdate = { month: 1, day: 2, year: 1980 }
    const testData = {
      ProbationDates: {
        from: { month: 1, year: 1970, day: 2 },
      },
    }
    const expectedErrors = [
      'ProbationDates.daterange.from.date.date.datetime.DATE_TOO_EARLY',
    ]

    expect(validateModel(testData, sentence, { applicantBirthdate }))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('ProbationDates to date cannot be in the future', () => {
    const testData = {
      ProbationDates: {
        to: { month: 1, year: 2050, day: 2 },
      },
    }
    const expectedErrors = [
      'ProbationDates.daterange.to.date.date.datetime.DATE_TOO_LATE',
    ]

    expect(validateModel(testData, sentence))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a valid Sentence', () => {
    const testData = {
      Description: { value: 'Something' },
      ExceedsYear: { value: 'No' },
      Incarcerated: { value: 'Yes' },
      ProbationDates: {
        from: { year: 2010, month: 2, day: 10 },
        to: { year: 2013, month: 10, day: 1 },
      },
      IncarcerationDates: {
        from: { year: 1995, month: 10, day: 10 },
        to: { year: 1996, month: 10, day: 10 },
      },
    }

    expect(validateModel(testData, sentence)).toEqual(true)
  })

  describe('if IncarceratedDates are not applicable', () => {
    it('IncarcerationDates are not required', () => {
      const testData = {
        IncarcerationDatesNA: { applicable: false },
      }
      const expectedErrors = ['IncarcerationDates.presence.REQUIRED']

      expect(validateModel(testData, sentence))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid sentence', () => {
      const testData = {
        Description: { value: 'Something' },
        ExceedsYear: { value: 'No' },
        Incarcerated: { value: 'Yes' },
        ProbationDates: {
          from: { year: 2010, month: 2, day: 10 },
          to: { year: 2013, month: 10, day: 1 },
        },
        IncarcerationDatesNA: { applicable: false },
      }

      expect(validateModel(testData, sentence)).toEqual(true)
    })
  })

  describe('if ProbationDates are not applicable', () => {
    it('ProbationDates are not required', () => {
      const testData = {
        ProbationDatesNA: { applicable: false },
      }
      const expectedErrors = ['ProbationDates.presence.REQUIRED']

      expect(validateModel(testData, sentence))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid sentence', () => {
      const testData = {
        Description: { value: 'Something' },
        ExceedsYear: { value: 'No' },
        Incarcerated: { value: 'Yes' },
        IncarcerationDatesNA: { applicable: false },
        ProbationDatesNA: { applicable: false },
      }

      expect(validateModel(testData, sentence)).toEqual(true)
    })
  })

  describe('requireLegalOffenseSentenced is false', () => {
    it('the ExceedsYear is not required', () => {
      const options = { requireLegalOffenseSentenced: false }
      const testData = { ExceedsYear: { value: 'true' } }
      const expectedErrors = ['ExceedsYear.hasValue.value.inclusion.INCLUSION']

      expect(validateModel(testData, sentence, options))
        .toEqual(expect.not.arrayContaining(expectedErrors))
    })
  })

  describe('requireLegalOffenseIncarcerated is false', () => {
    it('the Incarcerated field is not required', () => {
      const options = { requireLegalOffenseIncarcerated: false }
      const testData = { Incarcerated: { value: 'false' } }
      const expectedErrors = ['Incarcerated.hasValue.value.inclusion.INCLUSION']

      expect(validateModel(testData, sentence, options))
        .toEqual(expect.not.arrayContaining(expectedErrors))
    })
  })
})
