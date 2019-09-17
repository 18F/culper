import store from 'services/store'
import * as formTypes from 'constants/formTypes'
import { validateModel } from 'models/validate'
import otherOffense from 'models/otherOffense'
import { requireLegalPoliceFirearms, requireLegalPoliceDrugs } from 'helpers/branches'

const options = formType => (
  {
    requireLegalPoliceFirearms: requireLegalPoliceFirearms(formType),
    requireLegalPoliceDrugs: requireLegalPoliceDrugs(formType),
  }
)
