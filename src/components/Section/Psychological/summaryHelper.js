import { i18n } from '../../../config'

export const dateRangeFormat = (dateRange) => {
  if (!dateRange) {
    return null
  }
  let from = i18n.t('psychological.default.label.fromDate')
  let to = i18n.t('psychological.default.label.toDate')

  let dates = []

  if (dateRange.from && dateRange.from.date) {
    from = `${dateRange.from.date.getMonth() + 1}/${dateRange.from.date.getFullYear()}`
  }
  dates.push(from)

  if (dateRange.to && dateRange.to.date) {
    to = `${dateRange.to.date.getMonth() + 1}/${dateRange.to.date.getFullYear()}`
  }
  dates.push(to)
  return dates.join(' - ')
}
