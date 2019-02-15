import identificationSections from './identification'
import historySections from './history'
import relationshipsSections from './relationships'
import citizenshipSections from './citizenship'
import militarySections from './military'
import foreignSections from './foreign'
import financialSections from './financial'

export default {
  ...identificationSections,
  ...historySections,
  ...relationshipsSections,
  ...citizenshipSections,
  ...militarySections,
  ...foreignSections,
  ...financialSections
}
