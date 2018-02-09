import React from 'react'
import { i18n } from '../../../config'
import { gaps } from './dateranges'
import { Svg } from '../../Form'
import { newGuid } from '../../Form/ValidationElement'
import { AddressSummary, DateSummary, NameSummary } from '../../Summary'
import { ResidenceValidator, EmploymentValidator, EducationItemValidator } from '../../../validators'
import { openState, chevron } from '../../Form/Accordion/Accordion'

export const CustomSummary = (validation, summary, more, item, index, initial, callback, toggle, openText, remove, byline) => {
  if (item.type === 'Gap') {
    return null
  }

  const target = item.Item || {}
  const errors = item.Item && !validation(target)

  return (
    <div className="summary-container">
      <div className="summary">
        <span className={`left ${openState(item, initial)}`}>
          <a href="javascript:;;;" onClick={toggle()}>
            <span className="button-with-icon">
              <i className={chevron(item)} aria-hidden="true"></i>
              <span className="toggle">{openText()}</span>
            </span>
            {summary(target, errors)}
          </a>
          {more(target, errors)}
        </span>
        <a href="javascript:;;;" className="right remove" onClick={remove()}>
          <span className="button-with-icon">
            <i className="fa fa-trash" aria-hidden="true"></i>
            <span>{i18n.t('collection.remove')}</span>
          </span>
        </a>
      </div>
      {byline()}
    </div>
  )
}

/**
 * Renders a formatted summary information for a residence row
 */
export const ResidenceSummary = (item, errors, open) => {
  const address = AddressSummary(item.Address, i18n.m('history.residence.collection.summary.unknown'))
  const dates = DateSummary(item.Dates, i18n.t('history.employment.default.noDate.label'))
  const svg = errors && !open
        ? <Svg src="/img/exclamation-point.svg" className="incomplete" />
        : null

  return (
    <span>
      {svg}
      <span className="index">
        {i18n.t('history.residence.collection.summary.item')}:
      </span>
      <span className="employer title-case"><strong>{address}</strong></span>
      <span className="dates"><strong>{dates}</strong></span>
    </span>
  )
}

const PersonSummary = (item, errors) => {
  if (!item.ReferenceName) {
    return null
  }

  const name = NameSummary(item.ReferenceName, '')
  if (!name) {
    return null
  }

  return (
    <span>
      <span className="index">{i18n.t('history.residence.collection.summary.item2')}: </span>
      <span className="title-case"><strong>{name}</strong></span>
    </span>
  )
}

export const ResidenceCustomSummary = (item, index, initial, callback, toggle, openText, remove, byline) => {
  return CustomSummary(
    (x) => { return new ResidenceValidator(x, null).isValid() },
    (x, e) => { return ResidenceSummary(x, e, item.open) },
    (x, e) => {
      const ps = PersonSummary(x, e)
      if (ps === null) {
        return null
      }

      return (<a href="javascript:;;;" onClick={toggle()}>{ps}</a>)
    },
    item,
    index,
    initial,
    callback,
    toggle,
    openText,
    remove,
    byline)
}

const employmentTitle = (activity, item, unk) => {
  switch (activity) {
  case 'ActiveMilitary':
  case 'NationalGuard':
  case 'USPHS':
    return item.Title && item.Title.value
      ? item.Title.value
      : unk
  case 'OtherFederal':
  case 'StateGovernment':
  case 'FederalContractor':
  case 'NonGovernment':
  case 'SelfEmployment':
  case 'Other':
    return item.Employment && item.Employment.value
      ? item.Employment.value
      : unk
  case 'Unemployment':
    return i18n.t('history.employment.default.activity.type.unemployment')
  default:
    return unk
  }
}

/**
 * Renders a formatted summary information for an employment row
 */
export const EmploymentSummary = (item, errors, open) => {
  const activity = (item.EmploymentActivity || {}).value
  const employer = employmentTitle(activity, item, i18n.m('history.employment.default.collection.summary.unknown'))
  const dates = DateSummary(item.Dates, i18n.t('history.employment.default.noDate.label'))
  const svg = errors && !open
        ? <Svg src="/img/exclamation-point.svg" className="incomplete" />
        : null

  return (
    <span>
      {svg}
      <span className="index">
        {i18n.t('history.employment.default.collection.summary.employer')}:
      </span>
      <span className="employer"><strong>{ employer }</strong></span>
      <span className="dates"><strong>{ dates }</strong></span>
    </span>
  )
}

const ActivitySummary = (item, errors) => {
  if (!item.Additional || item.Additional.HasAdditionalActivity !== 'Yes' || (item.Additional.List || []).length === 0) {
    return []
  }

  return item.Additional.List.map(activity => {
    const dates = DateSummary(activity.DatesEmployed, i18n.t('history.employment.default.noDate.label'))

    if ((activity.Position || {}).value && dates) {
      return (
        <span>
          <span className="index">{i18n.t('history.education.default.collection.summary.item2')}: </span>
          <span><strong>{activity.Position.value}</strong></span>
          <span className="dates"><strong>{dates}</strong></span>
        </span>
      )
    }

    return null
  })
}

