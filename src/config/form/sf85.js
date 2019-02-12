import Identification from './../../components/Section/Identification/navigation'
// disambiguate from History class in browser
import HistoryNav from './../../components/Section/History/navigation'
import Citizenship from './../../components/Section/Citizenship/navigation'
import Military from './../../components/Section/Military/navigation'
import Foreign from './../../components/Section/Foreign/navigation'
import Financial from './../../components/Section/Financial/navigation'
import SubstanceUse from './../../components/Section/SubstanceUse/navigation'
import Legal from './../../components/Section/Legal/navigation'
import { Review } from './../../config/navigation'


const sf85 = {
  name: 'SF 85',
  formType: 'sf85',
  formNumber: '85',
  sections: [
    Identification,
    HistoryNav,
    Citizenship,
    Military,
    Foreign,
    Financial,
    SubstanceUse,
    Legal,
    Review
  ]
}

export default sf85
