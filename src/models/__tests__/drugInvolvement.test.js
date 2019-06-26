import { validateModel } from 'models/validate'
import drugInvolvement from '../drugInvolvement'

describe('The drugInvolvement model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'FirstInvolvement.required',
      'RecentInvolvement.required',
      'NatureOfInvolvement.required',
      'Reasons.required',
      'InvolvementWhileEmployed.required',
      'InvolvementWithClearance.required',
      'InvolvementInFuture.required',
    ]

    expect(validateModel(testData, drugInvolvement))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('FirstInvolvement must be a valid month/year', () => {
    const testData = {
      FirstInvolvement: { day: 5, month: 10 },
    }
    const expectedErrors = [
      'FirstInvolvement.date',
    ]

    expect(validateModel(testData, drugInvolvement))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('RecentInvolvement must be a valid month/year', () => {
    const testData = {
      RecentInvolvement: { day: 5, month: 10 },
    }
    const expectedErrors = [
      'RecentInvolvement.date',
    ]

    expect(validateModel(testData, drugInvolvement))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('NatureOfInvolvement must have a value', () => {
    const testData = {
      NatureOfInvolvement: 'testing',
    }
    const expectedErrors = [
      'NatureOfInvolvement.hasValue',
    ]

    expect(validateModel(testData, drugInvolvement))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Reasons must have a value', () => {
    const testData = {
      Reasons: 'testing',
    }
    const expectedErrors = [
      'Reasons.hasValue',
    ]

    expect(validateModel(testData, drugInvolvement))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('InvolvementWhileEmployed must have a valid value', () => {
    const testData = {
      InvolvementWhileEmployed: { value: 'nope' },
    }
    const expectedErrors = [
      'InvolvementWhileEmployed.hasValue',
    ]

    expect(validateModel(testData, drugInvolvement))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('InvolvementWithClearance must have a valid value', () => {
    const testData = {
      InvolvementWithClearance: { value: 'nope' },
    }
    const expectedErrors = [
      'InvolvementWithClearance.hasValue',
    ]

    expect(validateModel(testData, drugInvolvement))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('InvolvementInFuture must have a valid value', () => {
    const testData = {
      InvolvementInFuture: { value: 'nope' },
    }
    const expectedErrors = [
      'InvolvementInFuture.hasValue',
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
        'Explanation.hasValue',
      ]

      expect(validateModel(testData, drugInvolvement))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid drugInvolvement', () => {
      const testData = {
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
        'InvolvementWhileEmployed.required',
      ]

      expect(validateModel(testData, drugInvolvement, { requireInvolvementWhileEmployed: false }))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid drugInvolvement', () => {
      const testData = {
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
        'InvolvementWithClearance.required',
      ]

      expect(validateModel(testData, drugInvolvement, { requireInvolvementWithClearance: false }))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid drugInvolvement', () => {
      const testData = {
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
        'InvolvementInFuture.required',
      ]

      expect(validateModel(testData, drugInvolvement, { requireInvolvementInFuture: false }))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid drugInvolvement', () => {
      const testData = {
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
