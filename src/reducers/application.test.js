import { reducer } from './application'
import { updateApplication } from '../actions/ApplicationActions'

describe('Application reducers', () => {
  it('reducer should return default state', () => {
    expect(reducer('')(undefined, {})).toEqual({})
  })

  it('can update new property', () => {
    const sectionName = 'test'
    const defaultState = {}
    const action = updateApplication(sectionName, 'value', 42)
    expect(reducer(sectionName)(defaultState, action)[action.property]).toEqual(action.values)
  })

  it('can update existing property', () => {
    const sectionName = 'test'
    const defaultState = {
      value: 42
    }
    const action = updateApplication(sectionName, 'value', 3.14159)
    expect(reducer(sectionName)(defaultState, action)[action.property]).toEqual(action.values)
  })
})
