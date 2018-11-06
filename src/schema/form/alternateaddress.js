import { general } from './general'

const defaultState = (options = {}) => ({
  Address: {},
  HasDifferentAddress: { value: '' },
  ...options
})

const alternateaddress = (data = {}) =>
  general('alternateaddress', defaultState(data))

export { alternateaddress }
export default defaultState
