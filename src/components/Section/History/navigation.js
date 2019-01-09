import * as validators from '../../../validators/index'

/**
 * Function that returns the form section based on form type
 * @param {string} formType default form in eApp is SF-86
 */
function historyNavigation(formType = '86') {
  return {
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
      /**
       * This logic is a little cryptic, but it is conditionally adding
       * this subsection based on form type
       */
      ...(formType === '86' ? {
        name: 'Former federal service',
        url: 'federal',
        store: 'Federal',
        validator: validators.FederalServiceValidator
      } : {}),
      {
        exclude: true,
        name: 'Review',
        url: 'review'
      }
    ]
  }
}

export default historyNavigation
