export const validGenericMonthYear = (obj) => {
  if (!obj || !obj.month || !obj.year) {
    return false
  }
  return true
}

export const validGenericTextfield = (obj) => {
  if (!obj || !obj.value) {
    return false
  }
  return true
}
