import { takeLatest } from 'redux-saga/effects'
import * as actionTypes from 'constants/actionTypes'

import { fetchFormWatcher, fetchForm } from './api'

describe('The fetchFormWatcher', () => {
  const generator = fetchFormWatcher()

  it('responds to the FETCH_FORM action', () => {
    expect(generator.next().value)
      .toEqual(takeLatest(actionTypes.FETCH_FORM, fetchForm))
  })
})
