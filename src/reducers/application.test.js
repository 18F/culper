import { reducer } from './application'

describe('Application reducers', () => {
  it('reducer should return default state', () => {
    expect(reducer('')(undefined, {})).toEqual({})
  })

  it('can update new property', () => {
    const sectionName = 'test'
    const defaultState = {}
    const action = {
      section: sectionName,
      property: 'value',
      values: 42
    }
    expect(reducer(sectionName)(defaultState, action)[action.property]).toEqual(action.values)
  })

  it('can update existing property', () => {
    const sectionName = 'test'
    const defaultState = {
      value: 42
    }
    const action = {
      section: sectionName,
      property: 'value',
      values: 3.14159
    }
    expect(reducer(sectionName)(defaultState, action)[action.property]).toEqual(action.values)
  })
})
