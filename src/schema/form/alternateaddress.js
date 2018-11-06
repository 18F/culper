import { general } from './general'

const defaultState = (options = {}) => ({
  Address: {
    country: null
  },
  HasDifferentAddress: { value: '' },
  Telephone: {},
  ...options
})

const alternateaddress = (data = {}) =>
  general('alternateaddress', defaultState(data))

export { alternateaddress }
export default defaultState
