import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate, {
  HistoryResidenceValidator,
  ResidenceValidator
} from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Accordion } from '../../../Form'
import { newGuid } from '../../../Form/ValidationElement'
import { openState } from '../../../Form/Accordion/Accordion'
import { today, daysAgo } from '../dateranges'
import { InjectGaps, ResidenceCustomSummary } from '../summaries'
import ResidenceItem from './ResidenceItem'
import { Gap } from '../Gap'

const byline = (item, index, initial, translation, required, validator) => {
  switch (true) {
    // If item is required and not currently opened and is not valid, show message
    case required && !item.open && !validator(item.Item):
    case !item.open && !initial && item.Item && !validator(item.Item):
      return (
        <div className={`byline ${openState(item, initial)} fade in`.trim()}>
          <div className="incomplete">{i18n.m(translation)}</div>
        </div>
      )
    default:
      return null
  }
}

export default class Residence extends SubsectionElement {
  constructor(props) {
    super(props)

    this.customResidenceByline = this.customResidenceByline.bind(this)
    this.customResidenceDetails = this.customResidenceDetails.bind(this)
    this.fillGap = this.fillGap.bind(this)
    this.inject = this.inject.bind(this)
  }

  customResidenceByline(item, index, initial) {
    return byline(
      item,
      index,
      this.props.overrideInitial(initial),
      'history.residence.collection.summary.incomplete',
      this.props.required,
      item => {
        return new ResidenceValidator(item, null).isValid()
      }
    )
  }

  customResidenceDetails(item, index, initial, callback) {
    if (item.type === 'Gap') {
      const dates = (item.Item || {}).Dates || {}
      return (
        <Gap
          title={i18n.t('history.residence.gap.title')}
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

  fillGap(dates) {
    let items = [...this.props.List.items]
    items.push({
      uuid: newGuid(),
      open: true,
      Item: {
        name: 'Item',
        Dates: {
          name: 'Dates',
          present: false,
          receiveProps: true,
          from: dates.from,
          to: dates.to
        }
      }
    })

    this.props.onUpdate({
      items: InjectGaps(items, daysAgo(365 * this.props.totalYears)).sort(
        this.sort
      ),
      branch: {}
    })
  }

  inject(items) {
    return InjectGaps(items, daysAgo(today, 365 * this.props.totalYears))
  }

  render() {
    return (
      <div
        className="section-content residence"
        {...super.dataAttributes(this.props)}>
        <Accordion
          scrollToTop={this.props.scrollToTop}
          defaultState={this.props.defaultState}
          {...this.props.List}
          sort={this.props.sort}
          inject={this.inject}
          realtime={this.props.realtime}
          onUpdate={this.props.onUpdate}
          onError={this.handleError}
          caption={this.props.caption}
          byline={this.customResidenceByline}
          customSummary={ResidenceCustomSummary}
          customDetails={this.customResidenceDetails}
          description={i18n.t('history.residence.collection.summary.title')}
          appendTitle={i18n.t('history.residence.collection.appendTitle')}
          appendLabel={i18n.t('history.residence.collection.append')}
          required={this.props.required}
          scrollIntoView={this.props.scrollIntoView}>
          <ResidenceItem
            name="Item"
            bind={true}
            addressBooks={this.props.addressBooks}
            dispatch={this.props.dispatch}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          />
        </Accordion>
      </div>
    )
  }
}

Residence.defaultProps = {
  List: Accordion.defaultList,
  scrollToTop: '',
  defaultState: true,
  realtime: false,
  sort: null,
  totalYears: 10,
  overrideInitial: initial => {
    return initial
  },
  caption: null,
  onUpdate: () => {},
  onError: (value, arr) => {
    return arr
  },
  section: 'history',
  subsection: 'residence',
  addressBooks: {},
  dispatch: () => {},
  validator: data => {
    return new HistoryResidenceValidator(data).isValid()
  }
}
