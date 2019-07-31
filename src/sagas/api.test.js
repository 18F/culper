import {
  take, call,
} from 'redux-saga/effects'
//import * as actionTypes from 'constants/actionTypes'

import { fetchFormWatcher, callFetchForm } from './api'

describe('The fetchFormWatcher', () => {
  const generator = fetchFormWatcher()

  it('takes FETCH_FORM', () => {
    expect(generator.next().value)
      .toEqual(take('FETCH_FORM'))
  })

  it('calls the fetchForm handler', () => {
    expect(generator.next().value)
      .toEqual(call(callFetchForm))
  })

  // TODO
  it.skip('starts a race between FETCH_FORM_SUCESS and FETCH_FORM_ERROR', () => {
    //const value = generator.next().value
    //console.log('next', value)
  })
})
