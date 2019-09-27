import relative from 'models/relative'

import {
  MARRIED, SEPARATED, MOTHER, FATHER, FATHER_IN_LAW, MOTHER_IN_LAW,
} from 'constants/enums/relationshipOptions'

const relationshipsRelativesModel = {
  List: (value, attributes, attributeName, options) => {
    const { maritalStatus } = options

    const requiredRelations = [
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

    return {
      presence: true,
      accordion: { validator: relative },
      containsRequiredItems: {
        requirements: requiredRelations,
      },
    }
  },
}

export default relationshipsRelativesModel
