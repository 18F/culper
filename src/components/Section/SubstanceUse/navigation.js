import compact from 'lodash/compact'
import * as validators from '../../../validators/index'

function substanceUse(formType) {
  return {
    name: 'Substance use',
    title: 'Substance use',
    url: 'substance',
    store: 'Substance',
    showNumber: true,
    locked: validators.formIsLocked,
    subsections: compact([
      {
        exclude: true,
        name: 'Introduction',
        url: 'intro'
      },
      {
        name: 'Illegal use of drugs and drug activity',
        url: 'drugs',
        subsections: compact([
          {
            name: 'Usage',
            url: 'usage',
            store: 'DrugUses',
            validator: validators.DrugUsesValidator
          },
          {
            name: 'Purchase',
            url: 'purchase',
            store: 'DrugInvolvements',
            validator: validators.DrugInvolvementsValidator
          },
          ['86'].indexOf(formType) > -1 && {
            name: 'Security clearance position',
            url: 'clearance',
            store: 'DrugClearanceUses',
            validator: validators.DrugClearanceUsesValidator
          },
          ['86'].indexOf(formType) > -1 ? {
            name: 'Public safety position',
            url: 'publicsafety',
            store: 'DrugPublicSafetyUses',
            validator: validators.DrugPublicSafetyUsesValidator
          } : null,
          {
            name: 'Misuse',
            url: 'misuse',
            store: 'PrescriptionUses',
            validator: validators.DrugPrescriptionUsesValidator
          },
          {
            name: 'Mandatory counseling or treatment',
            url: 'ordered',
            store: 'OrderedTreatments',
            validator: validators.DrugOrderedTreatmentsValidator
          },
          {
            name: 'Voluntary counseling or treatment',
            url: 'voluntary',
            store: 'VoluntaryTreatments',
            validator: validators.DrugVoluntaryTreatmentsValidator
          }
        ])
      },
      ['86'].indexOf(formType) > -1 && {
        name: 'Use of alcohol',
        url: 'alcohol',
        subsections: [
          {
            name: 'Negative impact',
            url: 'negative',
            store: 'NegativeImpacts',
            validator: validators.AlcoholNegativeImpactsValidator
          },
          {
            name: 'Mandatory counseling or treatment',
            url: 'ordered',
            store: 'OrderedCounselings',
            validator: validators.AlcoholOrderedCounselingsValidator
          },
          {
            name: 'Voluntary counseling or treatment',
            url: 'voluntary',
            store: 'VoluntaryCounselings',
            validator: validators.AlcoholVoluntaryCounselingsValidator
          },
          {
            name: 'Additional instances',
            url: 'additional',
            store: 'ReceivedCounselings',
            validator: validators.AlcoholReceivedCounselingsValidator
          }
        ]
      },
      {
        exclude: true,
        name: 'Review',
        url: 'review'
      }
    ])
  }
}

export default substanceUse
