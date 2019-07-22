import {
  takeLatest, select, put, all, call,
} from 'redux-saga/effects'

import * as actionTypes from 'constants/actionTypes'

import { reportCompletion } from 'actions/ApplicationActions'
import { validateSection } from 'helpers/validation'
import { nestedFormSectionsSelector } from 'selectors/navigation'
import { formTypeSelector } from 'selectors/formType'

import {
  selectState,
} from 'sagas/index'

export function* updateSectionStatus(section, store = '', state = {}) {
  if (!section.subsections && !section.storeKey) {
    yield
  } else if (section.subsections) {
    const parentStore = store || section.store
    yield all(section.subsections.map(s => call(updateSectionStatus, s, parentStore, state)))
  } else {
    const formType = yield select(formTypeSelector)
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

    const isValid = yield call(validateSection, { ...section, data: sectionData }, formType)

    yield put(reportCompletion(
      sectionName,
      subsectionName,
      isValid === true,
    ))
  }
}

export function* validateFormData() {
  const formSections = yield select(nestedFormSectionsSelector)
  const state = yield select(selectState)
  yield all(formSections.map(section => call(updateSectionStatus, section, '', state)))
}

export function* validateWatcher() {
  yield takeLatest(actionTypes.VALIDATE_FORM_DATA, validateFormData)
}
