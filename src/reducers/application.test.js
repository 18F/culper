import { reducer, errorReducer } from './application'

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

  it('error reducer should return default state', () => {
    expect(errorReducer('')(undefined, {})).toEqual({})
  })

  it('can add new error', () => {
    const sectionName = 'errorTest'
    const defaultState = {}
    const action = {
      section: sectionName,
      property: 'identification',
      subsection: 'othernames',
      values: [
        {
          section: 'identification',
          subsection: 'othernames',
          uid: '1',
          code: 'something.looks.off',
          valid: false
        },
        {
          section: 'identification',
          subsection: 'othernames',
          uid: '2',
          code: 'something.smells',
          valid: false
        }
      ]
    }
    expect(errorReducer(sectionName)(defaultState, action)[action.property].length).toBe(2)
  })

  it('can update error', () => {
    const sectionName = 'errorTest'
    const defaultState = {
      identification: [
        {
          section: 'identification',
          subsection: 'othernames',
          uid: '1',
          code: 'something.looks.off',
          valid: false
        }
      ]
    }
    const action = {
      section: sectionName,
      property: 'identification',
      subsection: 'othernames',
      values: [
        {
          section: 'identification',
          subsection: 'othernames',
          uid: '1',
          code: 'something.looks.off',
          valid: true
        }
      ]
    }
    expect(errorReducer(sectionName)(defaultState, action)[action.property].length).toBe(1)
    expect(errorReducer(sectionName)(defaultState, action)[action.property][0].valid).toBe(true)
  })

  it('can clear errors for a section', () => {
    const sectionName = 'errorTest'
    const defaultState = {
      identification: [
        {
          section: 'identification',
          subsection: 'othernames',
          uid: '1',
          code: 'something.looks.off',
          valid: false
        }
      ],
      foreign: [
        {
          section: 'foreign',
          subsection: 'passport',
          uid: '1',
          code: 'something.looks.off',
          valid: false
        }
      ]
    }
    const action = {
      section: sectionName,
      property: 'identification',
      subsection: 'othernames',
      clear: true
    }
    expect(errorReducer(sectionName)(defaultState, action)[action.property].length).toBe(0)
    expect(errorReducer(sectionName)(defaultState, action)['foreign'].length).toBe(1)
  })
})
