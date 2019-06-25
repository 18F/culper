import { validateModel } from 'models/validate'
import state from '../state'

describe('The location/state model', () => {
  it('requires a state', () => {
    const testData = { state: '' }
    const expectedErrors = ['state.required']

    expect(validateModel(testData, state))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('must be a valid US state', () => {
    const testData = { state: 'XY', country: 'United States' }
    const expectedErrors = ['state.inclusion']

    expect(validateModel(testData, state))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a valid address', () => {
    const testData = {
      state: 'CA',
    }

    expect(validateModel(testData, state)).toEqual(true)
  })
})
