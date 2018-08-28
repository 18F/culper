import React from 'react' // eslint-disable-line no-unused-vars
import { i18n } from '../../config'

export const DateSummary = (
  props,
  unknown = i18n.t('history.employment.default.noDate.label'),
  full = false
) => {
  if (!props) {
    return ''
  }

  const noDateLabel = unknown
  function format(dateControl = {}) {
    if (!dateControl.day || !dateControl.month || !dateControl.year) {
      return null
    }

    if (full) {
      return `${dateControl.month}/${dateControl.day}/${dateControl.year}`
    }
    return `${dateControl.month}/${dateControl.year}`
  }

  // Handle date range
  if (props.to || props.from) {
    const from = format(props.from, full)
    const to = format(props.to, full)
    if (!from && !to) {
      return ''
    }
    return <span>{`${from || noDateLabel} - ${to || noDateLabel}`}</span>
  }

  // Handle single date
  if (props.date || props.value) {
    const singleDate = format(props)
    if (singleDate) {
      return <span>{singleDate}</span>
    }
  }

  return ''
}
