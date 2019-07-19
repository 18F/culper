import { validateModel } from 'models/validate'
import identificationPlaceOfBirth from 'models/sections/identificationPlaceOfBirth'

describe('The identification place of birth section', () => {
  it('requires a place of birth', () => {
    const testData = {}
    const expectedErrors = ['Location.required']
    expect(validateModel(testData, identificationPlaceOfBirth))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('validates a domestic place of birth', () => {
    const testData = {
      Location: {
        country: { value: 'United States' },
        city: 'Los Angeles',
        state: 'CA',
        county: 'Los Angeles',
      },
    }

    expect(validateModel(testData, identificationPlaceOfBirth)).toEqual(true)
  })

  it('validates an international place of birth', () => {
    const testData = {
      Location: {
        country: { value: 'Vietnam' },
        city: 'Hanoi',
      },
    }

    expect(validateModel(testData, identificationPlaceOfBirth)).toEqual(true)
  })
})
