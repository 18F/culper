import * as validators from '../../../validators/index'

const navigation = {
  name: 'Military history',
  title: 'Military history',
  url: 'military',
  store: 'Military',
  showNumber: true,
  locked: validators.formIsLocked,
  subsections: [
    {
      exclude: true,
      name: 'Introduction',
      url: 'intro'
    },
    {
      name: 'Selective service record',
      url: 'selective',
      store: 'Selective',
      validator: validators.SelectiveServiceValidator,
      hiddenFunc: validators.hideSelectiveService
    },
    {
      name: 'U.S. military',
      url: 'history',
      store: 'History',
      validator: validators.MilitaryHistoryValidator
    },
    {
      name: 'Disciplinary procedures',
      url: 'disciplinary',
      store: 'Disciplinary',
      validator: validators.MilitaryDisciplinaryValidator,
      hiddenFunc: validators.hideDisciplinaryProcedures
    },
    {
      name: 'Foreign military',
      url: 'foreign',
      store: 'Foreign',
      validator: validators.MilitaryForeignValidator
    },
    {
      exclude: true,
      name: 'Review',
      url: 'review'
    }
  ]
}

export default navigation
