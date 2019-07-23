import { validateModel } from 'models/validate'
import identificationPhysical from 'models/sections/identificationPhysical'

describe('The identificationPhysical model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'Height.required',
      'Weight.required',
      'HairColor.required',
      'EyeColor.required',
      'Sex.required',
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
    const expectedErrors = ['Height.model']

    expect(validateModel(testData, identificationPhysical))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Weight must be a valid weight', () => {
    const testData = {
      Weight: { value: -1 },
    }
    const expectedErrors = ['Weight.hasValue']

    expect(validateModel(testData, identificationPhysical))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HairColor must be a valid hair color', () => {
    const testData = {
      HairColor: { value: 'SomethingDifferent' },
    }
    const expectedErrors = ['HairColor.hasValue']

    expect(validateModel(testData, identificationPhysical))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('EyeColor must be a valid eye color', () => {
    const testData = {
      EyeColor: { value: '' },
    }
    const expectedErrors = ['EyeColor.hasValue']

    expect(validateModel(testData, identificationPhysical))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Sex must be a valid sex', () => {
    const testData = {
      Sex: { value: 'test' },
    }
    const expectedErrors = ['Sex.hasValue']

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
