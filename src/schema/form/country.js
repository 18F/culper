import { general } from './general'

export const country = (data = {}) => {
  // Ensure the value is always sent as an array
  if (data && data.value && !Array.isArray(data.value)) {
    data = {
      ...data,
      value: [data.value]
    }
  }
  return general('country', data)
}
