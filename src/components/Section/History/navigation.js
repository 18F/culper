import compact from 'lodash/compact'
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
    subsections: compact([
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
      (['86'].indexOf(formType) > -1  && ({
        name: 'Former federal service',
        url: 'federal',
        store: 'Federal',
        validator: validators.FederalServiceValidator
      })),
      {
        exclude: true,
        name: 'Review',
        url: 'review'
      }
    ])
  }
}

export default historyNavigation
