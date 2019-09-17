import { DateTime } from 'luxon'

import { validateModel } from 'models/validate'
import date from 'models/shared/date'
import {
  SELF, PARENT, CHILD, OTHER, DEFAULT_LIMITS,
} from 'constants/dateLimits'

// Set these to false to make testing the date limits easier
const testRequirements = {
  requireDay: false, requireMonth: false, requireYear: false,
}

describe('The date model', () => {
  const TODAY = DateTime.local()

  it('the day field is required', () => {
    const testData = {}
    const expectedErrors = ['day.presence.REQUIRED']

    expect(validateModel(testData, date))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the month field is required', () => {
    const testData = {}
    const expectedErrors = ['month.presence.REQUIRED']

    expect(validateModel(testData, date))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the year field is required', () => {
    const testData = {}
    const expectedErrors = ['year.presence.REQUIRED']

    expect(validateModel(testData, date))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the date field is required', () => {
    const testData = {}
    const expectedErrors = ['date.presence.REQUIRED']

    expect(validateModel(testData, date))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('must have a valid date', () => {
    const testData = { date: 'test' }
    const expectedErrors = ['date.datetime.INVALID_DATE']

    expect(validateModel(testData, date))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('with SELF birthdate limits', () => {
    it('must be no more than 130 years and 1 day ago', () => {
      const testData = { date: TODAY.minus({ years: 145 }) }
      const expectedErrors = ['date.datetime.DATE_TOO_EARLY']

      expect(validateModel(testData, date, { ...SELF }))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('must be more than 16 years ago', () => {
      const testData = { date: TODAY.minus({ years: 2 }) }
      const expectedErrors = ['date.datetime.DATE_TOO_LATE']

      expect(validateModel(testData, date, { ...SELF }))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid birthdate', () => {
      const testData = { date: TODAY.minus({ years: 30 }) }
      expect(validateModel(testData, date, { ...SELF, ...testRequirements }))
        .toEqual(true)
    })
  })

  describe('with PARENT birthdate limits', () => {
    const applicantBirthdate = TODAY.minus({ years: 30 })
    const parentLimits = PARENT(applicantBirthdate)

    it('must be no more than 200 years and 1 day ago', () => {
      const testData = { date: TODAY.minus({ years: 205 }) }
      const expectedErrors = ['date.datetime.DATE_TOO_EARLY']

      expect(validateModel(testData, date, { ...parentLimits }))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('must be older than the applicant', () => {
      const testData = { date: TODAY.minus({ years: 2 }) }
      const expectedErrors = ['date.datetime.DATE_TOO_LATE']

      expect(validateModel(testData, date, { ...parentLimits }))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid birthdate', () => {
      const testData = { date: TODAY.minus({ years: 60 }) }
      expect(validateModel(testData, date, { ...parentLimits, ...testRequirements }))
        .toEqual(true)
    })
  })

  describe('with CHILD birthdate limits', () => {
    const applicantBirthdate = TODAY.minus({ years: 30 })
    const childLimits = CHILD(applicantBirthdate)

    it('must be younger than the applicant', () => {
      const testData = { date: TODAY.minus({ years: 35 }) }
      const expectedErrors = ['date.datetime.DATE_TOO_EARLY']

      expect(validateModel(testData, date, { ...childLimits }))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('must not be in the future', () => {
      const testData = { date: TODAY.plus({ years: 2 }) }
      const expectedErrors = ['date.datetime.DATE_TOO_LATE']

      expect(validateModel(testData, date, { ...childLimits }))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid birthdate', () => {
      const testData = { date: TODAY.minus({ years: 2 }) }
      expect(validateModel(testData, date, { ...childLimits, ...testRequirements }))
        .toEqual(true)
    })
  })

  describe('with OTHER birthdate limits', () => {
    it('must be no more than 200 years and 1 day ago', () => {
      const testData = { date: TODAY.minus({ years: 205 }) }
      const expectedErrors = ['date.datetime.DATE_TOO_EARLY']

      expect(validateModel(testData, date, { ...OTHER }))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('must not be in the future', () => {
      const testData = { date: TODAY.plus({ years: 2 }) }
      const expectedErrors = ['date.datetime.DATE_TOO_LATE']

      expect(validateModel(testData, date, { ...OTHER }))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid birthdate', () => {
      const testData = { date: TODAY.minus({ years: 45 }) }
      expect(validateModel(testData, date, { ...OTHER, ...testRequirements }))
        .toEqual(true)
    })
  })

  describe('with DEFAULT date limits', () => {
    describe('with an applicant birthdate', () => {
      const applicantBirthdate = TODAY.minus({ years: 30 })
      const defaultLimits = DEFAULT_LIMITS(applicantBirthdate)

      it('must be no more than 200 years and 1 day ago', () => {
        const testData = { date: TODAY.minus({ years: 205 }) }
        const expectedErrors = ['date.datetime.DATE_TOO_EARLY']

        expect(validateModel(testData, date, { ...defaultLimits }))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('must be younger than the applicant', () => {
        const testData = { date: TODAY.minus({ years: 35 }) }
        const expectedErrors = ['date.datetime.DATE_TOO_EARLY']

        expect(validateModel(testData, date, { ...defaultLimits }))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('passes a valid date', () => {
        const testData = { date: TODAY.minus({ years: 5 }) }
        expect(validateModel(testData, date, { ...defaultLimits, ...testRequirements }))
          .toEqual(true)
      })
    })

    describe('without an applicant birthdate', () => {
      const defaultLimits = DEFAULT_LIMITS()

      it('must be no more than 200 years and 1 day ago', () => {
        const testData = { date: TODAY.minus({ years: 205 }) }
        const expectedErrors = ['date.datetime.DATE_TOO_EARLY']

        expect(validateModel(testData, date, { ...defaultLimits }))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('must not be in the future', () => {
        const testData = { date: TODAY.plus({ years: 2 }) }
        const expectedErrors = ['date.datetime.DATE_TOO_LATE']

        expect(validateModel(testData, date, { ...defaultLimits }))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('passes a valid date', () => {
        const testData = { date: TODAY.minus({ years: 65 }) }
        expect(validateModel(testData, date, { ...defaultLimits, ...testRequirements }))
          .toEqual(true)
      })
    })
  })
})
