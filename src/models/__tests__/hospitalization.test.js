import { validateModel } from 'models/validate'
import hospitalization from 'models/hospitalization'

describe('The hospitalization model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'TreatmentDate.required',
      'Admission.required',
      'Facility.required',
      'FacilityAddress.required',
      'Explanation.required',
    ]

    expect(validateModel(testData, hospitalization))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('TreatmentDate must be a valid date range', () => {
    const testData = {
      TreatmentDate: { value: 'Test' },
    }
    const expectedErrors = [
      'TreatmentDate.daterange',
    ]

    expect(validateModel(testData, hospitalization))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Admission must be a valid value', () => {
    const testData = {
      Admission: { value: 'Test' },
    }
    const expectedErrors = [
      'Admission.hasValue',
    ]

    expect(validateModel(testData, hospitalization))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('FacilityAddress must be a valid location', () => {
    const testData = {
      FacilityAddress: { value: 'Test' },
    }
    const expectedErrors = [
      'FacilityAddress.location',
    ]

    expect(validateModel(testData, hospitalization))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Facility must have a value', () => {
    const testData = {
      Facility: { value: '' },
    }
    const expectedErrors = [
      'Facility.hasValue',
    ]

    expect(validateModel(testData, hospitalization))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Explanation must have a value', () => {
    const testData = {
      Explanation: { value: '' },
    }
    const expectedErrors = [
      'Explanation.hasValue',
    ]

    expect(validateModel(testData, hospitalization))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a valid hospitalization', () => {
    const testData = {
      TreatmentDate: {
        from: { year: 2004, month: 8, day: 10 },
        to: { year: 2004, month: 10, day: 1 },
        present: false,
      },
      Admission: { value: 'Voluntary' },
      Explanation: { value: 'Testing' },
      FacilityAddress: {
        street: '39 Facility St',
        city: 'New York',
        state: 'NY',
        zipcode: '10025',
        country: 'United States',
      },
      Facility: { value: 'Test Facility' },
    }

    expect(validateModel(testData, hospitalization)).toEqual(true)
  })
})
