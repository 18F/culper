import { validateModel } from 'models/validate'
import sentence from 'models/shared/sentence'

export const validateSentence = data => validateModel(data, sentence) === true

export default class SentenceValidator {
  constructor(data = {}) {
    this.data = data
  }

  validChecks() {
    return validateModel(this.data, {
      ExceedsYear: sentence.ExceedsYear,
      Incarcerated: sentence.Incarcerated,
    }) === true
  }

  validIncarcerationDates() {
    return validateModel(this.data, {
      IncarcerationDates: sentence.IncarcerationDates,
    }) === true
  }

  validProbationDates() {
    return validateModel(this.data, {
      ProbationDates: sentence.ProbationDates,
    }) === true
  }

  isValid() {
    return validateSentence(this.data)
  }
}
