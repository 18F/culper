import { validateModel } from 'models/validate'
import alias from '../alias'

describe('The alias model', () => {
  it('name is required', () => {
    const testData = {}
    const expectedErrors = ['Name.presence.REQUIRED']

    expect(validateModel(testData, alias))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('name must be a valid name', () => {
    const testData = {
      Name: 'My Name',
    }
    const expectedErrors = [
      'Name.model.first.presence.REQUIRED',
      'Name.model.last.presence.REQUIRED',
      'Name.model.middle.presence.REQUIRED',
    ]

    expect(validateModel(testData, alias))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('maiden name is required', () => {
    const testData = {}
    const expectedErrors = ['MaidenName.presence.REQUIRED']

    expect(validateModel(testData, alias))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('maiden name must have a valid value', () => {
    const testData = {
      MaidenName: { value: 'something' },
    }
    const expectedErrors = ['MaidenName.hasValue.value.inclusion.INCLUSION']

    expect(validateModel(testData, alias))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('dates is required', () => {
    const testData = {}
    const expectedErrors = ['Dates.presence.REQUIRED']

    expect(validateModel(testData, alias))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('dates must be a valid date range', () => {
    const testData = {
      Dates: {
        from: { year: 2010, month: 5, day: 1 },
        to: { year: 2001, month: 5, day: 1 },
      },
    }
    const expectedErrors = ['Dates.daterange.INVALID_DATE_RANGE']

    expect(validateModel(testData, alias))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('dates must not be in the future', () => {
    const testData = {
      Dates: {
        from: { year: 2030, month: 5, day: 1 },
        to: { year: 2050, month: 2, day: 2 },
      },
    }
    const expectedErrors = [
      'Dates.daterange.from.date.date.datetime.DATE_TOO_LATE',
      'Dates.daterange.to.date.date.datetime.DATE_TOO_LATE',
    ]

    expect(validateModel(testData, alias))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('dates must be after the "earliest" option', () => {
    const testData = {
      Dates: {
        from: { year: 1990, month: 5, day: 1 },
        present: true,
      },
    }
    const expectedErrors = ['Dates.daterange.from.date.date.datetime.DATE_TOO_EARLY']
    const options = {
      earliest: { year: 2010, month: 2, day: 3 },
    }

    expect(validateModel(testData, alias, options))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('reason is required', () => {
    const testData = {}
    const expectedErrors = ['Reason.presence.REQUIRED']

    expect(validateModel(testData, alias))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('reason must have a valid value', () => {
    const testData = {
      Reason: true,
    }
    const expectedErrors = ['Reason.hasValue.MISSING_VALUE']

    expect(validateModel(testData, alias))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a valid alias', () => {
    const testData = {
      Name: { first: 'Alias', middle: 'Name', last: 'Something' },
      Dates: {
        from: { year: 2015, month: 1, day: 30 },
        to: { year: 2018, month: 8, day: 10 },
      },
      MaidenName: { value: 'No' },
      Reason: { value: 'Because' },
    }

    expect(validateModel(testData, alias)).toEqual(true)
  })

  describe('if maiden name is hidden', () => {
    it('maiden name is not required', () => {
      const testData = {}
      const expectedErrors = ['MaidenName.required']

      expect(validateModel(testData, alias, { hideMaiden: true }))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid alias', () => {
      const testData = {
        Name: { first: 'Alias', middle: 'Name', last: 'Something' },
        Dates: {
          from: { year: 2015, month: 1, day: 30 },
          to: { year: 2018, month: 8, day: 10 },
        },
        Reason: { value: 'Because' },
      }

      expect(validateModel(testData, alias, { hideMaiden: true })).toEqual(true)
    })
  })
})
