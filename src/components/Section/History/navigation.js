import * as validators from '../../../validators/index'

const navigation = {
  name: 'Your history',
  title: 'Your history',
  url: 'history',
  store: 'History',
  showNumber: true,
  locked: validators.formIsLocked,
  subsections: [
    {
      exclude: true,
      name: 'Introduction',
      url: 'intro'
    },
    {
      name: 'Where you have lived',
      url: 'residence',
      store: 'Residence',
      validator: validators.HistoryResidenceValidator
    },
    {
      name: 'Employment activities',
      url: 'employment',
      store: 'Employment',
      validator: validators.HistoryEmploymentValidator
    },
    {
      name: 'Where you went to school',
      url: 'education',
      store: 'Education',
      validator: validators.HistoryEducationValidator
    },
    {
      name: 'Former federal service',
      url: 'federal',
      store: 'Federal',
      validator: validators.FederalServiceValidator
    },
    {
      exclude: true,
      name: 'Review',
      url: 'review'
    }
  ]
}

export default navigation
