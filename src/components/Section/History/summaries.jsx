import React from 'react'
import { i18n } from '../../../config'
import { gaps, gaps2 } from './dateranges'
import { Svg } from '../../Form'
import { newGuid } from '../../Form/ValidationElement'
import { AddressSummary, DateSummary, NameSummary } from '../../Summary'
import { ResidenceValidator, EmploymentValidator, EducationValidator, EducationItemValidator } from '../../../validators'
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
          <a onClick={toggle()}>
            <span className="button-with-icon">
              <i className={chevron(item)} aria-hidden="true"></i>
              <span className="toggle">{openText()}</span>
            </span>
            {summary(target, errors)}
          </a>
          {more(target, errors)}
        </span>
        <a className="right remove" onClick={remove()}>
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

export const ResidenceCaption = (props) => {
  return (
    <span>
      <Svg src="/img/residence-house.svg" />
      {i18n.t('history.residence.collection.caption')}
    </span>
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
  if (!item.Reference) {
    return null
  }

  const name = NameSummary(item.Reference.FullName, '')

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

      return (<a onClick={toggle()}>{ps}</a>)
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

export const EmploymentCaption = (props) => {
  return (
    <span>
      <Svg src="/img/employer-briefcase.svg" />
      {i18n.t('history.employment.default.collection.caption')}
    </span>
  )
}

/**
 * Renders a formatted summary information for an employment row
 */
export const EmploymentSummary = (item, errors, open) => {
  const employer = item.Employment && item.Employment.value
        ? item.Employment.value
        : i18n.m('history.employment.default.collection.summary.unknown')
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
          return (<a key={newGuid()} onClick={toggle()}>{activity}</a>)
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

export const EducationCaption = (props) => {
  return (
    <span>
      <Svg src="/img/school-cap.svg" />
      {i18n.t('history.education.collection.caption')}
    </span>
  )
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

  return item.Diplomas.map((degree, index) => {
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
            <a key={newGuid()} onClick={toggle()}>
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

  // Find all our "holes" for this type
  const ranges = list
        .filter(item => { return item.Item && item.Item.Dates })
        .map(item => {
          return {
            from: new Date(item.Item.Dates.from.date),
            to: new Date(item.Item.Dates.to.date)
          }
        })
  let holes = gaps2(ranges, start)

  const equalDates = (first, second) => {
    if (!first || !second) {
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
              from: { date: g.from },
              to: { date: g.to }
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
              from: { date: g.from },
              to: { date: g.to }
            }
          }
        })
      }
    }
  }

  return list
}
