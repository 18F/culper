import { DateTime } from 'luxon'

import { validateModel } from 'models/validate'
import date from 'models/shared/date'
import { SELF } from 'constants/dateLimits'

describe('The date model', () => {
  const TODAY = DateTime.local()

  it('the date field is required', () => {
    const testData = {}
    const expectedErrors = ['date.required']

    expect(validateModel(testData, date))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('must have a valid date', () => {
    const testData = { date: 'test' }
    const expectedErrors = ['date.datetime']

    expect(validateModel(testData, date))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('with SELF birthdate limits', () => {
    it('must be no more than 130 years and 1 day ago', () => {
      const testData = { date: TODAY.minus({ years: 145 }) }
      const expectedErrors = ['date.datetime']

      expect(validateModel(testData, date, { ...SELF }))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('must be more than 16 years ago', () => {
      const testData = { date: TODAY.minus({ years: 2 }) }
      const expectedErrors = ['date.datetime']

      expect(validateModel(testData, date, { ...SELF }))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid birthdate', () => {
      const testData = { date: TODAY.minus({ years: 30 }) }
      expect(validateModel(testData, date, { ...SELF })).toEqual(true)
    })
  })
})
