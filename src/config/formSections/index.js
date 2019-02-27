import identificationSections from './identification'
import historySections from './history'
import relationshipsSections from './relationships'
import citizenshipSections from './citizenship'
import militarySections from './military'
import foreignSections from './foreign'
import financialSections from './financial'
import substanceUseSections from './substanceUse'
import legalSections from './legal'
import psychologicalSections from './psychological'

export default {
  ...identificationSections,
  ...historySections,
  ...relationshipsSections,
  ...citizenshipSections,
  ...militarySections,
  ...foreignSections,
  ...financialSections,
  ...substanceUseSections,
  ...legalSections,
  ...psychologicalSections
}
