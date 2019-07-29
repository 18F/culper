import { validateModel } from 'models/validate'
import drugInvolvement from '../drugInvolvement'

describe('The drugInvolvement model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'DrugType.presence.REQUIRED',
      'FirstInvolvement.presence.REQUIRED',
      'RecentInvolvement.presence.REQUIRED',
      'NatureOfInvolvement.presence.REQUIRED',
      'Reasons.presence.REQUIRED',
      'InvolvementWhileEmployed.presence.REQUIRED',
      'InvolvementWithClearance.presence.REQUIRED',
      'InvolvementInFuture.presence.REQUIRED',
    ]

    expect(validateModel(testData, drugInvolvement))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('DrugType must have a valid value', () => {
    const testData = {
      DrugType: { value: 'Other' },
    }
    const expectedErrors = [
      'DrugType.hasValue.value.exclusion.EXCLUSION',
    ]

    expect(validateModel(testData, drugInvolvement))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  // TODO this is not how the form works
  // Right now, Explanation text becomes DrugType.value
  // So currently, only validation on DrugType is that it can't be "Other"
  describe.skip('if DrugType is "Other"', () => {
    it('DrugTypeExplanation must have a value', () => {
      const testData = {
        DrugType: { value: 'Other' },
        DrugTypeExplanation: 'test',
      }
      const expectedErrors = [
        'DrugTypeExplanation.hasValue',
      ]

      expect(validateModel(testData, drugInvolvement))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  it('FirstInvolvement must be a valid month/year', () => {
    const testData = {
      FirstInvolvement: { day: 5, month: 10 },
    }
    const expectedErrors = [
      'FirstInvolvement.date.year.presence.REQUIRED',
    ]

    expect(validateModel(testData, drugInvolvement))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('RecentInvolvement must be a valid month/year', () => {
    const testData = {
      RecentInvolvement: { day: 5, month: 10 },
    }
    const expectedErrors = [
      'RecentInvolvement.date.year.presence.REQUIRED',
    ]

    expect(validateModel(testData, drugInvolvement))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('RecentInvolvement must be after FirstInvolvement', () => {
    const testData = {
      FirstInvolvement: { month: 8, year: 2001 },
      RecentInvolvement: { month: 5, year: 1990 },
    }
    const expectedErrors = [
      'RecentInvolvement.date.date.datetime.DATE_TOO_EARLY',
    ]

    expect(validateModel(testData, drugInvolvement))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('NatureOfInvolvement must have a value', () => {
    const testData = {
      NatureOfInvolvement: 'testing',
    }
    const expectedErrors = [
      'NatureOfInvolvement.hasValue.MISSING_VALUE',
    ]

    expect(validateModel(testData, drugInvolvement))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Reasons must have a value', () => {
    const testData = {
      Reasons: 'testing',
    }
    const expectedErrors = [
      'Reasons.hasValue.MISSING_VALUE',
    ]

    expect(validateModel(testData, drugInvolvement))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('InvolvementWhileEmployed must have a valid value', () => {
    const testData = {
      InvolvementWhileEmployed: { value: 'nope' },
    }
    const expectedErrors = [
      'InvolvementWhileEmployed.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, drugInvolvement))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('InvolvementWithClearance must have a valid value', () => {
    const testData = {
      InvolvementWithClearance: { value: 'nope' },
    }
    const expectedErrors = [
      'InvolvementWithClearance.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, drugInvolvement))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('InvolvementInFuture must have a valid value', () => {
    const testData = {
      InvolvementInFuture: { value: 'nope' },
    }
    const expectedErrors = [
      'InvolvementInFuture.hasValue.value.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, drugInvolvement))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if InvolvementInFuture is "Yes"', () => {
    it('Explanation must have a value', () => {
      const testData = {
        InvolvementInFuture: { value: 'Yes' },
      }
      const expectedErrors = [
        'Explanation.hasValue.MISSING_VALUE',
      ]

      expect(validateModel(testData, drugInvolvement))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid drugInvolvement', () => {
      const testData = {
        DrugType: { value: 'Stimulants' },
        FirstInvolvement: { month: 2, year: 1999 },
        RecentInvolvement: { month: 5, year: 2001 },
        NatureOfInvolvement: { value: 'Testing' },
        Reasons: { value: 'testing' },
        InvolvementWhileEmployed: { value: 'No' },
        InvolvementWithClearance: { value: 'No' },
        InvolvementInFuture: { value: 'Yes' },
        Explanation: { value: 'testing' },
      }

      expect(validateModel(testData, drugInvolvement)).toEqual(true)
    })
  })

  describe('if InvolvementWhileEmployed is not required', () => {
    it('InvolvementWhileEmployed is not required', () => {
      const testData = {}
      const expectedErrors = [
        'InvolvementWhileEmployed.presence.REQUIRED',
      ]

      expect(validateModel(testData, drugInvolvement, { requireInvolvementWhileEmployed: false }))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid drugInvolvement', () => {
      const testData = {
        DrugType: { value: 'Test drug' },
        // DrugTypeExplanation: { value: 'Test' },
        FirstInvolvement: { month: 2, year: 1999 },
        RecentInvolvement: { month: 5, year: 2001 },
        NatureOfInvolvement: { value: 'Testing' },
        InvolvementWithClearance: { value: 'No' },
        InvolvementInFuture: { value: 'No' },
        Reasons: { value: 'testing' },
      }

      expect(validateModel(testData, drugInvolvement, { requireInvolvementWhileEmployed: false }))
        .toEqual(true)
    })
  })

  describe('if InvolvementWithClearance is not required', () => {
    it('InvolvementWithClearance is not required', () => {
      const testData = {}
      const expectedErrors = [
        'InvolvementWithClearance.presence.REQUIRED',
      ]

      expect(validateModel(testData, drugInvolvement, { requireInvolvementWithClearance: false }))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid drugInvolvement', () => {
      const testData = {
        DrugType: { value: 'THC' },
        FirstInvolvement: { month: 2, year: 1999 },
        RecentInvolvement: { month: 5, year: 2001 },
        NatureOfInvolvement: { value: 'Testing' },
        InvolvementWhileEmployed: { value: 'No' },
        InvolvementInFuture: { value: 'No' },
        Reasons: { value: 'testing' },
      }

      expect(validateModel(testData, drugInvolvement, { requireInvolvementWithClearance: false }))
        .toEqual(true)
    })
  })

  describe('if InvolvementInFuture is not required', () => {
    it('InvolvementInFuture is not required', () => {
      const testData = {}
      const expectedErrors = [
        'InvolvementInFuture.presence.REQUIRED',
      ]

      expect(validateModel(testData, drugInvolvement, { requireInvolvementInFuture: false }))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid drugInvolvement', () => {
      const testData = {
        DrugType: { value: 'Cocaine' },
        FirstInvolvement: { month: 2, year: 1999 },
        RecentInvolvement: { month: 5, year: 2001 },
        NatureOfInvolvement: { value: 'Testing' },
        InvolvementWithClearance: { value: 'No' },
        InvolvementWhileEmployed: { value: 'Yes' },
        Reasons: { value: 'testing' },
      }

      expect(validateModel(testData, drugInvolvement, { requireInvolvementInFuture: false }))
        .toEqual(true)
    })
  })

  it('passes a valid drugInvolvement', () => {
    const testData = {
      DrugType: { value: 'Steroids' },
      FirstInvolvement: { month: 2, year: 1999 },
      RecentInvolvement: { month: 5, year: 2001 },
      NatureOfInvolvement: { value: 'Testing' },
      Reasons: { value: 'testing' },
      InvolvementWhileEmployed: { value: 'No' },
      InvolvementWithClearance: { value: 'No' },
      InvolvementInFuture: { value: 'No' },
    }

    expect(validateModel(testData, drugInvolvement)).toEqual(true)
  })
})
