import React from 'react'
import { i18n } from '../../../../config'
import { EmploymentValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Accordion } from '../../../Form'
import { openState } from '../../../Form/Accordion/Accordion'
import { today, daysAgo } from '../dateranges'
import { InjectGaps, EmploymentCustomSummary, EmploymentCaption } from '../summaries'
import EmploymentItem from './EmploymentItem'

const byline = (item, index, initial, translation, validator) => {
  if (!item.open && !initial && item.Item && !validator(item.Item)) {
    return (
      <div className={`byline ${openState(item, initial)} fade in`.trim()}>
        <div className="incomplete">{i18n.t(translation)}</div>
      </div>
    )
  }

  return null
}

export default class Employment extends SubsectionElement {
  constructor (props) {
    super(props)

    this.customEmploymentByline = this.customEmploymentByline.bind(this)
    this.customEmploymentDetails = this.customEmploymentDetails.bind(this)
    this.fillGap = this.fillGap.bind(this)
    this.inject = this.inject.bind(this)
  }

  customEmploymentByline (item, index, initial) {
    return byline(item, index, this.props.overrideInitial(initial), 'history.employment.default.collection.summary.incomplete', (item) => {
      return new EmploymentValidator(item, null).isValid()
    })
  }

  fillGap (dates) {
    let items = [...this.props.value]
    items.push({
      uuid: super.guid(),
      open: true,
      Item: {
        Dates: {
          receiveProps: true,
          from: dates.from,
          to: dates.to
        }
      }
    })

    this.props.onUpdate(InjectGaps(items, daysAgo(365 * this.props.totalYears)).sort(this.sort))
  }

  customEmploymentDetails (item, index, initial, callback) {
    if (item.type === 'Gap') {
      const dates = (item.Item || {}).Dates || {}
      return (
        <Gap title={i18n.t('history.employment.gap.title')}
             para={i18n.t('history.employment.gap.para')}
             btnText={i18n.t('history.employment.gap.btnText')}
             first={index === 0}
             dates={dates}
             onClick={this.fillGap.bind(this, dates)}
             />
      )
    }

    return callback()
  }

  inject (items) {
    return InjectGaps(items, daysAgo(today, 365 * this.props.totalYears))
  }

  render () {
    return (
      <div className="employment">
        <Accordion minimum="1"
                   scrollTo={this.props.scrollTo}
                   defaultState={this.props.defaultState}
                   items={this.props.value}
                   sort={this.props.sort}
                   inject={this.inject}
                   realtime={this.props.realtime}
                   onUpdate={this.props.onUpdate}
                   onError={this.handleError}
                   caption={EmploymentCaption}
                   byline={this.customEmploymentByline}
                   customSummary={EmploymentCustomSummary}
                   customDetails={this.customEmploymentDetails}
                   description={i18n.t('history.employment.default.collection.summary.title')}
                   appendLabel={i18n.t('history.employment.default.collection.append')}>
          <EmploymentItem name="Item" bind={true} />
        </Accordion>
      </div>
    )
  }
}

Employment.defaultProps = {
  value: [],
  scrollTo: '',
  defaultState: true,
  realtime: false,
  sort: null,
  totalYears: 10,
  overrideInitial: (initial) => { return initial },
  onUpdate: () => {},
  onError: (value, arr) => { return arr },
  section: 'history',
  subsection: 'employment',
  dispatch: () => {},
  validator: (state, props) => {
    return props.value.every(x => {
      return new EmploymentValidator(x.Item, null).isValid()
    })
  }
}
