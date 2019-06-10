import { validateModel } from 'models/validate'
import cityState from '../cityState'

describe('The location/cityState model', () => {
  it('city is required', () => {
    const testData = { city: '' }
    const expectedErrors = ['city.required']

    expect(validateModel(testData, cityState))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('state must be a valid US state', () => {
    const testData = { state: 'XY', country: 'United States' }
    const expectedErrors = ['state.inclusion']

    expect(validateModel(testData, cityState))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a valid address', () => {
    const testData = {
      city: 'New York',
      state: 'NY',
    }

    expect(validateModel(testData, cityState)).toEqual(true)
  })
})
