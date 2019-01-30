import Identification from './../../components/Section/Identification/navigation'
// disambiguate from History class in browser
import HistoryNav from './../../components/Section/History/navigation'
import Relationships from './../../components/Section/Relationships/navigation'
import Citizenship from './../../components/Section/Citizenship/navigation'
import Military from './../../components/Section/Military/navigation'
import Foreign from './../../components/Section/Foreign/navigation'
import Financial from './../../components/Section/Financial/navigation'
import SubstanceUse from './../../components/Section/SubstanceUse/navigation'
import Legal from './../../components/Section/Legal/navigation'
import Psychological from './../../components/Section/Psychological/navigation'
import { Review } from './../../config/navigation'

const sf86 = {
  name: 'SF 86',
  formType: 'sf86',
  formNumber: '86',
  sections: [
    Identification,
    HistoryNav,
    Relationships,
    Citizenship,
    Military,
    Foreign,
    Financial,
    SubstanceUse,
    Legal,
    Psychological,
    Review
  ]
}

export default sf86
