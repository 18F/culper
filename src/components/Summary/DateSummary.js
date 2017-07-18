import React from 'react'
import { i18n } from '../../config'

export const DateSummary = (props, unknown = i18n.t('history.employment.default.noDate.label'), full = false) => {
  if (!props) {
    return ''
  }

  const noDateLabel = unknown
  function format (d) {
    if (Object.prototype.toString.call(d) === '[object Date]') {
      if (full) {
        return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`
      }

      return `${d.getMonth() + 1}/${d.getFullYear()}`
    }

    return ''
  }

  // Handle date range
  if (props.to || props.from) {
    const from = props.from && props.from.date ? format(props.from.date) : noDateLabel
    const to = props.to && props.to.date ? format(props.to.date) : noDateLabel
    return from === noDateLabel && to === noDateLabel
      ? ''
      : <span>{`${from} - ${to}`}</span>
  }

  // Handle single date
  if (props.date) {
    const singleDate = format(props.date)
    if (singleDate !== '') {
      return <span>{singleDate}</span>
    }
  }

  return ''
}
