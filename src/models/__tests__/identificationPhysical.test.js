import { validateModel } from 'models/validate'
import identificationPhysical from 'models/sections/identificationPhysical'
/**
 * Tests for the physical attributes are within the shared models
 */

describe('The identification physical section', () => {
  it('has required fields', () => {
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
})
