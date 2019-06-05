import { validateModel } from 'models/validate'
import alias from '../alias'

describe('The alias model', () => {
  it('name is required', () => {
    const testData = {}
    const expectedErrors = ['Name.required']

    expect(validateModel(testData, alias))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('name must be a valid name', () => {
    const testData = {
      Name: 'My Name',
    }
    const expectedErrors = ['Name.model']

    expect(validateModel(testData, alias))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('maiden name is required', () => {
    const testData = {}
    const expectedErrors = ['MaidenName.required']

    expect(validateModel(testData, alias))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('maiden name must have a valid value', () => {
    const testData = {
      MaidenName: { value: 'something' },
    }
    const expectedErrors = ['MaidenName.hasValue']

    expect(validateModel(testData, alias))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('dates is required', () => {
    const testData = {}
    const expectedErrors = ['Dates.required']

    expect(validateModel(testData, alias))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('dates must be a valid date range', () => {
    const testData = {
      Dates: {
        from: { year: 2030, month: 5, day: 1 },
        present: true,
      },
    }
    const expectedErrors = ['Dates.daterange']

    expect(validateModel(testData, alias))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('reason is required', () => {
    const testData = {}
    const expectedErrors = ['Reason.required']

    expect(validateModel(testData, alias))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('reason must have a valid value', () => {
    const testData = {
      Reason: true,
    }
    const expectedErrors = ['Reason.hasValue']

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
