import relative from 'models/relative'
import {
  MARRIED, SEPARATED, MOTHER, FATHER, FATHER_IN_LAW, MOTHER_IN_LAW,
} from 'constants/enums/relationshipOptions'

import store from 'services/store'
import { selectMaritalStatus } from 'selectors/data'

export const getMaritalStatus = () => {
  if (store) {
    const state = store.getState()
    return selectMaritalStatus(state)
  }

  return ''
}

const requiredRelations = () => {
  const maritalStatus = getMaritalStatus()

  const required = [
    i => i.Item && i.Item.Relation && i.Item.Relation.value === MOTHER,
    i => i.Item && i.Item.Relation && i.Item.Relation.value === FATHER,
  ]

  if ([MARRIED, SEPARATED].includes(maritalStatus)) {
    requiredRelations.push(
      i => i.Item && i.Item.Relation && i.Item.Relation.value === MOTHER_IN_LAW,
    )
    requiredRelations.push(
      i => i.Item && i.Item.Relation && i.Item.Relation.value === FATHER_IN_LAW,
    )
  }

  return required
}

const relationshipsRelatives = {
  List: {
    presence: true,
    accordion: { validator: relative },
    containsRequiredItems: {
      requirements: requiredRelations(),
    },
  },
}

export default relationshipsRelatives
