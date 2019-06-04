import { usStatesValues } from 'constants/enums/usStates'
import { usTerritoriesValues } from 'constants/enums/usTerritories'

import locationModel from '../location'

const cityState = {
  city: locationModel.city,
  state: {
    presence: true,
    inclusion: [...usStatesValues, ...usTerritoriesValues],
  },
}

export default cityState
