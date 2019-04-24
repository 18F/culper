import {
  takeLatest, select, put, all, call,
} from 'redux-saga/effects'

import * as actionTypes from 'constants/actionTypes'

import { nestedFormSectionsSelector } from 'selectors/navigation'

import { validateSection } from 'helpers/validation'

import { reportCompletion } from 'actions/ApplicationActions'

function* updateSectionStatus(section, store = '', state = {}) {
  if (!section.subsections && !section.storeKey) {
    yield
  } else if (section.subsections) {
    const parentStore = store || section.store
    yield all(section.subsections.map(s => call(updateSectionStatus, s, parentStore, state)))
  } else {
    const { application } = state

    let sectionName = store.toLowerCase()
    const subsectionName = section.name.toLowerCase()
    let sectionData

    // TODO HACK for moving Passports from Foreign to Citizenship
    if (store === 'Citizenship' && section.storeKey === 'Passport') {
      sectionName = 'foreign'
      sectionData = application.Foreign.Passport
    } else {
      sectionData = application[store][section.storeKey] || {}
    }

    const isValid = validateSection({ ...section, data: sectionData })

    yield put(reportCompletion(
      sectionName,
      subsectionName,
      isValid,
    ))
  }
}

function* validateFormData() {
  const formSections = yield select(nestedFormSectionsSelector)
  const state = yield select(s => s)
  yield all(formSections.map(section => call(updateSectionStatus, section, '', state)))
}

function* validateApplication() {
  yield takeLatest(actionTypes.VALIDATE_FORM_DATA, validateFormData)
}

export default function* rootSaga() {
  yield validateApplication()
}
