import React from 'react'
import { i18n } from '../../../config'
import { gaps } from './dateranges'
import { Svg, Show } from '../../Form'
import { newGuid } from '../../Form/ValidationElement'
import { ResidenceValidator, EmploymentValidator, EducationValidator } from '../../../validators'

/**
 * Renders a formatted summary information for a residence row
 */
export const ResidenceSummary = (props) => {
  const item = props.Item || {}

  let address = ''
  let address1 = ''
  let address2 = ''
  if (item.Address) {
    address1 += `${item.Address.address || ''}`.trim()
    if (item.Address.addressType === 'United States') {
      address2 = `${item.Address.city || ''}, ${item.Address.state || ''} ${item.Address.zipcode || ''}`.trim()
    } else if (item.Address.addressType === 'APOFPO') {
      address2 = `${item.Address.apoFpoType || ''}, ${item.Address.apoFpo || ''} ${item.Address.zipcode || ''}`.trim()
    } else if (item.Address.addressType === 'International') {
      address2 = `${item.Address.city || ''}, ${item.Address.country || ''}`.trim()
    }
  }

  if (address1.length === 0 || address2.length === 1) {
    address = i18n.t('history.residence.collection.summary.unknown')
  } else {
    address = `${address1}, ${address2}`.trim()
  }

  const dates = dateSummary(item)
  const hasErrors = props.Item && !new ResidenceValidator(item, null).isValid()
  const svg = hasErrors ? 'img/exclamation-point.svg' : 'img/residence-house.svg'

  return (
    <span>
      <Svg src={svg} />
      <span className="index">
        {i18n.t('history.residence.collection.summary.item')}:
      </span>
      <span className="employer">{address}</span>
      <span className="dates">{dates}</span>
    </span>
  )
}

/**
 * Renders a formatted summary information for an employment row
 */
export const EmploymentSummary = (props) => {
  let item = props.Item || {}
  const employer = (item.Employment && item.Employment.value ? item.Employment.value : 'N/A')
  const dates = dateSummary(item)
  const hasErrors = props.Item && !new EmploymentValidator(item, null).isValid()
  const svg = hasErrors === true ? 'img/exclamation-point.svg' : 'img/employer-briefcase.svg'

  return (
    <span>
      <Svg src={svg} />
      <span className="index">
        {i18n.t('history.employment.default.collection.summary.employer')}:
      </span>
      <span className="employer">{ employer }</span>
      <span className="dates">{ dates }</span>
    </span>
  )
}

/**
 * Renders a formatted summary information for an education row
 */
export const EducationSummary = (props) => {
  let item = props.Item || {}
  const school = (item.Name && item.Name.value ? item.Name.value : 'N/A')
  const dates = dateSummary(item)
  const hasErrors = props.Item && !new EducationValidator(item, null).isValid()
  const svg = hasErrors === true ? 'img/exclamation-point.svg' : 'img/school-cap.svg'

  return (
    <span>
      <Svg src={svg} />
      <span className="index">
        {i18n.t('history.education.collection.school.summary.item')}:
      </span>
      <span className="employer">{ school }</span>
      <span className="dates">{ dates }</span>
    </span>
  )
}

/**
 * Inject new list items as `Gaps`
 */
export const InjectGaps = (list = [], start) => {
  // Let us just make sure we clear any previous gaps
  list = list.filter(item => !item.type || (item.type && item.type !== 'Gap'))

  // Find all our "holes" for this type
  const ranges = list
      .filter(item => { return item.Item && item.Item.Dates })
      .map(item => { return item.Item.Dates })
  let holes = gaps(ranges, start)

  for (const item of list) {
    if (!item.Item || !item.Item.Dates) {
      continue
    }

    for (let i = holes.length - 1; i > -1; i--) {
      const gap = holes[i]

      if (gap.to.date === item.Item.Dates.from.date) {
        let g = holes.splice(i, 1)[0]
        list.push({
          type: 'Gap',
          uuid: newGuid(),
          open: false,
          Item: {
            Dates: g
          }
        })
      } else if (gap.from.date === item.Item.Dates.to.date) {
        let g = holes.splice(i, 1)[0]
        list.push({
          type: 'Gap',
          uuid: newGuid(),
          open: false,
          Item: {
            Dates: g
          }
        })
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
  let noDateLabel = i18n.t('history.employment.default.noDate.label')
  function format (d) {
    return `${d.getMonth() + 1}/${d.getFullYear()}`
  }

  let vals = []
  if (!item.Dates) {
    if (item.Date && item.Date.date) {
      return format(item.Date.date)
    }

    return ''
  }

  if (item.Dates.from && item.Dates.from.date) {
    vals.push(format(item.Dates.from.date))
  } else {
    vals.push(noDateLabel)
  }

  if (item.Dates.to && item.Dates.to.date) {
    vals.push(format(item.Dates.to.date))
  } else {
    vals.push(noDateLabel)
  }

  return vals.every(x => x === noDateLabel)
    ? ''
    : vals.join('-')
}
