import { validateModel } from 'models/validate'
import drugPrescriptionUse from '../drugPrescriptionUse'

describe('The drugPrescriptionUse model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'PrescriptionName.presence.REQUIRED',
      'InvolvementDates.presence.REQUIRED',
      'Reason.presence.REQUIRED',
      'UseWhileEmployed.presence.REQUIRED',
      'UseWithClearance.presence.REQUIRED',
    ]

    expect(validateModel(testData, drugPrescriptionUse))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('PrescriptionName must have a value', () => {
    const testData = {
      PrescriptionName: 'testing',
    }
    const expectedErrors = [
      'PrescriptionName.hasValue.MISSING_VALUE',
    ]

    expect(validateModel(testData, drugPrescriptionUse))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('InvolvementDates must be a valid date range', () => {
    const testData = {
      InvolvementDates: { day: 5, month: 10 },
    }
    const expectedErrors = [
      'InvolvementDates.daterange.from.presence.REQUIRED',
      'InvolvementDates.daterange.to.presence.REQUIRED',
    ]

    expect(validateModel(testData, drugPrescriptionUse))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('InvolvementDates from date cannot be before applicant birthdate', () => {
    const applicantBirthdate = { month: 1, day: 2, year: 1980 }
    const testData = {
      InvolvementDates: {
        from: { month: 1, year: 1970, day: 2 },
      },
    }
    const expectedErrors = [
      'InvolvementDates.daterange.from.date.date.datetime.DATE_TOO_EARLY',
    ]

    expect(validateModel(testData, drugPrescriptionUse, { applicantBirthdate }))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('InvolvementDates to date cannot be in the future', () => {
    const testData = {
      InvolvementDates: {
        to: { month: 1, year: 2050, day: 2 },
      },
    }
    const expectedErrors = [
      'InvolvementDates.daterange.to.date.date.datetime.DATE_TOO_LATE',
    ]

    expect(validateModel(testData, drugPrescriptionUse))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Reason must have a value', () => {
    const testData = {
      Reason: 'testing',
    }
    const expectedErrors = [
      'Reason.hasValue.MISSING_VALUE',
    ]

    expect(validateModel(testData, drugPrescriptionUse))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('UseWhileEmployed must have a valid value', () => {
    const testData = {
      UseWhileEmployed: { value: 'nope' },
    }
    const expectedErrors = [
      'UseWhileEmployed.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, drugPrescriptionUse))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('UseWithClearance must have a valid value', () => {
    const testData = {
      UseWithClearance: { value: 'nope' },
    }
    const expectedErrors = [
      'UseWithClearance.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, drugPrescriptionUse))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if UseWhileEmployed is not required', () => {
    it('UseWhileEmployed is not required', () => {
      const testData = {}
      const expectedErrors = [
        'UseWhileEmployed.presence.REQUIRED',
      ]

      expect(validateModel(testData, drugPrescriptionUse, { requireUseWhileEmployed: false }))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid drugPrescriptionUse', () => {
      const testData = {
        PrescriptionName: { value: 'test drug' },
        InvolvementDates: {
          from: { day: 2, month: 5, year: 2000 },
          to: { day: 6, month: 10, year: 2000 },
        },
        Reason: { value: 'testing' },
        UseWithClearance: { value: 'No' },
      }

      expect(validateModel(testData, drugPrescriptionUse, { requireUseWhileEmployed: false }))
        .toEqual(true)
    })
  })

  describe('if UseWithClearance is not required', () => {
    it('UseWithClearance is not required', () => {
      const testData = {}
      const expectedErrors = [
        'UseWithClearance.presence.REQUIRED',
      ]

      expect(validateModel(testData, drugPrescriptionUse, { requireUseWithClearance: false }))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid drugPrescriptionUse', () => {
      const testData = {
        PrescriptionName: { value: 'test drug' },
        InvolvementDates: {
          from: { day: 2, month: 5, year: 2000 },
          to: { day: 6, month: 10, year: 2000 },
        },
        Reason: { value: 'testing' },
        UseWhileEmployed: { value: 'No' },
      }

      expect(validateModel(testData, drugPrescriptionUse, { requireUseWithClearance: false }))
        .toEqual(true)
    })
  })

  it('passes a valid drugPrescriptionUse', () => {
    const testData = {
      PrescriptionName: { value: 'test drug' },
      InvolvementDates: {
        from: { day: 2, month: 5, year: 2000 },
        to: { day: 6, month: 10, year: 2000 },
      },
      Reason: { value: 'testing' },
      UseWhileEmployed: { value: 'No' },
      UseWithClearance: { value: 'No' },
    }

    expect(validateModel(testData, drugPrescriptionUse)).toEqual(true)
  })
})
