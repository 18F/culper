import store from 'services/store'
import { validateModel } from 'models/validate'
import offense from 'models/offense'
import {
  requireLegalOffenseInvolvements,
  requireLegalOffenseSentenced,
  requireLegalOffenseIncarcerated,
} from 'helpers/branches'

const options = formType => (
  {
    requireLegalOffenseInvolvements: requireLegalOffenseInvolvements(formType),
    requireLegalOffenseSentenced: requireLegalOffenseSentenced(formType),
    requireLegalOffenseIncarcerated: requireLegalOffenseIncarcerated(formType),
  }
)
