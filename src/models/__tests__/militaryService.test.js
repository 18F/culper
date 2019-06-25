import { validateModel } from 'models/validate'
import militaryService from '../militaryService'
import { validate } from '@babel/types';

describe('The military service model', () => {
  it('requires required fields to be filled', () => {
    const testData = {}
    const expectedErrors = [
      'Service.required',
      'Status.required',
      'Officer.required',
      'Dates.required',
      'ServiceNumber.required',
      'HasBeenDischarged.required',
    ]


    expect(validateModel(testData, militaryService))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('requires Service to have a valid value', () => {
    const testData = {
      Service: {
        value: 'InvalidArmy',
      },
    }
    const expectedErrors = ['Service.hasValue']

    expect(validateModel(testData, militaryService))
      .toEqual(expect.arrayContaining(expectedErrors))
  })


  it('requires Status to have a valid value', () => {
    const testData = {
      Status: {
        value: 'InvalidValue',
      },
    }
    const expectedErrors = ['Status.hasValue']

    expect(validateModel(testData, militaryService))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('requires Officer to have a valid value', () => {
    const testData = {
      Officer: {
        value: 'InvalidType',
      },
    }
    const expectedErrors = ['Officer.hasValue']

    expect(validateModel(testData, militaryService))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('requires the ServiceNumber to be filled', () => {
    const testData = {
      ServiceNumber: {
        value: '',
      },
    }
    const expectedErrors = ['ServiceNumber.hasValue']

    expect(validateModel(testData, militaryService))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('requires a ServiceState if national guard is selected', () => {
    const testData = {
      Service: {
        value: 'AirNationalGuard',
      },
    }
    const expectedErrors = ['ServiceState.required']

    expect(validateModel(testData, militaryService))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('requires HasBeenDischarged to be filled', () => {
    const testData = {
      HasBeenDischarged: {
        value: '',
      },
    }

    const expectedErrors = ['HasBeenDischarged.hasValue']

    expect(validateModel(testData, militaryService))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if applicant was discharged', () => {
    it('requires DischargeType', () => {
      const testData = {
        HasBeenDischarged: {
          value: 'Yes',
        },
      }
      const expectedErrors = ['DischargeType.required']

      expect(validateModel(testData, militaryService))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('requires a valid DischargeType', () => {
      const testData = {
        HasBeenDischarged: {
          value: 'Yes',
        },
        DischargeType: {
          value: 'InvalidType',
        },
      }
      const expectedErrors = ['DischargeType.hasValue']

      expect(validateModel(testData, militaryService))
        .toEqual(expect.arrayContaining(expectedErrors))
    })


    it('requires a DischargeReason for discharge types other than Honorable', () => {
      const testData = {
        HasBeenDischarged: {
          value: 'Yes',
        },
        DischargeType: {
          value: 'Dishonorable',
        },
      }
      const expectedErrors = ['DischargeReason.required', 'DischargeReason.hasValue']

      expect(validateModel(testData, militaryService))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('requires a DischargeTypeOther for DischargeType = Other', () => {
      const testData = {
        HasBeenDischarged: {
          value: 'Yes',
        },
        DischargeType: {
          value: 'Other',
        },
      }
      const expectedErrors = ['DischargeTypeOther.required', 'DischargeTypeOther.hasValue']

      expect(validateModel(testData, militaryService))
        .toEqual(expect.arrayContaining(expectedErrors))
    })


    it('requires a DischargeDate', () => {
      const testData = {
        HasBeenDischarged: {
          value: 'Yes',
        },
      }
      const expectedErrors = ['DischargeDate.required']

      expect(validateModel(testData, militaryService))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
