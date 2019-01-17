import compact from 'lodash/compact'
import Identification from './../../components/Section/Identification/navigation'
// disambiguate from History class in browser
import historyNavigation from './../../components/Section/History/navigation'
import relationshipsNavigation from './../../components/Section/Relationships/navigation'
import Citizenship from './../../components/Section/Citizenship/navigation'
import Military from './../../components/Section/Military/navigation'
import Foreign from './../../components/Section/Foreign/navigation'
import Financial from './../../components/Section/Financial/navigation'
import SubstanceUse from './../../components/Section/SubstanceUse/navigation'
import Legal from './../../components/Section/Legal/navigation'
import psychologicalNavigation from './../../components/Section/Psychological/navigation'
import { Review } from './../../config/navigation'

function navigationSections(formType) {
  return compact([
    Identification,
    historyNavigation(formType),
    relationshipsNavigation(formType),
    Citizenship,
    Military,
    Foreign,
    Financial,
    SubstanceUse,
    Legal,
    psychologicalNavigation(formType),
    Review
  ])
}

export default navigationSections;
