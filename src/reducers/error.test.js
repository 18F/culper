import errorReducer from './error'
import { clearErrors, updateApplication } from '../actions/ApplicationActions'

describe('Error reducer', () => {
  const sectionName = 'errorTest'

  it('should return default state', () => {
    expect(errorReducer('')(undefined, {})).toEqual({})
  })

  it('can add new error', () => {
    const defaultState = {}
    const action = updateApplication(sectionName, 'identification', [
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
    ])
    expect(errorReducer(sectionName)(defaultState, action)[action.property].length).toBe(2)
  })

  it('can update error', () => {
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
    const action = updateApplication(sectionName, 'identification', [
      {
        section: 'identification',
        subsection: 'othernames',
        uid: '1',
        code: 'something.looks.off',
        valid: true
      }
    ])
    expect(errorReducer(sectionName)(defaultState, action)[action.property].length).toBe(1)
    expect(errorReducer(sectionName)(defaultState, action)[action.property][0].valid).toBe(true)
  })

  it('can clear errors for a section', () => {
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
    const action = clearErrors('identification', 'othernames')
    expect(errorReducer('Errors')(defaultState, action)[action.property].length).toBe(0)
    expect(errorReducer('Errors')(defaultState, action)['foreign'].length).toBe(1)
  })

  it('matches errors from a different subsection', () => {
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
      subsection: 'review',
      values: [
        {
          section: 'identification',
          subsection: 'review',
          uid: '2',
          code: 'something.looks.off',
          valid: true
        }
      ]
    }

    const newState = errorReducer(sectionName)(defaultState, action)
    const errors = newState[action.property]
    expect(errors.length).toBe(1)
    expect(errors[0].valid).toBe(true)
  })
})
