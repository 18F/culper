import React from 'react'
import { i18n } from '../../../../config'
import { gaps } from '../dateranges'
import { Svg, Show } from '../../../Form'

/**
 * Renders a formatted summary information for a residence row
 */
export const ResidenceSummary = (props) => {
  const res = props.residence.Item || {}

  let address1 = ''
  let address2 = ''
  if (res.Address) {
    address1 += `${res.Address.address || ''}`.trim()
    if (res.Address.addressType === 'United States') {
      address2 = `${res.Address.city || ''}, ${res.Address.state || ''} ${res.Address.zipcode || ''}`.trim()
    } else if (res.Address.addressType === 'APOFPO') {
      address2 = `${res.Address.apoFpoType || ''}, ${res.Address.apoFpo || ''} ${res.Address.zipcode || ''}`.trim()
    } else if (res.Address.addressType === 'International') {
      address2 = `${res.Address.city || ''}, ${res.Address.country || ''}`.trim()
    }
  }

  if (address1.length === 0 || address2.length === 1) {
    address1 = i18n.t('history.residence.collection.summary.unknown')
  }

  const dates = res.Dates || {}
  let from = i18n.t('history.residence.collection.summary.unknown')
  if (dates.from) {
    from = `${dates.from.getMonth()}/${dates.from.getFullYear()}`
  }
  let to = i18n.t('history.residence.collection.summary.unknown')
  if (dates.to) {
    to = `${dates.to.getMonth()}/${dates.to.getFullYear()}`
  }

  return (
    <div className="table">
      <div className="table-cell index">
        <Svg src="img/residence-house.svg" />
        {i18n.t('history.residence.collection.summary.item')}:
      </div>
      <div className="table-cell employer">{address1}<br />{address2}</div>
      <div className="table-cell dates">{from}-{to}</div>
    </div>
  )
}

/**
 * Renders a formatted summary information for an employment row
 */
export const EmploymentSummary = (props) => {
  let item = props.employment.Item
  const employer = (item.Employment && item.Employment.value ? item.Employment.value : 'N/A')
  const dates = dateSummary(item)

  return (
    <div className="table">
      <div className="table-cell index">
        <Svg src="img/employer-briefcase.svg" />
        {i18n.t('history.employment.collection.summary.employer')}:
      </div>
      <div className="table-cell employer">{ employer }</div>
      <div className="table-cell dates">{ dates }</div>
    </div>
  )
}

/**
 * Renders a formatted summary information for an education row
 */
export const EducationSummary = (props) => {
  let item = props.education.Item
  const school = (item.Name && item.Name.value ? item.Name.value : 'N/A')
  const dates = dateSummary(item)

  return (
    <div className="table">
      <div className="table-cell index">
        <Svg src="img/school-cap.svg" />
        {i18n.t('history.education.collection.school.summary.item')}:
      </div>
      <div className="table-cell employer">{ school }</div>
      <div className="table-cell dates">{ dates }</div>
    </div>
  )
}

/**
 * Inject new list items as `Gaps`
 */
export const InjectGaps = (list, types, start) => {
  for (const t of types) {
    // Find all our "holes" for this type
    const ranges = list
        .filter(item => typeWithDates(t, item))
        .map(item => { return item.Item.Dates })
    let holes = gaps(ranges, start)

    for (const item of list) {
      if (!item.Item || !item.Item.Dates) {
        continue
      }

      for (let i = holes.length - 1; i > -1; i--) {
        const gap = holes[i]

        if (gap.to === item.Item.Dates.from) {
          let g = holes.splice(i, 1)[0]
          list.push({
            type: 'Gap',
            Item: {
              Dates: g,
              Type: t
            }
          })
        } else if (gap.from === item.Item.Dates.to) {
          let g = holes.splice(i, 1)[0]
          list.push({
            type: 'Gap',
            Item: {
              Dates: g,
              Type: t
            }
          })
        }
      }
    }
  }

  return list
}

/**
 * Helper function to determine of an item is a particular type and has
 * a date range
 */
const typeWithDates = (type, item) => {
  return item.type === type && item.Item && item.Item.Dates
}

/**
 * Helper function to create a date summary
 */
export const dateSummary = (item) => {
  let noDateLabel = i18n.t('history.employment.noDate.label')
  function format (d) {
    return `${d.getMonth()}/${d.getFullYear()}`
  }

  let vals = []
  if (!item.Dates) {
    return ''
  }

  if (item.Dates.from) {
    vals.push(format(item.Dates.from))
  } else {
    vals.push(noDateLabel)
  }

  if (item.Dates.to) {
    vals.push(format(item.Dates.to))
  } else {
    vals.push(noDateLabel)
  }

  return vals.join('-')
}
