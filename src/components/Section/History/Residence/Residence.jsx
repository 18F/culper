import React from 'react'
import { i18n } from '../../../../config'
import { ResidenceValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Accordion } from '../../../Form'
import { newGuid } from '../../../Form/ValidationElement'
import { openState } from '../../../Form/Accordion/Accordion'
import { today, daysAgo } from '../dateranges'
import { InjectGaps, ResidenceCustomSummary, ResidenceCaption } from '../summaries'
import ResidenceItem from './ResidenceItem'
import { Gap } from '../Gap'

const byline = (item, index, initial, translation, validator) => {
  if (!item.open && !initial && item.Item && !validator(item.Item)) {
    return (
      <div className={`byline ${openState(item, initial)} fade in`.trim()}>
        <div className="incomplete">{i18n.m(translation)}</div>
      </div>
    )
  }

  return null
}

export default class Residence extends SubsectionElement {
  constructor (props) {
    super(props)

    this.customResidenceByline = this.customResidenceByline.bind(this)
    this.customResidenceDetails = this.customResidenceDetails.bind(this)
    this.fillGap = this.fillGap.bind(this)
    this.inject = this.inject.bind(this)
  }

  customResidenceByline (item, index, initial) {
    return byline(item, index, this.props.overrideInitial(initial), 'history.residence.collection.summary.incomplete', (item) => {
      return new ResidenceValidator(item, null).isValid()
    })
  }

  customResidenceDetails (item, index, initial, callback) {
    if (item.type === 'Gap') {
      const dates = (item.Item || {}).Dates || {}
      return (
        <Gap title={i18n.t('history.residence.gap.title')}
             para={i18n.t('history.residence.gap.para')}
             btnText={i18n.t('history.residence.gap.btnText')}
             first={index === 0}
             dates={dates}
             onClick={this.fillGap.bind(this, dates)}
             />
      )
    }

    return callback()
  }

  fillGap (dates) {
    let items = [...this.props.value]
    items.push({
      uuid: newGuid(),
      open: true,
      Item: {
        Dates: {
          receiveProps: true,
          from: dates.from,
          to: dates.to
        }
      }
    })

    this.props.onUpdate({
      items: InjectGaps(items, daysAgo(365 * this.props.totalYears)).sort(this.sort),
      branch: ''
    })
  }

  inject (items) {
    return InjectGaps(items, daysAgo(today, 365 * this.props.totalYears))
  }

  render () {
    return (
      <div className="residence">
        <Accordion scrollTo={this.props.scrollTo}
                   defaultState={this.props.defaultState}
                   items={this.props.value}
                   sort={this.props.sort}
                   inject={this.inject}
                   realtime={this.props.realtime}
                   onUpdate={this.props.onUpdate}
                   onError={this.handleError}
                   caption={ResidenceCaption}
                   byline={this.customResidenceByline}
                   customSummary={ResidenceCustomSummary}
                   customDetails={this.customResidenceDetails}
                   description={i18n.t('history.residence.collection.summary.title')}
                   appendLabel={i18n.t('history.residence.collection.append')}>
          <ResidenceItem name="Item"
                         addressBooks={this.props.addressBooks}
                         dispatch={this.props.dispatch}
                         bind={true} />
        </Accordion>
      </div>
    )
  }
}

Residence.defaultProps = {
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
  subsection: 'residence',
  addressBooks: {},
  dispatch: () => {},
  validator: (state, props) => {
    return props.value.every(x => {
      return new ResidenceValidator(x.Item, null).isValid()
    })
  }
}
