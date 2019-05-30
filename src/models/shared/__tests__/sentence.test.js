import { validateModel } from 'models/validate'
import sentence from '../sentence'

describe('The sentence model', () => {
  it('the Description field is required', () => {
    const testData = {}
    const expectedErrors = ['Description.required']

    expect(validateModel(testData, sentence))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Description field must have a value', () => {
    const testData = { Description: 'something' }
    const expectedErrors = ['Description.hasValue']

    expect(validateModel(testData, sentence))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the ExceedsYear field must have a valid value', () => {
    const testData = { ExceedsYear: { value: 'true' } }
    const expectedErrors = ['ExceedsYear.hasValue']

    expect(validateModel(testData, sentence))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Incarcerated field must have a valid value', () => {
    const testData = { Incarcerated: { value: 'false' } }
    const expectedErrors = ['Incarcerated.hasValue']

    expect(validateModel(testData, sentence))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the IncarcerationDates field is required', () => {
    const testData = {}
    const expectedErrors = ['IncarcerationDates.required']

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
    const expectedErrors = ['IncarcerationDates.daterange']

    expect(validateModel(testData, sentence))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the ProbationDates field is required', () => {
    const testData = {}
    const expectedErrors = ['ProbationDates.required']

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
    const expectedErrors = ['ProbationDates.daterange']

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
        from: { year: 1995, month: 2, day: 10 },
        to: { year: 2010, month: 10, day: 1 },
      },
    }

    expect(validateModel(testData, sentence)).toEqual(true)
  })

  describe('if IncarceratedDates are not applicable', () => {
    it('IncarcerationDates are not required', () => {
      const testData = {
        IncarcerationDatesNA: { applicable: false },
      }
      const expectedErrors = ['IncarcerationDates.required']

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
      const expectedErrors = ['ProbationDates.required']

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
})
