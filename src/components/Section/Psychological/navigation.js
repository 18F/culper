import * as validators from '../../../validators/index'

const navigation = {
  title: 'Psychological and emotional health',
  name: 'Psychological and emotional health',
  url: 'psychological',
  store: 'Psychological',
  showNumber: true,
  locked: validators.formIsLocked,
  subsections: [
    {
      exclude: true,
      name: 'Introduction',
      url: 'intro'
    },
    {
      name: 'Competence',
      url: 'competence',
      store: 'Competence',
      validator: validators.CompetenceValidator
    },
    {
      name: 'Consultations',
      url: 'consultations',
      store: 'Consultations',
      validator: validators.ConsultationValidator
    },
    {
      name: 'Hospitalizations',
      url: 'hospitalizations',
      store: 'Hospitalizations',
      validator: validators.HospitalizationsValidator
    },
    {
      name: 'Diagnoses',
      url: 'diagnoses',
      store: 'Diagnoses',
      validator: validators.DiagnosesValidator
    },
    {
      name: 'Existing Conditions',
      url: 'conditions',
      store: 'ExistingConditions',
      validator: validators.ExistingConditionsValidator,
      hiddenFunc: validators.hideExistingConditions
    },
    {
      exclude: true,
      name: 'Review',
      url: 'review'
    }
  ]
}

export default navigation
