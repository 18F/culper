import store from 'services/store'
import { validateModel } from 'models/validate'
import sentence from 'models/shared/sentence'
import {
  requireLegalOffenseSentenced,
  requireLegalOffenseIncarcerated,
} from 'helpers/branches'

const options = formType => (
  {
    requireLegalOffenseSentenced: requireLegalOffenseSentenced(formType),
    requireLegalOffenseIncarcerated: requireLegalOffenseIncarcerated(formType),
  }
)

export const validateSentence = (data, formType) => (
  validateModel(data, sentence, options(formType)) === true
)

export default class SentenceValidator {
  constructor(data = {}) {
    const state = store.getState()
    const { formType } = state.application.Settings
    this.data = data
    this.formType = formType
  }

  validChecks() {
    return validateModel(this.data, {
      ExceedsYear: sentence.ExceedsYear,
      Incarcerated: sentence.Incarcerated,
    }, options(this.formType)) === true
  }

  validIncarcerationDates() {
    return validateModel(this.data, {
      IncarcerationDates: sentence.IncarcerationDates,
    }, options(this.formType)) === true
  }

  validProbationDates() {
    return validateModel(this.data, {
      ProbationDates: sentence.ProbationDates,
    }, options(this.formType)) === true
  }

  isValid() {
    return validateSentence(this.data, this.formType)
  }
}