export const EmploymentCustomSummary = (item, index, initial, callback, toggle, openText, remove, byline) => {
  return CustomSummary(
    (x) => { return new EmploymentValidator(x, null).isValid() },
    (x, e) => { return EmploymentSummary(x, e, item.open) },
    (x, e) => {
      return ActivitySummary(x, e)
        .filter(activity => activity !== null)
        .map(activity => {
          return (<a href="javascript:;;;" key={newGuid()} onClick={toggle()}>{activity}</a>)
        })
    },
    item,
    index,
    initial,
    callback,
    toggle,
    openText,
    remove,
    byline)
}

/**
 * Renders a formatted summary information for an education row
 */
export const EducationSummary = (item, errors, open) => {
  const school = (item.Name && item.Name.value ? item.Name.value : i18n.m('history.education.collection.school.summary.unknown'))
  const dates = DateSummary(item.Dates, i18n.t('history.employment.default.noDate.label'))
  const svg = errors && !open
        ? <Svg src="/img/exclamation-point.svg" className="incomplete" />
        : null

  return (
    <span>
      {svg}
      <span className="index">
        {i18n.t('history.education.collection.school.summary.item')}:
      </span>
      <span className="employer"><strong>{ school }</strong></span>
      <span className="dates"><strong>{ dates }</strong></span>
    </span>
  )
}

const DiplomaSummary = (item, errors) => {
  if ((item.Diplomas || []).length === 0) {
    return []
  }

  return item.Diplomas.items.map((degree, index) => {
    const dd = degree.Diploma || {}
    const other = (dd.DiplomaOther || {}).value || ''
    const diploma = dd.Diploma || ''
    const val = diploma
          ? diploma === 'Other' ? other : diploma
          : other

    if (val) {
      return (
        <span>
          <span className="index">{i18n.t('history.education.collection.school.summary.item2')} {index + 1}: </span>
          <span><strong>{val}</strong></span>
        </span>
      )
    }

    return null
  })
}

export const EducationCustomSummary = (item, index, initial, callback, toggle, openText, remove, byline) => {
  return CustomSummary(
    (x) => { return new EducationItemValidator(x).isValid() },
    (x, e) => { return EducationSummary(x, e, item.open) },
    (x, e) => {
      return DiplomaSummary(x, e)
        .filter(diploma => diploma !== null)
        .map(diploma => {
          return (
            <a href="javascript:;;;" key={newGuid()} onClick={toggle()}>
              {diploma}
            </a>
          )
        })
    },
    item,
    index,
    initial,
    callback,
    toggle,
    openText,
    remove,
    byline)
}

/**
 * Inject new list items as `Gaps`
 */
export const InjectGaps = (list = [], start) => {
  // Let us just make sure we clear any previous gaps
  list = list.filter(item => !item.type || (item.type && item.type !== 'Gap'))

  const hasDates = (item) => {
    const dates = ((item || {}).Item || {}).Dates || {}
    const from = dates.from || {}
    const to = dates.to || {}
    return from.date && to.date
  }

  // Find all our "holes" for this type
  const ranges = list
        .filter(item => { return hasDates(item) })
        .map(item => {
          return {
            from: new Date(item.Item.Dates.from.date),
            to: new Date(item.Item.Dates.to.date)
          }
        })
  let holes = gaps(ranges, start)

  const equalDates = (first, second) => {
    if (!first || !second) {
      return false
    }
    // TODO Remove
    if (!(first instanceof Date) || !(second instanceof Date)) {
      return false
    }
    return first.toDateString() === second.toDateString()
  }

  for (const item of list) {
    if (!item.Item || !item.Item.Dates) {
      continue
    }

    for (let i = holes.length - 1; i > -1; i--) {
      const gap = holes[i]

      if (equalDates(gap.to, item.Item.Dates.from.date)) {
        let g = holes.splice(i, 1)[0]
        list.push({
          type: 'Gap',
          uuid: newGuid(),
          open: false,
          Item: {
            Dates: {
              from: {
                date: g.from,
                month: `${g.from.getMonth()+1}`,
                day: `${g.from.getDate()}`,
                year: `${g.from.getFullYear()}`
              },
              to: {
                date: g.to,
                month: `${g.to.getMonth()+1}`,
                day: `${g.to.getDate()}`,
                year: `${g.to.getFullYear()}`
              }
            }
          }
        })
      } else if (equalDates(gap.from, item.Item.Dates.to.date)) {
        let g = holes.splice(i, 1)[0]
        list.push({
          type: 'Gap',
          uuid: newGuid(),
          open: false,
          Item: {
            Dates: {
              from: {
                date: g.from,
                month: `${g.from.getMonth()+1}`,
                day: `${g.from.getDate()}`,
                year: `${g.from.getFullYear()}`
              },
              to: {
                date: g.to,
                month: `${g.to.getMonth()+1}`,
                day: `${g.to.getDate()}`,
                year: `${g.to.getFullYear()}`
              }
            }
          }
        })
      }
    }
  }

  return list
}
