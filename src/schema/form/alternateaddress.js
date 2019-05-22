import { general } from './general'

const defaultAlternateAddress = (options = {}) => ({
  Address: {},
  HasDifferentAddress: { value: '' },
  Telephone: {},
  ...options,
})

const emptyState = (options = {}) => ({
  Address: {
    country: null,
  },
  HasDifferentAddress: { value: '' },
  Telephone: {},
  ...options,
})

const alternateaddress = (data = {}) => general('alternateaddress', emptyState(data))

export { alternateaddress, defaultAlternateAddress }
export default emptyState
