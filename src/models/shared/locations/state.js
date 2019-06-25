import { usStatesValues } from 'constants/enums/usStates'
import { usTerritoriesValues } from 'constants/enums/usTerritories'

const state = {
  state: {
    presence: true,
    inclusion: [...usStatesValues, ...usTerritoriesValues],
  },
}

export default state
