import { validateModel } from 'models/validate'
import identificationPhysical from 'models/sections/identificationPhysical'

describe('The identificationPhysical model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'Height.presence.REQUIRED',
      'Weight.presence.REQUIRED',
      'HairColor.presence.REQUIRED',
      'EyeColor.presence.REQUIRED',
      'Sex.presence.REQUIRED',
    ]

    expect(validateModel(testData, identificationPhysical))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Height must be a valid height', () => {
    const testData = {
      Height: {
        feet: 0,
        inches: 2,
      },
    }
    const expectedErrors = ['Height.model.feet.numericality.NUMBER_NOT_GREATER_THAN_OR_EQUAL_TO']

    expect(validateModel(testData, identificationPhysical))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Weight must be a valid weight', () => {
    const testData = {
      Weight: { value: -1 },
    }
    const expectedErrors = ['Weight.hasValue.value.numericality.NUMBER_NOT_GREATER_THAN_OR_EQUAL_TO']

    expect(validateModel(testData, identificationPhysical))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HairColor must be a valid hair color', () => {
    const testData = {
      HairColor: { value: 'SomethingDifferent' },
    }
    const expectedErrors = ['HairColor.hasValue.value.inclusion.INCLUSION']

    expect(validateModel(testData, identificationPhysical))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('EyeColor must be a valid eye color', () => {
    const testData = {
      EyeColor: { value: '' },
    }
    const expectedErrors = ['EyeColor.hasValue.MISSING_VALUE']

    expect(validateModel(testData, identificationPhysical))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Sex must be a valid sex', () => {
    const testData = {
      Sex: { value: 'test' },
    }
    const expectedErrors = ['Sex.hasValue.value.inclusion.INCLUSION']

    expect(validateModel(testData, identificationPhysical))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a valid identificationPhysical', () => {
    const testData = {
      Height: {
        feet: 5,
        inches: 0,
      },
      Weight: { value: 100 },
      HairColor: { value: 'Brown' },
      EyeColor: { value: 'Black' },
      Sex: { value: 'Female' },
    }

    expect(validateModel(testData, identificationPhysical)).toEqual(true)
  })
})
