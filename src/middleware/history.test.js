import { PUSH_STATE, historyMiddleware, push } from './history'
import { hashHistory } from 'react-router'

describe('history middleware', function () {
  const dispatch = () => {}
  const getState = () => {}
  const nextHandler = historyMiddleware({dispatch: dispatch, getState, getState})

  it('should create an action to handle a history push', function () {
    const path = '/'
    const expectedAction = { type: PUSH_STATE, to: path }
    expect(push(path)).toEqual(expectedAction)
  })

  it('should return a function for next handler', function () {
    expect(typeof nextHandler).toBe('function')
  })

  it('should run the action function with dispatch and getState', function () {
    const actionHandler = nextHandler(dispatch, getState)

    actionHandler((d, s) => {
      expect(d).toEqual(dispatch)
      expect(s).toEqual(getState)
    })
  })

  it('should push new state into history', function () {
    const actionHandler = nextHandler(dispatch, getState)
    const action = {
      type: PUSH_STATE,
      to: '/foo'
    }
    actionHandler(action)
    expect(hashHistory.getCurrentLocation().pathname).toEqual('/foo')
  })
})
